import { motion, useReducedMotion } from "framer-motion";

const socials = [
  {
    text: "Instagram @monohatch",
    href: "https://instagram.com/monohatch",
  },
  {
    text: "LinkedIn MonoHatch",
    href: "https://linkedin.com/company/monohatch",
  },
  {
    text: "Email hello@monohatch.com",
    href: "mailto:hello@monohatch.com",
  },
];

export default function StayConnectedSection() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.98 };

  return (
    <section id="stay-connected" className="bg-white">
      <div className="section-container section-pad">
        <motion.p
          className="p2-b text-center tracking-[0.18em] text-ink-warm/55"
          initial={initial}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          07 — STAY CONNECTED
        </motion.p>
        <motion.h2
          className="mt-3 text-center text-ink-warm"
          initial={initial}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, delay: 0.08 }}
        >
          Follow the journey.
        </motion.h2>
        <motion.p
          className="p1-r mx-auto mt-4 max-w-2xl text-center text-ink-warm/75"
          initial={initial}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          We build in public. Stay connected for updates, behind-the-scenes insight,
          and early access announcements.
        </motion.p>

        <motion.div
          className="mx-auto mt-8 max-w-2xl rounded-shell border border-[#efe8e5] bg-[#fcf9f7] p-7 md:p-10"
          initial={initial}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.06 }}
        >
          <div className="flex flex-col gap-4 text-center">
            {socials.map((s, i) => (
              <motion.a
                key={s.href}
                href={s.href}
                initial={initial}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                target={s.href.startsWith("https://") ? "_blank" : undefined}
                rel={s.href.startsWith("https://") ? "noreferrer" : undefined}
                className="p1-b text-french-rose hover:underline"
              >
                {s.text}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
