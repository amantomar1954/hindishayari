"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import {
  Heart,
  BookOpen,
  Feather,
  Star,
  Users,
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowUp,
  Quote,
  Sparkles,
  Globe,
  Award,
  TrendingUp,
  MessageCircle,
  Crown,
  Zap,
  Music,
  Mic,
  Edit3,
  Share2,
  Calendar,
  Clock,
  Eye,
  Sunrise,
  Moon,
  Sun,
  Trophy,
  Shield,
  FileText,
  AlertTriangle,
  Sunset,
} from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const footerLinks = {
  categories: [
    { name: "Love Shayari", href: "/love", icon: Heart },
    // { name: "Life Shayari", href: "/categories/life", icon: BookOpen },
    { name: "Friendship", href: "/friendship", icon: Users },
    { name: "Motivational", href: "/motivational", icon: Star },
    { name: "Sad Shayari", href: "/sad", icon: Quote },
    // { name: "Romantic", href: "/categories/romantic", icon: Sparkles },
  ],
  quickLinks: [
    { name: "Popular Shayaris", href: "/popular", icon: TrendingUp },
    { name: "Recent Posts", href: "/recent", icon: Clock },
    { name: "Top Writers", href: "/top-writers", icon: Crown },
    { name: "Daily Quotes", href: "/daily-shayari", icon: Calendar },
    // { name: "Featured", href: "/featured", icon: Award },
    // { name: "Trending", href: "/trending", icon: Zap },
  ],
  community: [
    { name: "Write Shayari", href: "/write-shayari", icon: Edit3 },
    { name: "Join Community", href: "/community", icon: Users },
    { name: "Share Stories", href: "/stories", icon: Share2 },
    { name: "Poetry Contest", href: "/contest", icon: Trophy },
    // { name: "Live Events", href: "/events", icon: Music },
    // { name: "Workshops", href: "/workshops", icon: Mic },
  ],
  support: [
    { name: "Help Center", href: "/help", icon: MessageCircle },
    { name: "Contact Us", href: "/contact", icon: Mail },
    { name: "Privacy Policy", href: "/privacy", icon: Shield },
    { name: "Terms of Service", href: "/terms", icon: FileText },
    // { name: "Guidelines", href: "/guidelines", icon: BookOpen },
    // { name: "Report Issue", href: "/report", icon: AlertTriangle },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-400", bgColor: "hover:bg-blue-50" },
  { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-sky-400", bgColor: "hover:bg-sky-50" },
  { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-400", bgColor: "hover:bg-pink-50" },
  { name: "YouTube", icon: Youtube, href: "#", color: "hover:text-red-400", bgColor: "hover:bg-red-50" },
]

const stats = [
  { label: "Total Shayaris", value: "25K+", icon: BookOpen, color: "text-orange-500" },
  { label: "Active Writers", value: "5K+", icon: Users, color: "text-blue-500" },
  { label: "Daily Readers", value: "100K+", icon: Eye, color: "text-green-500" },
  { label: "Love Stories", value: "1K+", icon: Heart, color: "text-pink-500" },
]

const featuredShayaris = [
  "दिल की बात कहने का अंदाज़ अलग होता है",
  "मोहब्बत में हर एक राज़ अलग होता है",
  "ज़िंदगी के सफर में कुछ पल ऐसे होते हैं",
]

export default function ShayariFooter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Update time every second
  useState(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getTimeIcon = () => {
    const hour = currentTime.getHours()
    if (hour >= 6 && hour < 12) return Sunrise
    if (hour >= 12 && hour < 18) return Sun
    if (hour >= 18 && hour < 22) return Sunset
    return Moon
  }

  const TimeIcon = getTimeIcon()

  return (
    <footer className="relative bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Shayari Elements */}
        {["शायरी", "प्रेम", "दोस्ती", "ज़िंदगी", "खुशी", "सपने"].map((text, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl font-bold text-orange-200/10 select-none"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontFamily: "Noto Sans Devanagari, serif",
            }}
          >
            {text}
          </motion.div>
        ))}

        {/* Floating Hearts and Emojis */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-10"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 30, 0],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 4,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {["💖", "⭐", "🌙", "✨", "🌹", "📝", "💕", "🎭", "🎪", "🎨"][Math.floor(Math.random() * 10)]}
          </motion.div>
        ))}

        {/* Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-orange-300/20 to-red-300/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-300/20 to-purple-300/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10">
        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-b border-orange-200/50 py-12"
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  शायरी संगम
                </span>{" "}
                की उपलब्धियां
              </h2>
              <p className="text-gray-600 text-lg">Celebrating the power of words and emotions</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4 group-hover:shadow-xl transition-all duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </motion.div>
                  <motion.div
                    className="text-3xl md:text-4xl font-bold text-gray-800 mb-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Shayari Ticker */}
        <motion.div
          className="bg-gradient-to-r from-orange-100 to-red-100 py-4 border-b border-orange-200/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center">
              <div className="flex items-center mr-6">
                <Quote className="h-5 w-5 text-orange-600 mr-2" />
                <span className="text-orange-800 font-semibold">Featured:</span>
              </div>
              <div className="flex-1 overflow-hidden">
                <motion.div
                  className="flex space-x-8"
                  animate={{ x: [0, -100] }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  {[...featuredShayaris, ...featuredShayaris].map((shayari, index) => (
                    <span
                      key={index}
                      className="text-gray-700 whitespace-nowrap devanagari-text"
                      style={{ fontFamily: "Noto Sans Devanagari, serif" }}
                    >
                      "{shayari}"
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Brand Section */}
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <Link href="/" className="flex items-center mb-6">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <motion.div
                      className="absolute -inset-1 rounded-full bg-gradient-to-r from-orange-400 to-red-500 opacity-75 blur-sm"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    />
                    <div className="relative bg-white rounded-full p-3">
                      <Feather className="h-8 w-8 text-orange-500" />
                    </div>
                  </motion.div>
                  <div className="ml-3">
                    <h1
                      className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
                      style={{ fontFamily: "Noto Sans Devanagari, serif" }}
                    >
                      Hindi Shayari
                    </h1>
                    <span className="text-sm text-gray-600">Shayari Sangam</span>
                  </div>
                </Link>

                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  भारत का सबसे बड़ा शायरी प्लेटफॉर्म। यहाँ आपको मिलेंगी बेहतरीन शायरियां, कविताएं और भावनाओं से भरे शब्द।
                </p>

                {/* Time and Weather Widget */}
                <motion.div
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-6 border border-orange-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600">Current Time</div>
                      <div className="text-lg font-semibold text-gray-800">
                        {currentTime.toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <TimeIcon className="h-8 w-8 text-orange-500" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <motion.div
                    className="flex items-center text-gray-600 hover:text-orange-600 transition-colors cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <Mail className="h-5 w-5 mr-3" />
                    <span>contact@shayarisangam.com</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center text-gray-600 hover:text-orange-600 transition-colors cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <Phone className="h-5 w-5 mr-3" />
                    <span>+91 98765 43210</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center text-gray-600 hover:text-orange-600 transition-colors cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <MapPin className="h-5 w-5 mr-3" />
                    <span>Mumbai, Maharashtra, India</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Links Sections */}
              <motion.div variants={itemVariants} className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* Categories */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                      <Heart className="h-5 w-5 mr-2 text-orange-500" />
                      Categories
                    </h3>
                    <ul className="space-y-3">
                      {footerLinks.categories.map((link) => (
                        <li key={link.name}>
                          <motion.div whileHover={{ x: 5 }}>
                            <Link
                              href={link.href}
                              className="flex items-center text-gray-600 hover:text-orange-600 transition-colors group"
                            >
                              <link.icon className="h-4 w-4 mr-2 text-gray-400 group-hover:text-orange-500" />
                              {link.name}
                            </Link>
                          </motion.div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quick Links */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-orange-500" />
                      Quick Links
                    </h3>
                    <ul className="space-y-3">
                      {footerLinks.quickLinks.map((link) => (
                        <li key={link.name}>
                          <motion.div whileHover={{ x: 5 }}>
                            <Link
                              href={link.href}
                              className="flex items-center text-gray-600 hover:text-orange-600 transition-colors group"
                            >
                              <link.icon className="h-4 w-4 mr-2 text-gray-400 group-hover:text-orange-500" />
                              {link.name}
                            </Link>
                          </motion.div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Community */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-orange-500" />
                      Community
                    </h3>
                    <ul className="space-y-3">
                      {footerLinks.community.map((link) => (
                        <li key={link.name}>
                          <motion.div whileHover={{ x: 5 }}>
                            <Link
                              href={link.href}
                              className="flex items-center text-gray-600 hover:text-orange-600 transition-colors group"
                            >
                              <link.icon className="h-4 w-4 mr-2 text-gray-400 group-hover:text-orange-500" />
                              {link.name}
                            </Link>
                          </motion.div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Support */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                      <MessageCircle className="h-5 w-5 mr-2 text-orange-500" />
                      Support
                    </h3>
                    <ul className="space-y-3">
                      {footerLinks.support.map((link) => (
                        <li key={link.name}>
                          <motion.div whileHover={{ x: 5 }}>
                            <Link
                              href={link.href}
                              className="flex items-center text-gray-600 hover:text-orange-600 transition-colors group"
                            >
                              <link.icon className="h-4 w-4 mr-2 text-gray-400 group-hover:text-orange-500" />
                              {link.name}
                            </Link>
                          </motion.div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Newsletter Section */}
        

        {/* Social Media & Bottom Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-orange-200/50 py-8"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <motion.div variants={itemVariants} className="text-center md:text-left">
                <p className="text-gray-600 mb-2">© 2024 शायरी संगम (Shayari Sangam). All rights reserved.</p>
                <p className="text-sm text-gray-500">
                  Made with{" "}
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                    className="text-red-500"
                  >
                    ❤️
                  </motion.span>{" "}
                  for poetry lovers across India
                </p>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={itemVariants} className="flex items-center space-x-4">
                <span className="text-gray-600 font-medium mr-2">Follow us:</span>
                {socialLinks.map((social) => (
                  <Link key={social.name} href={social.href}>
                    <motion.div
                      className={`p-3 rounded-full bg-white border border-gray-200 ${social.color} ${social.bgColor} transition-all shadow-sm hover:shadow-md`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <social.icon className="h-5 w-5" />
                    </motion.div>
                  </Link>
                ))}

                {/* Scroll to Top Button */}
                <motion.button
                  onClick={scrollToTop}
                  className="ml-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-3 rounded-full transition-all shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowUp className="h-5 w-5" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Language Selector */}
        <motion.div
          className="bg-gradient-to-r from-orange-100 to-red-100 py-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-orange-600 mr-2" />
                <span className="text-orange-800 font-semibold">Languages:</span>
              </div>
              <div className="flex space-x-4">
                {["हिंदी", "اردو", "English", "ગુજરાતી", "मराठी"].map((lang, index) => (
                  <motion.button
                    key={lang}
                    className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {lang}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
