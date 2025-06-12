"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Heart, BookOpen, Feather, Star, Quote, Users, Eye, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

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
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const featuredShayaris = [
  {
    id: 1,
    text: "दिल की बात कहने का अंदाज़ अलग होता है,\nमोहब्बत में हर एक राज़ अलग होता है।",
    author: "अमित शर्मा",
    category: "Love",
    likes: 1250,
    views: 5420,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    text: "ज़िंदगी के सफर में कुछ पल ऐसे होते हैं,\nजो यादों में बसकर हमेशा खुशी देते हैं।",
    author: "प्रिया गुप्ता",
    category: "Life",
    likes: 980,
    views: 3210,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    text: "दोस्ती का रिश्ता कुछ और ही होता है,\nयहाँ दिल से दिल का मेल होता है।",
    author: "राहुल वर्मा",
    category: "Friendship",
  
    likes: 1580,
    views: 4890,
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=300&fit=crop",
  },
]

const categories = [
  { name: "Love", icon: Heart, count: 1250, color: "from-pink-500 to-red-500", emoji: "💕",href:"/love"},
  { name: "Life", icon: BookOpen, count: 890, color: "from-blue-500 to-cyan-500", emoji: "🌟",href:"/life" },
  { name: "Friendship", icon: Users, count: 650, color: "from-green-500 to-emerald-500", emoji: "🤝",href:"/friendship" },
  { name: "Motivational", icon: Star, count: 720, color: "from-yellow-500 to-orange-500", emoji: "💪",href:"/motivational" },
  { name: "Sad", icon: Quote, count: 540, color: "from-gray-500 to-slate-600", emoji: "😢",href:"/sad" },
  { name: "Romantic", icon: Sparkles, count: 980, color: "from-purple-500 to-pink-500", emoji: "🌹",href:"/romantic" },
]


const stats = [
  { label: "Total Shayaris", value: "10K+", icon: "📝" },
  { label: "Active Poets", value: "2.5K+", icon: "✍️" },
  { label: "Daily Readers", value: "50K+", icon: "👥" },
  { label: "Categories", value: "25+", icon: "📚" },
]

export default function ShayariHomePage() {
  const [currentShayari, setCurrentShayari] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShayari((prev) => (prev + 1) % featuredShayaris.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Urdu/Hindi Text Elements */}
        {["शायरी", "محبت", "दोस्ती", "ज़िंदगी", "خوشی", "सपने"].map((text, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl font-bold text-orange-200/10 select-none"
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

        {/* Floating Hearts and Stars */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
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
            {["💖", "⭐", "🌙", "✨", "🌹", "📝"][Math.floor(Math.random() * 6)]}
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
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-300/20 to-red-300/20 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-300/20 to-purple-300/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section
          className="min-h-screen flex items-center justify-center px-4 py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="text-center lg:text-left"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center bg-gradient-to-r from-orange-100 to-red-100 rounded-full px-6 py-3 mb-6"
              >
                <Feather className="h-5 w-5 text-orange-600 mr-2" />
                <span className="text-orange-800 font-medium">Welcome to Shayari World</span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl font-bold mb-6"
                style={{ fontFamily: "Noto Sans Devanagari, serif" }}
              >
                <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                  दिल की बात
                </span>
                <br />
                <span className="text-gray-800">शायरी में</span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
                Discover the most beautiful collection of Shayari, Poetry, and Quotes in Hindi and Urdu. Express your
                emotions through the power of words.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-12">
                <motion.button
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Explore Shayaris
                </motion.button>
                <motion.button
                  className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-8 rounded-full flex items-center justify-center border-2 border-gray-200 hover:border-orange-300 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Feather className="h-5 w-5 mr-2" />
                  Write Your Own
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div key={stat.label} className="text-center" whileHover={{ scale: 1.05 }}>
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Featured Shayari Carousel */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
                <motion.div
                  key={currentShayari}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="relative mb-6">
                    <Quote className="h-8 w-8 text-orange-400 mx-auto mb-4" />
                    <p
                      className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed mb-6"
                      style={{ fontFamily: "Noto Sans Devanagari, serif" }}
                    >
                      {featuredShayaris[currentShayari].text}
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center">
                        <Heart className="h-4 w-4 mr-1 text-red-500" />
                        {featuredShayaris[currentShayari].likes}
                      </span>
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1 text-blue-500" />
                        {featuredShayaris[currentShayari].views}
                      </span>
                    </div>
                    <div className="text-orange-600 font-semibold">- {featuredShayaris[currentShayari].author}</div>
                  </div>
                </motion.div>

                {/* Carousel Indicators */}
                <div className="flex justify-center space-x-2 mt-6">
                  {featuredShayaris.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentShayari(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentShayari ? "bg-orange-500 w-8" : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Categories Section */}
        <motion.section
          className="py-20 px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Explore Categories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover shayaris for every emotion and occasion
              </p>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants}>
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  variants={itemVariants}
                  className="group cursor-pointer"
                  whileHover={{ y: -10 }}
                >
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 overflow-hidden">
                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className={`bg-gradient-to-r ${category.color} p-4 rounded-2xl`}>
                          <category.icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="text-4xl">{category.emoji}</div>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{category.name}</h3>
                      <p className="text-gray-600 mb-4">{category.count} Shayaris</p>
                     <Link key={category.name} href={category.href}>
                      <motion.div
                        className="flex items-center text-orange-600 font-semibold group-hover:text-orange-700"
                        whileHover={{ x: 5 }}
                      >
                        <span>Explore</span>
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </motion.div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Shayaris Grid */}
        <motion.section
          className="py-20 px-4 bg-gradient-to-r from-orange-50 to-red-50"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Featured Shayaris</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Handpicked collection of the most loved shayaris by our community
              </p>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants}>
              {featuredShayaris.map((shayari, index) => (
                <motion.div
                  key={shayari.id}
                  variants={itemVariants}
                  className="group cursor-pointer"
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={shayari.image || "/placeholder.svg"}
                        alt={shayari.category}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {shayari.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <p
                        className="text-lg font-medium text-gray-800 leading-relaxed mb-4"
                        style={{ fontFamily: "Noto Sans Devanagari, serif" }}
                      >
                        {shayari.text.split("\n")[0]}...
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-orange-600 font-semibold">- {shayari.author}</span>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Heart className="h-4 w-4 mr-1 text-red-500" />
                            {shayari.likes}
                          </span>
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1 text-blue-500" />
                            {shayari.views}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="text-center mt-12">
              <Link href="/allshayari">
              <motion.button
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Shayaris
              </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="py-20 px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-6xl"
                    animate={{
                      rotate: [0, 360],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 10 + Math.random() * 5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 3,
                    }}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </div>

              <div className="relative z-10">
                <motion.h2
                  className="text-4xl md:text-5xl font-bold mb-6"
                  style={{ fontFamily: "Noto Sans Devanagari, serif" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  अपनी शायरी साझा करें
                </motion.h2>
                <motion.p
                  className="text-xl mb-8 opacity-90"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Join thousands of poets and share your beautiful creations with the world
                </motion.p>

                <Link href="/write-shayari">
                
                <motion.button
                  className="bg-white text-orange-600 font-semibold py-4 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Feather className="h-5 w-5 mr-2 inline" />
                  Start Writing Today
                </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
