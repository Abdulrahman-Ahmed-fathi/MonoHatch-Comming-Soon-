import { Users, ArrowRight } from "lucide-react";

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const CollaborationSection = () => {
  return (
    <div className="relative py-16 px-6 md:px-8 bg-gradient-to-b from-white to-pink-50/30">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-primary-glow/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/2 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6 shadow-glow">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-space font-bold text-foreground mb-4">
            We Are Calling For Collaborations
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join us in building innovative solutions and creating meaningful partnerships that drive excellence
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-gradient-to-br from-card to-card/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-elegant border border-border/50 overflow-hidden relative group">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image Section */}
            <div className="relative order-2 lg:order-1">
              <div className="relative group/image">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-primary/20 rounded-2xl blur-2xl group-hover/image:blur-3xl transition-all duration-500 transform scale-110"></div>
                
                {/* Image container */}
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-border/30 group-hover/image:shadow-2xl transition-all duration-300 group-hover/image:scale-[1.02]">
                  <img 
                    src={withBase("uploads/We are calling for collaborations.png")} 
                    alt="We are calling for collaborations" 
                    className="w-full h-auto rounded-xl object-cover"
                  />
                </div>
                
                {/* Floating decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full blur-sm animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary-glow/20 rounded-full blur-sm animate-pulse delay-300"></div>
              </div>
            </div>

            {/* Content Section */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-space font-bold text-foreground leading-tight">
                  Partner With Us
                </h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  We're looking for forward-thinking partners who share our passion for innovation and excellence. 
                  Together, we can create groundbreaking solutions and make a lasting impact.
                </p>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                <div className="flex items-start space-x-3 group/feature">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover/feature:scale-150 transition-transform duration-300"></div>
                  <span className="text-sm md:text-base text-muted-foreground">Innovation Focus</span>
                </div>
                <div className="flex items-start space-x-3 group/feature">
                  <div className="w-2 h-2 bg-primary-glow rounded-full mt-2 group-hover/feature:scale-150 transition-transform duration-300"></div>
                  <span className="text-sm md:text-base text-muted-foreground">Shared Vision</span>
                </div>
                <div className="flex items-start space-x-3 group/feature">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover/feature:scale-150 transition-transform duration-300"></div>
                  <span className="text-sm md:text-base text-muted-foreground">Mutual Growth</span>
                </div>
                <div className="flex items-start space-x-3 group/feature">
                  <div className="w-2 h-2 bg-primary-glow rounded-full mt-2 group-hover/feature:scale-150 transition-transform duration-300"></div>
                  <span className="text-sm md:text-base text-muted-foreground">Excellence Driven</span>
                </div>
              </div>

              {/* Call to Action Button */}
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSegEbwUgNfw3xFwsv_cRT7uWo-RLxsEOkTwbVNUYFf2ylqGKg/viewform?pli=1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-3 bg-gradient-primary text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group/button"
              >
                <span>Join Our Collaboration</span>
                <ArrowRight className="w-5 h-5 group-hover/button:translate-x-1 transition-transform duration-300" />
              </a>

              {/* Additional info */}
              <p className="text-sm text-muted-foreground/80 italic">
                Let's build something amazing together
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center mt-8 space-x-2">
          <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-pulse"></div>
          <div className="w-1.5 h-1.5 bg-primary-glow/60 rounded-full animate-pulse delay-150"></div>
          <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationSection;

