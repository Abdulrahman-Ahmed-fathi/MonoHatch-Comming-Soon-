import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const cards = [
  {
    title: "Doctors & Healthcare Providers",
    lines: [
      "Join our clinical network and provide expert guidance to women who need it most. Shape evidence-based features from the inside.",
    ],
  },
  {
    title: "Brands & Communities",
    lines: [
      "Partner with a platform that reaches engaged, health-conscious women. Align your brand with a mission that matters.",
    ],
  },
  {
    title: "Investors",
    lines: [
      "Be part of one of the most underfunded and highest-impact sectors in emerging markets - women's digital health in MENA & Africa.",
    ],
  },
];

const collaborationOptions = [
  "Doctors & Healthcare Providers",
  "Brands & Communities",
  "Investors",
  "Clinical validation & review",
];

export default function PartnerWithUsSection() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.98 };

  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    organization: "",
    role: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    website: "",
    brief: "",
    collaborationTypes: [] as string[],
  });

  const handleInputChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckbox = (option: string) => {
    setForm((prev) => {
      const alreadySelected = prev.collaborationTypes.includes(option);
      return {
        ...prev,
        collaborationTypes: alreadySelected
          ? prev.collaborationTypes.filter((item) => item !== option)
          : [...prev.collaborationTypes, option],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim()) {
      return;
    }

    setSubmitted(true);

    import("@/lib/formStorage").then(({ savePartnerEntry }) => {
      savePartnerEntry({
        ...form,
        submittedAt: new Date().toISOString(),
      });
    });
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      setSubmitted(false);
      setForm({
        fullName: "",
        organization: "",
        role: "",
        email: "",
        phone: "",
        specialization: "",
        experience: "",
        website: "",
        brief: "",
        collaborationTypes: [],
      });
    }
    setOpen(value);
  };

  return (
    <section id="partner" className="bg-white">
      <div className="section-container section-pad">
        <SectionHeading title="Partner With Mono Hatch" subtitle="Join us in building the future of women's health." />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {cards.map((c, idx) => (
            <motion.div
              key={c.title}
              initial={initial}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: idx * 0.07 }}
              className="relative overflow-hidden rounded-shell border border-[#efe8e5] bg-white p-7 shadow-card"
            >
              <p className="text-xs font-semibold tracking-[0.16em] text-french-rose/70">{String(idx + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-xl font-semibold text-ink-warm md:text-2xl">{c.title}</h3>
              <p className="p2-r mt-3 text-ink-warm/75">{c.lines[0]}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-14 text-center md:mt-16"
          initial={initial}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, delay: 0.06 }}
        >
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <button className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-french-rose px-10 py-3.5 text-base font-semibold text-white shadow-pink transition-all hover:bg-french-rose-shade1 focus:outline-none focus:ring-2 focus:ring-french-rose focus:ring-offset-2 motion-safe:animate-pulseGlow md:px-12 md:py-4 md:text-lg">
                Collaborate With Us
              </button>
            </DialogTrigger>
            <DialogContent className="bg-white p-4 md:p-6 lg:p-8 rounded-3xl w-[min(100vw-1rem,48rem)] max-h-[90vh] overflow-y-auto">
              {!submitted ? (
                <>
                  <DialogHeader className="text-center md:text-left">
                    <DialogTitle className="text-lg md:text-xl">Partner Collaboration Request</DialogTitle>
                    <DialogDescription className="text-sm md:text-base">
                      Please fill in your details and we&apos;ll get back to you within 24-48 hours.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="mt-4 md:mt-6 space-y-4 md:space-y-5">
                    <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-2">
                      <label className="space-y-1 text-sm">
                        <span className="font-medium">Full Name</span>
                        <input
                          value={form.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          required
                          className="w-full rounded-xl border border-rose-200 px-3 py-2.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </label>
                      <label className="space-y-1 text-sm">
                        <span className="font-medium">Organization / Clinic Name</span>
                        <input
                          value={form.organization}
                          onChange={(e) => handleInputChange("organization", e.target.value)}
                          className="w-full rounded-xl border border-rose-200 px-3 py-2.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-2">
                      <label className="space-y-1 text-sm">
                        <span className="font-medium">Role / Title</span>
                        <input
                          value={form.role}
                          onChange={(e) => handleInputChange("role", e.target.value)}
                          className="w-full rounded-xl border border-rose-200 px-3 py-2.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </label>
                      <label className="space-y-1 text-sm">
                        <span className="font-medium">Email Address</span>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                          className="w-full rounded-xl border border-rose-200 px-3 py-2.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-2">
                      <label className="space-y-1 text-sm">
                        <span className="font-medium">Phone Number</span>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                          className="w-full rounded-xl border border-rose-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </label>
                      <label className="space-y-1 text-sm">
                        <span className="font-medium">Specialization (for doctors)</span>
                        <input
                          value={form.specialization}
                          onChange={(e) => handleInputChange("specialization", e.target.value)}
                          className="w-full rounded-xl border border-rose-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-2">
                      <label className="space-y-1 text-sm">
                        <span className="font-medium">Years of Experience</span>
                        <input
                          type="text"
                          value={form.experience}
                          onChange={(e) => handleInputChange("experience", e.target.value)}
                          className="w-full rounded-xl border border-rose-200 px-3 py-2.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </label>
                      <label className="space-y-1 text-sm">
                        <span className="font-medium">Website / Social media page (if present)</span>
                        <input
                          type="url"
                          value={form.website}
                          onChange={(e) => handleInputChange("website", e.target.value)}
                          className="w-full rounded-xl border border-rose-200 px-3 py-2.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </label>
                    </div>

                    <fieldset className="space-y-3">
                      <legend className="text-sm font-medium">Type of Collaboration</legend>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {collaborationOptions.map((option) => (
                          <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                              type="checkbox"
                              checked={form.collaborationTypes.includes(option)}
                              onChange={() => handleCheckbox(option)}
                              className="h-4 w-4 rounded border-rose-300 text-french-rose focus:ring-french-rose"
                            />
                            <span className="text-sm md:text-base">{option}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <label className="space-y-1 text-sm">
                      <span className="font-medium">Collaboration Brief</span>
                      <textarea
                        value={form.brief}
                        onChange={(e) => handleInputChange("brief", e.target.value)}
                        rows={4}
                        placeholder="Tell us about your collaboration ideas..."
                        className="w-full rounded-xl border border-rose-200 px-3 py-2.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
                      />
                    </label>

                    <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-3">
                      <DialogClose asChild>
                        <button type="button" className="w-full sm:w-auto rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-400">
                          Cancel
                        </button>
                      </DialogClose>
                      <button
                        type="submit"
                        className="w-full sm:w-auto rounded-xl bg-french-rose px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-french-rose-shade1 focus:outline-none focus:ring-2 focus:ring-french-rose focus:ring-offset-2"
                      >
                        Submit Request
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-6 md:py-8">
                  <div className="mx-auto mb-4 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-french-rose/10 text-french-rose">
                    <CheckCircle2 className="h-8 w-8 md:h-10 md:w-10" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-ink-warm">Thank you for your interest!</h3>
                  <p className="mt-2 text-sm md:text-base text-ink-warm/75 px-4">
                    Your collaboration request has been received. Our team will review your information and contact you soon.
                  </p>
                  <div className="mt-6">
                    <DialogClose className="w-full sm:w-auto rounded-xl bg-french-rose px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-french-rose-shade1 focus:outline-none focus:ring-2 focus:ring-french-rose focus:ring-offset-2">
                      Close
                    </DialogClose>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </section>
  );
}
