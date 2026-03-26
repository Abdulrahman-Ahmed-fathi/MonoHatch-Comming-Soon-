import { motion, useReducedMotion } from "framer-motion";
import { Linkedin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const teamMembers = [
  {
    name: "Eman Mishref",
    role: "Founder & UI/UX Designer",
    image: "/uploads/Eman.jpg",
    linkedin: "https://www.linkedin.com/in/eman-mishref/",
  },
  {
    name: "Ahmed Algrgawy",
    role: "Project Manager & Co-founder",
    image: "/uploads/Ahmed.jpg",
    linkedin: "https://www.linkedin.com/in/ahmed-algrgawy/",
  },
  {
    name: "Yousef Abdelmaksod",
    role: "AI Engineer & Co-founder",
    image: "/uploads/Yousef.jpg",
    linkedin: "https://www.linkedin.com/in/youssefabdelmaksod/",
  },
  {
    name: "Abdulrahman Ahmed",
    role: "Backend Developer",
    image: "/uploads/Abdulrahman Ahmed.jpg",
    linkedin: "https://www.linkedin.com/in/abdulramanahmed/?locale=en_US",
  },
  {
    name: "Abdulrahman Abass",
    role: "Full Stack Developer",
    image: "/uploads/Abass.jpg",
    linkedin: "https://www.linkedin.com/in/abdelrahman-abass/",
  },
  {
    name: "Amira Heider",
    role: "Chief Marketing Organizer",
    image: "/uploads/Amira.jpg",
    linkedin: "https://www.linkedin.com/in/amira-heider-868314275/",
  },
  {
    name: "Sara Soliman",
    role: "Flutter Developer",
    image: "/uploads/Sara.jpeg",
    linkedin: "https://www.linkedin.com/in/sara-soliman233/",
  },
  {
    name: "Mirna Tarek",
    role: "Flutter Developer",
    image: "/uploads/Merna.jpg",
    linkedin: "https://www.linkedin.com/in/mirna-tarek?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Jihad Salim",
    role: "Graphic Designer, Video Editor",
    image: "/uploads/Jehad.jpg",
    linkedin: "https://www.linkedin.com/in/jihad-salim-74805437a/",
  },
  {
    name: "Mazen Mohamed",
    role: "UI/UX Designer",
    image: "/uploads/mazen.jpg",
    linkedin: "https://www.linkedin.com/in/mazen-mohammeed/",
  },
];

export default function TeamSection() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.98 };

  return (
    <section id="team" className="bg-[#fcf9f7]">
      <div className="section-container section-pad">
        <SectionHeading
          title="Our Team"
          subtitle="The people building the future of women's health."
        />

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
                    target.src = "https://via.placeholder.com/80x80?text=" + encodeURIComponent(member.name.split(" ").map((p) => p[0]).join(""));
                  }}
                />
              </div>
              <h4 className="text-ink-warm">{member.name}</h4>
              <p className="p2-r mt-1 text-ink-warm/70">{member.role}</p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-french-rose hover:underline"
              >
                <Linkedin className="h-4 w-4" aria-hidden />
                LinkedIn
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
