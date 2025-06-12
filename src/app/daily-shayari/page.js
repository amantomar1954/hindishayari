"use client"
import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

// Hindi Shayari data
const shayariData = [
  {
    text: "दिल से दिल तक की राहें बनी रहती हैं,\nमोहब्बत की बातें अनकही सी रहती हैं,\nतेरी एक मुस्कान से दिन बन जाता है,\nहर धड़कन में बस तू ही समा जाता है।",
    author: "अज्ञात",
  },
  {
    text: "चाँद की चाँदनी में तेरा चेहरा नजर आता है,\nहर सितारे में तेरा ही नूर छलकता है,\nतेरी बातों की मिठास में खो जाते हैं,\nदिल का हर कोना तुझसे ही संवरता है।",
    author: "मिर्ज़ा ग़ालिब",
  },
  {
    text: "इश्क़ में हर लम्हा एक कहानी बन जाता है,\nतेरे बिना हर पल अधूरा सा लगता है,\nतेरी हंसी की खनक में सुकून मिलता है,\nदिल का हर गीत तुझ पर ही ठहरता है।",
    author: "राहत इंदौरी",
  },
  {
    text: "तेरी याद में हर रात गुजर जाती है,\nख्वाबों की दुनिया में तू ही नजर आती है,\nदिल की गहराइयों में तेरा नाम बस्ता है,\nहर सांस में बस तेरा ही एहसास रहता है।",
    author: "अज्ञात",
  },
  {
    text: "ज़िंदगी का हर लम्हा तुझसे रौशन है,\nतेरे बिना ये दिल बेकरार और उदास है,\nतेरे साथ की हर बात अनमोल लगती है,\nहर पल में बस तेरा ही प्यार बस्ता है।",
    author: "अज्ञात",
  },
  {
    text: "तेरे बिना अधूरी सी हर बात लगती है,\nदिल की गहराइयों में तू ही बस्ती है,\nतेरी एक नजर से दुनिया रंगीन हो जाती,\nहर ख्वाब में बस तू ही नजर आती है।",
    author: "फ़ैज़ अहमद फ़ैज़",
  },
];

export default function Home() {
  const [currentShayari, setCurrentShayari] = useState(null);
  const [previousShayaris, setPreviousShayaris] = useState([]);

  useEffect(() => {
    // Calculate Shayari index based on day of the year
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const shayariIndex = dayOfYear % shayariData.length;
    setCurrentShayari(shayariData[shayariIndex]);

    // Get previous 3 Shayaris
    const prevIndices = [
      (shayariIndex - 1 + shayariData.length) % shayariData.length,
      (shayariIndex - 2 + shayariData.length) % shayariData.length,
      (shayariIndex - 3 + shayariData.length) % shayariData.length,
    ];
    setPreviousShayaris(prevIndices.map((index) => shayariData[index]));

    // GSAP animations
    gsap.fromTo(
      '.shayari-card',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
    gsap.fromTo(
      '.prev-shayari',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, stagger: 0.2, ease: 'power2.out', delay: 0.5 }
    );
  }, []);

  return (
    <div className="min-h-screen  bg-gradient-to-br from-purple-600 via-blue-500 to-pink-500 flex flex-col">
      {/* Header */}
      

      {/* Main Shayari Section */}
      <main className="flex-grow flex items-center  justify-center p-4">
        <div className="shayari-card bg-white mt-20 rounded-lg shadow-2xl p-8 max-w-lg w-full text-center transform transition-all hover:scale-105">
          <h2 className="text-2xl font-semibold text-purple-700  mb-4">आज की शायरी</h2>
          {currentShayari ? (
            <div>
              <p className="text-lg text-gray-800 italic mb-4 whitespace-pre-line">
                {currentShayari.text}
              </p>
              <p className="text-sm text-gray-600">— {currentShayari.author}</p>
            </div>
          ) : (
            <p className="text-lg text-gray-800">शायरी लोड हो रही है...</p>
          )}
          <div className="mt-6">
            <p className="text-sm text-gray-500">
              दिनांक - {new Date().toLocaleDateString('hi-IN')}
            </p>
          </div>
        </div>
      </main>

      {/* Previous Shayaris Section */}
      <section className="bg-gray-100  py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">पिछली शायरियाँ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previousShayaris.map((shayari, index) => (
              <div
                key={index}
                className="prev-shayari bg-white rounded-lg shadow-md p-6 text-center"
              >
                <p className="text-md text-gray-700 italic mb-4 whitespace-pre-line">
                  {shayari.text}
                </p>
                <p className="text-sm text-gray-500">— {shayari.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
    
    </div>
  );
}