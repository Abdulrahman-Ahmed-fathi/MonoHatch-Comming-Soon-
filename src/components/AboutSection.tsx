import { motion, useReducedMotion } from "framer-motion";
import { Brain, Eye, Heart, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeading from "@/components/ui/SectionHeading";

const pillarKeys = ["physical", "mental", "awareness", "growth"] as const;
const pillarIcons = { physical: Heart, mental: Brain, awareness: Eye, growth: TrendingUp };

export default function AboutSection() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.98 };

  return (
    <section id="about" className="relative overflow-hidden bg-[#fbf7f7]">
      <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-french-rose/6 blur-[90px]" />
      <div className="section-container section-pad">
        <SectionHeading title={t("about.title")} />
        <p className="p1-r mx-auto max-w-3xl text-start text-ink-warm/80 md:text-center">
          {t("about.intro")}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {pillarKeys.map((key, i) => {
            const Icon = pillarIcons[key];
            return (
              <motion.div
                key={key}
                initial={initial}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                className="rounded-shell border border-[#efe8e5] bg-white p-8 shadow-card"
              >
                <div className="h-[3px] w-10 rounded-full bg-french-rose/80" />
                <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-french-rose/10">
                  <Icon className="h-6 w-6 text-french-rose" aria-hidden />
                </div>
                <h4 className="mt-4 text-start text-lg font-semibold text-ink-warm">
                  {t(`about.pillars.${key}.title`)}
                </h4>
                <p className="p2-r mt-2 text-start leading-relaxed text-ink-warm/70">
                  {t(`about.pillars.${key}.body`)}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="relative mt-16 overflow-hidden rounded-shell border border-[#efe8e5] bg-gradient-to-br from-french-rose/10 via-pastel-rose/20 to-lavender-mist/20 p-10 text-center shadow-card md:mt-20 md:p-16"
          initial={initial}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-french-rose/10 blur-2xl" />
          <h2 className="relative z-10 mx-auto max-w-3xl text-[28px] font-semibold italic leading-[125%] text-ink-warm md:text-[32px]">
            &quot;{t("about.quote")}&quot;
          </h2>
          <div className="relative z-10 mx-auto mt-6 h-0.5 w-16 rounded-full bg-french-rose" />
        </motion.div>
      </div>
    </section>
  );
}
