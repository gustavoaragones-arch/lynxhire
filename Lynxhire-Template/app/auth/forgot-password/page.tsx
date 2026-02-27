"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { LynxHireLogo } from "@/components/logo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_APP_URL ?? "";
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/callback?next=/auth/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setSent(true);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <LynxHireLogo variant="light" />
          </Link>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          {sent ? (
            <div className="text-center">
              <div className="text-4xl mb-4">📬</div>
              <h1 className="font-heading text-xl font-bold text-foreground mb-2">
                Check your email
              </h1>
              <p className="text-muted-foreground text-sm mb-6">
                We sent a password reset link to <strong>{email}</strong>
              </p>
              <Link
                href="/auth/login"
                className="text-primary hover:underline text-sm font-medium"
              >
                Back to Log In
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-heading text-2xl font-bold text-foreground mb-1">
                Reset password
              </h1>
              <p className="text-muted-foreground text-sm mb-6">
                Enter your email and we&apos;ll send a reset link.
              </p>
              <form onSubmit={handleReset} className="space-y-4">
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
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
              <p className="text-center text-sm text-muted-foreground mt-6">
                <Link
                  href="/auth/login"
                  className="text-primary hover:underline font-medium"
                >
                  Back to Log In
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
