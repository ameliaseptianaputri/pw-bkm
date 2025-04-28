import React from 'react';
import bkmLogo from '../assets/images/bkm.png'; // sesuaikan path ya

function Footer() {
  return (
<div className="footer bg-white shadow mt-10 mb-10">
<div className="bg-white text-black py-6 flex justify-center items-center">
        <img src={bkmLogo} alt="BKM Logo" className="h-15 mr-3" />
        <p className="text-lg">Copyright Bintang Kreasi Multivision &copy; All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
