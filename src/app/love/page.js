"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Heart, Share2, User, Search, Eye, Copy, Play, Pause } from "lucide-react"
import shayariData from "../data/shayari-page.json"

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

export default function LoveShayariPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [likedShayaris, setLikedShayaris] = useState(new Set())
  const [isPlaying, setIsPlaying] = useState(null)
  const [selectedShayari, setSelectedShayari] = useState(null)

  // Get love category data
  const loveData = shayariData.categories.love
  const loveShayaris = loveData.shayaris

  // Calculate category counts dynamically
  const loveCategories = loveData.subcategories.map((subcat) => ({
    ...subcat,
    count:
      subcat.name === "All"
        ? loveShayaris.length
        : loveShayaris.filter((shayari) => shayari.category === subcat.name).length,
  }))

  // Filter shayaris based on category and search
  const filteredShayaris = loveShayaris
    .filter((shayari) => {
      const matchesCategory = selectedCategory === "All" || shayari.category === selectedCategory
      const matchesSearch =
        shayari.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shayari.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shayari.tags.some((tag) => tag.includes(searchQuery))
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === "popular") return b.likes - a.likes
      if (sortBy === "recent") return new Date(b.dateAdded) - new Date(a.dateAdded)
      if (sortBy === "views") return b.views - a.views
      return 0
    })

  const handleLike = (shayariId) => {
    const newLiked = new Set(likedShayaris)
    if (newLiked.has(shayariId)) {
      newLiked.delete(shayariId)
    } else {
      newLiked.add(shayariId)
    }
    setLikedShayaris(newLiked)
  }

  const handleShare = (shayari) => {
    if (navigator.share) {
      navigator.share({
        title: "Love Shayari",
        text: shayari.text,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(shayari.text)
      alert("Shayari copied to clipboard!")
    }
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    alert("Shayari copied to clipboard!")
  }

  const getMoodColor = (mood) => {
    const moodColors = {
      romantic: "bg-pink-500",
      passionate: "bg-red-500",
      devotional: "bg-purple-500",
      longing: "bg-blue-500",
      sacrifice: "bg-gray-500",
      ishq: "bg-rose-500",
      story: "bg-indigo-500",
    }
    return moodColors[mood] || "bg-pink-500"
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${loveData.bgGradient} relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Emojis */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/20"
            animate={{
              y: [0, -200, 0],
              x: [0, Math.sin(i) * 50, 0],
              rotate: [0, 360],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${20 + Math.random() * 30}px`,
            }}
          >
            {loveData.emojis[Math.floor(Math.random() * loveData.emojis.length)]}
          </motion.div>
        ))}

        {/* Background Text Elements */}
        {loveData.backgroundTexts.map((text, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl font-bold text-pink-200/10 select-none"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 4,
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

        {/* Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-300/20 to-red-300/20 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-rose-300/20 to-pink-300/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section
          className="py-20 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className={`inline-flex items-center bg-gradient-to-r from-${loveData.primaryColor}-100 to-${loveData.secondaryColor}-100 rounded-full px-6 py-3 mb-6`}
            >
              <Heart className={`h-5 w-5 text-${loveData.primaryColor}-600 mr-2 fill-${loveData.primaryColor}-600`} />
              <span className={`text-${loveData.primaryColor}-800 font-medium`}>{loveData.name}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6"
              style={{ fontFamily: "Noto Sans Devanagari, serif" }}
            >
              <span
                className={`bg-gradient-to-r from-${loveData.primaryColor}-600 via-${loveData.secondaryColor}-600 to-rose-600 bg-clip-text text-transparent`}
              >
                {loveData.hindiName}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
            >
              {loveData.description}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            >
              {Object.entries(shayariData.stats).map(([key, value], index) => {
                const statLabels = {
                  totalShayaris: "Total Shayaris",
                  happyHearts: "Happy Hearts",
                  dailyReads: "Daily Reads",
                  categories: "Categories",
                }
                const statIcons = {
                  totalShayaris: "💕",
                  happyHearts: "❤️",
                  dailyReads: "👥",
                  categories: "📖",
                }

                return (
                  <motion.div
                    key={key}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-pink-100"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-3xl mb-2">{statIcons[key]}</div>
                    <div className="text-2xl font-bold text-gray-800">{value}</div>
                    <div className="text-sm text-gray-600">{statLabels[key]}</div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </motion.section>

        {/* Filters and Search */}
        <motion.section
          className="py-8 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search love shayaris, authors, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 bg-white/80 backdrop-blur-sm rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all shadow-lg"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {loveCategories.map((category) => (
                <motion.button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category.name
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : "bg-white/80 text-gray-700 hover:bg-white border border-pink-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.name} ({category.count})
                </motion.button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 border border-pink-200 shadow-lg">
                <div className="flex space-x-1">
                  {[
                    { key: "popular", label: "Most Popular" },
                    { key: "recent", label: "Recent" },
                    { key: "views", label: "Most Viewed" },
                  ].map((option) => (
                    <button
                      key={option.key}
                      onClick={() => setSortBy(option.key)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        sortBy === option.key
                          ? "bg-gradient-to-r from-pink-500 to-red-500 text-white"
                          : "text-gray-600 hover:text-pink-600"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Shayari Grid */}
        <motion.section className="py-12 px-4" variants={containerVariants} initial="hidden" animate="visible">
          <div className="max-w-7xl mx-auto">
            {filteredShayaris.length > 0 ? (
              <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants}>
                {filteredShayaris.map((shayari, index) => (
                  <motion.div
                    key={shayari.id}
                    variants={itemVariants}
                    className="group cursor-pointer"
                    whileHover={{ y: -10 }}
                    onClick={() => setSelectedShayari(shayari)}
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-pink-100">
                      {/* Image Header */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={shayari.image || "/placeholder.svg"}
                          alt={shayari.category}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 text-pink-600 px-3 py-1 rounded-full text-sm font-semibold">
                            {shayari.category}
                          </span>
                        </div>

                        {/* Mood Indicator */}
                        <div className="absolute top-4 right-4">
                          <div className={`w-4 h-4 rounded-full ${getMoodColor(shayari.mood)}`} />
                        </div>

                        {/* Play Button */}
                        <motion.div
                          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ scale: 1.1 }}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setIsPlaying(isPlaying === shayari.id ? null : shayari.id)
                            }}
                            className="bg-white/90 rounded-full p-2 text-pink-600 hover:bg-white transition-colors"
                          >
                            {isPlaying === shayari.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </button>
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <p
                          className="text-lg font-medium text-gray-800 leading-relaxed mb-4 devanagari-text"
                          style={{ fontFamily: "Noto Sans Devanagari, serif" }}
                        >
                          {shayari.text.split("\n").slice(0, 2).join("\n")}
                          {shayari.text.split("\n").length > 2 && "..."}
                        </p>

                        {/* Author */}
                        <div className="flex items-center mb-4">
                          <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded-full p-2 mr-3">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-pink-600 font-semibold">- {shayari.author}</span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {shayari.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Stats and Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Heart
                                className={`h-4 w-4 mr-1 ${likedShayaris.has(shayari.id) ? "text-red-500 fill-red-500" : "text-gray-400"}`}
                              />
                              {shayari.likes + (likedShayaris.has(shayari.id) ? 1 : 0)}
                            </span>
                            <span className="flex items-center">
                              <Eye className="h-4 w-4 mr-1 text-blue-500" />
                              {shayari.views}
                            </span>
                            <span className="flex items-center">
                              <Share2 className="h-4 w-4 mr-1 text-green-500" />
                              {shayari.shares}
                            </span>
                          </div>

                          <div className="flex space-x-2">
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleLike(shayari.id)
                              }}
                              className="p-2 rounded-full hover:bg-pink-100 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Heart
                                className={`h-4 w-4 ${likedShayaris.has(shayari.id) ? "text-red-500 fill-red-500" : "text-gray-400"}`}
                              />
                            </motion.button>
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleShare(shayari)
                              }}
                              className="p-2 rounded-full hover:bg-green-100 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Share2 className="h-4 w-4 text-gray-400 hover:text-green-500" />
                            </motion.button>
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCopy(shayari.text)
                              }}
                              className="p-2 rounded-full hover:bg-blue-100 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Copy className="h-4 w-4 text-gray-400 hover:text-blue-500" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <div className="text-6xl mb-4">💔</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No shayaris found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All")
                  }}
                  className="mt-6 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-2 px-6 rounded-full transition-all"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Shayari Modal */}
        {selectedShayari && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedShayari(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="mb-6">
                  <img
                    src={selectedShayari.image || "/placeholder.svg"}
                    alt={selectedShayari.category}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {selectedShayari.category}
                  </span>
                </div>

                <p
                  className="text-2xl font-medium text-gray-800 leading-relaxed mb-6 devanagari-text"
                  style={{ fontFamily: "Noto Sans Devanagari, serif" }}
                >
                  {selectedShayari.text}
                </p>

                <div className="flex items-center justify-center mb-6">
                  <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded-full p-3 mr-3">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-pink-600 font-semibold text-lg">- {selectedShayari.author}</span>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {selectedShayari.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-center space-x-6 mb-6 text-gray-600">
                  <span className="flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-red-500" />
                    {selectedShayari.likes} Likes
                  </span>
                  <span className="flex items-center">
                    <Eye className="h-5 w-5 mr-2 text-blue-500" />
                    {selectedShayari.views} Views
                  </span>
                  <span className="flex items-center">
                    <Share2 className="h-5 w-5 mr-2 text-green-500" />
                    {selectedShayari.shares} Shares
                  </span>
                </div>

                <div className="flex justify-center space-x-4">
                  <motion.button
                    onClick={() => handleLike(selectedShayari.id)}
                    className="flex items-center bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-6 py-3 rounded-full transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart className={`h-5 w-5 mr-2 ${likedShayaris.has(selectedShayari.id) ? "fill-white" : ""}`} />
                    {likedShayaris.has(selectedShayari.id) ? "Liked" : "Like"}
                  </motion.button>
                  <motion.button
                    onClick={() => handleShare(selectedShayari)}
                    className="flex items-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share2 className="h-5 w-5 mr-2" />
                    Share
                  </motion.button>
                  <motion.button
                    onClick={() => handleCopy(selectedShayari.text)}
                    className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Copy className="h-5 w-5 mr-2" />
                    Copy
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.section
          className="py-20 px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded-3xl p-12 text-white relative overflow-hidden">
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
                    💕
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
                  अपनी प्रेम कहानी साझा करें
                </motion.h2>
                <motion.p
                  className="text-xl mb-8 opacity-90"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Share your love story through beautiful shayaris and touch millions of hearts
                </motion.p>
                <motion.button
                  className="bg-white text-pink-600 font-semibold py-4 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Heart className="h-5 w-5 mr-2 inline fill-pink-600" />
                  Write Love Shayari
                </motion.button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
