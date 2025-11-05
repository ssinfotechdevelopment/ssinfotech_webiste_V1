import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import {
  Phone, Mail, MessageCircle, MapPin, ExternalLink, Building,
  Clock, Navigation, Calendar, Facebook, Linkedin, Instagram,
  Send, FileText, HeadphonesIcon, Stars, Sparkles, CheckCircle
} from "lucide-react";
import { Button } from "../components/UI/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/UI/Card";
import { Badge } from "../components/UI/Badge";
import { Input } from "../components/UI/Input";
import { Label } from "../components/UI/Lable ";
import { Textarea } from "../components/UI/Textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "../components/UI/Select";

// WhatsApp Configuration
const WHATSAPP_NUMBER = "917719927774";

export default function ContactUs() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.95]);

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren"
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Memoized data
  const contactMethods = useMemo(() => [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our team",
      primary: "+91 7720846048",
      secondary: "+91 77199 27774",
      available: "Mon-Sat, 9 AM - 6 PM",
      action: "tel:+917720846048"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed information via email",
      primary: "hr@ssinfo.co",
      secondary: "Our official mail id",
      available: "24/7 Response",
      action: "mailto:hr@ssinfo.co"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Chat",
      description: "Quick support on WhatsApp",
      primary: "+91 77199 27774",
      secondary: "Quick Response",
      available: "Mon-Sun, 9 AM - 9 PM",
      action: `https://wa.me/${WHATSAPP_NUMBER}`
    },
    {
      icon: MapPin,
      title: "Visit Our Campus",
      description: "Come and see our facilities",
      primary: "Plot No.26, Khandwekar Bunglow, 2nd Floor,",
      secondary: "Near Lendra park, Nagpur - 440012",
      action: "https://maps.google.com"
    }
  ], []);

  // Form validation function
  const validateForm = () => {
    const newErrors = {};
    const formData = new FormData(formRef.current);

    const firstName = formData.get('firstName')?.trim();
    const lastName = formData.get('lastName')?.trim();
    const email = formData.get('email')?.trim();
    const phone = formData.get('phone')?.trim();
    const subject = formData.get('subject');
    const message = formData.get('message')?.trim();

    if (!firstName) newErrors.firstName = 'First Name is required';
    if (!lastName) newErrors.lastName = 'Last Name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Email format is invalid';
    }
    if (!phone) {
      newErrors.phone = 'Phone Number is required';
    } else if (!/^(\+91|91)?[6-9]\d{9}$/.test(phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid Indian phone number';
    }
    if (!subject) newErrors.subject = 'Subject is required';
    if (!message) newErrors.message = 'Message is required';
    if (message && message.length < 10) newErrors.message = 'Message should be at least 10 characters';

    return newErrors;
  };

  // WhatsApp form submission handler
  const sendWhatsApp = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setFormStatus(null);
    setErrors({});

    const formData = new FormData(formRef.current);
    
    const firstName = formData.get('firstName')?.trim();
    const lastName = formData.get('lastName')?.trim();
    const email = formData.get('email')?.trim();
    const phone = formData.get('phone')?.trim();
    const subject = formData.get('subject');
    const program = formData.get('program');
    const message = formData.get('message')?.trim();

    // Create WhatsApp message with all form details
    const whatsappMessage = `Hello SS Infotech!%0A%0A*New Contact Form Submission*%0A%0A*Name:* ${firstName} ${lastName}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Subject:* ${subject}%0A*Program Interest:* ${program || 'Not specified'}%0A%0A*Message:*%0A${message}%0A%0AI would like to get more information about your services. Please contact me back.`;

    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      
      setFormStatus({ 
        type: 'success', 
        message: 'WhatsApp is opening with your message! Please send the message to connect with us.' 
      });
      
      // Reset form after a delay
      setTimeout(() => {
        formRef.current.reset();
        setFormStatus(null);
        setIsSubmitting(false);
      }, 3000);
    }, 1000);
  };

  // Handle direct contact method clicks
  const handleContactMethodClick = (method, index) => {
    if (method.action) {
      if (method.action.startsWith('tel:') || method.action.startsWith('mailto:') || method.action.startsWith('http')) {
        window.open(method.action, '_blank');
      }
    }
  };

  // Quick WhatsApp message templates
  const quickMessages = useMemo(() => [
    {
      title: "Course Inquiry",
      message: "Hello! I'm interested in learning more about your courses. Can you please share details about course duration, fees, and placement opportunities?"
    },
    {
      title: "Admission Process",
      message: "Hi! I'd like to know about the admission process and eligibility criteria for your programs. Could you guide me through the steps?"
    },
    {
      title: "Placement Assistance",
      message: "Hello! I want to know more about your placement assistance program. What companies do you partner with and what's the placement record?"
    }
  ], []);

  const sendQuickMessage = (message) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-0" ref={sectionRef}>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden text-white">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            src="/contactus.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.6) contrast(1.1)' }}
          />
        </div>

        {/* Professional Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/95 via-purple-700/90 " />

        {/* Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Professional Glass Badge */}
            <div className="inline-flex items-center bg-white/15 backdrop-blur-xl border border-white/40 rounded-full px-8 py-3.5 text-lg font-bold text-white shadow-2xl shadow-purple-900/50">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-300" />
              Contact Us
            </div>

            {/* Hero Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight">
              Let's Start Your{" "}
              <span className="block bg-gradient-to-r from-purple-900/95 via-purple-700/90  bg-clip-text text-white animate-gradient">
                Success Journey
              </span>
            </h1>

            {/* Paragraph */}
            <p className="text-lg sm:text-xl md:text-2xl text-purple-50 leading-relaxed max-w-3xl mx-auto font-medium drop-shadow-md">
              Have questions about our programs? Need guidance on your career path?{" "}
              <span className="text-white font-bold">
                Our team is here to help you every step of the way.
              </span>{" "}
              Get in touch with us today.
            </p>
          </motion.div>
        </div>

        <style>{`
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 4s ease infinite;
          }
        `}</style>
      </section>

      {/* Quick Contact Methods */}
      <motion.section
        className="py-16 bg-background relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div className="text-center space-y-4 mb-12" variants={item}>
            <motion.h2 className="text-3xl sm:text-4xl font-bold text-foreground" variants={item}>
              Get in Touch
            </motion.h2>
            <motion.p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto" variants={item}>
              Choose the best way to reach us — we're here to help with all your questions
            </motion.p>
          </motion.div>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" variants={container}>
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                custom={index}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <Card 
                  className="border-0 shadow-lg hover:shadow-xl transition-all bg-gradient-to-b from-white to-purple-50 cursor-pointer"
                  onClick={() => handleContactMethodClick(method, index)}
                >
                  <CardContent className="p-6 space-y-4 text-center">
                    <motion.div
                      className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mx-auto group-hover:bg-purple-200 transition-colors will-change-transform"
                      whileHover={{ rotate: 8, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <method.icon className="h-6 w-6 text-purple-600" />
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground">{method.title}</h3>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium text-purple-600">{method.primary}</div>
                      <div className="text-sm text-muted-foreground">{method.secondary}</div>
                      {method.available && (
                        <div className="text-xs text-muted-foreground">{method.available}</div>
                      )}
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-transform">
                      Contact Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Message Templates */}
      <motion.section
        className="py-16 bg-gradient-to-br from-purple-50 to-purple-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center space-y-4 mb-12" variants={item}>
            <motion.h2 className="text-3xl sm:text-4xl font-bold text-foreground" variants={item}>
              Quick Message Templates
            </motion.h2>
            <motion.p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto" variants={item}>
              Send us a quick message using these pre-written templates
            </motion.p>
          </motion.div>
          <motion.div className="grid md:grid-cols-3 gap-6" variants={container}>
            {quickMessages.map((quickMsg, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                custom={index}
                whileHover={{ y: -5 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-foreground">{quickMsg.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {quickMsg.message}
                      </p>
                      <Button 
                        onClick={() => sendQuickMessage(quickMsg.message)}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Send via WhatsApp
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        className="py-16 bg-gray-50 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div className="grid lg:grid-cols-2 gap-8" variants={container}>
            {/* Contact Form */}
            <motion.div className="space-y-6" variants={fadeUp} custom={0}>
              <motion.div className="space-y-4" variants={fadeUp} custom={0.1}>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                  Send Detailed Message via WhatsApp
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground">
                  Fill out the form and we'll open WhatsApp with your pre-filled message
                </p>
                
                {/* Success Message */}
                {formStatus?.type === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                    <span className="text-purple-800 font-medium">{formStatus.message}</span>
                  </motion.div>
                )}

                {/* Error Message */}
                {formStatus?.type === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3"
                  >
                    <div className="h-5 w-5 text-red-600">⚠️</div>
                    <span className="text-red-800 font-medium">{formStatus.message}</span>
                  </motion.div>
                )}
              </motion.div>
              
              <motion.div variants={fadeUp} custom={0.2}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white border-l-4 border-l-purple-600">
                  <CardHeader className="bg-purple-50">
                    <CardTitle className="flex items-center space-x-2">
                      <MessageCircle className="h-5 w-5 text-purple-600" />
                      <span>WhatsApp Message Form</span>
                    </CardTitle>
                    <CardDescription>
                      We'll open WhatsApp with your message ready to send. Just hit the send button!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form ref={formRef} onSubmit={sendWhatsApp}>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input 
                            id="firstName" 
                            name="firstName" 
                            placeholder="Enter first name" 
                            required 
                            disabled={isSubmitting}
                          />
                          {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input 
                            id="lastName" 
                            name="lastName" 
                            placeholder="Enter last name" 
                            required 
                            disabled={isSubmitting}
                          />
                          {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            placeholder="your.email@example.com" 
                            required 
                            disabled={isSubmitting}
                          />
                          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input 
                            id="phone" 
                            name="phone" 
                            type="tel" 
                            placeholder="+91 98765 43210" 
                            required 
                            disabled={isSubmitting}
                          />
                          {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="subject">Subject *</Label>
                          <Select name="subject" required disabled={isSubmitting}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select inquiry type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Course Admissions">Course Admissions</SelectItem>
                              <SelectItem value="Placement Assistance">Placement Assistance</SelectItem>
                              <SelectItem value="Internship Programs">Internship Programs</SelectItem>
                              <SelectItem value="Corporate Training">Corporate Training</SelectItem>
                              <SelectItem value="Technical Support">Technical Support</SelectItem>
                              <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject}</p>}
                        </div>
                        <div>
                          <Label htmlFor="program">Interested Program</Label>
                          <Select name="program" disabled={isSubmitting}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select program (optional)" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Web Development">Web Development</SelectItem>
                              <SelectItem value="AI/ML">AI/ML</SelectItem>
                              <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                              <SelectItem value="Full Stack Development">Full Stack Development</SelectItem>
                              <SelectItem value="Data Science">Data Science</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="message">Your Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Please describe your inquiry in detail..."
                          rows={5}
                          required
                          disabled={isSubmitting}
                        />
                        {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white group"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                            />
                            Opening WhatsApp...
                          </>
                        ) : (
                          <>
                            <MessageCircle className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                            Open WhatsApp with Message
                          </>
                        )}
                      </Button>
                    </form>
                    
                    <p className="text-sm text-muted-foreground text-center">
                      WhatsApp messages are typically answered within a few hours during business hours (9 AM - 9 PM).
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Map and Location Info */}
            <motion.div className="space-y-6" variants={fadeUp} custom={0.4}>
              {/* Map Component */}
              <motion.div variants={fadeUp} custom={0.5}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-64 w-full">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29771.212060529924!2d79.078761!3d21.136414000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c1000c0583e5%3A0x2a9d4b509fe5934e!2sSS%20Infotech%20Nagpur!5e0!3m2!1sen!2sin!4v1760439349843!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="SS Infotech Company Location"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="p-4 bg-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-purple-100 p-2 rounded-lg">
                            <MapPin className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground">SS Infotech</h3>
                            <p className="text-sm text-muted-foreground">Plot No.26, Khandwekar Bunglow, Nagpur</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                          asChild
                        >
                          <a
                            href="https://maps.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Navigation className="mr-2 h-4 w-4" />
                            Directions
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Company Information */}
              <motion.div variants={fadeUp} custom={0.6}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="h-5 w-5 text-purple-600" />
                      <span>Company Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div>
                          <div className="font-medium">Address</div>
                          <div className="text-sm text-muted-foreground">
                            Plot No.26, Khandwekar Bunglow, 2nd Floor,<br />
                            Near Lendra park, Nagpur - 440012<br />
                            Maharashtra, India
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Clock className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div>
                          <div className="font-medium">Company Hours</div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div>Monday - Saturday: 9:00 AM - 6:00 PM</div>
                            <div>Sunday: Closed</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <a
                        href={`https://wa.me/${+917719927774}?text=Hello%20SS%20Infotech!%20I%20would%20like%20to%20schedule%20a%20company%20visit.`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white group">
                          <Calendar className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                          Schedule Company Visit via WhatsApp
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Emergency and Support */}
      <motion.section
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={item}>
            <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white">
              <CardContent className="p-8 text-center space-y-6">
                <div className="space-y-4">
                  <HeadphonesIcon className="h-12 w-12 mx-auto" />
                  <h2 className="text-3xl font-bold">Need Immediate Assistance?</h2>
                  <p className="text-purple-100 max-w-2xl mx-auto">
                    For urgent matters or emergency support, our team is available to help you right away.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <a href="tel:+917719927774">
                    <Button className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                      <Phone className="mr-2 h-4 w-4" />
                      Emergency: +91 77199 27774
                    </Button>
                  </a>
                  <a href={`https://wa.me/${917719927774}?text=Hello%20SS%20Infotech!%20I%20need%20immediate%20assistance.`}>
                    <Button className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp Support
                    </Button>
                  </a>
                </div>
                <p className="text-sm text-purple-100">
                  Available 24/7 for current students and urgent inquiries
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}