"use client";
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Popular Hindi Shayari data
const shayariData = [
  {
    id: 1,
    text: "दिल से दिल तक की राहें बनी रहती हैं,\nमोहब्बत की बातें अनकही सी रहती हैं,\nतेरी एक मुस्कान से दिन बन जाता है,\nहर धड़कन में बस तू ही समा जाता है।",
    author: "अज्ञात",
    category: "प्यार",
  },
  {
    id: 2,
    text: "चाँद की चाँदनी में तेरा चेहरा नजर आता है,\nहर सितारे में तेरा ही नूर छलकता है,\nतेरी बातों की मिठास में खो जाते हैं,\nदिल का हर कोना तुझसे ही संवरता है।",
    author: "मिर्ज़ा ग़ालिब",
    category: "रोमांस",
  },
  {
    id: 3,
    text: "इश्क़ में हर लम्हा एक कहानी बन जाता है,\nतेरे बिना हर पल अधूरा सा लगता है,\nतेरी हंसी की खनक में सुकून मिलता है,\nदिल का हर गीत तुझ पर ही ठहरता है।",
    author: "राहत इंदौरी",
    category: "प्यार",
  },
  {
    id: 4,
    text: "तेरी याद में हर रात गुजर जाती है,\nख्वाबों की दुनिया में तू ही नजर आती है,\nदिल की गहराइयों में तेरा नाम बस्ता है,\nहर सांस में बस तेरा ही एहसास रहता है।",
    author: "अज्ञात",
    category: "याद",
  },
  {
    id: 5,
    text: "ज़िंदगी का हर लम्हा तुझसे रौшен है,\nतेरे बिना ये दिल बेकरार और उदास है,\nतेरे साथ की हर बात अनमोल लगती है,\nहर पल में बस तेरा ही प्यार बस्ता है।",
    author: "अज्ञात",
    category: "प्यार",
  },
  {
    id: 6,
    text: "तेरे बिना अधूरी सी हर बात लगती है,\nदिल की गहराइयों में तू ही बस्ती है,\nतेरी एक नजर से दुनिया रंगीन हो जाती,\nहर ख्वाब में बस तू ही नजर आती है।",
    author: "फ़ैज़ अहमद फ़ैज़",
    category: "रोमांस",
  },
  {
    id: 7,
    text: "दिल की किताब में तेरा नाम लिखा है,\nहर पन्ने पर बस तेरा ही अक्स दिखा है,\nतेरे बिना ये ज़िंदगी बेरंग सी लगती,\nतू है तो हर पल में रंग भरा है।",
    author: "अज्ञात",
    category: "प्यार",
  },
  {
    id: 8,
    text: "खामोशी में भी तेरी बातें सुनाई देती हैं,\nदिल की गहराइयों में तेरी यादें बस्ती हैं,\nतेरे बिना हर रास्ता सूना सा लगता है,\nतेरी हंसी से ही तो ज़िंदगी हसीन है।",
    author: "अज्ञात",
    category: "याद",
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('सभी');
  const [favorites, setFavorites] = useState([]);
  const [filteredShayaris, setFilteredShayaris] = useState(shayariData);
  const [copyStatus, setCopyStatus] = useState({});
  const shayariContainerRef = useRef(null);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Handle search and filter
  useEffect(() => {
    let filtered = shayariData;
    if (searchTerm) {
      filtered = filtered.filter(
        (shayari) =>
          shayari.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shayari.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== 'सभी') {
      filtered = filtered.filter((shayari) => shayari.category === selectedCategory);
    }
    setFilteredShayaris(filtered);

    // GSAP animations
    gsap.fromTo(
      '.shayari-card',
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );
  }, [searchTerm, selectedCategory]);

  // Toggle favorite (Like)
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Share Shayari
  const shareShayari = async (shayari) => {
    const shareText = `${shayari.text}\n— ${shayari.author} (${shayari.category})`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'लोकप्रिय शायरी',
          text: shareText,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      await copyShayari(shayari.id, shareText);
      alert('शायरी कॉपी हो गई है! आप इसे कहीं भी साझा कर सकते हैं।');
    }
  };

  // Copy Shayari
  const copyShayari = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopyStatus((prev) => ({ ...prev, [id]: false }));
      }, 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  // Unique categories for filter
  const categories = ['सभी', ...new Set(shayariData.map((shayari) => shayari.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex flex-col py-8 px-4">
      {/* Search and Filter Section */}
      <div className="max-w-4xl mx-auto mt-20 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="शायरी या लेखक खोजें..."
          className="w-full sm:w-1/2 p-3 rounded-full bg-white/90 backdrop-blur-sm border-none focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-800 placeholder-gray-500"
        />
        <div className="flex gap-2 flex-wrap justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-pink-500 text-white'
                  : 'bg-white/80 text-gray-700 hover:bg-pink-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Shayari Grid */}
      <div
        ref={shayariContainerRef}
        className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredShayaris.length > 0 ? (
          filteredShayaris.map((shayari) => (
            <div
              key={shayari.id}
              className="shayari-card relative bg-white/95 backdrop-blur-md rounded-xl shadow-xl p-6 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <p className="text-md text-gray-800 italic mb-4 whitespace-pre-line font-medium">
                {shayari.text}
              </p>
              <p className="text-sm text-gray-600">— {shayari.author}</p>
              <p className="text-xs text-pink-600 mt-2">श्रेणी: {shayari.category}</p>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => toggleFavorite(shayari.id)}
                  className="flex items-center gap-1 px-4 py-2 bg-pink-100 text-pink-600 rounded-full hover:bg-pink-200 transition-all duration-300"
                >
                  <span>{favorites.includes(shayari.id) ? '❤️' : '🤍'}</span>
                  <span>पसंद</span>
                </button>
                <button
                  onClick={() => shareShayari(shayari)}
                  className="flex items-center gap-1 px-4 py-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-all duration-300"
                >
                  <span>🔗</span>
                  <span>साझा करें</span>
                </button>
                <button
                  onClick={() =>
                    copyShayari(shayari.id, `${shayari.text}\n— ${shayari.author}`)
                  }
                  className="flex items-center gap-1 px-4 py-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-all duration-300"
                >
                  <span>{copyStatus[shayari.id] ? '✅' : '📋'}</span>
                  <span>{copyStatus[shayari.id] ? 'कॉपी हो गया' : 'कॉपी'}</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-800 text-lg col-span-full animate-pulse">
            कोई शायरी नहीं मिली। खोज या फ़िल्टर बदलें।
          </p>
        )}
      </div>
    </div>
  );
}