import { Linkedin } from "lucide-react";

type TeamMember = {
  name: string;
  role?: string;
  photoUrl: string;
  linkedinUrl: string;
};

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const teamMembers: TeamMember[] = [
  // Replace with real team data
  {
    name: "Eman Mishref ",
    role: "Founder & UI/UX Designer",
    photoUrl: "uploads/Eman.jpg",
    linkedinUrl: "https://www.linkedin.com/in/eman-mishref/",
  },
  {
    name: "Ahmed Algrgawy",
    role: "Project Manager",
    photoUrl: "uploads/Ahmed.jpg",
    linkedinUrl: "https://www.linkedin.com/in/ahmed-algrgawy?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Abdulrahman Ahmed",
    role: "Backend Developer",
    photoUrl: "uploads/Abdulrahman Ahmed.jpg",
    linkedinUrl: "https://www.linkedin.com/in/abdulramanahmed/?locale=en_US",
  },
  {
    name: "Abdulrahman Abass",
    role: "Frontend Developer",
    photoUrl: "uploads/Abass.jpg",
    linkedinUrl: "https://www.linkedin.com/in/abdelrahman-abass/",
  },
  {
    name: "Yousef Abdelmaksod",
    role: "AI Engineer",
    photoUrl: "uploads/Yousef.jpg",
    linkedinUrl: "https://www.linkedin.com/in/youssefabdelmaksod",
  },
  {
    name: "Amira Heider",
    role: "Chief Marketing Organizer",
    photoUrl: "uploads/Amira.jpg",
    linkedinUrl: "https://www.linkedin.com/in/amira-heider-868314275?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Sara Soliman",
    role: "Flutter Developer",
    photoUrl: "uploads/Sara.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/sara-soliman233?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Mirna Tarek",
    role: "Flutter Developer",
    photoUrl: "uploads/Merna.jpg",
    linkedinUrl: "https://www.linkedin.com/in/mirna-tarek?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Jihad Salim",
    role: "Graphic Designer,Video Editor",
    photoUrl: "uploads/Jehad.jpg",
    linkedinUrl: "https://www.linkedin.com/in/jihad-salim-74805437a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
];

const TeamSection = () => {
  return (
    <section className="relative z-10 px-6 md:px-8 pb-6 md:pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-space font-bold text-gray-900 tracking-tight">Our Team</h2>
          <p className="mt-2 text-sm md:text-base text-gray-600">The people building Mono Hatch</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 items-stretch">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="group h-full rounded-2xl bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 ring-1 ring-gray-200 hover:ring-primary/40 shadow-sm hover:shadow-md transition-smooth p-5 md:p-6 flex flex-col items-center text-center"
            >
              <div className="relative">
                <img
                  src={withBase(member.photoUrl)}
                  alt={member.name}
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover ring-2 ring-white shadow-lg group-hover:scale-[1.03] transition-smooth"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 to-primary-glow/10 blur-md -z-10 scale-110" />
              </div>
              <div className="mt-4">
                <div className="font-semibold text-gray-900 break-words leading-snug">{member.name}</div>
                {member.role && (
                  <div className="text-xs md:text-sm text-gray-500 mt-0.5 break-words">{member.role}</div>
                )}
              </div>
              <div className="mt-4">
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/15 transition-smooth"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* subtle decorative glow */}
      <div className="pointer-events-none absolute -z-10 inset-x-0 -bottom-10 h-24 bg-gradient-to-t from-primary/5 to-transparent" />
    </section>
  );
};

export default TeamSection;


