import { motion, useReducedMotion } from "framer-motion";
import { Heart, Brain, Eye, TrendingUp } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import LandingCard from "@/components/ui/card";

const pillars = [
  {
    title: "Physical Health",
    body: "Comprehensive tools to track and improve your physical well-being at every life stage.",
    icon: Heart,
  },
  {
    title: "Mental Well-being",
    body: "Resources and guidance to support emotional resilience and mental wellness.",
    icon: Brain,
  },
  {
    title: "Self-Awareness",
    body: "Learn to understand your body, cycles, and signals through education and tracking.",
    icon: Eye,
  },
  {
    title: "Personal Growth",
    body: "A community and content library that supports your journey of becoming your best self.",
    icon: TrendingUp,
  },
];

export default function AboutSection() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.98 };

  return (
    <section id="about" className="relative overflow-hidden bg-[#fbf7f7]">
      <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-french-rose/6 blur-[90px]" />
      <div className="section-container section-pad">
        <SectionHeading title="Who We Are" />
        <p className="p1-r mx-auto max-w-3xl text-center text-ink-warm/80">
          Mono Hatch is a HealthTech-driven women&apos;s health platform designed to
          support women across life stages. It positions health as more than medical
          care - including awareness, mindset, community, and ongoing support.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={initial}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
            >
              <LandingCard hover className="text-center">
                <div className="mb-3 flex items-center justify-center gap-2">
                  <p.icon className="h-6 w-6 text-french-rose" />
                  <h4 className="text-ink-warm">{p.title}</h4>
                </div>
                <p className="p2-r mt-2 text-ink-warm/70">{p.body}</p>
              </LandingCard>
            </motion.div>
          ))}
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
            &quot;To build a future where every girl and woman has access to the
            knowledge, tools, and support she needs to live a healthy, confident, and
            empowered life.&quot;
          </h2>
          <div className="relative z-10 mx-auto mt-6 h-0.5 w-16 rounded-full bg-french-rose" />
        </motion.div>
      </div>
    </section>
  );
}
