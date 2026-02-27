"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { LynxHireLogo } from "@/components/logo";

type UserType = "candidate" | "employer";

export default function SignupPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<UserType>("candidate");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          type: userType,
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push(
      userType === "candidate"
        ? "/onboarding/candidate"
        : "/onboarding/employer"
    );
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <LynxHireLogo variant="light" />
          </Link>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-1">
            Create your account
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            Join thousands of Canadians on LynxHire
          </p>

          {/* User type toggle */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {(["candidate", "employer"] as UserType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setUserType(type)}
                className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                  userType === type
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40"
                }`}
              >
                {type === "candidate" ? "🎯 Job Seeker" : "💼 Employer"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Smith"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3.5 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-medium rounded-lg text-sm hover:bg-primary/90 disabled:opacity-60 transition-all"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary hover:underline font-medium"
            >
              Log In
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By signing up you agree to our{" "}
          <Link href="/legal/terms" className="hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/legal/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
