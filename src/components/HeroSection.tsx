
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";

const HeroSection = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  
  const titles = ["Data Analyst", "Business Analyst", "Data Visualizer", "SQL Developer", "Python Programmer"];
  
  const handleTyping = useCallback(() => {
    const current = titles[currentIndex];
    
    if (!isDeleting && jobTitle.length < current.length) {
      // Still typing
      setJobTitle(current.substring(0, jobTitle.length + 1));
      setTypingSpeed(100);
    } else if (!isDeleting && jobTitle.length === current.length) {
      // Finished typing, pause before deleting
      setIsDeleting(true);
      setTypingSpeed(1500);
    } else if (isDeleting && jobTitle.length > 0) {
      // Deleting
      setJobTitle(current.substring(0, jobTitle.length - 1));
      setTypingSpeed(50);
    } else if (isDeleting && jobTitle.length === 0) {
      // Finished deleting, move to next title
      setIsDeleting(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
      setTypingSpeed(500);
    }
  }, [jobTitle, currentIndex, isDeleting, titles]);
  
  useEffect(() => {
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [handleTyping, typingSpeed]);

  // Add useEffect for animation
  useEffect(() => {
    const elements = document.querySelectorAll('.fly-up');
    
    elements.forEach((el, index) => {
      const element = el as HTMLElement;
      element.style.animationDelay = `${index * 0.15}s`;
    });
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-[128px] opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/30 rounded-full filter blur-[100px] opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full filter blur-[150px] opacity-20"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto animate-on-scroll">
          <p className="text-lg mb-4 text-muted-foreground fly-up">Hi, Hope you are doing well...</p>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 fly-up">
            I am <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Pranav Sathyan</span>
          </h1>
          
          <div className="h-16 mb-6 fly-up">
            <h2 className="text-3xl md:text-4xl text-foreground font-semibold">
              {jobTitle}<span className="animate-pulse text-primary">|</span>
            </h2>
          </div>
          
          <p className="text-2xl mb-6 text-primary font-medium fly-up">An Aspiring Data Analyst</p>
          
          <p className="text-xl mb-12 text-muted-foreground max-w-2xl mx-auto leading-relaxed fly-up">
            I'm a business analyst and an aspiring data engineer passionate about using data to solve real-world problems. 
            With expertise in Python, SQL, and visualization tools, I transform complex datasets into actionable insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center fly-up">
            <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-semibold hover:scale-105 transition-all duration-300" style={{backgroundColor: "#cc73f8"}}>
              <a href="https://github.com/PRANAVSATHYAN" target="_blank" rel="noopener noreferrer">View My Work</a>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg font-semibold hover:scale-105 transition-all duration-300 border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={scrollToContact}>
              Get In Touch
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 fly-up">
            <div className="flex flex-col items-center">
              <p className="text-sm text-muted-foreground mb-2">Scroll to explore</p>
              <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
                <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
