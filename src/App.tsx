import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Zap, Shield, Users, BarChart, ChevronRight, Star, Mail, Github, Linkedin, Twitter } from 'lucide-react';

// Custom cursor component
const CustomCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorDotRef.current && cursorOutlineRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
        
        // Add slight delay to outline for smooth effect
        setTimeout(() => {
          if (cursorOutlineRef.current) {
            cursorOutlineRef.current.style.left = `${e.clientX}px`;
            cursorOutlineRef.current.style.top = `${e.clientY}px`;
          }
        }, 50);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorDotRef} 
        className={`cursor-dot ${!isVisible ? 'cursor-hidden' : ''}`}
      />
      <div 
        ref={cursorOutlineRef} 
        className={`cursor-outline ${!isVisible ? 'cursor-hidden' : ''}`}
      />
    </>
  );
};

// Improved Background stars component
const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="stars-container">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>
    </div>
  );
};

// Parallax effect hook
const useParallax = () => {
  useEffect(() => {
    const handleScroll = () => {
      const parallaxElements = document.querySelectorAll('.parallax-element');
      const scrollPosition = window.scrollY;
      
      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-speed') || '0.1');
        const offset = scrollPosition * speed;
        
        // Apply transform to create parallax effect
        (element as HTMLElement).style.transform = `translateY(${offset}px)`;
      });
      
      // Handle fade-in animations on scroll
      const fadeElements = document.querySelectorAll('.fade-in-element');
      fadeElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('fade-in-visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check for elements in view on load
    setTimeout(() => {
      handleScroll();
    }, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

// Dynamic Island component
const DynamicIsland = () => {
  const islandRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!islandRef.current) return;
      
      const rect = islandRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from mouse to center
      const distX = (e.clientX - centerX) / 20;
      const distY = (e.clientY - centerY) / 20;
      
      // Limit the movement
      const limitedX = Math.max(-10, Math.min(10, distX));
      const limitedY = Math.max(-10, Math.min(10, distY));
      
      // Apply transform
      islandRef.current.style.transform = `perspective(1000px) rotateX(${-limitedY}deg) rotateY(${limitedX}deg) translateZ(10px)`;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div 
      ref={islandRef}
      className="dynamic-island mx-auto mt-12 mb-8 w-full max-w-3xl h-64 sm:h-80 rounded-3xl transition-all duration-300 ease-out"
    >
      <div className="island-content w-full h-full flex items-center justify-center text-center p-6">
        <div className="island-inner flex flex-col items-center justify-center">
          <div className="text-brand-orange text-xl mb-4">Dashboard Preview</div>
          <div className="island-placeholder w-full h-32 sm:h-48 rounded-xl flex items-center justify-center">
            <span className="text-gray-400">Interactive Dashboard Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Hero section with improved typing effect
const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-brand-orange/20 via-transparent to-transparent opacity-70 parallax-element" data-speed="0.05"></div>
      </div>
      
      <div className="text-center z-10 max-w-4xl mx-auto fade-in-element">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          <span className="improved-typing">AiME</span>
          <span className="block mt-2 text-brand-orange">AI Message Enhancement</span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Revolutionizing outreach one message at a time with intelligent, personalized communication.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="neon-button bg-brand-orange text-white px-8 py-3 rounded-full font-medium text-lg transition-all hover:bg-brand-orange/90 flex items-center justify-center">
            Get Started <ChevronRight className="ml-2 h-5 w-5" />
          </button>
          
          <button className="neon-button bg-transparent border border-brand-orange text-brand-orange px-8 py-3 rounded-full font-medium text-lg transition-all hover:bg-brand-orange/10">
            Learn More
          </button>
        </div>
      </div>
      
      <DynamicIsland />
    </section>
  );
};

// Features section
const Features = () => {
  const features = [
    {
      icon: <MessageSquare className="h-10 w-10 text-brand-orange" />,
      title: "Smart Messaging",
      description: "AI-powered message generation that adapts to your brand voice and target audience."
    },
    {
      icon: <Zap className="h-10 w-10 text-brand-orange" />,
      title: "Instant Responses",
      description: "Generate personalized outreach messages in seconds, not hours."
    },
    {
      icon: <Shield className="h-10 w-10 text-brand-orange" />,
      title: "Privacy First",
      description: "Your data stays yours. We never store or share your sensitive information."
    },
    {
      icon: <Users className="h-10 w-10 text-brand-orange" />,
      title: "Team Collaboration",
      description: "Share templates and insights across your entire team for consistent messaging."
    },
    {
      icon: <Send className="h-10 w-10 text-brand-orange" />,
      title: "Multi-channel Support",
      description: "Optimize messages for email, LinkedIn, Twitter, and more."
    },
    {
      icon: <BarChart className="h-10 w-10 text-brand-orange" />,
      title: "Performance Analytics",
      description: "Track engagement and continuously improve your outreach strategy."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-in-element">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to transform your outreach strategy
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glassmorphism relative rounded-xl p-6 transition-all duration-300 hover:translate-y-[-5px] fade-in-element"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How it works section with timeline
const HowItWorks = () => {
  const steps = [
    {
      title: "Connect Your Channels",
      description: "Integrate with your existing communication platforms in just a few clicks."
    },
    {
      title: "Define Your Audience",
      description: "Create detailed profiles of your target audience for personalized messaging."
    },
    {
      title: "Generate Messages",
      description: "Let AI craft personalized outreach messages based on your goals and audience."
    },
    {
      title: "Review and Refine",
      description: "Edit AI suggestions to perfect your message before sending."
    },
    {
      title: "Analyze Performance",
      description: "Track engagement metrics and optimize your approach over time."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-dark-light" id="how-it-works">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-in-element">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A simple process to revolutionize your outreach
          </p>
        </div>
        
        <div className="timeline">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`timeline-container ${index % 2 === 0 ? 'left' : 'right'} fade-in-element`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="timeline-content glassmorphism">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Team section
const Team = () => {
  const teamMembers = [
    {
      name: "Vedant",
      role: "Co-Founder & COO",
      bio: "Visionary leader with expertise in AI and natural language processing.",
      image: "vedant.png",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Sid",
      role: "Co-Founder & CTO",
      bio: "Technical genius behind AiME's powerful AI algorithms and infrastructure.",
      image: "/sid.png", // Use a placeholder image or import your actual image
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Akrit",
      role: "Co-Founder & CEO",
      bio: "Operations expert ensuring AiME delivers exceptional value to all clients.",
      image: "akrit.png",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="team">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-in-element">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The brilliant minds behind AiME Technologies
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="team-card glassmorphism rounded-xl p-6 flex flex-col items-center text-center fade-in-element"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="team-avatar mb-4 relative">
                <div className="avatar-glow"></div>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-32 h-32 rounded-full object-cover border-2 border-brand-orange"
                />
              </div>
              
              <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
              <p className="text-brand-orange mb-3">{member.role}</p>
              <p className="text-gray-300 mb-4">{member.bio}</p>
              
              <div className="flex space-x-4 mt-auto">
                <a href={member.socials.twitter} className="text-gray-400 hover:text-brand-orange transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href={member.socials.linkedin} className="text-gray-400 hover:text-brand-orange transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href={member.socials.github} className="text-gray-400 hover:text-brand-orange transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Company Story section with timeline
const CompanyStory = () => {
  const timelineEvents = [
    {
      year: "2023",
      title: "The Idea",
      description: "AiME was born from a simple observation: businesses waste countless hours crafting outreach messages that often miss the mark."
    },
    {
      year: "2024",
      title: "Development",
      description: "Our team of AI experts developed the core technology behind AiME, focusing on personalization and natural language understanding."
    },
    {
      year: "2025",
      title: "Launch",
      description: "AiME officially launched, helping businesses transform their outreach strategies with AI-powered messaging."
    },
    {
      year: "Future",
      title: "Vision",
      description: "Continuing to innovate and expand, with new features and capabilities to revolutionize business communication."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-dark-light relative overflow-hidden" id="our-story">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-brand-orange/5 via-transparent to-transparent opacity-70 parallax-element" data-speed="0.03"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 fade-in-element">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Story</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The journey of AiME Technologies
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Timeline */}
          <div className="company-timeline fade-in-element">
            {timelineEvents.map((event, index) => (
              <div key={index} className="timeline-event flex mb-8">
                <div className="timeline-year w-24 flex-shrink-0">
                  <div className="year-bubble flex items-center justify-center w-16 h-16 rounded-full bg-brand-dark border-2 border-brand-orange text-brand-orange font-bold">
                    {event.year}
                  </div>
                </div>
                <div className="timeline-content ml-4 pt-2">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-300">{event.description}</p>
                </div>
              </div>
            ))}
            <div className="timeline-line"></div>
          </div>
          
          {/* Story */}
          <div className="company-story glassmorphism rounded-xl p-8 fade-in-element">
            <h3 className="text-2xl font-bold mb-4 text-brand-orange">The AiME Vision</h3>
            <p className="text-gray-200 mb-4">
              At AiME Technologies, we believe that meaningful communication is the foundation of business success. Our mission is to harness the power of artificial intelligence to make business outreach more personal, effective, and efficient.
            </p>
            <p className="text-gray-200 mb-4">
              Founded by three friends with a shared passion for AI and communication, AiME was born from a simple observation: businesses waste countless hours crafting outreach messages that often miss the mark.
            </p>
            <p className="text-gray-200 mb-4">
              We set out to solve this problem by developing an AI system that could understand the nuances of effective communication and help businesses connect with their audience in a more meaningful way.
            </p>
            <p className="text-gray-200">
              Today, AiME is helping businesses of all sizes transform their outreach strategies, save time, and achieve better results. But this is just the beginning. Our vision is to continue pushing the boundaries of what's possible with AI-powered communication.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials section
const Testimonials = () => {
  const testimonials = [
    {
      quote: "AiME has completely transformed our sales outreach. We're seeing 3x more responses with half the effort.",
      author: "Sarah Johnson",
      role: "Sales Director, TechCorp"
    },
    {
      quote: "The personalization capabilities are mind-blowing. It's like having a dedicated copywriter for each prospect.",
      author: "Michael Chen",
      role: "Marketing Lead, GrowthX"
    },
    {
      quote: "Our team saves 15+ hours per week on outreach messaging. The ROI is incredible.",
      author: "Jessica Williams",
      role: "Founder, StartupBoost"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-in-element">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Success stories from businesses like yours
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="glassmorphism rounded-xl p-6 flex flex-col fade-in-element"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-1">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-brand-orange fill-brand-orange" />
                  ))}
                </div>
                <p className="text-gray-200 mb-6 italic">"{testimonial.quote}"</p>
              </div>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing section
const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$50",
      period: "per month",
      description: "Perfect for individuals and small teams just getting started.",
      features: [
        "7500 AI-generated messages",
        "Basic personalization",
        "Email channel support",
        "Standard templates",
        "Basic analytics"
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Professional",
      price: "$200",
      period: "per month",
      description: "Ideal for growing teams with serious outreach needs.",
      features: [
        "40,000 AI-generated messages",
        "Advanced personalization",
        "Multi-channel support",
        "Custom templates",
        "Advanced analytics",
        "Team collaboration"
      ],
      cta: "Get Started",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For organizations with large-scale outreach requirements.",
      features: [
        "1.2 million AI-generated messages",
        "Enterprise-grade personalization",
        "All channels supported",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced security features"
      ],
      cta: "Contact Sales",
      highlighted: false
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-dark-light" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-in-element">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose the plan that fits your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`glassmorphism rounded-xl p-8 flex flex-col fade-in-element ${
                plan.highlighted ? 'border-brand-orange border-2 relative overflow-hidden' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 bg-brand-orange text-white px-4 py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-400 ml-2">{plan.period}</span>
              </div>
              <p className="text-gray-300 mb-6">{plan.description}</p>
              
              <ul className="mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start mb-3">
                    <div className="text-brand-orange mr-2 mt-1">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={`neon-button ${
                  plan.highlighted 
                    ? 'bg-brand-orange text-white' 
                    : 'bg-transparent border border-brand-orange text-brand-orange hover:bg-brand-orange/10'
                } px-6 py-3 rounded-full font-medium transition-all`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA section
const CTA = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-brand-orange/10 via-transparent to-transparent opacity-70 parallax-element" data-speed="0.05"></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10 fade-in-element">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your Outreach?</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of businesses using AiME to connect with their audience in a more meaningful way.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="neon-button bg-brand-orange text-white px-8 py-3 rounded-full font-medium text-lg transition-all hover:bg-brand-orange/90 flex items-center justify-center">
            Get Started Today <ChevronRight className="ml-2 h-5 w-5" />
          </button>
          
          <button className="neon-button bg-transparent border border-brand-orange text-brand-orange px-8 py-3 rounded-full font-medium text-lg transition-all hover:bg-brand-orange/10 flex items-center justify-center">
            Schedule a Demo <Mail className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

// Footer component
const Footer = () => {
  return (
    <footer className="bg-brand-dark-lighter py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
            <img src="logo.png" alt="AiME Logo" className="h-8 mr-2" />
              AiME
            </h3>
            <p className="text-gray-400 mb-4">
              Revolutionizing outreach one message at a time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-brand-orange transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-brand-orange transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">Integrations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">Roadmap</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#our-story" className="text-gray-400 hover:text-brand-orange transition-colors">Our Story</a></li>
              <li><a href="#team" className="text-gray-400 hover:text-brand-orange transition-colors">Team</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">Privacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} AiME. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App component
const App = () => {
  // Use the parallax effect hook
  useParallax();
  
  return (
    <div className="min-h-screen bg-brand-dark text-white relative">
      <CustomCursor />
      <BackgroundEffects />
      
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
            <img src="logo.png" alt="AiME Logo" className="h-8 mr-2" />
            <span className="text-xl font-bold">AiME</span>
            </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-300 hover:text-brand-orange transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-brand-orange transition-colors">How It Works</a>
            <a href="#team" className="text-gray-300 hover:text-brand-orange transition-colors">Team</a>
            <a href="#our-story" className="text-gray-300 hover:text-brand-orange transition-colors">Our Story</a>
            <a href="#testimonials" className="text-gray-300 hover:text-brand-orange transition-colors">Testimonials</a>
            <a href="#pricing" className="text-gray-300 hover:text-brand-orange transition-colors">Pricing</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="hidden md:block text-gray-300 hover:text-brand-orange transition-colors">
              Log In
            </button>
            <button className="neon-button bg-brand-orange text-white px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-brand-orange/90">
              Get Started
            </button>
          </div>
        </div>
      </header>
      
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Team />
        <CompanyStory />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;