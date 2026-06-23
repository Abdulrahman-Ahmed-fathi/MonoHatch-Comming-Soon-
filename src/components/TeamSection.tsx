import { motion, useReducedMotion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeading from "@/components/ui/SectionHeading";

const teamMembers = [
  { name: "Eman Mishref", roleKey: "eman", image: "/uploads/Eman.jpg", linkedin: "https://www.linkedin.com/in/eman-mishref/" },
  { name: "Ahmed Algrgawy", roleKey: "ahmed", image: "/uploads/Ahmed.jpg", linkedin: "https://www.linkedin.com/in/ahmed-algrgawy/" },
  { name: "Yousef Abdelmaksod", roleKey: "yousef", image: "/uploads/Yousef.jpg", linkedin: "https://www.linkedin.com/in/youssefabdelmaksod/" },
  { name: "Abdulrahman Ahmed", roleKey: "abdulrahmanAhmed", image: "/uploads/Abdulrahman Ahmed.jpg", linkedin: "https://www.linkedin.com/in/abdulramanahmed/?locale=en_US" },
  { name: "Abdulrahman Abass", roleKey: "abdulrahmanAbass", image: "/uploads/Abass.jpg", linkedin: "https://www.linkedin.com/in/abdelrahman-abass/" },
  { name: "Amira Heider", roleKey: "amira", image: "/uploads/Amira.jpg", linkedin: "https://www.linkedin.com/in/amira-heider-868314275/" },
  { name: "Sara Soliman", roleKey: "sara", image: "/uploads/Sara.jpeg", linkedin: "https://www.linkedin.com/in/sara-soliman233/" },
  { name: "Mirna Tarek", roleKey: "mirna", image: "/uploads/Merna.jpg", linkedin: "https://www.linkedin.com/in/mirna-tarek?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
] as const;

export default function TeamSection() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.98 };

  return (
    <section id="team" className="bg-[#fcf9f7]">
      <div className="section-container section-pad">
        <SectionHeading title={t("team.title")} subtitle={t("team.subtitle")} />

        <motion.div
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          initial={initial}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.65, delay: 0.05 }}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              initial={initial}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="rounded-shell border border-[#efe8e5] bg-white p-6 text-center shadow-card"
            >
              <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border border-rose-100 bg-slate-50">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.onerror = null;
                    target.src =
                      "https://via.placeholder.com/80x80?text=" +
                      encodeURIComponent(member.name.split(" ").map((p) => p[0]).join(""));
                  }}
                />
              </div>
              <h4 className="text-ink-warm">{member.name}</h4>
              <p className="p2-r mt-1 text-ink-warm/70">
                {t(`team.members.${member.roleKey}.role`)}
              </p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-french-rose hover:underline"
              >
                <Linkedin className="h-4 w-4" aria-hidden />
                {t("team.linkedin")}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
