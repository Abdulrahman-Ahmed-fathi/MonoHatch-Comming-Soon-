import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import LandingCard from "@/components/ui/card";

const milestones = [
  {
    title: "Foundation Built",
    body: "Built a strong foundation for a women's health platform.",
  },
  {
    title: "Community Growing",
    body: "Developed a growing community of engaged users and supporters.",
  },
  {
    title: "Educational Content Created",
    body: "Created educational content focused on women's well-being.",
  },
  {
    title: "Sector Collaborations",
    body: "Started collaborations with partners in health and community sectors.",
  },
  {
    title: "Entrepreneurship Programs",
    body: "Participated at: Creative Before Incubation, Flat6Labs, Orange Corners Egypt, and LSL.",
  },
  {
    title: "Clinical Validation",
    body: "Completed clinical validation with the Faculty of Nursing, Damanhour University to ensure medical accuracy.",
  },
];

export default function ImpactSection() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.98 };

  return (
    <section id="impact" className="bg-[#fbf7f7]">
      <div className="section-container section-pad">
        <SectionHeading
          title="Our Impact & Attraction"
          subtitle="Milestones that define our journey."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {milestones.map((m, idx) => (
            <motion.div
              key={m.title}
              initial={initial}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.65, delay: idx * 0.06 }}
            >
              <LandingCard hover className="min-h-[180px]">
                <div className="mt-5 h-px w-full bg-french-rose/20" />

                <h4 className="mt-4 text-ink-warm">{m.title}</h4>
                <p className="p2-r mt-2 text-ink-warm/70">{m.body}</p>
              </LandingCard>
            </motion.div>
          ))}
        </div>

        <motion.h3
          className="mt-12 text-center text-xl font-semibold italic text-french-rose md:mt-16 md:text-2xl"
          initial={initial}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          &quot;We are just getting started.&quot;
        </motion.h3>
      </div>
    </section>
  );
}
