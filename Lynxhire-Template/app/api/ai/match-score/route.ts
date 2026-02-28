import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { applicationId } = await request.json();
  if (!applicationId)
    return NextResponse.json(
      { error: "applicationId required" },
      { status: 400 }
    );

  const { data: app } = await supabase
    .from("applications")
    .select(
      `
      id, candidate_id,
      job_postings (
        title, skills_required, experience_level, work_type, location_type,
        salary_min, salary_max, province
      )
    `
    )
    .eq("id", applicationId)
    .single();

  if (!app)
    return NextResponse.json(
      { error: "Application not found" },
      { status: 404 }
    );

  const { data: candidate } = await supabase
    .from("candidate_profiles")
    .select(
      "skills, years_experience, work_authorization, desired_work_type, desired_salary_min, desired_salary_max, province"
    )
    .eq("profile_id", app.candidate_id)
    .single();

  if (!candidate)
    return NextResponse.json(
      { error: "Candidate not found" },
      { status: 404 }
    );

  const job = Array.isArray(app.job_postings)
    ? app.job_postings[0]
    : app.job_postings;

  const jobData = job as {
    title?: string;
    skills_required?: string[];
    experience_level?: string;
    work_type?: string;
    location_type?: string;
    salary_min?: number;
    salary_max?: number;
    province?: string;
  } | null;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 256,
      messages: [
        {
          role: "user",
          content: `You are an AI recruitment assistant. Score how well this candidate matches this job.

JOB:
- Title: ${jobData?.title ?? "Unknown"}
- Required Skills: ${jobData?.skills_required?.join(", ") ?? "Not specified"}
- Experience Level: ${jobData?.experience_level ?? "Not specified"}
- Work Type: ${jobData?.work_type ?? "Not specified"}
- Location Type: ${jobData?.location_type ?? "Not specified"}
- Province: ${jobData?.province ?? "Any"}
- Salary Range: ${jobData?.salary_min ? `CAD $${jobData.salary_min}–$${jobData?.salary_max ?? "?"}` : "Not specified"}

CANDIDATE:
- Skills: ${candidate.skills?.join(", ") ?? "None listed"}
- Years of Experience: ${candidate.years_experience ?? "Unknown"}
- Work Authorization: ${candidate.work_authorization ?? "Not specified"}
- Preferred Work Types: ${candidate.desired_work_type?.join(", ") ?? "Any"}
- Salary Expectation: ${candidate.desired_salary_min ? `CAD $${candidate.desired_salary_min}–$${candidate.desired_salary_max ?? "?"}` : "Not specified"}

Scoring weights:
- Skills match: 50%
- Experience level match: 15%
- Location/remote preference: 15%
- Salary alignment: 10%
- Work authorization (must be Canadian eligible): 10%

Return ONLY a JSON object with no markdown or explanation:
{"score": <integer 0-100>, "reason": "<one sentence explanation>"}`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") throw new Error("Bad response");

    const raw = content.text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(raw) as { score: number; reason?: string };
    const score = Math.min(
      100,
      Math.max(0, Number.isFinite(parsed.score) ? Math.round(parsed.score) : 0)
    );

    await supabase
      .from("applications")
      .update({ ai_match_score: score })
      .eq("id", applicationId);

    return NextResponse.json({
      score,
      reason: parsed.reason ?? "",
    });
  } catch (err) {
    console.error("Match scoring error:", err);
    return NextResponse.json(
      { error: "Scoring failed" },
      { status: 500 }
    );
  }
}
