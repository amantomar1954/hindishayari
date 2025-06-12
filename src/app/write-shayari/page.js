"use client"
import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

export default function WriteShayari() {
  const [shayari, setShayari] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('love');
  const [selectedMood, setSelectedMood] = useState('romantic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const textareaRef = useRef(null);

  const categories = [
    { id: 'love', name: 'Love', emoji: '❤️', color: 'bg-pink-500' },
    { id: 'sad', name: 'Sad', emoji: '😢', color: 'bg-blue-500' },
    { id: 'friendship', name: 'Friendship', emoji: '👫', color: 'bg-yellow-500' },
    { id: 'motivational', name: 'Motivational', emoji: '💪', color: 'bg-green-500' },
  ];

  const moods = {
    love: [
      { id: 'romantic', name: 'Romantic', emoji: '💘' },
      { id: 'passionate', name: 'Passionate', emoji: '🔥' },
      { id: 'longing', name: 'Longing', emoji: '🌙' },
      { id: 'devotional', name: 'Devotional', emoji: '🙏' },
    ],
    sad: [
      { id: 'heartbreak', name: 'Heartbreak', emoji: '💔' },
      { id: 'loneliness', name: 'Loneliness', emoji: '🏙️' },
      { id: 'pain', name: 'Pain', emoji: '💢' },
      { id: 'memories', name: 'Memories', emoji: '📸' },
    ],
    friendship: [
      { id: 'bonding', name: 'Bonding', emoji: '🤝' },
      { id: 'memories', name: 'Memories', emoji: '📚' },
      { id: 'support', name: 'Support', emoji: '🫂' },
      { id: 'distance', name: 'Distance', emoji: '✈️' },
    ],
    motivational: [
      { id: 'success', name: 'Success', emoji: '🏆' },
      { id: 'hardwork', name: 'Hard Work', emoji: '💪' },
      { id: 'dreams', name: 'Dreams', emoji: '✨' },
      { id: 'self-belief', name: 'Self-Belief', emoji: '👑' },
    ],
  };

  useEffect(() => {
    // Auto-resize textarea as user types
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [shayari]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log({
        shayari,
        category: selectedCategory,
        mood: selectedMood
      });
      setIsSubmitting(false);
      setIsSuccess(true);
      setShayari('');
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Write Shayari | Express Your Feelings</title>
        <meta name="description" content="Create beautiful shayaris and share your emotions" />
      </Head>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-3xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mt-16 mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
              Write Your Shayari
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Express your emotions through beautiful words and share with the world
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl"
        >
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit}>
              {/* Category Selection */}
              <motion.div variants={itemVariants} className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${selectedCategory === category.id ? `border-${category.color.split('-')[1]}-500 ${category.color} text-white` : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <span className="mr-2 text-lg">{category.emoji}</span>
                      <span>{category.name}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Mood Selection */}
              <motion.div variants={itemVariants} className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Mood
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {moods[selectedCategory].map((mood) => (
                    <motion.button
                      key={mood.id}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${selectedMood === mood.id ? 'border-purple-500 bg-purple-100 text-purple-800' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                      onClick={() => setSelectedMood(mood.id)}
                    >
                      <span className="mr-2 text-lg">{mood.emoji}</span>
                      <span>{mood.name}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Shayari Textarea */}
              <motion.div variants={itemVariants} className="mb-6">
                <label htmlFor="shayari" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Shayari
                </label>
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    id="shayari"
                    name="shayari"
                    rows="4"
                    value={shayari}
                    onChange={(e) => setShayari(e.target.value)}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none transition-all duration-200"
                    placeholder="Write your heart out..."
                    required
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                    {shayari.length}/500
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${isSubmitting ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500'}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Publishing...
                    </>
                  ) : (
                    'Publish Shayari'
                  )}
                </button>
              </motion.div>
            </form>
          </div>
        </motion.div>

        {/* Success Message */}
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-6 right-6"
          >
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-lg flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Your shayari has been published successfully!</span>
            </div>
          </motion.div>
        )}

        {/* Decorative Elements */}
        <motion.div 
          variants={itemVariants}
          className="absolute top-20 left-10 w-16 h-16 bg-pink-200 rounded-full blur-xl opacity-30 -z-10"
        />
        <motion.div 
          variants={itemVariants}
          className="absolute bottom-20 right-10 w-24 h-24 bg-blue-200 rounded-full blur-xl opacity-30 -z-10"
        />
      </motion.div>
    </div>
  );
}