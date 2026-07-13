"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/admin/actions";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm border-2 border-espresso bg-cream p-8 shadow-[6px_6px_0_0_var(--color-espresso)]">
        <p className="text-xs font-semibold uppercase tracking-widest text-rust">Csak személyzetnek</p>
        <h1 className="font-display mt-1 text-3xl text-espresso">Admin bejelentkezés</h1>

        <form action={formAction} className="mt-6 space-y-4">
          <div>
            <label htmlFor="username" className="text-sm font-semibold text-espresso">
              Felhasználónév
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              className="mt-1 w-full border-2 border-espresso bg-parchment px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-rust"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-semibold text-espresso">
              Jelszó
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1 w-full border-2 border-espresso bg-parchment px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-rust"
            />
          </div>

          {state.error && <p className="text-sm font-semibold text-rust-dark">{state.error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="font-display w-full rounded-sm border-2 border-rust-dark bg-rust px-6 py-2.5 text-lg tracking-wide text-cream transition-colors hover:bg-rust-dark disabled:opacity-60"
          >
            {pending ? "Bejelentkezés..." : "Bejelentkezés"}
          </button>
        </form>
      </div>
    </div>
  );
}
