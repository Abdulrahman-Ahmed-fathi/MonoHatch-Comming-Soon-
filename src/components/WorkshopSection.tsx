import { type FormEvent, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const bullets = [
  "Build confidence and self-esteem",
  "Join a supportive, empowering community",
  "Learn about personal growth and independence",
  "Take steps toward self-development",
  "Understand your physical and mental health",
];

export default function WorkshopSection() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.98 };
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleNotify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSent(true);

    import("@/lib/formStorage").then(({ saveWorkshopEntry }) => {
      saveWorkshopEntry({
        email,
        submittedAt: new Date().toISOString(),
      });
    });
  }

  return (
    <section
      id="workshop"
      className="relative overflow-hidden bg-[#fcf9f7]"
    >
      <div className="section-container section-pad">
        <SectionHeading title="Our Workshop" />

        <motion.div
          className="mx-auto mt-10 max-w-3xl rounded-shell border border-[#efe8e5] bg-white p-8 text-center shadow-card md:mt-12 md:p-14"
          initial={initial}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.06 }}
        >
          <h2 className="text-ink-warm">Our First Workshop</h2>
          <h6 className="text-french-rose">COMING SOON</h6>
          <p className="p1-r mx-auto mt-4 max-w-lg text-ink-warm/75">
            The first Mono Hatch workshop for confidence building, personal growth,
            and better health awareness - designed for women, by women.
          </p>
          <ul className="mx-auto mt-8 inline-block max-w-md space-y-3 text-left">
            {bullets.map((b, i) => (
              <motion.li
                key={b}
                initial={initial}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="flex items-start gap-3"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-french-rose" />
                <span className="p1-r text-ink-warm/80">{b}</span>
              </motion.li>
            ))}
          </ul>
          <motion.form
            onSubmit={handleNotify}
            initial={initial}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="mx-auto mt-6 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="workshop-email" className="sr-only">
              Email address
            </label>
            <input
              id="workshop-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="min-h-[44px] flex-1 rounded-full border border-[#e8dfe4] bg-white px-5 text-sm text-ink-warm outline-none transition-all focus:border-french-rose/60 focus:ring-2 focus:ring-french-rose/20"
            />
            <button
              type="submit"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-french-rose px-8 py-3 font-semibold text-white shadow-pink transition-all hover:bg-french-rose-shade1 focus:outline-none focus:ring-2 focus:ring-french-rose focus:ring-offset-2"
            >
              Notify Me
            </button>
          </motion.form>
          {sent ? (
            <p className="p2-r mt-3 text-french-rose">Thanks! We will notify you soon.</p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
