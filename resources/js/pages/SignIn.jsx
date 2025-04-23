import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from '../api';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Jangan lupa preventDefault agar form tidak reload otomatis
  
    try {
      // Memastikan CSRF cookie sudah diambil
      await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie');
      console.log('CSRF cookie di-set');
  
      // Kirim request login ke API
      const res = await api.post('/login', { email, password });
      console.log('Login response:', res.data); // Cek response yang diterima 
      localStorage.setItem('authToken', res.data.access_token);
      console.log('Token disimpan:', localStorage.getItem('authToken'));
      console.log('Login sukses:', res.data); // Pastikan data diterima dengan benar
      alert(`Login berhasil`);
      navigate('/'); // Arahkan ke halaman yang diinginkan setelah login
    } catch (err) {
      console.error('Login gagal:', err.response?.data); // Menampilkan error lebih detail di konsol
      alert('Login gagal');
    }
  };
  
  
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/src/assets/images/bg1.png')" }}
    >
      <div className="flex w-[800px] bg-white shadow-lg rounded-lg overflow-hidden">
        <div
          className="w-1/2 flex flex-col items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('/src/assets/images/bglogin.png')" }}
        >
          <img src="/logo.png" alt="Logo" className="w-32 mb-4" />
          <p className="text-[#F1AA1F] font-bold text-sm text-center">
            Welcome to Bintang Kreasi Multivision
          </p>
        </div>

        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-bold text-[#F1AA1F] mb-6">Login Here.</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              required
              placeholder="User Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F1AA1F]"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F1AA1F]"
            />
            <button
              type="submit"
              className="w-full bg-[#F1AA1F] text-white py-2 rounded-md font-bold hover:opacity-90 transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
