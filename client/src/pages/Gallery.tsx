import React from "react";
import { motion } from "framer-motion";
import img1 from "@assets/stock_images/happy_k-pop_girl_gro_a50212f3.jpg";
import img2 from "@assets/stock_images/happy_k-pop_girl_gro_764dca11.jpg";
import img3 from "@assets/stock_images/happy_k-pop_girl_gro_55ca1c44.jpg";
import img4 from "@assets/stock_images/korean_aesthetic_caf_1d34bf0c.jpg";
import img5 from "@assets/stock_images/korean_aesthetic_caf_f7436fd6.jpg";
import frameImg from "@assets/generated_images/k-pop_style_photocard_frame.png";

const photos = [
  { id: 1, src: img1, caption: "Party Vibes" },
  { id: 2, src: img2, caption: "Concert Dreams" },
  { id: 3, src: img3, caption: "Shining Moment" },
  { id: 4, src: img4, caption: "Birthday Treats" },
  { id: 5, src: img5, caption: "Aesthetic Day" },
  { id: 6, src: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&q=80&w=800", caption: "Sweet 18" },
];

export default function Gallery() {
  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-purple-900 mb-2 font-heading">Memory Collection</h2>
        <p className="text-purple-600">Collecting moments like photocards ✨</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10, rotate: index % 2 === 0 ? 2 : -2 }}
            className="group relative"
          >
            {/* Photocard styling */}
            <div className="bg-white p-3 rounded-2xl shadow-lg border border-pink-100 aspect-[3/4] relative overflow-hidden transition-shadow duration-300 group-hover:shadow-2xl group-hover:shadow-pink-500/20">
              {/* Glossy overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent opacity-0 group-hover:opacity-100 z-20 pointer-events-none transition-opacity duration-500" />
              
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                <img 
                  src={photo.src} 
                  alt={photo.caption} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Frame Overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-80 z-10" 
                  style={{ backgroundImage: `url(${frameImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                  <p className="text-white font-bold text-center">{photo.caption}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
