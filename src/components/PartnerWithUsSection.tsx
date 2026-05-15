import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Sparkles, Stethoscope, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeading from "@/components/ui/SectionHeading";
import { savePartnerEntry } from "@/lib/formStorage";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const cardKeys = ["doctors", "brands", "investment"] as const;
const collaborationKeys = ["doctors", "brands", "investment", "clinical"] as const;

const cardIcons = {
  doctors: Stethoscope,
  brands: Sparkles,
  investment: TrendingUp,
} as const;

export default function PartnerWithUsSection() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.98 };

  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    organization: "",
    role: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    website: "",
    brief: "",
    collaborationTypes: [] as string[],
  });

  const handleInputChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckbox = (optionKey: string) => {
    setForm((prev) => {
      const alreadySelected = prev.collaborationTypes.includes(optionKey);
      return {
        ...prev,
        collaborationTypes: alreadySelected
          ? prev.collaborationTypes.filter((item) => item !== optionKey)
          : [...prev.collaborationTypes, optionKey],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim() || isSubmitting) {
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    try {
      await savePartnerEntry({
        ...form,
        submittedAt: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch {
      setSubmitError(t("partner.dialog.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      setSubmitted(false);
      setSubmitError("");
      setIsSubmitting(false);
      setForm({
        fullName: "",
        organization: "",
        role: "",
        email: "",
        phone: "",
        specialization: "",
        experience: "",
        website: "",
        brief: "",
        collaborationTypes: [],
      });
    }
    setOpen(value);
  };

  return (
    <section id="partner" className="bg-white">
      <div className="section-container section-pad">
        <SectionHeading title={t("partner.title")} subtitle={t("partner.subtitle")} />

        <div className="mt-10 grid grid-cols-1 items-start gap-5 md:grid-cols-3 md:gap-6">
          {cardKeys.map((key, idx) => {
            const Icon = cardIcons[key];
            return (
              <motion.div
                key={key}
                initial={initial}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, delay: idx * 0.06 }}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                className="flex h-full flex-col rounded-shell border border-[#efe8e5] bg-white p-7 shadow-card"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-french-rose/10">
                  <Icon className="h-6 w-6 text-french-rose" aria-hidden />
                </div>

                <h3 className="mt-1 text-xl font-semibold text-ink-warm">
                  {t(`partner.cards.${key}.title`)}
                </h3>
                <p className="p2-r mt-3 flex-1 leading-relaxed text-ink-warm/75">
                  {t(`partner.cards.${key}.body`)}
                </p>
                <p className="mt-5 text-sm font-medium text-french-rose">
                  {t("partner.cardCta")}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={initial}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, delay: 0.06 }}
        >
          <p className="p2-r mb-4 text-center text-ink-warm/60">{t("partner.cta_hint")}</p>
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <button className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-french-rose px-10 py-3.5 text-base font-semibold text-white shadow-pink transition-all hover:bg-french-rose-shade1 focus:outline-none focus:ring-2 focus:ring-french-rose focus:ring-offset-2 motion-safe:animate-pulseGlow md:px-12 md:py-4 md:text-lg">
                {t("partner.collaborate")}
              </button>
            </DialogTrigger>
            <DialogContent className="w-[min(100vw-1rem,48rem)] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 md:p-6 lg:p-8">
              {!submitted ? (
                <>
                  <DialogHeader className="text-center md:text-start">
                    <DialogTitle className="text-lg md:text-xl">{t("partner.dialog.title")}</DialogTitle>
                    <DialogDescription className="text-sm md:text-base">
                      {t("partner.dialog.description")}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="mt-4 space-y-4 md:mt-6 md:space-y-5">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                      <label className="space-y-1 text-sm">
                        <span className="font-medium">{t("partner.dialog.fullName")}</span>
                        <input
                          value={form.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          required
                          className="w-full rounded-xl border border-rose-200 px-3 py-2.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </label>
                      <label className="space-y-1 text-sm">
                        <span className="font-medium">{t("partner.dialog.organization")}</span>
                        <input
                          value={form.organization}
                          onChange={(e) => handleInputChange("organization", e.target.value)}
                          className="w-full rounded-xl border border-rose-200 px-3 py-2.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                      <label className="space-y-1 text-sm">
                        <span className="font-medium">{t("partner.dialog.role")}</span>
                        <input
                          value={form.role}
                          onChange={(e) => handleInputChange("role", e.target.value)}
                          className="w-full rounded-xl border border-rose-200 px-3 py-2.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </label>
                      <label className="space-y-1 text-sm">
                        <span className="font-medium">{t("partner.dialog.email")}</span>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                          className="w-full rounded-xl border border-rose-200 px-3 py-2.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                      <label className="space-y-1 text-sm">
                        <span className="font-medium">{t("partner.dialog.phone")}</span>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                          className="w-full rounded-xl border border-rose-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </label>
                      <label className="space-y-1 text-sm">
                        <span className="font-medium">{t("partner.dialog.specialization")}</span>
                        <input
                          value={form.specialization}
                          onChange={(e) => handleInputChange("specialization", e.target.value)}
                          className="w-full rounded-xl border border-rose-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                      <label className="space-y-1 text-sm">
                        <span className="font-medium">{t("partner.dialog.experience")}</span>
                        <input
                          type="text"
                          value={form.experience}
                          onChange={(e) => handleInputChange("experience", e.target.value)}
                          className="w-full rounded-xl border border-rose-200 px-3 py-2.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </label>
                      <label className="space-y-1 text-sm">
                        <span className="font-medium">{t("partner.dialog.website")}</span>
                        <input
                          type="url"
                          value={form.website}
                          onChange={(e) => handleInputChange("website", e.target.value)}
                          className="w-full rounded-xl border border-rose-200 px-3 py-2.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </label>
                    </div>

                    <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4">
                      <fieldset className="space-y-3">
                        <legend className="text-sm font-medium">{t("partner.dialog.collaborationType")}</legend>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {collaborationKeys.map((optionKey) => (
                            <label key={optionKey} className="flex cursor-pointer items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={form.collaborationTypes.includes(optionKey)}
                                onChange={() => handleCheckbox(optionKey)}
                                className="h-4 w-4 rounded border-rose-300 text-french-rose focus:ring-french-rose"
                              />
                              <span className="text-sm text-french-rose md:text-base">
                                {t(`partner.collaborationOptions.${optionKey}`)}
                              </span>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    </div>

                    <label className="space-y-1 text-sm">
                      <span className="font-medium">{t("partner.dialog.brief")}</span>
                      <textarea
                        value={form.brief}
                        onChange={(e) => handleInputChange("brief", e.target.value)}
                        rows={4}
                        placeholder={t("partner.dialog.briefPlaceholder")}
                        className="w-full resize-none rounded-xl border border-rose-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 md:text-base"
                      />
                    </label>

                    {submitError ? <p className="text-sm text-rose-600">{submitError}</p> : null}

                    <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-3">
                      <DialogClose asChild>
                        <button
                          type="button"
                          className="w-full rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-400 sm:w-auto"
                        >
                          {t("partner.dialog.cancel")}
                        </button>
                      </DialogClose>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-xl bg-french-rose px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-french-rose-shade1 focus:outline-none focus:ring-2 focus:ring-french-rose focus:ring-offset-2 sm:w-auto"
                      >
                        {isSubmitting ? t("partner.dialog.submitting") : t("partner.dialog.submit")}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="py-6 text-center md:py-8">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-french-rose/10 text-french-rose md:h-20 md:w-20">
                    <CheckCircle2 className="h-8 w-8 md:h-10 md:w-10" />
                  </div>
                  <h3 className="text-lg font-semibold text-ink-warm md:text-xl">{t("partner.dialog.successTitle")}</h3>
                  <p className="mt-2 px-4 text-sm text-ink-warm/75 md:text-base">{t("partner.dialog.successBody")}</p>
                  <div className="mt-6">
                    <DialogClose className="w-full rounded-xl bg-french-rose px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-french-rose-shade1 focus:outline-none focus:ring-2 focus:ring-french-rose focus:ring-offset-2 sm:w-auto">
                      {t("partner.dialog.close")}
                    </DialogClose>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </section>
  );
}
