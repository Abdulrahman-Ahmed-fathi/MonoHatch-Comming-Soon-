import { motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  Building2,
  Handshake,
  Rocket,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const milestoneKeys = [
  "foundation",
  "community",
  "content",
  "collaborations",
  "programs",
  "validation",
] as const;

const milestoneIcons = {
  foundation: Building2,
  community: Users,
  content: BookOpen,
  collaborations: Handshake,
  programs: Rocket,
  validation: ShieldCheck,
} as const;

const wideMilestoneIndices = new Set([0, 3]);

export default function ImpactSection() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.98 };

  return (
    <section id="impact" className="bg-[#fbf7f7]">
      <div className="section-container section-pad">
        <SectionHeading title={t("impact.title")} subtitle={t("impact.subtitle")} />

        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          {milestoneKeys.map((key, idx) => {
            const Icon = milestoneIcons[key];
            const isWide = wideMilestoneIndices.has(idx);

            return (
              <motion.div
                key={key}
                initial={initial}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.28 }}
                transition={{ duration: 0.65, delay: idx * 0.06 }}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                className={cn("flex h-full", isWide && "lg:col-span-2")}
              >
                <div
                  className={cn(
                    "flex h-full w-full flex-col rounded-shell border border-[#efe8e5] bg-white p-7 shadow-card",
                    isWide && "lg:flex-row lg:items-start lg:gap-6 lg:p-8"
                  )}
                >
                  <div
                    className={cn(
                      "mb-5 flex shrink-0 items-center justify-center rounded-2xl bg-french-rose/10",
                      isWide ? "h-11 w-11 lg:mb-0 lg:h-12 lg:w-12" : "h-11 w-11"
                    )}
                  >
                    <Icon
                      className={cn(
                        "text-french-rose",
                        isWide ? "h-5 w-5 lg:h-6 lg:w-6" : "h-5 w-5"
                      )}
                      aria-hidden
                    />
                  </div>
                  <div className={cn("flex min-w-0 flex-1 flex-col", isWide && "lg:justify-center")}>
                    <h4
                      className={cn(
                        "text-lg font-semibold leading-snug text-ink-warm",
                        isWide && "lg:text-xl"
                      )}
                    >
                      {t(`impact.milestones.${key}.title`)}
                    </h4>
                    <p
                      className={cn(
                        "p2-r mt-2 flex-1 leading-relaxed text-ink-warm/70",
                        isWide && "lg:p1-r"
                      )}
                    >
                      {t(`impact.milestones.${key}.body`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-12 flex justify-center md:mt-16"
          initial={initial}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          <p className="inline-block rounded-full border border-french-rose/20 bg-french-rose/8 px-8 py-4 text-center text-xl font-semibold italic text-french-rose md:text-2xl">
            &quot;{t("impact.closing")}&quot;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
