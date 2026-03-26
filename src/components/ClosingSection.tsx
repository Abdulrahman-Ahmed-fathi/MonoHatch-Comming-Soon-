import { motion, useReducedMotion } from "framer-motion";

export default function ClosingSection() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.98 };

  return (
    <section className="relative overflow-hidden bg-[#fcf9f7] py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-french-rose/6 to-transparent" />
      <div className="section-container mx-auto max-w-3xl text-center">
        <motion.p
          className="p1-b mb-5 uppercase tracking-[0.2em] text-ink-warm/50 md:mb-6"
          initial={initial}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          THIS IS THE BEGINNING
        </motion.p>
        <motion.p
          className="text-3xl font-semibold leading-tight text-ink-warm md:text-5xl"
          initial={initial}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.08 }}
        >
          Mono Hatch is more than a platform - it&apos;s a vision.
        </motion.p>
        <div className="mx-auto my-8 h-0.5 w-24 rounded-full bg-french-rose/40 md:my-10" />
        <motion.p
          className="p1-r mx-auto max-w-xl text-ink-warm/75"
          initial={initial}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          A vision to transform women&apos;s health understanding and experience. Join
          us in making it real.
        </motion.p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 md:mt-10 md:gap-4">
          <motion.a
            href="#free-trial"
            initial={initial}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-french-rose px-8 py-3.5 font-semibold text-white shadow-pink transition-all hover:bg-french-rose-shade1 focus:outline-none focus:ring-2 focus:ring-french-rose focus:ring-offset-2 focus:ring-offset-peach-blossom"
          >
            Start Your Free Trial
          </motion.a>
          <motion.a
            href="#about"
            initial={initial}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.14 }}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-french-rose/45 bg-white/50 px-8 py-3.5 font-semibold text-french-rose backdrop-blur-sm transition-all hover:bg-white focus:outline-none focus:ring-2 focus:ring-french-rose focus:ring-offset-2 focus:ring-offset-peach-blossom"
          >
            Learn More
          </motion.a>
        </div>
      </div>
    </section>
  );
}
