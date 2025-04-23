import React from "react";
import HeroImage from "../assets/images/bg.png";

const HeroSection = () => {
  return (
    <div className="homepage relative w-full min-h-screen text-white pt-24">
      {/* Background Section */}
      <div className="absolute top-0 left-0 w-full h-screen -z-10">
        <img
          src={HeroImage}
          alt="Hero Background"
          className="w-full h-full object-cover object-[center_20%]"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FFB300] to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-6 md:px-4 max-w-lg absolute left-5 md:left-20 text-left mt-16 md:mt-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-5 leading-tight">
          BINTANG <br />
          KREASI <br />
          MULTIVISION
        </h1>
        <p className="text-sm md:text-sm mb-6 md:mb-7 max-w-[90%] md:max-w-none">
          Sebagai Event Organizer & Creative Agency, kami menghadirkan solusi
          strategis untuk menciptakan event yang unik, efektif, dan berkesan.
          Kami memahami bahwa setiap brand memiliki cerita tersendiri—dan kami
          siap membantu Anda menyampaikannya dengan kreasi terbaik.
        </p>
      </div>

      {/* Visi & Misi Section (Posisi dinaikkan lebih ke atas) */}
      <div className="relative w-full flex justify-center mt-36 md:mt-20 px-6">
        <div className="bg-white text-gray-900 shadow-lg rounded-lg p-6 max-w-4xl w-full flex flex-col md:flex-row gap-6 relative">
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-full h-20 bg-transparent"></div>
          <div className="flex-1 text-left">
            <h3 className="text-xl font-bold mb-2 text-[#F1AA1F]">VISI</h3>
            <p className="text-sm leading-relaxed">
              Memberikan pelayanan yang berfokus kepada kualitas, kenyamanan,
              dan kepuasan pelanggan.
            </p>
          </div>
          <div className="hidden md:block w-px bg-gray-300"></div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 text-[#F1AA1F]">MISI</h3>
            <ul className="list-disc list-inside text-sm leading-relaxed">
              <li>Meningkatkan kualitas produksi dan marketing</li>
              <li>Memberikan kenyamanan kepada pelanggan</li>
              <li>
                Menjalin kerjasama yang saling menguntungkan ke berbagai pihak
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
