"use client"
// pages/all-shayari.js

import { useState, useEffect } from 'react';
import Head from 'next/head';

const AllShayari = () => {
  const [shayaris, setShayaris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const shayarisPerPage = 9;

  // Categories with emojis
  const categories = [
    { id: 'all', name: 'All Shayari 🌈' },
    { id: 'love', name: 'Love ❤️' },
    { id: 'sad', name: 'Sad 😢' },
    { id: 'friendship', name: 'Friendship 👫' },
    { id: 'motivational', name: 'Motivational 💪' },
    { id: 'funny', name: 'Funny 😂' },
    { id: 'romantic', name: 'Romantic 💘' },
    { id: 'birthday', name: 'Birthday 🎂' },
  ];

  useEffect(() => {
    // Simulate API fetch with realistic delay
    const fetchShayaris = () => {
      setLoading(true);
      setTimeout(() => {
        const dummyShayaris = [
          { id: 1, text: "तुम्हारी यादों का साया इतना गहरा है, की खुद से भी दूर होते जा रहे हैं।", category: 'love', author: "राहुल", likes: 1245, date: "2 days ago" },
          { id: 2, text: "ज़िन्दगी की इस भीड़ में तू ही तो साथ है मेरा, वरना हर शख्स अपने ही लिए जीता है यहाँ।", category: 'friendship', author: "विकास", likes: 892, date: "3 days ago" },
          { id: 3, text: "रात की तन्हाई में तेरी यादें सताती हैं, दिन की रौशनी में भी तेरा ख्याल नहीं जाता।", category: 'sad', author: "नीतू", likes: 1567, date: "5 days ago" },
          { id: 4, text: "हौसले बुलंद रखो, मंजिलें खुद-ब-खुद मिल जाएंगी, जो तूफानों से लड़ना सीख लो, तो कश्ती खुद-ब-खुद चल जाएगी।", category: 'motivational', author: "अर्जुन", likes: 2103, date: "1 week ago" },
          { id: 5, text: "प्यार की राह में हर मोड़ पर मिलते हैं ठोकर, पर जो हार नहीं मानते वो पाते हैं सच्चा प्यार।", category: 'romantic', author: "प्रिया", likes: 1789, date: "1 week ago" },
          { id: 6, text: "जन्मदिन पर मिले हज़ारों तोहफे हमें प्यारे हैं, पर तेरी मुस्कान सबसे अनमोल तोहफा हमारे हैं।", category: 'birthday', author: "सुमित", likes: 987, date: "2 weeks ago" },
          { id: 7, text: "पढ़ाई कर लो बेटा, वरना बन जाओगे शायर, लोग पढ़ेंगे तुम्हारी शायरी, पर पेट भरने के लिए करना पड़ेगा कोई और काम।", category: 'funny', author: "पापा", likes: 3456, date: "2 weeks ago" },
          { id: 8, text: "दोस्ती नहीं होती सिर्फ हँसी-मज़ाक, दोस्ती तो वो रिश्ता है जो बनता है दिल से दिल का रिश्ता।", category: 'friendship', author: "राज", likes: 1234, date: "3 weeks ago" },
          { id: 9, text: "मोहब्बत की राह में खुद को खो दिया, अब तो बस तेरे नाम से जी रहे हैं।", category: 'love', author: "अनामिका", likes: 1890, date: "3 weeks ago" },
          { id: 10, text: "आँखों में आंसू छुपा के रखना सीख लो, दुनिया वालों को अपनी कमजोरी दिखाना नहीं आता।", category: 'sad', author: "अंजली", likes: 1456, date: "1 month ago" },
          { id: 11, text: "जब तक साँस है तब तक आस है, जब तक दिल है तब तक विश्वास है, हार मत मानो कभी भी, क्योंकि जीतने वाले कभी हारते नहीं।", category: 'motivational', author: "विवेक", likes: 2345, date: "1 month ago" },
          { id: 12, text: "तुम्हारी मुस्कान की चाहत में हम, अपने आँसू भी छुपा लेते हैं।", category: 'romantic', author: "आदित्य", likes: 1678, date: "1 month ago" },
        ];
        setShayaris(dummyShayaris);
        setLoading(false);
      }, 1200);
    };

    fetchShayaris();

    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('shayariFavorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('shayariFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredShayaris = shayaris.filter(shayari => {
    const matchesSearch = shayari.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         shayari.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || shayari.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const indexOfLastShayari = currentPage * shayarisPerPage;
  const indexOfFirstShayari = indexOfLastShayari - shayarisPerPage;
  const currentShayaris = filteredShayaris.slice(indexOfFirstShayari, indexOfLastShayari);
  const totalPages = Math.ceil(filteredShayaris.length / shayarisPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>All Shayari Collection | Premium Hindi Poetry</title>
        <meta name="description" content="Explore our complete collection of beautiful Hindi shayaris in all categories" />
      </Head>

      <div className="max-w-7xl mt-16 mx-auto">
        {/* Animated Header */}
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            All Shayari Collection
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Discover the most beautiful Hindi poetry across all categories
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
          <div className="relative">
            <input
              type="text"
              placeholder="Search shayari or author..."
              className="w-full px-6 py-3 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 transition-all duration-300"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <svg className="absolute right-4 top-3.5 h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 h-64 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
            {/* Shayari Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentShayaris.map((shayari) => (
                <div 
                  key={shayari.id}
                  className="bg-gray-800 rounded-xl p-6 shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl animate-fade-in-up"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-purple-300">
                      {categories.find(c => c.id === shayari.category)?.name}
                    </span>
                    <button 
                      onClick={() => toggleFavorite(shayari.id)}
                      className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
                      aria-label={favorites.includes(shayari.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6" 
                        fill={favorites.includes(shayari.id) ? "currentColor" : "none"} 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        strokeWidth={favorites.includes(shayari.id) ? 0 : 2}
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-200 text-lg mb-6 line-clamp-4 leading-relaxed">
                    {shayari.text}
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-purple-400 font-medium">- {shayari.author}</p>
                      <p className="text-gray-500 text-sm">{shayari.date}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-400">{shayari.likes}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {filteredShayaris.length > shayarisPerPage && (
              <div className="flex justify-center mt-8 animate-fade-in">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 disabled:opacity-50 hover:bg-gray-700 transition-colors duration-200"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        currentPage === number
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      } transition-colors duration-200`}
                    >
                      {number}
                    </button>
                  ))}

                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 disabled:opacity-50 hover:bg-gray-700 transition-colors duration-200"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}

            {/* Empty State */}
            {filteredShayaris.length === 0 && (
              <div className="text-center py-16 animate-fade-in">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-medium text-gray-300 mb-2">No Shayari Found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {searchTerm 
                    ? "We couldn't find any shayari matching your search. Try different keywords."
                    : "There are no shayaris available in this category at the moment."}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default AllShayari;