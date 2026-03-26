import { type FormEvent, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const bullets = [
  "- Early access to the app",
  "- Exclusive features & early offers",
  "- Help shape the future of women&apos;s health",
];

type SubmitStatus = "idle" | "loading" | "success";

export default function FreeTrialSection() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.98 };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading" || status === "success") return;

    setStatus("loading");
    window.setTimeout(() => {
      setStatus("success");
      import("@/lib/formStorage").then(({ saveFreeTrialEntry }) => {
        saveFreeTrialEntry({
          fullName: name,
          email,
          phone,
          submittedAt: new Date().toISOString(),
        });
      });
    }, 1100);
  }

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

          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <p className="p2-b tracking-[0.18em] text-ink-warm/55">FREE TRIAL</p>
              <h2 className="mt-2 text-ink-warm">Start Your Free Trial</h2>
              <p className="p1-r mt-4 max-w-2xl text-ink-warm/75">
                Be among the first to experience Mono Hatch with early access and
                exclusive features.
              </p>

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
                    <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-french-rose/10 text-french-rose">
                      ✓
                    </span>
                    {b.startsWith("- ") ? b.slice(2) : b}
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <motion.div
              className="rounded-shell border border-[#efe8e5] bg-[#fff9fb]/90 p-6 shadow-card backdrop-blur-sm md:p-7"
              initial={initial}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.12 }}
            >
              <h3 className="text-xl font-semibold text-ink-warm">Join the Waitlist</h3>
              <p className="p2-r mt-2 text-ink-warm/65">
                Fill in your details and we will contact you first.
              </p>

              {status === "success" ? (
                <div className="mt-5 rounded-xl border border-french-rose/25 bg-french-rose/10 px-4 py-3 text-sm font-medium text-french-rose">
                  You are in! Thanks for joining the waitlist.
                </div>
              ) : (
                <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
                  <label className="block">
                    <span className="p3-b mb-1.5 block text-ink-warm/70">Full Name</span>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-[#e8dfe4] bg-white px-4 py-3 text-sm text-ink-warm outline-none transition-all focus:border-french-rose/60 focus:ring-2 focus:ring-french-rose/20"
                    />
                  </label>
                  <label className="block">
                    <span className="p3-b mb-1.5 block text-ink-warm/70">Email</span>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-[#e8dfe4] bg-white px-4 py-3 text-sm text-ink-warm outline-none transition-all focus:border-french-rose/60 focus:ring-2 focus:ring-french-rose/20"
                    />
                  </label>
                  <label className="block">
                    <span className="p3-b mb-1.5 block text-ink-warm/70">Phone Number</span>
                    <input
                      type="tel"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="+20 1xx xxx xxxx"
                      className="w-full rounded-xl border border-[#e8dfe4] bg-white px-4 py-3 text-sm text-ink-warm outline-none transition-all focus:border-french-rose/60 focus:ring-2 focus:ring-french-rose/20"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="mt-2 inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-french-rose px-10 py-3.5 text-base font-semibold text-white shadow-pink transition-all hover:bg-french-rose-shade1 focus:outline-none focus:ring-2 focus:ring-french-rose focus:ring-offset-2 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-75"
                  >
                    {status === "loading" ? "Submitting..." : "Join Now"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          <p className="p3-r relative mt-5 text-ink-warm/50">
            No spam. Your data is safe with us.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
