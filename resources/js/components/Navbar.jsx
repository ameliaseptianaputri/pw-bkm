import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Status login

  const handleClick = () => {
    setShow(!show);
  };

  useEffect(() => {
    // Cek token di localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }

    const handleScroll = () => {
      if (window.scrollY > 5) {
        setScroll(true);
        setShow(false);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      console.log("User logout...");

      // Hapus token dari localStorage
      localStorage.removeItem("authToken");

      // Set status login menjadi false
      setIsLoggedIn(false);

      // Redirect ke halaman login atau #
      setTimeout(() => {
        window.location.href = "#"; // Bisa diganti ke "/signin" jika perlu
      }, 500);
      
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  let menuActive = show ? "right-0" : "-right-full";
  let scrollActive = scroll ? "py-6 bg-white shadow" : "py-4";

  return (
    <div className={`navbar fixed w-full transition-all ${scrollActive} z-50 bg-white shadow-md`}>
      <div className="container max-w-full mx-auto px-4">
        <div className="navbar-box flex items-center justify-between w-full">
          {/* Logo */}
          <div className="logo ml-4 md:ml-15">
            <img src={logo} alt="Logo" className="h-14 w-auto" />
          </div>

          {/* Navbar Menu + Sign In / Log Out */}
          <div className="flex items-center gap-x-9">
            <ul className={`flex lg:gap-6 md:gap-x-6 md:static md:flex-row md:shadow-none md:bg-none md:w-auto 
              md:h-full md:translate-y-0 md:text-black md:p-0 md:m-0 md:transition-none gap-5 fixed ${menuActive} top-1/2 
              -translate-y-1/2 flex-col px-8 py-6 rounded shadow-lg shadow-slate-300 bg-gradient-to-r from-[#FF710C] 
              via-[#E99211] to-[#CFB916] md:bg-none font-bold text-white transition-all mt-9 md:mt-0`}
            >
              <li><a href="#" className="font-medium opacity-75 hover:opacity-100 md:text-black text-white no-underline">Beranda</a></li>
              <li><a href="#about" className="font-medium opacity-75 hover:opacity-100 md:text-black text-white no-underline">Tentang Kami</a></li>
              <li><a href="#biodata" className="font-medium opacity-75 hover:opacity-100 md:text-black text-white no-underline">Biodata</a></li>
              <li><a href="#pelayanan" className="font-medium opacity-75 hover:opacity-100 md:text-black text-white no-underline">Layanan</a></li>
              <li><a href="#news" className="font-medium opacity-75 hover:opacity-100 md:text-black text-white no-underline">News</a></li>
              {/* <li><a href="#portfolio" className="font-medium opacity-75 hover:opacity-100 md:text-black text-white no-underline">Portfolio</a></li> */}
              <li><a href="#galeri" className="font-medium opacity-75 hover:opacity-100 md:text-black text-white no-underline">Galeri</a></li>
              <li><a href="#kalender" className="font-medium opacity-75 hover:opacity-100 md:text-black text-white no-underline">Kalender Event</a></li>
              <li><a href="#kontak" className="font-medium opacity-75 hover:opacity-100 md:text-black text-white no-underline">Kontak</a></li>
            </ul>

            {/* Button for Sign In / Log Out */}
            <div className="flex items-center gap-2">
              {!isLoggedIn ? (
                <a href="/signin" target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-white font-bold bg-gradient-to-r from-[#FF710C] via-[#E99211] to-[#FFB300] hover:opacity-80 transition-all"
                >
                  Sign In
                </a>
              ) : (
                <button onClick={handleLogout}
                  className="px-4 py-2 rounded-full text-white font-bold bg-gradient-to-r from-[#FF710C] via-[#E99211] to-[#FFB300] hover:opacity-80 transition-all"
                >
                  Log Out
                </button>
              )}

              <i className="ri-menu-3-line text-3xl md:hidden" onClick={handleClick}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
