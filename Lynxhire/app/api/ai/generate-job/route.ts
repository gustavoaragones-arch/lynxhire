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

  const { data: profile } = await supabase
    .from("profiles")
    .select("type")
    .eq("id", user.id)
    .single();

  if (profile?.type !== "employer") {
    return NextResponse.json(
      { error: "Employer account required" },
      { status: 403 }
    );
  }

  const body = await request.json();
  const {
    title,
    bullets,
    company,
    location,
    workType,
    salaryMin,
    salaryMax,
    experienceLevel,
  } = body;

  if (!title || !bullets) {
    return NextResponse.json(
      { error: "Title and bullet points are required" },
      { status: 400 }
    );
  }

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are a professional Canadian HR copywriter. Write a compelling job description for the following role.

Job Title: ${title}
Company: ${company || "the company"}
Location: ${location || "Canada"} (${workType || "full-time"})
Experience Level: ${experienceLevel || "mid-level"}
Salary: ${salaryMin && salaryMax ? `CAD $${Number(salaryMin).toLocaleString()} – $${Number(salaryMax).toLocaleString()}/year` : "Competitive"}

Key bullet points to include:
${bullets}

Write a professional job description with these sections:
1. About the Role (2-3 sentences)
2. What You'll Do (4-6 bullet points)
3. What We're Looking For (4-6 bullet points)

Use Canadian English. Be specific, warm, and inclusive. Avoid jargon. Do NOT include salary, company name placeholder text, or a call-to-action — those are handled separately. Return ONLY the formatted job description text, no headings like "Job Description:".`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") throw new Error("Unexpected response type");

    return NextResponse.json({ description: content.text });
  } catch (error) {
    console.error("AI generation error:", error);
    return NextResponse.json(
      { error: "AI generation failed. Please try again." },
      { status: 500 }
    );
  }
}
