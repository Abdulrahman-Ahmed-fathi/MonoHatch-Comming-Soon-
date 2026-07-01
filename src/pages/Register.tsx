import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";
import { saveFreeTrialEntry } from "@/lib/formStorage";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ApkSafetyNotice } from "@/components/DownloadAppButton";
import DownloadApkButton from "@/components/DownloadApkButton";
import logoUrl from "@/assets/logo.png";
import { cn } from "@/lib/utils";

type Phase = "form" | "success";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+]?[\d\s()-]{8,20}$/;

export default function Register() {
  const { t, i18n } = useTranslation();
  const reduceMotion = useReducedMotion();
  const isRtl = i18n.language === "ar";
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  const initial = reduceMotion
    ? { opacity: 1, y: 0, scale: 1 }
    : { opacity: 0, y: 18, scale: 0.98 };

  const [phase, setPhase] = useState<Phase>("form");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showDownloadNotice, setShowDownloadNotice] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    if (!fullName.trim() || !email.trim() || !phone.trim()) return;
    if (!emailPattern.test(email.trim())) return;
    if (!phonePattern.test(phone.trim())) return;

    setError("");
    setIsSubmitting(true);

    try {
      await saveFreeTrialEntry({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        submittedAt: new Date().toISOString(),
      });
      setPhase("success");
    } catch {
      setError(t("register.phase1.error"));
    } finally {
      setIsSubmitting(false);
    }
  }

  const firstName = fullName.trim().split(/\s+/)[0] || "";

  return (
    <div className="min-h-screen bg-[#fcf9f7]">
      <div className="section-container section-pad">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className={cn(
              "inline-flex items-center gap-2 text-sm font-semibold text-french-rose transition-colors hover:text-french-rose-shade1 focus:outline-none focus:ring-2 focus:ring-french-rose focus:ring-offset-2 rounded-sm",
              isRtl && "flex-row-reverse"
            )}
          >
            <BackIcon className="h-4 w-4" aria-hidden />
            {t("register.backHome")}
          </Link>
          <LanguageSwitcher />
        </div>

        <motion.div
          className="mx-auto max-w-lg"
          initial={initial}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55 }}
        >
          <div className="mb-8 flex flex-col items-center text-center">
            <img src={logoUrl} alt="Mono Hatch" className="h-16 w-auto mix-blend-multiply" />
            <p className="mt-2 text-xl font-bold text-french-rose">{t("brand.name")}</p>
          </div>

          {phase === "form" ? (
            <motion.div
              key="form"
              initial={initial}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="relative overflow-hidden rounded-shell border border-[#efe8e5] bg-white p-8 shadow-card md:p-10"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-french-rose to-mulberry" />
              <h1 className="text-2xl font-semibold text-ink-warm md:text-3xl">
                {t("register.phase1.title")}
              </h1>
              <p className="p1-r mt-3 text-ink-warm/75">{t("register.phase1.subtitle")}</p>

              <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
                <label className="block">
                  <span className="p3-b mb-1.5 block text-ink-warm/70">
                    {t("register.phase1.fullName")}
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder={t("register.phase1.fullNamePlaceholder")}
                    className="w-full rounded-xl border border-[#e8dfe4] bg-white px-4 py-3 text-sm text-ink-warm outline-none transition-all focus:border-french-rose/60 focus:ring-2 focus:ring-french-rose/20"
                  />
                </label>
                <label className="block">
                  <span className="p3-b mb-1.5 block text-ink-warm/70">
                    {t("register.phase1.email")}
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                    placeholder={t("register.phase1.emailPlaceholder")}
                    className="w-full rounded-xl border border-[#e8dfe4] bg-white px-4 py-3 text-sm text-ink-warm outline-none transition-all focus:border-french-rose/60 focus:ring-2 focus:ring-french-rose/20"
                  />
                </label>
                <label className="block">
                  <span className="p3-b mb-1.5 block text-ink-warm/70">
                    {t("register.phase1.phone")}
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    pattern="[+]?[\d\s()-]{8,20}"
                    placeholder={t("register.phase1.phonePlaceholder")}
                    className="w-full rounded-xl border border-[#e8dfe4] bg-white px-4 py-3 text-sm text-ink-warm outline-none transition-all focus:border-french-rose/60 focus:ring-2 focus:ring-french-rose/20"
                  />
                </label>

                {error ? (
                  <p className="text-sm font-medium text-rose-600" role="alert">
                    {error}
                  </p>
                ) : null}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  className="mt-2 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-french-rose px-10 py-3.5 text-base font-semibold text-white shadow-pink transition-all hover:bg-french-rose-shade1 focus:outline-none focus:ring-2 focus:ring-french-rose focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-75"
                >
                  <Rocket className="h-4 w-4" aria-hidden />
                  {isSubmitting ? t("register.phase1.submitting") : t("register.phase1.submit")}
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-shell border border-french-rose/30 bg-gradient-to-br from-white via-pastel-rose/20 to-lavender-mist/20 p-8 text-center shadow-card md:p-12"
            >
              <motion.div
                initial={reduceMotion ? {} : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-french-rose/15 text-french-rose"
              >
                <CheckCircle2 className="h-10 w-10" aria-hidden />
              </motion.div>
              <h2 className="text-2xl font-semibold text-ink-warm md:text-3xl">
                {firstName
                  ? t("register.phase2.thanksNamed", { name: firstName })
                  : t("register.phase2.thanksGeneric")}
              </h2>
              <p className="p1-r mx-auto mt-4 max-w-md text-ink-warm/75">
                {t("register.phase2.subtitle")}
              </p>
              <div className="mt-8 flex flex-col items-center gap-4">
                <DownloadApkButton
                  size="lg"
                  className="w-full max-w-sm justify-center"
                  onDownloadStart={() => setShowDownloadNotice(true)}
                />
                {showDownloadNotice ? (
                  <ApkSafetyNotice className="max-w-md text-start" />
                ) : null}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}