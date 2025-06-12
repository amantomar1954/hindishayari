// pages/recent-shayari.js
"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';

const RecentShayari = () => {
  const [shayaris, setShayaris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Simulate API fetch
    const fetchShayaris = () => {
      setLoading(true);
      setTimeout(() => {
        const dummyShayaris = [
          {
            id: 1,
            text: "दिल की बात होंठों तक आते-आते रह जाती है, हम वो नहीं जो दूसरों की तरह हर बात कह जाते हैं।",
            author: "अनजान",
            likes: 1245,
            date: "2 days ago"
          },
          {
            id: 2,
            text: "तुम्हारी यादों का साया इतना गहरा है, की खुद से भी दूर होते जा रहे हैं।",
            author: "राहुल",
            likes: 892,
            date: "3 days ago"
          },
          {
            id: 3,
            text: "मोहब्बत की राह में खुद को खो दिया, अब तो बस तेरे नाम से जी रहे हैं।",
            author: "प्रिया",
            likes: 1567,
            date: "5 days ago"
          },
          {
            id: 4,
            text: "ज़िन्दगी की इस भीड़ में तू ही तो साथ है मेरा, वरना हर शख्स अपने ही लिए जीता है यहाँ।",
            author: "विकास",
            likes: 2103,
            date: "1 week ago"
          },
          {
            id: 5,
            text: "रात की तन्हाई में तेरी यादें सताती हैं, दिन की रौशनी में भी तेरा ख्याल नहीं जाता।",
            author: "नीतू",
            likes: 1789,
            date: "1 week ago"
          }
        ];
        setShayaris(dummyShayaris);
        setLoading(false);
      }, 1500);
    };

    fetchShayaris();
  }, []);

  useEffect(() => {
    // Auto-rotate shayaris
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % shayaris.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [shayaris.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % shayaris.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + shayaris.length) % shayaris.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
      <Head>
        <title>Recent Shayari Collection | Beautiful Hindi Poetry</title>
        <meta name="description" content="Explore our latest collection of beautiful Hindi shayaris" />
      </Head>

      <div className="max-w-4xl mt-20 mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-purple-800 mb-2 animate-fade-in">
          Recent Shayari
        </h1>
        <p className="text-lg text-center text-gray-600 mb-8 animate-fade-in">
          Latest collection of beautiful Hindi poetry
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="relative">
            {/* Featured Shayari Card */}
            <div 
              key={shayaris[currentIndex]?.id}
              className="bg-white rounded-xl shadow-lg p-6 mb-8 transform transition-all duration-500 hover:scale-[1.01] hover:shadow-xl animate-fade-in"
            >
              <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed mb-4">
                {shayaris[currentIndex]?.text}
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-purple-600 font-semibold">- {shayaris[currentIndex]?.author}</p>
                  <p className="text-gray-500 text-sm">{shayaris[currentIndex]?.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">{shayaris[currentIndex]?.likes}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white p-2 rounded-full shadow-md hover:bg-purple-100 transition-colors focus:outline-none"
              aria-label="Previous shayari"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white p-2 rounded-full shadow-md hover:bg-purple-100 transition-colors focus:outline-none"
              aria-label="Next shayari"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* All Shayari List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {shayaris.map((shayari, index) => (
                <div 
                  key={shayari.id}
                  className={`bg-white rounded-lg p-5 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${index === currentIndex ? 'ring-2 ring-purple-400' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <p className="text-lg text-gray-700 mb-3 line-clamp-3">{shayari.text}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-purple-600 font-medium text-sm">- {shayari.author}</p>
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-500 text-sm">{shayari.likes}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Share Button */}
        <div className="mt-12 text-center animate-fade-in-up">
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none">
            Share These Shayaris
          </button>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeIn 0.8s ease-out 0.3s both;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default RecentShayari;