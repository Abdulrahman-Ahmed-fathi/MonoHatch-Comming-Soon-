import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Facebook, Instagram } from "lucide-react";
import { SiLinkedin, SiTiktok } from "react-icons/si";
import logoUrl from "@/assets/logo.png";
import { saveStayTunedEntry } from "@/lib/formStorage";

export default function Footer() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.98 };

  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState("");

  const handleSubscribe = () => {
    if (!subscribeEmail.trim()) {
      setSubscribeStatus("Please enter a valid email address.");
      return;
    }

    saveStayTunedEntry({
      email: subscribeEmail.trim(),
      submittedAt: new Date().toISOString(),
    });
    setSubscribeStatus("Thanks! You are subscribed.");
    setSubscribeEmail("");

    setTimeout(() => setSubscribeStatus(""), 3000);
  };

  return (
    <footer id="footer" className="bg-gradient-to-r from-[#FFBD9F] via-[#FCCFC0] to-[#E1C9ED] text-[#3F2A35]">
      <motion.div
        className="section-container py-14"
        initial={initial}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.22 }}
        transition={{ duration: 0.7, delay: 0.05 }}
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logoUrl} alt="Mono Hatch" className="h-20 w-auto" />
              <span className="text-2xl font-bold text-french-rose">Mono Hatch</span>
            </div>
            <p className="text-sm text-[#4B3A44] opacity-90">
              MonoHatch is a digital health platform designed to support adolescent girls and mothers through AI-powered guidance, smart health tracking, and trusted medical care.
            </p>
            <div className="mt-5 flex gap-2">
              <a
                href="https://www.facebook.com/share/1BfhzBoYdF/"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-[#FF5A85] hover:bg-white"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/monohatch?igsh=MThmbXFwcHNob2tqZg=="
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-[#FF5A85] hover:bg-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/mono-hatch/"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-[#FF5A85] hover:bg-white"
              >
                <SiLinkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@mono.hatch?_t=ZS-8xmAgFQkL3Z&_r=1"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-[#FF5A85] hover:bg-white"
              >
                <SiTiktok className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Explore More</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li><a href="#about" className="hover:underline">About Us</a></li>
              <li><a href="#partner" className="hover:underline">Partnerships</a></li>
              <li><a href="#team" className="hover:underline">Our Team</a></li>
              <li><a href="#partner" className="hover:underline">Validations</a></li>
              <li><a href="#contact" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Download Links </h4>
            <h6 className="text-french-rose">coming soon</h6>
            {/* <ul className="space-y-2 text-sm font-medium">
              <li><a href="#" className="hover:underline">Google Play</a></li>
              <li><a href="#" className="hover:underline">App Store</a></li>
              <li><a href="#" className="hover:underline">Direct Link</a></li>
            </ul> */}
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Stay Tuned And Updated</h4>
            <p className="text-sm text-[#4B3A44] opacity-90 mb-3">Enter your email to be notified about our news.</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                placeholder="Enter Your E-mail"
                className="w-full rounded-full border border-white/60 bg-white/70 px-4 py-2 text-sm text-[#362B34] outline-none focus:border-french-rose focus:ring focus:ring-french-rose/30"
              />
              <button
                type="button"
                onClick={handleSubscribe}
                className="rounded-full bg-french-rose px-5 py-2 text-sm font-semibold text-white hover:bg-[#ff5688] transition"
              >
                Subscribe
              </button>
            </div>
            {subscribeStatus ? (
              <p className="mt-2 text-sm text-white/90">{subscribeStatus}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-10 border-t border-white/45 pt-4 text-center text-sm text-[#4B3A44] opacity-90">
          © 2026 Mono Hatch. All rights reserved.
        </div>
      </motion.div>
    </footer>
  );
}
