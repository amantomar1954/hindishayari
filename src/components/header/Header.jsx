"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X, Search, Heart, BookOpen, User, ChevronDown, Feather, LogIn, Bell } from "lucide-react"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/" },
  { name: "Popular", href: "/popular" },
  { name: "Recent", href: "/recent" },
  { name: "Writers", href: "/top-writers" },
]

const categories = [
  { name: "Love", href: "/love", icon: Heart },
  { name: "sad", href: "/sad", icon: BookOpen },
  { name: "Friendship", href: "/friendship", icon: User },
  { name: "Motivational", href: "/motivational", icon: Feather },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    // Handle search logic here
    console.log("Searching for:", searchQuery)
    setIsSearchOpen(false)
    setSearchQuery("")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
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
              <div className="relative bg-white rounded-full p-2">
                <Feather className="h-8 w-8 text-orange-500" />
              </div>
            </motion.div>
            <div className="ml-3">
              <motion.h1
                className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
                style={{ fontFamily: "Noto Sans Devanagari, serif" }}
                whileHover={{ scale: 1.05 }}
              >
                Hindi Shayari
              </motion.h1>
              <span className="text-xs text-gray-600">Shayari Sangam</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) =>
              link.name === "Categories" ? (
                <div key={link.name} className="relative group">
                  <button
                    className="flex items-center px-4 py-2 text-gray-700 hover:text-orange-600 rounded-lg transition-colors"
                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    onMouseEnter={() => setIsCategoriesOpen(true)}
                    onMouseLeave={() => setIsCategoriesOpen(false)}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </button>

                  <AnimatePresence>
                    {isCategoriesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                        onMouseEnter={() => setIsCategoriesOpen(true)}
                        onMouseLeave={() => setIsCategoriesOpen(false)}
                      >
                        <div className="py-2">
                          {categories.map((category) => (
                            <Link
                              key={category.name}
                              href={category.href}
                              className="flex items-center px-4 py-3 hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors"
                            >
                              <category.icon className="h-4 w-4 mr-3 text-orange-500" />
                              <span>{category.name}</span>
                            </Link>
                          ))}
                          <div className="border-t border-gray-100 mt-2 pt-2">
                            <Link
                              href="/categories"
                              className="flex items-center px-4 py-3 hover:bg-orange-50 text-orange-600 font-medium transition-colors"
                            >
                              View All Categories
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-4 py-2 text-gray-700 hover:text-orange-600 rounded-lg transition-colors group"
                >
                  <span>{link.name}</span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                    initial={{ width: 0, opacity: 0 }}
                    whileHover={{ width: "100%", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ),
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-1">
            {/* Search Button */}
            <motion.button
              className={`p-2 rounded-full ${isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-gray-700 hover:bg-white/20"}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </motion.button>

            {/* Notifications - Desktop Only */}
            {/* <motion.button
              className={`p-2 rounded-full hidden sm:flex ${isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-gray-700 hover:bg-white/20"}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bell className="h-5 w-5" />
            </motion.button> */}

            {/* Login Button - Desktop Only */}
            {/* <motion.button
              className="hidden md:flex items-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-full transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogIn className="h-4 w-4 mr-2" />
              <span>Login</span>
            </motion.button> */}

            {/* Mobile Menu Button */}
            <motion.button
              className="p-2 rounded-full lg:hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 p-4"
          >
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto relative">
              <input
                type="text"
                placeholder="Search for shayaris, writers, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    {link.name === "Categories" ? (
                      <div>
                        <button
                          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                          className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                        >
                          <span className="font-medium">{link.name}</span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${isCategoriesOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        <AnimatePresence>
                          {isCategoriesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4 border-l-2 border-orange-200 ml-4 mt-1 mb-2"
                            >
                              {categories.map((category) => (
                                <Link
                                  key={category.name}
                                  href={category.href}
                                  className="flex items-center px-4 py-3 text-gray-700 hover:text-orange-600 transition-colors"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  <category.icon className="h-4 w-4 mr-3 text-orange-500" />
                                  <span>{category.name}</span>
                                </Link>
                              ))}
                              <Link
                                href="/categories"
                                className="flex items-center px-4 py-3 text-orange-600 font-medium transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                View All Categories
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile Login Button */}
                <div className="pt-4 mt-2 border-t border-gray-100">
                  <motion.button
                    className="flex items-center justify-center w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-3 rounded-lg transition-all"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    <span>Login / Sign Up</span>
                  </motion.button>
                </div>
              </nav>

              {/* Close Button */}
              <motion.button
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
