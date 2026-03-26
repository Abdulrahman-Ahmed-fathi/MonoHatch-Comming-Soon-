import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import LandingCard from "@/components/ui/card";
import feature1 from "@/assets/a0624a28f882d825c34a2c7118a29ec746394154.png";
import feature2 from "@/assets/0f3a10257bed32c3a26ee1f6783f3662eb51bdf2.png";
import feature3 from "@/assets/936108b8e546f0f2f9bcc5ce6cd81943ededc284.png";
import feature4 from "@/assets/fefbc77bb31f09ce822dc4fe9cc5b55dfddd065c.png";

const items = [
  {
    title: "AI Medical Assistant",
    body: "Smart support, whenever she needs it.",
    image: feature1,
  },
  {
    title: "Medical Care Access",
    body: "Professional care within reach.",
    image: feature2,
  },
  {
    title: "Learn Section",
    body: "Health knowledge made simple.",
    image: feature3,
  },
  {
    title: "Smart Tracking",
    body: "Understand your body better every day.",
    image: feature4,
  },
];

export default function WhatWeOfferSection() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.98 };

  return (
    <section id="features" className="relative overflow-hidden bg-[#fbf7f7]">
      <div className="pointer-events-none absolute -right-20 top-16 h-72 w-72 rounded-full bg-mulberry/8 blur-[110px]" />
      <div className="section-container section-pad">
        <SectionHeading
          title="What We Offer"
          subtitle="powering your health journey."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={initial}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: i * 0.07 }}
              className="group"
            >
              <LandingCard hover className="h-full border border-white/40 bg-white/70 p-5 transition-all duration-300 hover:-translate-y-1">
                <div className="mb-5 h-32 overflow-hidden p-4">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-[#A02A65] group-hover:text-french-rose md:text-xl">
                  {item.title}
                </h3>
                <p className="p2-r mt-2 text-sm text-[#6F4A65]">{item.body}</p>
              </LandingCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 rounded-shell border border-[#efe8e5] bg-gradient-to-r from-french-rose/10 via-pastel-rose/20 to-mulberry/10 p-8 text-center shadow-card md:mt-12 md:p-10"
          initial={initial}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <h3 className="text-xl font-semibold italic text-ink-warm md:text-2xl">
            &quot;Mono Hatch is not just a digital platform — It&apos;s a movement
            empowering women through knowledge and community.&quot;
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
