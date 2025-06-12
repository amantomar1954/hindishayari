"use client";
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Top Writers Data
const writersData = [
  {
    id: 1,
    name: "मिर्ज़ा ग़ालिब",
    image: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    bio: "मिर्ज़ा ग़ालिब उर्दू और फ़ारसी के महान शायर हैं, जिनकी शायरी में प्यार, दर्द और ज़िंदगी की गहराई झलकती है।",
    genres: ["रोमांस", "दर्द"],
    shayaris: [
      "चाँद की चाँदनी में तेरा चेहरा नजर आता है,\nहर सितारे में तेरा ही नूर छलकता है।",
      "हज़ारों ख्वाहिशें ऐसी कि हर ख्वाहिश पे दम निकले,\nबड़े बेकरार से हैं हम किसी के इश्क़ में।",
    ],
  },
  {
    id: 2,
    name: "राहत इंदौरी",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    bio: "राहत इंदौरी की शायरी में जुनून और ज़िंदादिली का अनोखा संगम है, जो दिल को छू लेता है।",
    genres: ["प्यार", "जोश"],
    shayaris: [
      "इश्क़ में हर लम्हा एक कहानी बन जाता है,\nतेरे बिना हर पल अधूरा सा लगता है।",
      "बुलंदी देर तक कायम नहीं रहती,\nहर शख्स की अपनी एक हद होती है।",
    ],
  },
  {
    id: 3,
    name: "फ़ैज़ अहमद फ़ैज़",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    bio: "फ़ैज़ की शायरी में प्यार और समाज की सच्चाई का सुंदर मिश्रण है, जो हर दिल को छूता है।",
    genres: ["रोमांस", "समाज"],
    shayaris: [
      "तेरे बिना अधूरी सी हर बात लगती है,\nदिल की गहराइयों में तू ही बस्ती है।",
      "शाम-ए-फिराक़ अब ना पूछ, आए और आ के टल गई,\nदिल था कि फिर बेकरार हो गया।",
    ],
  },
  {
    id: 4,
    name: "अहमद फ़राज़",
    image: "https://images.unsplash.com/photo-1522556189639-b1509e4e4703?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    bio: "अहमद फ़राज़ की शायरी में इश्क़ और जज़्बात की गहराई हर पंक्ति में महसूस होती है।",
    genres: ["प्यार", "दर्द"],
    shayaris: [
      "रंजिश ही सही, दिल को दुखाने के लिए आ,\nआ फिर से मुझे छोड़ के जाने के लिए आ।",
      "वो बात सारी मैंने कही और सुन ली,\nवो रात सारी जलती रही और बुझ गयी।",
    ],
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('सभी');
  const [expandedWriters, setExpandedWriters] = useState({});
  const [filteredWriters, setFilteredWriters] = useState(writersData);
  const writersContainerRef = useRef(null);

  // Handle search and filter
  useEffect(() => {
    let filtered = writersData;
    if (searchTerm) {
      filtered = filtered.filter(
        (writer) =>
          writer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          writer.bio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedGenre !== 'सभी') {
      filtered = filtered.filter((writer) => writer.genres.includes(selectedGenre));
    }
    setFilteredWriters(filtered);

    // GSAP animations
    gsap.fromTo(
      '.writer-card',
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
    );
  }, [searchTerm, selectedGenre]);

  // Toggle expanded Shayaris
  const toggleExpanded = (id) => {
    setExpandedWriters((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Unique genres for filter
  const genres = ['सभी', ...new Set(writersData.flatMap((writer) => writer.genres))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-blue-100 to-purple-100 flex flex-col py-8 px-4">
      {/* Search and Filter Section */}
      <div className="max-w-5xl mx-auto mt-16 mb-12 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="लेखक या बायो खोजें..."
          className="w-full sm:w-1/2 p-4 rounded-full bg-white/90 backdrop-blur-sm border-none focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-800 placeholder-gray-500 shadow-md"
        />
        <div className="flex gap-3 flex-wrap justify-center">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedGenre === genre
                  ? 'bg-teal-500 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-teal-200'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Writers Grid */}
      <div
        ref={writersContainerRef}
        className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredWriters.length > 0 ? (
          filteredWriters.map((writer) => (
            <div
              key={writer.id}
              className="writer-card relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-3xl"
            >
              <img
                src={writer.image}
                alt={writer.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-teal-300"
              />
              <h2 className="text-xl font-bold text-teal-700 mb-2">{writer.name}</h2>
              <p className="text-sm text-gray-600 mb-4">{writer.bio}</p>
              <p className="text-xs text-teal-600 mb-4">श्रेणियाँ: {writer.genres.join(', ')}</p>
              <div className="space-y-4">
                {writer.shayaris
                  .slice(0, expandedWriters[writer.id] ? writer.shayaris.length : 1)
                  .map((shayari, index) => (
                    <p
                      key={index}
                      className="text-md text-gray-800 italic whitespace-pre-line font-medium"
                    >
                      {shayari}
                    </p>
                  ))}
              </div>
              <button
                onClick={() => toggleExpanded(writer.id)}
                className="mt-4 px-4 py-2 bg-teal-100 text-teal-600 rounded-full hover:bg-teal-200 transition-all duration-300"
              >
                {expandedWriters[writer.id] ? 'कम देखें' : 'और देखें'}
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-800 text-lg col-span-full animate-pulse">
            कोई लेखक नहीं मिला। खोज या फ़िल्टर बदलें।
          </p>
        )}
      </div>
    </div>
  );
}