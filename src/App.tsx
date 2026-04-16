import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, HeartHandshake, BookOpen, Users, Calendar, Phone, ChevronRight, Star, Quote, ArrowRight, Clock, Video, Shield, ChevronDown, Scale, Compass, Wallet, GraduationCap, Heart, Lock, ShieldCheck, Book, ChevronLeft, LayoutGrid, CalendarDays, CheckCircle2, Share2, Facebook, Twitter, Search } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths, getDay } from 'date-fns';
import { articles, categoriesList } from './data/articles';

// --- Components ---

const Navbar = ({ onOpenUserProfile }: { onOpenUserProfile: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'services', 'workshops', 'resources', 'booking'];
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust threshold based on navbar height
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // Navbar height offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed w-full z-50 glass-panel transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="relative w-16 h-16 flex items-center justify-center cursor-pointer group shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <HeartHandshake className="h-7 w-7 text-cyan-500 absolute z-10 group-hover:scale-110 transition-transform" />
            <svg className="w-full h-full absolute animate-[spin_15s_linear_infinite]" viewBox="0 0 100 100">
              <path id="circlePath" d="M 50, 50 m -34, 0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" fill="transparent" />
              <text className="text-[14px] font-serif font-bold fill-red-500 uppercase">
                <textPath href="#circlePath" startOffset="0%" textLength="213" lengthAdjust="spacing">
                  MAWADDAH • MAWADDAH • 
                </textPath>
              </text>
            </svg>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={`text-sm font-medium uppercase tracking-wider transition-colors ${activeSection === 'about' ? 'text-accent' : 'text-primary/80 hover:text-accent'}`}>About Us</a>
            <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className={`text-sm font-medium uppercase tracking-wider transition-colors ${activeSection === 'services' ? 'text-accent' : 'text-primary/80 hover:text-accent'}`}>Services</a>
            <a href="#workshops" onClick={(e) => handleNavClick(e, 'workshops')} className={`text-sm font-medium uppercase tracking-wider transition-colors ${activeSection === 'workshops' ? 'text-accent' : 'text-primary/80 hover:text-accent'}`}>Workshops</a>
            <a href="#resources" onClick={(e) => handleNavClick(e, 'resources')} className={`text-sm font-medium uppercase tracking-wider transition-colors ${activeSection === 'resources' ? 'text-accent' : 'text-primary/80 hover:text-accent'}`}>Resources</a>
            <button onClick={onOpenUserProfile} className="text-primary/80 hover:text-accent transition-colors text-sm font-medium uppercase tracking-wider flex items-center gap-1"><Users className="w-4 h-4"/> Profile</button>
            <a href="#booking" onClick={(e) => handleNavClick(e, 'booking')} className="bg-primary text-bg px-6 py-2.5 rounded-full text-sm font-medium hover:bg-primary-light transition-colors">
              Book Consultation
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-primary">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-t border-accent/20"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={`block px-3 py-3 text-base font-medium rounded-md ${activeSection === 'about' ? 'text-accent bg-accent/10' : 'text-primary hover:bg-accent/10'}`}>About Us</a>
              <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className={`block px-3 py-3 text-base font-medium rounded-md ${activeSection === 'services' ? 'text-accent bg-accent/10' : 'text-primary hover:bg-accent/10'}`}>Services</a>
              <a href="#workshops" onClick={(e) => handleNavClick(e, 'workshops')} className={`block px-3 py-3 text-base font-medium rounded-md ${activeSection === 'workshops' ? 'text-accent bg-accent/10' : 'text-primary hover:bg-accent/10'}`}>Workshops</a>
              <a href="#resources" onClick={(e) => handleNavClick(e, 'resources')} className={`block px-3 py-3 text-base font-medium rounded-md ${activeSection === 'resources' ? 'text-accent bg-accent/10' : 'text-primary hover:bg-accent/10'}`}>Resources</a>
              <button onClick={() => { onOpenUserProfile(); setIsOpen(false); }} className="w-full text-left flex items-center gap-2 px-3 py-3 text-base font-medium text-primary hover:bg-accent/10 rounded-md"><Users className="w-4 h-4"/> Profile</button>
              <a href="#booking" onClick={(e) => handleNavClick(e, 'booking')} className="block px-3 py-3 text-base font-medium text-accent hover:bg-accent/10 rounded-md">Book Consultation</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg/80 via-bg/50 to-bg z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1584553421349-3557471bed79?q=80&w=2069&auto=format&fit=crop" 
          alt="Islamic Architecture" 
          className="w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-medium tracking-widest uppercase text-sm mb-4 block">Bismillah ir-Rahman ir-Rahim</span>
            <h1 className="font-serif text-5xl md:text-7xl text-primary leading-tight mb-6 text-balance">
              Nurturing Marriages Through <span className="italic text-accent">Faith & Wisdom</span>
            </h1>
            <p className="text-lg md:text-xl text-primary/80 mb-10 text-balance">
              Expert Islamic marriage consultancy, pre-marital guidance, and parenting advice rooted in the Quran and Sunnah.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#booking" className="w-full sm:w-auto bg-primary text-bg px-8 py-4 rounded-full text-base font-medium hover:bg-primary-light transition-colors flex items-center justify-center gap-2">
                Book 1:1 Consultation <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#services" className="w-full sm:w-auto bg-transparent border border-primary text-primary px-8 py-4 rounded-full text-base font-medium hover:bg-primary/5 transition-colors flex items-center justify-center">
                Explore Services
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const QuranicQuote = () => {
  return (
    <section className="py-16 bg-primary text-bg relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-16 -mr-16 text-accent/10">
        <Quote className="w-64 h-64 transform rotate-180" />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <p className="font-serif text-2xl md:text-4xl leading-relaxed mb-8 italic text-balance">
          "And among His signs is this, that He created for you mates from among yourselves, that ye may dwell in tranquility with them, and He has put love and mercy between your (hearts)..."
        </p>
        <div className="flex flex-col items-center justify-center">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">Surah Ar-Rum [30:21]</span>
          <div className="w-12 h-px bg-accent mt-4"></div>
        </div>
      </div>
    </section>
  );
};

const AboutUs = () => {
  const values = [
    {
      icon: <Book className="w-8 h-8 text-accent" />,
      title: "Faith-Based Guidance",
      desc: "All our advice and counseling are strictly rooted in the Quran and the authentic Sunnah."
    },
    {
      icon: <Heart className="w-8 h-8 text-accent" />,
      title: "Compassion",
      desc: "We approach every situation with empathy, understanding, and a non-judgmental heart."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-accent" />,
      title: "Authenticity",
      desc: "We provide honest, transparent, and sincere counsel tailored to your unique circumstances."
    },
    {
      icon: <Lock className="w-8 h-8 text-accent" />,
      title: "Confidentiality",
      desc: "Your privacy is an Amanah (trust). All sessions are strictly confidential and secure."
    }
  ];

  return (
    <section id="about" className="py-24 bg-surface relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[100px]"></div>
        <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-accent font-medium tracking-widest uppercase text-sm mb-2 block">Discover Mawaddah</span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6">About Us</h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        {/* History & Founding Principles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-serif text-3xl text-primary mb-6">Our History & Founding Principles</h3>
            <div className="space-y-6 text-primary/80 text-lg leading-relaxed">
              <p>
                Mawaddah was born out of a profound realization: while the Muslim community continues to grow, the foundational unit of our society—the family—is facing unprecedented challenges. Founded by a group of dedicated scholars and counselors, our organization began as a small community initiative to address the rising rates of marital discord and generational disconnect.
              </p>
              <p>
                Our founding principles are deeply rooted in the Quranic concept of <em>Mawaddah wa Rahmah</em> (Love and Mercy). We believe that every home has the potential to be a sanctuary of peace (Sakinah) when built upon the authentic teachings of the Prophet Muhammad ﷺ. We reject the notion that modern problems require abandoning traditional values; instead, we strive to apply timeless divine wisdom to contemporary challenges.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden relative shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=2000&auto=format&fit=crop" 
                alt="Peaceful Islamic setting" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <Shield className="w-10 h-10 text-accent mb-4" />
                <h4 className="font-serif text-2xl text-surface mb-2">Protecting the Next Generation</h4>
                <p className="text-surface/80 text-sm">Through knowledge, patience, and adherence to the Sunnah.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-bg p-10 rounded-3xl border border-primary/10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Compass className="w-24 h-24 text-accent" />
            </div>
            <h3 className="font-serif text-2xl text-primary mb-4 relative z-10">Our Vision</h3>
            <p className="text-primary/80 text-lg leading-relaxed relative z-10">
              To see a global Muslim community where every marriage is a source of tranquility, every child is raised with a strong Islamic identity, and every home is a fortress against the spiritual and moral trials of the modern world. We envision a future where the prophetic model of family life is not just a historical ideal, but a lived reality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-primary text-surface p-10 rounded-3xl shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <HeartHandshake className="w-24 h-24 text-accent" />
            </div>
            <h3 className="font-serif text-2xl text-surface mb-4 relative z-10">Our Mission</h3>
            <p className="text-surface/90 text-lg leading-relaxed relative z-10">
              To equip individuals and couples with divine wisdom and practical tools <em>before</em> the storms hit. By bridging authentic Islamic scholarship from the Quran and Sunnah with practical counseling, we empower you to build resilient, God-conscious homes. Instead of testing and trying, our philosophy is simple: Learn and Implement.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <div>
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl text-primary">Our Core Values</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-bg p-8 rounded-3xl border border-primary/5 text-center hover:border-accent/30 transition-colors shadow-sm"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-surface flex items-center justify-center mb-6 shadow-sm">
                  {value.icon}
                </div>
                <h4 className="font-serif text-xl text-primary mb-3">{value.title}</h4>
                <p className="text-primary/70 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <HeartHandshake className="w-8 h-8 text-accent" />,
      title: "Pre-Marital Counseling",
      desc: "Mindset development and compatibility assessment for those preparing for marriage."
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: "Couple Therapy",
      desc: "Resolving conflicts and rebuilding connection through Islamic principles and modern psychology."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-accent" />,
      title: "Parenting Guidance",
      desc: "Tarbiyah strategies to raise righteous children in the modern world."
    },
    {
      icon: <Phone className="w-8 h-8 text-accent" />,
      title: "Mashwara & Advice",
      desc: "General guidance on family matters, in-law relationships, and personal development."
    },
    {
      icon: <Scale className="w-8 h-8 text-accent" />,
      title: "Divorce & Mediation",
      desc: "Navigating separation with dignity, fairness, and adherence to Islamic jurisprudence."
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-accent" />,
      title: "Youth Mentorship",
      desc: "Empowering young adults to navigate modern challenges while holding onto their faith."
    },
    {
      icon: <Compass className="w-8 h-8 text-accent" />,
      title: "Spiritual Coaching",
      desc: "One-on-one sessions to help you reconnect with Allah and find purpose in your daily life."
    },
    {
      icon: <Wallet className="w-8 h-8 text-accent" />,
      title: "Financial Harmony",
      desc: "Aligning your family's financial goals with Islamic principles of earning and spending."
    }
  ];

  return (
    <section id="services" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm mb-2 block">Our Expertise</span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary">Comprehensive Support</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-bg p-8 rounded-3xl border border-primary/5 hover:border-accent/30 transition-colors group"
            >
              <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="font-serif text-xl text-primary mb-3">{service.title}</h3>
              <p className="text-primary/70 text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OurSheikhs = () => {
  const [selectedSheikh, setSelectedSheikh] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2, 1)); // Start at March 2026
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const sheikhs = [
    {
      name: "Shaykh Ahmad",
      specialization: "Islamic Law & Family Counseling",
      bio: "With over a decade of experience in community leadership and pastoral care, Shaykh Ahmad specializes in bridging classical Islamic knowledge with modern psychological insights to help families thrive.",
      image: "https://images.unsplash.com/photo-1584483756059-00911761d491?q=80&w=2000&auto=format&fit=crop",
      qualifications: [
        "Qur’anic Ijazah with an unbroken sanad to the Prophet ﷺ",
        "Graduate researcher in Islamic Law",
        "Specialist in Seerah, Tafsīr, Ḥadīth & Fiqh",
        "Expert instructor of Classical & Modern Standard Arabic"
      ],
      specializationsList: [
        "Tafsir (Quranic Exegesis) - Deep contextual understanding of revelation",
        "Fiqh (Islamic Jurisprudence) - Practical application of Islamic law in modern contexts",
        "Seerah (Prophetic Biography) - Extracting life lessons from the Prophet ﷺ",
        "Family Counseling - Resolving marital disputes using Islamic principles"
      ]
    }
  ];

  const handleBookSheikh = (sheikhName: string) => {
    setSelectedSheikh(sheikhName);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmingSheikhBooking, setConfirmingSheikhBooking] = useState(false);

  const handleContinueToBooking = () => {
    if (!selectedSheikh || !selectedDate || !selectedTime) return;
    setConfirmingSheikhBooking(true);
  };

  const confirmBooking = () => {
    if (!selectedSheikh || !selectedDate || !selectedTime) return;
    
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    
    // Convert "02:00 PM" to "14:00" for the time input
    const timeParts = selectedTime.match(/(\d+):(\d+)\s(AM|PM)/);
    let formattedTime = "";
    if (timeParts) {
      let hours = parseInt(timeParts[1], 10);
      const minutes = timeParts[2];
      const ampm = timeParts[3];
      if (ampm === "PM" && hours < 12) hours += 12;
      if (ampm === "AM" && hours === 12) hours = 0;
      formattedTime = `${hours.toString().padStart(2, '0')}:${minutes}`;
    }
    
    setShowConfirmation(true);
    
    setTimeout(() => {
      const event = new CustomEvent('prefill-booking', { 
        detail: { 
          type: 'General Mashwara', 
          description: `I would like to book a 1:1 consultation with ${selectedSheikh}.`,
          date: formattedDate,
          time: formattedTime
        } 
      });
      window.dispatchEvent(event);
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
      setSelectedSheikh(null);
      setConfirmingSheikhBooking(false);
      setShowConfirmation(false);
    }, 1500);
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const startingDayIndex = getDay(startOfMonth(currentMonth));

  // Mock available times
  const availableTimes = ["09:00 AM", "10:30 AM", "02:00 PM", "04:00 PM"];

  return (
    <section id="sheikhs" className="py-24 bg-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm mb-2 block">Our Experts</span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary">Meet Our Sheikhs</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
          {sheikhs.map((sheikh, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-surface rounded-3xl overflow-hidden shadow-sm border border-primary/5 flex flex-col md:flex-row hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="md:w-2/5 relative h-64 md:h-auto">
                <img 
                  src={sheikh.image} 
                  alt={sheikh.name} 
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 md:w-3/5 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-primary mb-1">{sheikh.name}</h3>
                  <p className="text-accent font-medium text-sm mb-4">{sheikh.specialization}</p>
                  <p className="text-primary/70 text-sm mb-6 leading-relaxed">{sheikh.bio}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-accent" /> Qualifications
                    </h4>
                    <ul className="space-y-2">
                      {sheikh.qualifications.map((qual, i) => (
                        <li key={i} className="flex items-start gap-2 text-primary/80 text-sm">
                          <span className="text-accent font-bold mt-0.5">•</span> {qual}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {sheikh.specializationsList && (
                    <div className="mb-8">
                      <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                        <Star className="w-4 h-4 text-accent" /> Specializations
                      </h4>
                      <ul className="space-y-2">
                        {sheikh.specializationsList.map((spec, i) => (
                          <li key={i} className="flex items-start gap-2 text-primary/80 text-sm">
                            <span className="text-accent font-bold mt-0.5">•</span> {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => handleBookSheikh(sheikh.name)}
                  className="w-full bg-primary/5 hover:bg-primary/10 text-primary py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Check Availability
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Availability Modal */}
      <AnimatePresence>
        {selectedSheikh && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" onClick={() => setSelectedSheikh(null)}></div>
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              className="bg-bg w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative z-10"
            >
              <div className="sticky top-0 bg-bg/90 backdrop-blur-md border-b border-primary/10 p-4 sm:p-6 flex justify-between items-center z-20">
                <span className="text-accent text-xs font-bold uppercase tracking-wider">Book Consultation</span>
                <button 
                  onClick={() => setSelectedSheikh(null)}
                  className="w-10 h-10 rounded-full bg-primary/5 hover:bg-primary/10 flex items-center justify-center text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 sm:p-10">
                <h2 className="font-serif text-3xl text-primary mb-2 leading-tight">Schedule with {selectedSheikh}</h2>
                <p className="text-primary/60 mb-8">Select a date and time for your 1:1 consultation.</p>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Calendar Column */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-serif text-xl text-primary">{format(currentMonth, 'MMMM yyyy')}</h3>
                      <div className="flex gap-2">
                        <button onClick={prevMonth} className="p-1.5 rounded-full hover:bg-primary/5 text-primary transition-colors">
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button onClick={nextMonth} className="p-1.5 rounded-full hover:bg-primary/5 text-primary transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                        <div key={day} className="text-center text-[10px] font-bold text-primary/50 uppercase tracking-wider py-1">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: startingDayIndex }).map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square rounded-lg bg-transparent"></div>
                      ))}
                      {daysInMonth.map((date, i) => {
                        // Mock availability: assume weekdays have availability
                        const isWeekend = getDay(date) === 0 || getDay(date) === 6;
                        const isAvailable = !isWeekend;
                        const isSelected = selectedDate && isSameDay(date, selectedDate);
                        
                        return (
                          <button
                            key={i}
                            disabled={!isAvailable}
                            onClick={() => {
                              setSelectedDate(date);
                              setSelectedTime(null);
                            }}
                            className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-all duration-200 
                              ${isSelected ? 'bg-accent text-bg font-bold shadow-sm' : ''}
                              ${!isSelected && isAvailable ? 'hover:bg-primary/5 text-primary' : ''}
                              ${!isAvailable ? 'text-primary/20 cursor-not-allowed' : ''}
                            `}
                          >
                            {format(date, 'd')}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots Column */}
                  <div>
                    <h3 className="font-serif text-xl text-primary mb-6">
                      {selectedDate ? format(selectedDate, 'EEEE, MMM do') : 'Select a date'}
                    </h3>
                    
                    {selectedDate ? (
                      <div className="space-y-3">
                        {availableTimes.map((time, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedTime(time)}
                            className={`w-full py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 border
                              ${selectedTime === time 
                                ? 'bg-accent border-accent text-bg shadow-sm' 
                                : 'bg-transparent border-primary/20 text-primary hover:border-accent hover:text-accent'}
                            `}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-primary/40 p-6 text-center border border-dashed border-primary/20 rounded-2xl">
                        <Calendar className="w-8 h-8 mb-2 opacity-50" />
                        <p className="text-sm">Please select a date from the calendar to view available times.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-primary/10">
                  <AnimatePresence mode="wait">
                    {showConfirmation ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-green-50 text-green-800 p-4 rounded-xl flex items-center justify-center gap-2 border border-green-200"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-medium">Details confirmed! Redirecting to booking form...</span>
                      </motion.div>
                    ) : (
                      <motion.button 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleContinueToBooking}
                        disabled={!selectedDate || !selectedTime}
                        className="w-full bg-accent text-bg py-4 rounded-xl font-bold text-lg hover:bg-accent-light transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continue to Booking
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sheikh Booking Confirmation Modal */}
      <AnimatePresence>
        {confirmingSheikhBooking && selectedSheikh && selectedDate && selectedTime && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" onClick={() => !showConfirmation && setConfirmingSheikhBooking(false)}></div>
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              className="bg-bg w-full max-w-md rounded-3xl shadow-2xl relative z-10 p-6 sm:p-8"
            >
              <h3 className="font-serif text-2xl text-primary mb-4">Confirm Consultation</h3>
              <p className="text-primary/80 mb-6">
                You are about to book a consultation with:
                <br />
                <strong className="text-primary block mt-2 text-lg">{selectedSheikh}</strong>
                <span className="text-sm text-primary/60 block mt-1">{format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}</span>
              </p>
              
              <AnimatePresence mode="wait">
                {showConfirmation ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-green-50 text-green-800 p-4 rounded-xl flex items-center justify-center gap-2 border border-green-200"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-medium">Confirmed! Redirecting...</span>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-3"
                  >
                    <button 
                      onClick={() => setConfirmingSheikhBooking(false)}
                      className="flex-1 py-3 rounded-xl font-bold text-primary border border-primary/20 hover:bg-primary/5 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={confirmBooking}
                      className="flex-1 bg-accent hover:bg-accent-light text-bg py-3 rounded-xl font-bold transition-colors"
                    >
                      Confirm
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Workshops = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState<any | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2, 1)); // Start at March 2026
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const workshops = [
    {
      title: "The Fiqh of Marriage",
      date: "Next Saturday, 10:00 AM",
      dateObj: new Date(2026, 2, 14, 10, 0),
      type: "Online Masterclass",
      image: "https://images.unsplash.com/photo-1609599006353-e629aaab315f?q=80&w=2000&auto=format&fit=crop",
      outline: ["Rights and Responsibilities", "The Marriage Contract (Nikah)", "Financial Obligations (Mahr & Nafaqah)", "Intimacy in Islam"],
      expectedResults: "A comprehensive understanding of the legal and spiritual framework of an Islamic marriage, protecting you from common pitfalls.",
      mindset: "Open to learning, ready to unlearn cultural misconceptions, and committed to following the Sunnah."
    },
    {
      title: "Navigating the First Year",
      date: "Starts Oct 15th",
      dateObj: new Date(2026, 9, 15, 18, 0),
      type: "4-Week Workshop",
      image: "https://images.unsplash.com/photo-1564121211835-e88c852648ab?q=80&w=2000&auto=format&fit=crop",
      outline: ["Managing Expectations", "Effective Communication", "Dealing with In-laws", "Establishing a God-conscious Home"],
      expectedResults: "Practical tools to build a strong foundation of Mawaddah (affection) and Rahmah (mercy) during the critical first year.",
      mindset: "Patience, empathy, and a willingness to compromise and grow together."
    },
    {
      title: "Prophetic Parenting (Tarbiyah)",
      date: "Nov 5th, 2:00 PM",
      dateObj: new Date(2026, 10, 5, 14, 0),
      type: "Weekend Seminar",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2000&auto=format&fit=crop",
      outline: ["The Fitrah of a Child", "Discipline vs. Punishment", "Instilling Love for Allah", "Navigating Screen Time & Modern Challenges"],
      expectedResults: "A clear, actionable parenting strategy modeled after the Prophet ﷺ's gentle and effective approach.",
      mindset: "Self-reflective, gentle, and dedicated to being a positive role model."
    },
    {
      title: "Conflict Resolution in Islam",
      date: "Nov 20th, 6:00 PM",
      dateObj: new Date(2026, 10, 20, 18, 0),
      type: "Interactive Session",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2000&auto=format&fit=crop",
      outline: ["The Etiquette of Disagreement", "Controlling Anger", "The Role of a Mediator", "Forgiveness and Moving Forward"],
      expectedResults: "Mastery over emotional reactivity and the ability to resolve disputes without damaging the relationship.",
      mindset: "Humble, ready to admit faults, and prioritizing peace over 'being right'."
    },
    {
      title: "Financial Harmony in Marriage",
      date: "Dec 2nd, 10:00 AM",
      dateObj: new Date(2026, 11, 2, 10, 0),
      type: "Online Masterclass",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop",
      outline: ["Islamic Rights regarding Wealth", "Budgeting as a Couple", "Dealing with Debt", "Barakah in Earnings"],
      expectedResults: "A unified financial plan that respects Islamic boundaries and eliminates money-related marital stress.",
      mindset: "Transparent, responsible, and trusting in Allah's provision (Tawakkul)."
    },
    {
      title: "Healing from Trauma",
      date: "Dec 15th, 4:00 PM",
      dateObj: new Date(2026, 11, 15, 16, 0),
      type: "Support Group & Workshop",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=2000&auto=format&fit=crop",
      outline: ["Understanding Trauma", "The Islamic Perspective on Hardship", "Coping Mechanisms", "Seeking Professional Help"],
      expectedResults: "A safe space to begin the healing process, equipped with spiritual and psychological tools for recovery.",
      mindset: "Courageous, vulnerable, and hopeful in Allah's mercy and healing."
    },
    {
      title: "Preparing for Parenthood",
      date: "Jan 10th, 11:00 AM",
      dateObj: new Date(2027, 0, 10, 11, 0),
      type: "4-Week Workshop",
      image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2000&auto=format&fit=crop",
      outline: ["Spiritual Preparation for Pregnancy", "Rights of the Newborn", "Maintaining the Marriage Post-Baby", "Building a Support System"],
      expectedResults: "Confidence and spiritual readiness to welcome a new soul into your family.",
      mindset: "Excited, prayerful, and ready to embrace a major life transition."
    }
  ];

  const [confirmingWorkshop, setConfirmingWorkshop] = useState<any | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleBookNow = (e: React.MouseEvent, workshop: any) => {
    e.stopPropagation();
    setConfirmingWorkshop(workshop);
  };

  const confirmWorkshopBooking = () => {
    if (!confirmingWorkshop) return;
    
    const formattedDate = format(confirmingWorkshop.dateObj, 'yyyy-MM-dd');
    const formattedTime = format(confirmingWorkshop.dateObj, 'HH:mm');
    
    setShowConfirmation(true);
    
    setTimeout(() => {
      const event = new CustomEvent('prefill-booking', { 
        detail: { 
          type: 'Workshop Registration', 
          description: `I would like to register for the workshop: ${confirmingWorkshop.title}`,
          date: formattedDate,
          time: formattedTime
        } 
      });
      window.dispatchEvent(event);
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
      setSelectedWorkshop(null);
      setConfirmingWorkshop(null);
      setShowConfirmation(false);
    }, 1500);
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const startingDayIndex = getDay(startOfMonth(currentMonth));

  const filteredWorkshops = selectedDate 
    ? workshops.filter(w => isSameDay(w.dateObj, selectedDate))
    : workshops;

  return (
    <section id="workshops" className="py-24 bg-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-accent font-medium tracking-widest uppercase text-sm mb-2 block">Learn & Grow</span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary">Workshops & Events</h2>
          </div>
          <div className="flex items-center gap-2 bg-surface p-1.5 rounded-xl border border-primary/10">
            <button 
              onClick={() => { setViewMode('grid'); setSelectedDate(null); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${viewMode === 'grid' ? 'bg-primary text-bg' : 'text-primary/70 hover:text-primary'}`}
            >
              <LayoutGrid className="w-4 h-4" /> Grid
            </button>
            <button 
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${viewMode === 'calendar' ? 'bg-primary text-bg' : 'text-primary/70 hover:text-primary'}`}
            >
              <CalendarDays className="w-4 h-4" /> Calendar
            </button>
          </div>
        </div>

        {viewMode === 'calendar' && (
          <div className="mb-12 bg-surface rounded-3xl p-6 md:p-8 border border-primary/10 shadow-sm max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-2xl text-primary">{format(currentMonth, 'MMMM yyyy')}</h3>
              <div className="flex gap-2">
                <button onClick={prevMonth} className="p-2 rounded-full hover:bg-primary/5 text-primary transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextMonth} className="p-2 rounded-full hover:bg-primary/5 text-primary transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-bold text-primary/50 uppercase tracking-wider py-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: startingDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square rounded-xl bg-transparent"></div>
              ))}
              {daysInMonth.map((date, i) => {
                const dayWorkshops = workshops.filter(w => isSameDay(w.dateObj, date));
                const hasEvents = dayWorkshops.length > 0;
                const isSelected = selectedDate && isSameDay(date, selectedDate);
                
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(isSelected ? null : date)}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all duration-200 
                      ${isSelected ? 'bg-accent text-bg shadow-md' : hasEvents ? 'bg-accent/10 text-primary hover:bg-accent/20 border border-accent/20' : 'hover:bg-primary/5 text-primary'}
                      ${hasEvents && !isSelected ? 'font-bold' : ''}
                    `}
                  >
                    <span className="text-sm">{format(date, 'd')}</span>
                    {hasEvents && (
                      <div className="flex gap-1 mt-1">
                        {dayWorkshops.map((_, idx) => (
                          <div key={idx} className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-bg' : 'bg-accent'}`}></div>
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            
            {selectedDate && (
              <div className="mt-8 pt-6 border-t border-primary/10 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-primary/70">
                    Showing events for {format(selectedDate, 'MMMM do, yyyy')}
                  </span>
                  <button 
                    onClick={() => setSelectedDate(null)}
                    className="text-xs font-bold text-accent uppercase tracking-wider hover:text-accent-light"
                  >
                    Clear Filter
                  </button>
                </div>
                
                {filteredWorkshops.length > 0 && (
                  <div className="bg-bg rounded-2xl p-4 border border-primary/5 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary/50 mb-2">Available Workshops</h4>
                    {filteredWorkshops.map((w, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-surface border border-primary/5 hover:border-accent/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="font-serif text-primary text-sm font-medium">{w.title}</h5>
                            <span className="text-xs text-primary/60 flex items-center gap-1"><Clock className="w-3 h-3" /> {w.time}</span>
                          </div>
                        </div>
                        <span className="text-xs font-bold bg-primary/5 text-primary px-2 py-1 rounded-md">{w.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {filteredWorkshops.length === 0 ? (
          <div className="text-center py-16 bg-surface rounded-3xl border border-primary/10">
            <CalendarDays className="w-12 h-12 text-primary/20 mx-auto mb-4" />
            <h3 className="font-serif text-xl text-primary mb-2">No events scheduled</h3>
            <p className="text-primary/60 text-sm">There are no workshops scheduled for this date.</p>
            <button 
              onClick={() => setSelectedDate(null)}
              className="mt-6 text-accent font-medium hover:text-accent-light transition-colors"
            >
              View all upcoming events
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorkshops.map((workshop, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedWorkshop(workshop)}
                className="group cursor-pointer rounded-3xl overflow-hidden relative aspect-[4/5] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-end"
              >
                <img 
                  src={workshop.image} 
                  alt={workshop.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent"></div>
                <div className="relative z-10 p-6 sm:p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="bg-accent text-bg text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {workshop.type}
                    </span>
                    <span className="text-surface/90 text-sm flex items-center gap-1 font-medium">
                      <Calendar className="w-4 h-4" /> {workshop.date}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-surface mb-4 leading-tight">{workshop.title}</h3>
                  <div className="flex gap-3 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <button 
                      onClick={(e) => handleBookNow(e, workshop)}
                      className="flex-1 bg-accent hover:bg-accent-light text-bg py-3 rounded-xl text-sm font-bold transition-colors text-center"
                    >
                      Book Now
                    </button>
                    <button className="flex-1 bg-surface/20 hover:bg-surface/30 backdrop-blur-sm text-surface py-3 rounded-xl text-sm font-bold transition-colors text-center border border-surface/20">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Workshop Details Modal */}
      <AnimatePresence>
        {selectedWorkshop && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" onClick={() => setSelectedWorkshop(null)}></div>
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              className="bg-bg w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative z-10"
            >
              <div className="sticky top-0 bg-bg/90 backdrop-blur-md border-b border-primary/10 p-4 sm:p-6 flex justify-between items-center z-20">
                <span className="text-accent text-xs font-bold uppercase tracking-wider">{selectedWorkshop.type}</span>
                <button 
                  onClick={() => setSelectedWorkshop(null)}
                  className="w-10 h-10 rounded-full bg-primary/5 hover:bg-primary/10 flex items-center justify-center text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 sm:p-10">
                <h2 className="font-serif text-3xl sm:text-4xl text-primary mb-4 leading-tight">{selectedWorkshop.title}</h2>
                <div className="flex items-center gap-2 text-primary/60 text-sm mb-8 pb-8 border-b border-primary/10">
                  <Calendar className="w-5 h-5 text-accent" />
                  <span className="font-medium text-primary">{selectedWorkshop.date}</span>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-accent" /> Course Outline
                    </h3>
                    <ul className="space-y-2">
                      {selectedWorkshop.outline.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-primary/80">
                          <span className="text-accent font-bold mt-0.5">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5 text-accent" /> Expected Results
                    </h3>
                    <p className="text-primary/80 leading-relaxed">{selectedWorkshop.expectedResults}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                      <HeartHandshake className="w-5 h-5 text-accent" /> Required Mindset
                    </h3>
                    <p className="text-primary/80 leading-relaxed">{selectedWorkshop.mindset}</p>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-primary/10">
                  <button 
                    onClick={(e) => handleBookNow(e, selectedWorkshop)}
                    className="w-full bg-accent text-bg py-4 rounded-xl font-bold text-lg hover:bg-accent-light transition-colors flex items-center justify-center gap-2"
                  >
                    Book Your Spot Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Workshop Booking Confirmation Modal */}
      <AnimatePresence>
        {confirmingWorkshop && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" onClick={() => !showConfirmation && setConfirmingWorkshop(null)}></div>
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              className="bg-bg w-full max-w-md rounded-3xl shadow-2xl relative z-10 p-6 sm:p-8"
            >
              <h3 className="font-serif text-2xl text-primary mb-4">Confirm Registration</h3>
              <p className="text-primary/80 mb-6">
                You are about to register for:
                <br />
                <strong className="text-primary block mt-2 text-lg">{confirmingWorkshop.title}</strong>
                <span className="text-sm text-primary/60 block mt-1">{confirmingWorkshop.date}</span>
              </p>
              
              <AnimatePresence mode="wait">
                {showConfirmation ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-green-50 text-green-800 p-4 rounded-xl flex items-center justify-center gap-2 border border-green-200"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-medium">Confirmed! Redirecting...</span>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-3"
                  >
                    <button 
                      onClick={() => setConfirmingWorkshop(null)}
                      className="flex-1 py-3 rounded-xl font-bold text-primary border border-primary/20 hover:bg-primary/5 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={confirmWorkshopBooking}
                      className="flex-1 bg-accent hover:bg-accent-light text-bg py-3 rounded-xl font-bold transition-colors"
                    >
                      Confirm
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Resources = () => {
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasFinishedReading, setHasFinishedReading] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    setVisibleCount(6);
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    if (selectedArticle) {
      setHasFinishedReading(false);
    }
  }, [selectedArticle]);

  const handleScroll = () => {
    if (!scrollRef.current || hasFinishedReading) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    // Check if user has scrolled to bottom (with a small 10px buffer)
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setHasFinishedReading(true);
    }
  };

  return (
    <section id="resources" className="py-24 bg-surface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <span className="text-accent font-medium tracking-widest uppercase text-sm mb-2 block">Knowledge Hub</span>
            <h2 className="font-serif text-4xl text-primary mb-6">Guidance from Quran & Sunnah</h2>
            <p className="text-primary/70 mb-8">
              Explore our library of articles, hadees explanations, and practical guides for building a stronger family life.
            </p>
            
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-primary/40" />
              </div>
              <input
                type="text"
                placeholder="Search articles, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-primary/20 bg-bg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>

            <a 
              href="#resources"
              className="inline-flex items-center justify-center gap-2 bg-primary text-bg px-6 py-3 rounded-full text-sm font-medium hover:bg-primary-light transition-all duration-300 group"
            >
              <span>Browse All Resources</span>
              <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
            </a>
          </div>
          
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === 'All' ? 'bg-accent text-bg' : 'bg-primary/5 text-primary hover:bg-primary/10'}`}
              >
                All
              </button>
              {categoriesList.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-accent text-bg' : 'bg-primary/5 text-primary hover:bg-primary/10'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {filteredArticles.slice(0, visibleCount).map((article, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedArticle(article)}
                  className="group block p-6 rounded-2xl border border-primary/10 hover:border-accent/50 hover:bg-bg transition-all cursor-pointer shadow-sm hover:shadow-md"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-accent text-xs font-bold uppercase tracking-wider mb-2 block">{article.category}</span>
                      <h3 className="font-serif text-xl text-primary group-hover:text-accent transition-colors mb-2">{article.title}</h3>
                      <p className="text-primary/70 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                      <span className="text-primary/50 text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {article.readTime}
                      </span>
                    </div>
                    <div className="w-10 h-10 shrink-0 rounded-full bg-surface border border-primary/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-bg transition-all">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {visibleCount < filteredArticles.length && (
              <div className="mt-10 text-center">
                <button 
                  onClick={() => setVisibleCount(prev => Math.min(prev + 6, filteredArticles.length))}
                  className="bg-primary/5 text-primary px-8 py-3 rounded-full text-sm font-medium hover:bg-primary/10 transition-colors inline-flex items-center gap-2"
                >
                  Load More Articles <span className="text-primary/50">({filteredArticles.length - visibleCount} remaining)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" onClick={() => setSelectedArticle(null)}></div>
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              className="bg-bg w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative z-10"
              onScroll={handleScroll}
              ref={scrollRef}
            >
              <div className="sticky top-0 bg-bg/90 backdrop-blur-md border-b border-primary/10 p-4 sm:p-6 flex justify-between items-center z-20">
                <span className="text-accent text-xs font-bold uppercase tracking-wider">{selectedArticle.category}</span>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="w-10 h-10 rounded-full bg-primary/5 hover:bg-primary/10 flex items-center justify-center text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 sm:p-10">
                <h2 className="font-serif text-3xl sm:text-4xl text-primary mb-4 leading-tight">{selectedArticle.title}</h2>
                <div className="flex items-center gap-4 text-primary/50 text-sm mb-10 pb-10 border-b border-primary/10">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {selectedArticle.readTime}</span>
                  <span>•</span>
                  <span>Mawaddah Editorial</span>
                </div>
                <div 
                  className="prose prose-lg prose-p:text-primary/80 prose-headings:text-primary max-w-none leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                />
                
                <AnimatePresence>
                  {hasFinishedReading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-12 p-6 bg-accent/5 border border-accent/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-accent text-bg flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-serif text-lg text-primary mb-1">Jazakallah Khair for reading</h4>
                          <p className="text-primary/70 text-sm">We hope you found this article beneficial. Consider sharing it with someone who might need it.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary/50 mr-2">Share:</span>
                        <a 
                          href={`https://wa.me/?text=${encodeURIComponent(`Read this beneficial article: ${selectedArticle.title} - ${window.location.href}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-colors"
                          aria-label="Share on WhatsApp"
                        >
                          <Share2 className="w-4 h-4" />
                        </a>
                        <a 
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-colors"
                          aria-label="Share on Facebook"
                        >
                          <Facebook className="w-4 h-4" />
                        </a>
                        <a 
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Read this beneficial article: ${selectedArticle.title}`)}&url=${encodeURIComponent(window.location.href)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white flex items-center justify-center transition-colors"
                          aria-label="Share on Twitter"
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Aisha",
      context: "Pre-Marital Counseling",
      quote: "The pre-marital sessions completely shifted our perspective. We learned how to communicate our expectations clearly and align our goals with the Sunnah. Truly invaluable."
    },
    {
      name: "Omar & Fatima",
      context: "Couple Therapy",
      quote: "We were struggling to find common ground after 5 years of marriage. The Sheikh's guidance helped us rebuild our connection with patience and Islamic wisdom."
    },
    {
      name: "Zainab",
      context: "Parenting Guidance",
      quote: "Raising kids in the modern world is challenging. The Tarbiyah strategies I learned here gave me practical tools to instill Islamic values in my children with love."
    }
  ];

  return (
    <section className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-medium tracking-widest uppercase text-sm mb-2 block">Alhamdulillah</span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary">Stories of Growth</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="bg-surface p-8 rounded-3xl border border-primary/5 shadow-sm relative group hover:shadow-md transition-shadow"
            >
              <Quote className="w-10 h-10 text-accent/20 absolute top-6 right-6 group-hover:text-accent/40 transition-colors duration-500" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (idx * 0.2) + (i * 0.1) + 0.3, duration: 0.4 }}
                  >
                    <Star className="w-4 h-4 fill-accent text-accent" />
                  </motion.div>
                ))}
              </div>
              <p className="text-primary/80 italic mb-6 leading-relaxed">"{t.quote}"</p>
              <div>
                <h4 className="font-serif text-lg text-primary font-medium">{t.name}</h4>
                <span className="text-accent text-sm">{t.context}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "Are the consultations strictly confidential?",
      answer: "Yes, absolutely. All our consultations, whether in-person, over the phone, or via video, are strictly confidential. We adhere to professional ethical guidelines and Islamic principles of privacy (Amanah)."
    },
    {
      question: "What happens if I need to cancel or reschedule?",
      answer: "We understand that unexpected things happen. You can reschedule or cancel your appointment up to 24 hours in advance without any penalty. Please contact us as soon as possible if you need to make changes."
    },
    {
      question: "Are the workshops recorded for later viewing?",
      answer: "Most of our online masterclasses and workshops are recorded and made available to registered participants for a limited time. However, interactive support groups and certain sensitive sessions are not recorded to protect privacy."
    },
    {
      question: "Do you offer counseling for non-Muslims?",
      answer: "While our services are rooted in Islamic principles and primarily cater to the Muslim community, we welcome individuals of all backgrounds who are open to receiving guidance based on these values."
    },
    {
      question: "How do I join a video consultation?",
      answer: "Once your booking is confirmed, you will receive an email with a secure, unique video link. Simply click the link 5 minutes before your scheduled time to join the session."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm mb-2 block">Clarifications</span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-primary/10 rounded-2xl overflow-hidden bg-bg transition-all duration-300 hover:border-accent/30"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              >
                <span className="font-serif text-lg text-primary font-medium pr-4">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-accent flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-primary/70 leading-relaxed border-t border-primary/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Booking = () => {
  const [format, setFormat] = useState('Video Consultation');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Pre-Marital Counseling',
    date: '',
    time: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    const handlePrefill = (e: any) => {
      setFormData(prev => ({
        ...prev,
        type: e.detail.type || prev.type,
        description: e.detail.description || prev.description,
        date: e.detail.date || prev.date,
        time: e.detail.time || prev.time
      }));
    };
    window.addEventListener('prefill-booking', handlePrefill);
    return () => window.removeEventListener('prefill-booking', handlePrefill);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, format })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setIsSuccess(true);
        if (data.previewUrl) {
          setPreviewUrl(data.previewUrl);
        }
        
        // Save to localStorage
        const stored = localStorage.getItem('mawaddah_bookings');
        const bookings = stored ? JSON.parse(stored) : [];
        const newBooking: BookingRecord = {
          id: Math.random().toString(36).substring(2, 9),
          type: formData.type,
          format: format,
          date: formData.date,
          time: formData.time,
          description: formData.description,
          status: 'upcoming',
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('mawaddah_bookings', JSON.stringify([...bookings, newBooking]));
        
      } else {
        alert(data.error || 'Failed to book consultation. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-24 bg-primary text-surface relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 0L40 20L20 40L0 20Z" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern)"/>
        </svg>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-surface text-primary rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Book a 1:1 Consultation</h2>
            <p className="text-primary/70">Schedule a private, confidential session with our qualified Sheikhs and counselors.</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary/80 mb-2 uppercase tracking-wide text-xs">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-primary/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-bg" 
                  placeholder="Your name" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary/80 mb-2 uppercase tracking-wide text-xs">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-primary/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-bg" 
                  placeholder="you@example.com" 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary/80 mb-2 uppercase tracking-wide text-xs">Consultation Type</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-primary/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-bg appearance-none"
                >
                  <option>Pre-Marital Counseling</option>
                  <option>Couple Therapy</option>
                  <option>Parenting Guidance</option>
                  <option>General Mashwara</option>
                  <option>Workshop Registration</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary/80 mb-2 uppercase tracking-wide text-xs">Format</label>
                <select 
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-primary/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-bg appearance-none"
                >
                  <option value="Video Consultation">Video Consultation</option>
                  <option value="In-Person (Local Office)">In-Person (Local Office)</option>
                  <option value="Phone Call">Phone Call</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary/80 mb-2 uppercase tracking-wide text-xs">Preferred Date</label>
                <input 
                  type="date" 
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-primary/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-bg" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary/80 mb-2 uppercase tracking-wide text-xs">Preferred Time</label>
                <input 
                  type="time" 
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-primary/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-bg" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-primary/80 mb-2 uppercase tracking-wide text-xs">Briefly describe your situation</label>
              <textarea 
                rows={4} 
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-primary/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-bg resize-none" 
                placeholder="How can we help you?"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-accent text-bg py-4 rounded-xl font-medium text-lg hover:bg-[#A88B63] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-accent"
            >
              {isSubmitting ? 'Processing...' : <><Calendar className="w-5 h-5" /> Schedule Appointment</>}
            </button>
            
            <AnimatePresence mode="wait">
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-green-50 text-green-800 p-4 rounded-xl mt-4 border border-green-200"
                >
                  <p className="font-medium mb-1">Alhamdulillah! Your booking request has been received.</p>
                  <p className="text-sm opacity-90">A confirmation email has been sent to {formData.email}.</p>
                  {previewUrl && (
                    <a href={previewUrl} target="_blank" rel="noreferrer" className="text-sm underline mt-2 inline-block text-green-700 hover:text-green-900">
                      Preview Email (Test Mode)
                    </a>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            
            <AnimatePresence mode="wait">
              {format === 'Video Consultation' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-primary/5 p-4 rounded-xl flex items-start gap-3 mt-4 overflow-hidden"
                >
                  <Video className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <p className="text-xs text-primary/70 leading-relaxed">
                    <strong>Video Consultation:</strong> A secure video conferencing link will be automatically generated and emailed to you upon confirmation. All sessions are strictly confidential.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-bg py-12 border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <HeartHandshake className="h-6 w-6 text-cyan-500" />
            <span className="font-serif text-xl font-semibold text-red-500">Mawaddah</span>
          </div>
          <div className="flex gap-6 text-sm text-primary/70">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Contact</a>
          </div>
          <p className="text-sm text-primary/50">
            © {new Date().getFullYear()} Mawaddah Consultancy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export type BookingRecord = {
  id: string;
  type: string;
  format: string;
  date: string;
  time: string;
  description: string;
  status: 'upcoming' | 'past';
  createdAt: string;
};

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
};

const UserProfileModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'profile' | 'consultations' | 'workshops' | 'security'>('profile');
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Abdullah Example',
    email: 'abdullah@example.com',
    phone: '',
    location: '',
    bio: ''
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // 2FA State
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isSettingUp2FA, setIsSettingUp2FA] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState('');

  useEffect(() => {
    if (isOpen) {
      const storedBookings = localStorage.getItem('mawaddah_bookings');
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      }
      const storedProfile = localStorage.getItem('mawaddah_profile');
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
      const stored2FA = localStorage.getItem('mawaddah_2fa');
      if (stored2FA === 'enabled') {
        setIs2FAEnabled(true);
      }
    }
  }, [isOpen]);

  const handleSaveProfile = () => {
    localStorage.setItem('mawaddah_profile', JSON.stringify(profile));
    setIsEditingProfile(false);
  };

  const handleEnable2FA = () => {
    setIsSettingUp2FA(true);
    setVerificationCode('');
    setVerificationError('');
  };

  const handleVerify2FA = () => {
    if (verificationCode.length === 6) {
      setIs2FAEnabled(true);
      setIsSettingUp2FA(false);
      localStorage.setItem('mawaddah_2fa', 'enabled');
    } else {
      setVerificationError('Please enter a valid 6-digit code.');
    }
  };

  const handleDisable2FA = () => {
    setIs2FAEnabled(false);
    localStorage.removeItem('mawaddah_2fa');
  };

  const consultations = bookings.filter(b => b.type !== 'Workshop Registration');
  const workshops = bookings.filter(b => b.type === 'Workshop Registration');

  const upcomingConsultations = consultations.filter(b => b.status === 'upcoming').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const pastConsultations = consultations.filter(b => b.status === 'past').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const upcomingWorkshops = workshops.filter(b => b.status === 'upcoming').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const pastWorkshops = workshops.filter(b => b.status === 'past').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const renderBookingsList = (upcoming: BookingRecord[], past: BookingRecord[], emptyMessage: string) => {
    if (upcoming.length === 0 && past.length === 0) {
      return (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-primary/20 mx-auto mb-4" />
          <h3 className="text-xl font-serif text-primary mb-2">No Records Found</h3>
          <p className="text-primary/60">{emptyMessage}</p>
          <button 
            onClick={() => {
              onClose();
              document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-6 bg-accent text-bg px-6 py-2.5 rounded-full text-sm font-medium hover:bg-accent-light transition-colors inline-block"
          >
            Book Now
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-10">
        {upcoming.length > 0 && (
          <div>
            <h3 className="font-serif text-xl text-primary mb-4 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-accent" /> Upcoming
            </h3>
            <div className="space-y-4">
              {upcoming.map(booking => (
                <div key={booking.id} className="bg-surface border border-primary/10 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-accent mb-1 block">{booking.type}</span>
                    <h4 className="font-serif text-lg text-primary mb-1">{format(new Date(booking.date), 'MMMM d, yyyy')} at {booking.time}</h4>
                    <p className="text-sm text-primary/70 flex items-center gap-1 mb-2">
                      {booking.format === 'Video Consultation' ? <Video className="w-3.5 h-3.5" /> : <Phone className="w-3.5 h-3.5" />}
                      {booking.format}
                    </p>
                    {booking.description && (
                      <p className="text-sm text-primary/80 italic line-clamp-2">"{booking.description}"</p>
                    )}
                  </div>
                  <div className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Confirmed
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {past.length > 0 && (
          <div>
            <h3 className="font-serif text-xl text-primary mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary/40" /> Past
            </h3>
            <div className="space-y-4">
              {past.map(booking => (
                <div key={booking.id} className="bg-surface/50 border border-primary/5 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center opacity-70">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary/50 mb-1 block">{booking.type}</span>
                    <h4 className="font-serif text-lg text-primary mb-1">{format(new Date(booking.date), 'MMMM d, yyyy')} at {booking.time}</h4>
                    <p className="text-sm text-primary/60 flex items-center gap-1 mb-2">
                      {booking.format === 'Video Consultation' ? <Video className="w-3.5 h-3.5" /> : <Phone className="w-3.5 h-3.5" />}
                      {booking.format}
                    </p>
                    {booking.description && (
                      <p className="text-sm text-primary/60 italic line-clamp-2">"{booking.description}"</p>
                    )}
                  </div>
                  <div className="bg-primary/10 text-primary/60 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Completed
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" onClick={onClose}></div>
          <motion.div 
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className="bg-bg w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative z-10 flex flex-col md:flex-row"
          >
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-surface border-r border-primary/10 p-6 flex flex-col gap-2 shrink-0">
              <div className="flex justify-between items-center md:hidden mb-4">
                <h2 className="font-serif text-2xl text-primary">My Profile</h2>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-primary/5 hover:bg-primary/10 flex items-center justify-center text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="hidden md:block mb-8">
                <h2 className="font-serif text-2xl text-primary">My Profile</h2>
              </div>

              <button 
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${activeTab === 'profile' ? 'bg-accent text-bg' : 'text-primary/70 hover:bg-primary/5'}`}
              >
                <Users className="w-5 h-5" /> Personal Info
              </button>
              <button 
                onClick={() => setActiveTab('consultations')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${activeTab === 'consultations' ? 'bg-accent text-bg' : 'text-primary/70 hover:bg-primary/5'}`}
              >
                <Phone className="w-5 h-5" /> Consultations
              </button>
              <button 
                onClick={() => setActiveTab('workshops')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${activeTab === 'workshops' ? 'bg-accent text-bg' : 'text-primary/70 hover:bg-primary/5'}`}
              >
                <BookOpen className="w-5 h-5" /> Workshops
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${activeTab === 'security' ? 'bg-accent text-bg' : 'text-primary/70 hover:bg-primary/5'}`}
              >
                <ShieldCheck className="w-5 h-5" /> Security
              </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 sm:p-10 relative">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-primary/5 hover:bg-primary/10 hidden md:flex items-center justify-center text-primary transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {activeTab === 'profile' && (
                <div className="max-w-xl">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-serif text-2xl text-primary">Personal Information</h3>
                    {!isEditingProfile && (
                      <button 
                        onClick={() => setIsEditingProfile(true)}
                        className="text-accent text-sm font-bold uppercase tracking-wider hover:text-accent-light transition-colors"
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  {isEditingProfile ? (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-primary/80 mb-2 uppercase tracking-wide text-xs">Full Name</label>
                        <input 
                          type="text" 
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-primary/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-surface" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary/80 mb-2 uppercase tracking-wide text-xs">Email Address</label>
                        <input 
                          type="email" 
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-primary/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-surface" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary/80 mb-2 uppercase tracking-wide text-xs">Phone Number</label>
                        <input 
                          type="tel" 
                          value={profile.phone}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-primary/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-surface" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary/80 mb-2 uppercase tracking-wide text-xs">Location</label>
                        <input 
                          type="text" 
                          value={profile.location}
                          onChange={(e) => setProfile({...profile, location: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-primary/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-surface" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary/80 mb-2 uppercase tracking-wide text-xs">Bio / Notes</label>
                        <textarea 
                          rows={4}
                          value={profile.bio}
                          onChange={(e) => setProfile({...profile, bio: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-primary/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-surface resize-none" 
                        />
                      </div>
                      <div className="flex gap-4 pt-4">
                        <button 
                          onClick={() => setIsEditingProfile(false)}
                          className="px-6 py-2.5 rounded-full text-sm font-medium text-primary border border-primary/20 hover:bg-primary/5 transition-colors"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={handleSaveProfile}
                          className="bg-accent text-bg px-6 py-2.5 rounded-full text-sm font-medium hover:bg-accent-light transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-3xl text-primary font-serif">
                          {profile.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-serif text-2xl text-primary mb-1">{profile.name}</h4>
                          <p className="text-primary/60">{profile.email}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-primary/10">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-primary/50 mb-1 block">Phone</span>
                          <p className="text-primary">{profile.phone || 'Not provided'}</p>
                        </div>
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-primary/50 mb-1 block">Location</span>
                          <p className="text-primary">{profile.location || 'Not provided'}</p>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-primary/50 mb-1 block">Bio / Notes</span>
                          <p className="text-primary">{profile.bio || 'No bio provided.'}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'consultations' && (
                <div>
                  <h3 className="font-serif text-2xl text-primary mb-8">Consultation History</h3>
                  {renderBookingsList(upcomingConsultations, pastConsultations, "You haven't booked any consultations yet.")}
                </div>
              )}

              {activeTab === 'workshops' && (
                <div>
                  <h3 className="font-serif text-2xl text-primary mb-8">Workshop Enrollments</h3>
                  {renderBookingsList(upcomingWorkshops, pastWorkshops, "You haven't enrolled in any workshops yet.")}
                </div>
              )}

              {activeTab === 'security' && (
                <div className="max-w-xl">
                  <h3 className="font-serif text-2xl text-primary mb-8">Security Settings</h3>
                  
                  <div className="bg-surface border border-primary/10 rounded-2xl p-6 sm:p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${is2FAEnabled ? 'bg-green-100 text-green-600' : 'bg-primary/5 text-primary/60'}`}>
                        {is2FAEnabled ? <ShieldCheck className="w-6 h-6" /> : <Shield className="w-6 h-6" />}
                      </div>
                      <div>
                        <h4 className="font-serif text-xl text-primary mb-2">Two-Factor Authentication (2FA)</h4>
                        <p className="text-primary/70 text-sm leading-relaxed">
                          Add an extra layer of security to your account. Once enabled, you'll be required to enter both your password and an authentication code from your mobile device when signing in.
                        </p>
                      </div>
                    </div>

                    {is2FAEnabled ? (
                      <div className="border-t border-primary/10 pt-6 mt-6">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-green-600 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" /> 2FA is currently enabled
                          </span>
                          <button 
                            onClick={handleDisable2FA}
                            className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                          >
                            Disable 2FA
                          </button>
                        </div>
                      </div>
                    ) : isSettingUp2FA ? (
                      <div className="border-t border-primary/10 pt-6 mt-6 space-y-6">
                        <div className="bg-primary/5 p-4 rounded-xl text-sm text-primary/80">
                          <p className="font-medium mb-2">Step 1: Scan the QR Code</p>
                          <p>Open your authenticator app (like Google Authenticator or Authy) and scan the QR code below.</p>
                        </div>
                        
                        <div className="flex justify-center py-4">
                          <div className="w-48 h-48 bg-white border-2 border-primary/20 rounded-xl flex items-center justify-center p-4">
                            {/* Simulated QR Code */}
                            <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNMTAgMTBoMjB2MjBIMTB6bTQwIDBoMjB2MjBINTB6bTQwIDBoMjB2MjBIOTB6TTEwIDQwaDIwdjIwSDEwem00MCAwaDIwdjIwSDUwem00MCAwaDIwdjIwSDkwek0xMCA3MGgyMHYyMEgxMHptNDAgMGgyMHYyMEg1MHptNDAgMGgyMHYyMEg5MHoiIGZpbGw9IiMyQzNFMkQiIG9wYWNpdHk9IjAuOCIvPjwvc3ZnPg==')] bg-cover opacity-50"></div>
                          </div>
                        </div>

                        <div className="bg-primary/5 p-4 rounded-xl text-sm text-primary/80">
                          <p className="font-medium mb-2">Step 2: Enter Verification Code</p>
                          <p className="mb-4">Enter the 6-digit code generated by your authenticator app.</p>
                          
                          <div className="flex flex-col gap-2">
                            <input 
                              type="text" 
                              maxLength={6}
                              placeholder="000000"
                              value={verificationCode}
                              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                              className="w-full max-w-[200px] px-4 py-3 rounded-xl border border-primary/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-surface text-center text-xl tracking-[0.5em] font-mono" 
                            />
                            {verificationError && <p className="text-red-500 text-xs mt-1">{verificationError}</p>}
                          </div>
                        </div>

                        <div className="flex gap-4 pt-2">
                          <button 
                            onClick={() => setIsSettingUp2FA(false)}
                            className="px-6 py-2.5 rounded-full text-sm font-medium text-primary border border-primary/20 hover:bg-primary/5 transition-colors"
                          >
                            Cancel
                          </button>
                          <button 
                            onClick={handleVerify2FA}
                            className="bg-accent text-bg px-6 py-2.5 rounded-full text-sm font-medium hover:bg-accent-light transition-colors"
                          >
                            Verify & Enable
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="border-t border-primary/10 pt-6 mt-6">
                        <button 
                          onClick={handleEnable2FA}
                          className="bg-primary text-bg px-6 py-2.5 rounded-full text-sm font-medium hover:bg-primary-light transition-colors"
                        >
                          Set Up 2FA
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('mawaddah_bookings');
    if (!stored) {
      const mockBookings: BookingRecord[] = [
        {
          id: 'mock-1',
          type: 'General Mashwara',
          format: 'Video Consultation',
          date: format(addMonths(new Date(), 1), 'yyyy-MM-dd'),
          time: '14:00',
          description: 'I would like to book a 1:1 consultation with Sheikh Abdullah Hasan.',
          status: 'upcoming',
          createdAt: new Date().toISOString()
        },
        {
          id: 'mock-2',
          type: 'Pre-Marital Counseling',
          format: 'In-Person (Local Office)',
          date: format(subMonths(new Date(), 2), 'yyyy-MM-dd'),
          time: '10:30',
          description: 'Initial consultation before our Nikah.',
          status: 'past',
          createdAt: subMonths(new Date(), 3).toISOString()
        }
      ];
      localStorage.setItem('mawaddah_bookings', JSON.stringify(mockBookings));
    }
  }, []);

  return (
    <div className="min-h-screen bg-bg selection:bg-accent/30">
      <Navbar onOpenUserProfile={() => setIsUserProfileOpen(true)} />
      <main>
        <Hero />
        <QuranicQuote />
        <AboutUs />
        <Services />
        <OurSheikhs />
        <Workshops />
        <Resources />
        <Testimonials />
        <FAQ />
        <Booking />
      </main>
      <Footer />
      <UserProfileModal isOpen={isUserProfileOpen} onClose={() => setIsUserProfileOpen(false)} />
    </div>
  );
}
