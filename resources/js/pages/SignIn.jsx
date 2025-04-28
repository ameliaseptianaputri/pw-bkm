import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from '../api';

import bg1 from '../assets/images/bg1.png';
import bglogin from '../assets/images/bglogin.png';
import logo from '../assets/images/logo.png';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie');
      const res = await api.post('/login', { email, password });
      localStorage.setItem('authToken', res.data.access_token);
      alert(`Login berhasil`);
      navigate('/');
    } catch (err) {
      console.error('Login gagal:', err.response?.data);
      alert('Login gagal');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      <div className="flex w-[800px] bg-white shadow-lg rounded-lg overflow-hidden">
        <div
          className="w-1/2 flex flex-col items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${bglogin})` }}
        >
          <img src={logo} alt="Logo" className="w-32 mb-4" />
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
