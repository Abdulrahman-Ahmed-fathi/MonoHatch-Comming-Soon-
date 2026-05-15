import heroBgUrl from "@/assets/herosectionbackground.png";
import LandingBadge from "@/components/ui/badge";
import DownloadAppButton from "@/components/DownloadAppButton";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const delays = [0, 150, 300, 450, 600];

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section
      id="top"
      className="mesh-accent relative overflow-hidden bg-cover bg-center bg-no-repeat pt-28 md:pt-32"
      style={{ backgroundImage: `url(${heroBgUrl})` }}
    >
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-french-rose/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-16 top-32 h-72 w-72 rounded-full bg-mulberry/10 blur-[100px]" />
      <div className="pointer-events-none absolute left-1/2 top-16 h-24 w-24 -translate-x-1/2 rounded-full bg-white/70 blur-2xl" />

      <div className="section-container section-pad relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="order-1 lg:order-none">
          <div className="rounded-2xl border border-white/30 bg-white/10 p-6 backdrop-blur-xl shadow-2xl md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: delays[0] / 1000 }}
            >
              <LandingBadge>{t("hero.badge")}</LandingBadge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, delay: delays[1] / 1000 }}
              className="mt-5 text-white"
            >
              <span className="bg-gradient-to-r from-french-rose to-mulberry bg-clip-text text-transparent">
                {t("hero.headline")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: delays[2] / 1000 }}
              className="p1-r mt-6 max-w-lg text-slate-700/85"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: delays[3] / 1000 }}
              className="mt-8 flex flex-row flex-wrap items-start gap-3 sm:gap-4"
            >
              <DownloadAppButton size="md" />
              <a
                href="#footer"
                className="inline-flex items-center justify-center rounded-full border border-french-rose/40 bg-white px-8 py-3.5 font-semibold text-french-rose transition-all hover:border-french-rose/70 hover:bg-french-rose/5 focus:outline-none focus:ring-2 focus:ring-french-rose focus:ring-offset-2"
              >
                {t("hero.explore")}
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: delays[4] / 1000 }}
              className="p3-r mt-8 text-slate-700/70"
            >
              {t("hero.trustLine")}
            </motion.p>
          </div>
        </div>

        <div className="order-2 flex flex-col items-center lg:order-none" />
      </div>
    </section>
  );
}
