import React from "react";

const Kontak = () => {
  return (
    <div id="kontak"className="bg-white py-10 relative">
      <div className="max-w-5xl mx-auto mt-10">
        <div className="flex flex-col md:flex-row gap-6 items-start relative">
          {/* Kartu Deskripsi (Dilebarkan & Diberi <span>) */}
          <div className="w-full md:w-1/2 p-6 md:pl-10 bg-white border border-gray-300 shadow-md shadow-gray-500 rounded-lg">
            <p className="text-black text-sm mt-2">
              <span className="text-sm font-extrabold">
                Bintang Kreasi Multivision
              </span>
              , kami percaya bahwa setiap acara adalah peluang untuk menciptakan
              kenangan istimewa. Dengan kreativitas, inovasi, dan
              profesionalisme, kami siap membantu Anda mengubah visi menjadi
              realitas yang menginspirasi.
            </p>
          </div>

          {/* Kartu Hubungi Kami */}
          <div className="w-full md:w-3/4 p-6 bg-white border border-gray-300 shadow-md shadow-gray-500 rounded-lg -mt-35">
            <h2 className="text-center text-2xl font-bold mb-4 text-black">
              Hubungi Kami
            </h2>

            <input
              type="email"
              placeholder="Masukkan Email"
              className="w-full p-2 border border-gray-300 rounded-lg mb-3 bg-[#EFA720] text-white"
            />
            <textarea
              rows="4"
              placeholder="Pesan"
              className="w-full p-2 border border-gray-300 rounded-lg bg-[#EFA720] text-white"
            ></textarea>

            {/* Bagian Footer: Icon Sosmed (Kiri) + Tombol Send (Kanan) */}
            <div className="flex justify-between items-center mt-4">
              {/* Icon Sosmed */}
              <div className="flex space-x-3">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="ri-instagram-fill text-black text-2xl"></i>
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="ri-linkedin-box-fill text-black text-2xl"></i>
                </a>
                <a
                  href="https://www.tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="ri-tiktok-fill text-black text-2xl"></i>
                </a>
                <a
                  href="https://www.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="ri-google-fill text-black text-2xl"></i>
                </a>
              </div>

              {/* Tombol Send di Kanan */}
              <button className="px-6 py-2 bg-black text-white rounded-lg shadow-md">
                Send
              </button>
            </div>
          </div>

          {/* Kartu Informasi Kontak */}
          <div className="w-full md:w-1/2 p-6 bg-white border border-gray-300 shadow-md shadow-gray-500 rounded-lg md:-mr-6">
            <div className="flex items-center space-x-3 mb-3">
              <i className="ri-mail-fill text-[#EFA720] font-bold text-xl"></i>
              <p className="text-sm text-black">bintangkreasimultivision@gmail.com</p>
            </div>
            <div className="flex items-center space-x-3 mb-3">
              <i className="ri-phone-fill text-[#EFA720] font-bold text-xl"></i>
              <p className="text-sm text-black">0897-xxxx-xxx</p>
            </div>

            <div className="flex items-center space-x-3">
              <i className="ri-map-pin-fill text-[#EFA720] font-bold text-xl"></i>
              <p className="text-sm text-black">
                Grand Artzimar, Jl. Artzimar II No.24, RT.01/RW.01, Tegal
                Gundil, Kec. Bogor Utara, Kota Bogor, Jawa Barat 16152
              </p>
            </div>
          </div>
        </div>

        {/* Lokasi Tambahan */}
        {/* <div className="mt-4 text-center text-gray-700 text-sm font-bold">
        <i className="ri-map-pin-fill text-[#EFA720] text-2xl"></i>
        Grand Artzimar, Jl. Artzimar II No.24, RT.01/RW.01, Tegal <br />
        Gundil, Kec. Bogor Utara, Kota Bogor, Jawa Barat 16152
      </div> */}
      </div>
    </div>
  );
};

export default Kontak;
