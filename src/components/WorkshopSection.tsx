import { type FormEvent, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeading from "@/components/ui/SectionHeading";
import { saveWorkshopEntry } from "@/lib/formStorage";
import {
  DEFAULT_WORKSHOP_SETTINGS,
  getWorkshopContentForLanguage,
  getWorkshopSettings,
  type WorkshopSettings,
} from "@/lib/siteSettings";

const phonePattern = /^[+]?[\d\s()-]{8,20}$/;

export default function WorkshopSection() {
  const { i18n, t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.98 };

  const [settings, setSettings] = useState<WorkshopSettings>(DEFAULT_WORKSHOP_SETTINGS);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    void getWorkshopSettings()
      .then(setSettings)
      .catch(() => setSettings(DEFAULT_WORKSHOP_SETTINGS));
  }, []);

  const content = getWorkshopContentForLanguage(settings, i18n.language);
  const showEmail = settings.mode === "registration" && settings.registrationFields !== "phone";
  const showPhone = settings.mode === "registration" && settings.registrationFields !== "email";
  const isExternalLink = settings.mode === "external_link" && settings.externalUrl.trim().length > 0;

  async function handleNotify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (showEmail && !trimmedEmail) return;
    if (showPhone && !trimmedPhone) return;
    if (showPhone && !phonePattern.test(trimmedPhone)) {
      setSubmitError(t("workshop.invalidPhone"));
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    try {
      await saveWorkshopEntry({
        ...(showEmail ? { email: trimmedEmail } : {}),
        ...(showPhone ? { phone: trimmedPhone } : {}),
        submittedAt: new Date().toISOString(),
      });
      setSent(true);
      setEmail("");
      setPhone("");
    } catch {
      setSubmitError(t("workshop.error"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="workshop" className="relative overflow-hidden bg-[#fcf9f7]">
      <div className="section-container section-pad">
        <SectionHeading title={content.sectionTitle} />

        <motion.div
          className="mx-auto mt-10 max-w-3xl rounded-shell border border-[#efe8e5] bg-white p-8 text-center shadow-card md:mt-12 md:p-14"
          initial={initial}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.06 }}
        >
          <h2 className="text-ink-warm">{content.cardTitle}</h2>
          <h6 className="text-french-rose">{content.badge}</h6>
          <p className="p1-r mx-auto mt-4 max-w-lg text-ink-warm/75">{content.description}</p>
          <ul className="mx-auto mt-8 inline-block max-w-md space-y-3 text-start">
            {content.bullets.map((bullet, i) => (
              <motion.li
                key={`${bullet}-${i}`}
                initial={initial}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="flex items-start gap-3"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-french-rose" />
                <span className="p1-r text-ink-warm/80">{bullet}</span>
              </motion.li>
            ))}
          </ul>

          {isExternalLink ? (
            <motion.div
              initial={initial}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="mx-auto mt-8"
            >
              <a
                href={settings.externalUrl.trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-french-rose px-8 py-3 font-semibold text-white shadow-pink transition-all hover:bg-french-rose-shade1 focus:outline-none focus:ring-2 focus:ring-french-rose focus:ring-offset-2"
              >
                {content.externalLinkText}
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
              </a>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleNotify}
              initial={initial}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="mx-auto mt-6 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center"
            >
              {showEmail ? (
                <label htmlFor="workshop-email" className="sr-only">
                  {t("workshop.emailLabel")}
                </label>
              ) : null}
              {showEmail ? (
                <input
                  id="workshop-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={content.emailPlaceholder}
                  className="min-h-[44px] flex-1 rounded-full border border-[#e8dfe4] bg-white px-5 text-sm text-ink-warm outline-none transition-all focus:border-french-rose/60 focus:ring-2 focus:ring-french-rose/20 sm:min-w-[220px]"
                />
              ) : null}

              {showPhone ? (
                <label htmlFor="workshop-phone" className="sr-only">
                  {t("workshop.phoneLabel")}
                </label>
              ) : null}
              {showPhone ? (
                <input
                  id="workshop-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={content.phonePlaceholder}
                  className="min-h-[44px] flex-1 rounded-full border border-[#e8dfe4] bg-white px-5 text-sm text-ink-warm outline-none transition-all focus:border-french-rose/60 focus:ring-2 focus:ring-french-rose/20 sm:min-w-[220px]"
                />
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-french-rose px-8 py-3 font-semibold text-white shadow-pink transition-all hover:bg-french-rose-shade1 focus:outline-none focus:ring-2 focus:ring-french-rose focus:ring-offset-2"
              >
                {isSubmitting ? t("workshop.saving") : content.buttonText}
              </button>
            </motion.form>
          )}

          {sent ? <p className="p2-r mt-3 text-french-rose">{content.thanksMessage}</p> : null}
          {submitError ? <p className="p2-r mt-3 text-rose-600">{submitError}</p> : null}
        </motion.div>
      </div>
    </section>
  );
}
