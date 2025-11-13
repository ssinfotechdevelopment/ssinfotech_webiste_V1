import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, Stars, Users, Target, Eye, Album, Heart, Lightbulb } from "lucide-react";

// Enhanced animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const slideIn = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      when: "beforeChildren",
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    },
  },
};

const floatingAnimation = {
  animate: {
    y: [0, -12, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const gradientPulse = {
  animate: {
    background: [
      "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
      "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)",
      "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
    ],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const AboutUs = () => {
  const sections = useMemo(
    () => [
      {
        title: "Who We Are",
        subtitle: "About Our Company",
        icon: Users,
        image: "aboutimg/whoweare2.jpg",
        alt: "Company Team",
        content: [
          '"S.S. Infotech is a Nagpur-based IT solutions company committed to delivering innovative, reliable, and high-performance digital solutions. We specialize in web and application development, software integration, and digital transformation, empowering businesses to achieve growth, efficiency, and success through technology-driven excellence."',
        ],
      },
      {
        title: "Our Founder's Vision",
        subtitle: "Founder",
        icon: Sparkles,
        image: "aboutimg/mangesh sir.jpg",
        alt: "Founder - Mr. Mangesh Ingle",
        content: [
          '"Our journey began with a simple yet powerful idea — to build technology that transforms possibilities into progress. I\'ve always believed that true innovation lies in understanding real problems and solving them with precision and creativity."',
          '"What started as a vision to develop smart, reliable software has grown into a purpose — to create meaningful digital experiences that empower businesses and people alike. Every project reflects our passion for excellence and our constant drive to redefine what technology can achieve."',
          "- Mr. Mangesh Ingle, Founder & CEO",
        ],
        order: "md:order-2",
        contentOrder: "order-2 md:order-1",
      },
      {
        title: "Driving Innovation Forward",
        subtitle: "Director - SS Infotech",
        icon: Target,
        image: "aboutimg/allan sir.jpg",
        alt: "Director - Mr. Allan Abraham",
        content: [
          '"As Director, my focus is on leading a team that blends creativity with technology to deliver practical, high-impact solutions. We are driven by curiosity and a shared belief that the best results come from collaboration, dedication, and continuous learning."',
          '"In a fast-changing digital world, our commitment remains constant — to build software that is efficient, scalable, and tailored to every client\'s unique vision. For us, success means seeing our work make a real difference."',
          "- Mr. Allan Abraham, Director",
        ],
      },
      {
        title: "Global Perspective, Local Impact",
        subtitle: "Overseas Director",
        icon: Eye,
        image: "aboutimg/allvi sir.jpg",
        alt: "Overseas Director - Dr. N. G. Alvi",
        content: [
          '"My goal is to guide students and professionals toward global opportunities that expand their learning and career horizons. We connect ambitious minds with top international institutions, helping them achieve their dreams through the right guidance and support."',
          '"With a global outlook and a personal touch, our focus is on bridging education, innovation, and opportunity — creating pathways that empower individuals to grow, learn, and lead across borders."',
          "- Dr. N. G. Alvi, Overseas Director",
        ],
        order: "md:order-2",
        contentOrder: "order-2 md:order-1",
      },
    ],
    []
  );

  const missionVision = useMemo(
    () => [
      {
        title: "Our Vision",
        icon: Eye,
        content:
          "We share a vision of dedicating our intelligence and expertise to help create a world strengthened through Information Technology. This entails not only harnessing existing technologies but also innovating and inventing new ones. We envision a future where Information Technology serves as a powerful force for positive change, driving innovation, connectivity, and progress across all aspects of society. Through our commitment to continuous learning, exploration, and creativity, we strive to push the boundaries of what is possible, shaping a brighter and more technologically advanced world for generations to come.",
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200"
      },
      {
        title: "Our Mission",
        icon: Target,
        content:
          "To achieve and maintain the confidence, trust and loyalty of our clients. Everything has been achieved and will achieve is due to the excellent and exceptional relationship it shares with its customers. We at SS Infotech believe that these relationships are the company's most priceless and precious assets. With you, we create and deliver business and technology solution that fit your needs and not drive the results you want. People matters, results count.",
        color: "from-purple-500 to-indigo-500",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200"
      },
      {
        title: "Our Objective",
        icon: Heart,
        content:
          "Our objective at S.S. Infotech is clear: to cultivate enduring relationships with our clients built on trust, loyalty, and exceptional service. We are dedicated to leveraging our intelligence and expertise to pioneer new technologies and advance Information Technology for the betterment of society. Also, the S.S InfoTech provides an opportunity to the students to gets exposed to a very large area of technology and its processes. .",
        color: "from-green-500 to-emerald-500",
        bgColor: "bg-green-50",
        borderColor: "border-green-200"
      },
      {
        title: "Our Care",
        icon: Lightbulb,
        content:
          "At S.S. Infotech, our utmost priority lies in fostering enduring relationships with our clients, rooted in trust, loyalty, and exceptional service. We are driven by a shared vision to dedicate our intelligence and expertise towards shaping a world strengthened by Information Technology. With a deep understanding of the importance of people in our endeavors, we are committed to prioritizing your needs and delivering tailored business and technology solutions that drive meaningful results. Your success is our care, and we are passionate about partnering with you on your journey towards technological excellence and a brighter future.",
        color: "from-orange-500 to-amber-500",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200"
      },
    ],
    []
  );

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-purple-50/30 text-gray-800 font-sans relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-purple-400/15 rounded-full blur-xl will-change-transform"
        animate={{
          y: [0, 25, 0],
          x: [0, 15, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-32 right-20 w-28 h-28 bg-blue-400/20 rounded-full blur-2xl will-change-transform"
        animate={{
          y: [0, -35, 0],
          x: [0, -20, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-1/5 will-change-transform"
        variants={floatingAnimation}
        animate="animate"
      >
        <Stars className="h-6 w-6 text-purple-300/80" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/3 will-change-transform"
        variants={floatingAnimation}
        animate="animate"
        style={{ animationDelay: "2s" }}
      >
        <Sparkles className="h-5 w-5 text-blue-300/80"/>
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-slate-900 via-purple-900 to-slate-800  text-white">
        <motion.div
          className="absolute -top-1/2 -left-1/4 w-1/2 h-1/2 bg-purple-500/15 rounded-full blur-3xl will-change-transform"
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/15 rounded-full blur-3xl will-change-transform"
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
        />

        <div className="absolute inset-0 overflow-hidden">
          <video
            src="/aboutus.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-purple-900/60" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
            className="space-y-8"
          >
            <motion.div
              className="inline-flex items-center justify-center mb-6"
              variants={item}
            >
              <motion.div
                className="bg-white/10 backdrop-blur-md text-white/90 px-8 py-4 text-lg border border-white/20 shadow-2xl shadow-purple-500/10 rounded-full font-semibold"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Sparkles className="w-5 h-5 mr-3 inline" />
                About Our Journey
              </motion.div>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
            >
              Discover Our{" "}
              <motion.span
                className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent inline-block"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                Story
              </motion.span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-xl sm:text-2xl md:text-3xl text-white/90 leading-relaxed max-w-4xl mx-auto font-light"
            >
              Discover our mission, vision, and the dedicated team driving our{" "}
              <motion.span
                className="font-semibold text-white"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                success in technology innovation.
              </motion.span>
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 will-change-transform"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-3 bg-white/80 rounded-full mt-2"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Content Sections */}
      {sections.map((section, index) => (
        <section
          key={section.title}
          className={`py-20 container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${
            index % 2 === 1 
              ? "bg-gradient-to-br from-white to-slate-50/80" 
              : "bg-gradient-to-br from-slate-50/80 to-white"
          }`}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 blur-3xl rounded-full will-change-transform"
            animate={{
              opacity: [0.1, 0.15, 0.1],
              scale: [1, 1.1, 1],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          />
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={container}
            className="grid md:grid-cols-2 gap-12 items-center relative"
          >
            {/* Image */}
            <motion.div 
              variants={scaleIn}
              className={`relative ${section.order || ""}`}
            >
              <motion.div
                className="relative overflow-hidden rounded-2xl shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <motion.img
                  src={section.image}
                  alt={section.alt}
                  className="w-[400px] h-[400px] object-cover   lg:w-[800px] lg:h-[800px]"
                  loading="lazy"
                  onError={(e) => (e.target.src = "/imgs/placeholder.jpg")}
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
              
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl -z-10 will-change-transform"
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>

            {/* Content */}
            <motion.div
              variants={slideIn}
              className={`space-y-8 ${section.contentOrder || ""}`}
            >
              <motion.div 
                className="inline-flex items-center"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="bg-white p-3 rounded-xl shadow-lg border border-slate-200"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  <section.icon className="w-7 h-7 text-purple-600" />
                </motion.div>
                <span className="ml-4 text-purple-600 font-semibold text-lg tracking-wide">
                  {section.subtitle}
                </span>
              </motion.div>
              
              <motion.h2 
                className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight"
                variants={fadeUp}
                custom={0.1}
              >
                {section.title}
              </motion.h2>
              
              <motion.div 
                className="space-y-6 text-slate-700 text-lg leading-relaxed"
                variants={container}
              >
                {section.content.map((paragraph, i) => (
                  <motion.p 
                    key={i}
                    variants={fadeUp}
                    custom={0.2 + i * 0.1}
                    className="text-slate-600 font-light"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      ))}

      {/* Mission & Vision Section - Simplified & Professional */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Our Core Principles
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Driving innovation and excellence through clear vision, focused mission, and strong values
            </motion.p>
          </motion.div>

          {/* 2x2 Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="grid md:grid-cols-2 gap-8"
          >
            {missionVision.map((item, index) => (
              <motion.div
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6 }}
                className={`group relative ${item.bgColor} border ${item.borderColor} rounded-2xl p-8 transition-all duration-300 hover:shadow-xl`}
              >
                {/* Icon */}
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} shadow-lg`}>
                    <item.icon className="w-6 h-6 " />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 ml-4">
                    {item.title}
                  </h3>
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed text-lg">
                  {item.content}
                </p>

                {/* Hover effect line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;