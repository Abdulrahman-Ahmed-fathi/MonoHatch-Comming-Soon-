import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function FreeTrialSection() {
  const { t, i18n } = useTranslation();
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.98 };
  const isRtl = i18n.language === "ar";
  const Arrow = isRtl ? ArrowRight : ArrowRight;

  const bullets = t("freeTrialSection.bullets", { returnObjects: true }) as string[];

  return (
    <section id="free-trial" className="bg-[#fcf9f7]">
      <div className="section-container section-pad">
        <motion.div
          className="relative overflow-hidden rounded-shell border border-[#efe8e5] bg-white p-8 shadow-card md:p-12"
          initial={initial}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-french-rose to-mulberry" />
          <div className="pointer-events-none absolute -right-24 top-12 h-56 w-56 rounded-full bg-french-rose/10 blur-[90px]" />
          <div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-mulberry/10 blur-[90px]" />

          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
            <div>
              <p className="p2-b tracking-[0.18em] text-ink-warm/55">{t("freeTrialSection.label")}</p>
              <h2 className="mt-2 text-ink-warm">{t("freeTrialSection.title")}</h2>
              <p className="p1-r mt-4 max-w-2xl text-ink-warm/75">{t("freeTrialSection.description")}</p>

              <motion.ul
                className="mt-7 space-y-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                {bullets.map((b, i) => (
                  <motion.li
                    key={b}
                    className="p1-b text-ink-warm"
                    initial={initial}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, delay: i * 0.06 }}
                  >
                    <span className="me-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-french-rose/10 text-french-rose">
                      ✓
                    </span>
                    {b}
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <motion.div
              className="flex flex-col items-center justify-center rounded-shell border border-[#efe8e5] bg-[#fff9fb]/90 p-8 text-center shadow-card backdrop-blur-sm md:p-10"
              initial={initial}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.12 }}
            >
              <motion.div whileHover={reduceMotion ? undefined : { scale: 1.03 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }}>
                <Link
                  to="/register"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-french-rose px-10 py-4 text-base font-semibold text-white shadow-pink transition-all hover:bg-french-rose-shade1 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-french-rose focus:ring-offset-2"
                >
                  {t("freeTrialSection.cta")}
                  <Arrow className={`h-5 w-5 ${isRtl ? "rotate-180" : ""}`} aria-hidden />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <p className="p3-r relative mt-5 text-ink-warm/50">{t("freeTrialSection.privacy")}</p>
        </motion.div>
      </div>
    </section>
  );
}
