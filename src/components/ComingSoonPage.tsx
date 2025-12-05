import { Facebook, Instagram } from "lucide-react";
import { SiLinkedin, SiTiktok } from "react-icons/si";
import CollaborationSection from "./CollaborationSection";
import PartnershipSection from "./PartnershipSection";
import TeamSection from "./TeamSection";

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const ComingSoonPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-4 w-96 h-96 bg-primary-glow/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header with uploaded logo and Mono Hatch text */}
      <header className="relative z-20 p-6 md:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 md:w-12 md:h-12 flex items-center justify-center bg-primary/10 rounded-full">
              <img 
                src={withBase("uploads/40cbec2e-c9e0-41bb-ab49-6b7340c902de.png")} 
                alt="Mono Hatch Logo" 
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
              />
            </div>
            <div className="ml-3 text-primary font-space font-semibold text-base flex items-center h-10">
              Mono Hatch
            </div>
          </div>
          {/* Social Media Links */}
          <div className="flex items-center space-x-6">
            <a 
              href="https://www.facebook.com/share/1BfhzBoYdF/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Facebook className="w-5 h-5 text-primary" />
            </a>
            <a 
              href="https://www.instagram.com/monohatch?igsh=MThmbXFwcHNob2tqZg==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Instagram className="w-5 h-5 text-primary" />
            </a>
			<a 
				href="https://www.linkedin.com/company/mono-hatch/" 
				target="_blank" 
				rel="noopener noreferrer"
				className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
			>
				<SiLinkedin className="w-5 h-5 text-primary" />
			</a>
            <a 
              href="https://www.tiktok.com/@mono.hatch?_t=ZS-8xmAgFQkL3Z&_r=1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <SiTiktok className="w-5 h-5 text-primary" />
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Single centered illustration */}
          <div className="mb-12 relative">
            <div className="relative inline-block">
              <img 
                src={withBase("uploads/7b555808-5c3a-46ae-8bf3-dcaf88600117.png")} 
                alt="Web maintenance illustration" 
                className="w-80 md:w-85 lg:w-100 h-auto mx-auto transform hover:scale-105 transition-smooth"
                style={{
                  animation: 'gentle-float 8s ease-in-out infinite'
                }}
              />
              <div className="absolute inset-0 bg-gradient-primary/10 rounded-3xl blur-2xl -z-10 transform scale-110 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-primary/5 rounded-3xl blur-3xl -z-20 transform scale-125 animate-ping"></div>
            </div>
          </div>

          {/* Coming Soon text with better positioning */}
          <div className="space-y-6 mb-8">
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-space font-extrabold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent animate-pulse leading-tight drop-shadow-lg relative fancy-outline"
              style={{
                textShadow: '2px 2px 8px rgba(255, 0, 128, 0.99), 0 0 2px #fff',
                WebkitTextStroke: '1px #f3e8ff',
              }}
            >
              <span className="inline-block transform scale-110 tracking-wider">Coming Soon</span>
            </h1>

            {/* Animated dots */}
            <div className="flex justify-center space-x-2 mt-16">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary-glow rounded-full animate-bounce delay-150"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-300"></div>
            </div>
             <p className="text-pink-500 text-sm text-center ">
            Stay tuned for the big reveal
          </p>
          </div>
        </div>
      </main>

      {/* Collaboration Section */}
      <CollaborationSection />

      {/* Partnership Section */}
      <PartnershipSection />

      {/* Team Section */}
      <TeamSection />

      {/* Footer with social media links */}
      <footer className="relative z-10 p-6 md:p-8">
        <div className="flex flex-col items-center space-y-4">
          
         
        </div>
      </footer>
    </div>
  );
};

export default ComingSoonPage;
