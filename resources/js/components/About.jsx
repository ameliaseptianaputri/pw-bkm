import React from "react";
import BKMLogo from "../assets/images/bkm.png";

const About = () => {
    return (
<div id="about" className="w-full flex justify-center mt-16 px-4 md:px-6">
<div className="max-w-4xl w-full flex flex-col md:flex-row items-center text-gray-900">
          {/* Logo (Lebih Besar di Mobile) */}
          <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center md:justify-start mb-4 md:mb-0">
            <img src={BKMLogo} alt="BKM Logo" className="w-40 md:w-64" />
          </div>
  
          {/* Garis Pembatas */}
          <div className="hidden md:block w-[2px] h-45 bg-gradient-to-b from-[#FF710C] via-[#E99211] to-[#FFB300] hover:opacity-80 mx-6"></div>
  
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold mb-3 text-[#F1AA1F]">
              BINTANG KREASI MULTIVISION
            </h3>
            <p className="text-xs md:text-sm leading-relaxed text-gray-800 mb-3 md:mb-5">
              Bintang Kreasi Multivision dapat memberikan solusi pada kebutuhan
              Event perusahaan serta desain produk Anda, dengan tim yang
              kompeten dan memiliki waktu bekerja secara full time kami akan
              memberikan pelayanan yang terbaik serta efisien.
            </p>
            <p className="text-xs md:text-sm leading-relaxed text-gray-800">
              Hadir di dunia bisnis dari tahun 2022 membuat kami sadar bahwa
              teknologi merupakan peranan yang sangatlah penting untuk membangun
              bisnis.
            </p>
            <div className="mt-5 flex flex-wrap justify-center md:justify-start gap-4">
              <span className="bg-[#F1AA1F] text-white px-4 py-2 rounded-lg text-xs md:text-sm">
                Event Organizer
              </span>
              <span className="bg-[#F1AA1F] text-white px-4 py-2 rounded-lg text-xs md:text-sm">
                Creative Agency
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default About;
  