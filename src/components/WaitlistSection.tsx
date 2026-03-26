import { FormEvent, useState } from "react";
import Button from "./ui/Button";

type Status = "idle" | "loading" | "success";

export default function WaitlistSection() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 1500);
  };

  return (
    <section id="waitlist" className="bg-white px-4 py-16 md:px-8 md:py-24 lg:px-16 xl:px-24">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl bg-[var(--rose-gradient)] p-8 text-white">
          <div className="absolute -right-12 -top-10 h-40 w-40 rounded-full bg-rose-800/50" />
          <h3 className="font-display text-4xl">Join the First 100 Users</h3>
          <p className="mt-4 text-rose-100">
            Be among the first to experience MonoHatch. Get early access, exclusive features, and help shape the future of women&apos;s health.
          </p>
          <ol className="mt-6 list-decimal space-y-3 pl-5">
            <li>Early access to the app</li>
            <li>Exclusive features &amp; offers</li>
            <li>Help shape the future of women&apos;s health</li>
          </ol>
        </div>
        <form onSubmit={onSubmit} className="rounded-3xl border border-rose-100 bg-white p-8 shadow-xl">
          <h3 className="font-display text-3xl text-rose-900">Secure Your Spot</h3>
          <div className="mt-6 space-y-4">
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" type="text" required className="w-full rounded-xl border border-rose-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" type="email" required className="w-full rounded-xl border border-rose-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+20 _ _ _ _ _ _ _ _ _ _" type="tel" required className="w-full rounded-xl border border-rose-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2" aria-label="Phone Number (WhatsApp enabled)" />
          </div>
          <Button type="submit" className="mt-6 w-full" disabled={status === "loading"}>
            {status === "loading" ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Loading...
              </span>
            ) : (
              "Join Now"
            )}
          </Button>
          {status === "success" ? <p className="mt-4 text-sm text-rose-700">✓ You&apos;re on the list! We&apos;ll be in touch soon.</p> : null}
          <p className="mt-4 text-xs text-gray-500">
            We&apos;ll notify you as soon as the app is ready and keep you updated with exclusive offers and early access opportunities.
          </p>
        </form>
      </div>
    </section>
  );
}
