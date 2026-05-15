import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logoUrl from "@/assets/logo.png";

const VALID_USERNAME = "admin";
const VALID_PASSWORD = "mono123";

export default function Login() {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.trim() === VALID_USERNAME && password === VALID_PASSWORD) {
      localStorage.setItem("mono-hatch-authenticated", "true");
      navigate("/dashboard", { replace: true });
      return;
    }
    setError(t("login.error"));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#FFBD9F]/30 via-white to-french-rose/10 p-6">
      <div className="relative w-full max-w-md overflow-hidden rounded-shell border border-[#efe8e5] bg-white p-8 shadow-card md:p-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-french-rose to-mulberry" />
        <div className="mb-6 flex flex-col items-center text-center">
          <img src={logoUrl} alt="Mono Hatch" className="h-16 w-auto mix-blend-multiply" />
          <p className="mt-2 text-lg font-bold text-french-rose">{t("brand.name")}</p>
        </div>
        <h1 className="text-center text-2xl font-semibold text-ink-warm">{t("login.title")}</h1>
        <p className="mt-2 text-center text-sm text-ink-warm/70">{t("login.subtitle")}</p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-ink-warm">{t("login.username")}</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
            className="w-full rounded-xl border border-[#e8dfe4] px-4 py-2.5 text-sm text-ink-warm outline-none transition-all focus:border-french-rose/60 focus:ring-2 focus:ring-french-rose/20"
          />

          <label className="block text-sm font-medium text-ink-warm">{t("login.password")}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full rounded-xl border border-[#e8dfe4] px-4 py-2.5 text-sm text-ink-warm outline-none transition-all focus:border-french-rose/60 focus:ring-2 focus:ring-french-rose/20"
          />

          {error ? (
            <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-french-rose px-4 py-3 text-sm font-semibold text-white shadow-pink transition-all hover:bg-french-rose-shade1 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-french-rose focus:ring-offset-2"
          >
            {t("login.submit")}
          </button>
        </form>
      </div>
    </div>
  );
}
