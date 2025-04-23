import React from 'react';

const Gallery = () => {
  return (
    <section id="galeri" className="bg-white py-12 px-4 sm:px-6 lg:px-12">
      <div className="w-full">
        <h2 className="text-[#F1AA1F] font-bold text-3xl mb-2">Gallery</h2>
        <div className="h-[2px] w-28 bg-[#F1AA1F] mb-6" />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* Ganti ini dengan foto asli ya nanti */}
          <div className="aspect-square bg-gray-300 rounded-md"></div>
          <div className="aspect-square bg-gray-300 rounded-md"></div>
          <div className="aspect-square bg-gray-300 rounded-md"></div>
          <div className="aspect-square bg-gray-300 rounded-md"></div>
          <div className="aspect-square bg-gray-300 rounded-md"></div>
          <div className="aspect-square bg-gray-300 rounded-md"></div>
          <div className="aspect-square bg-gray-300 rounded-md"></div>
          <div className="aspect-square bg-gray-300 rounded-md"></div>
          <div className="aspect-square bg-gray-300 rounded-md"></div>
          <div className="aspect-square bg-gray-300 rounded-md"></div>
          <div className="aspect-square bg-gray-300 rounded-md"></div>
          <div className="aspect-square bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
