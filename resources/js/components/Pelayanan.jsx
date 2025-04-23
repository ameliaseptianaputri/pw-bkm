// components/Pelayanan.jsx
import React, { useState, useEffect } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import api from "../api";
import PelayananForm from "./PelayananForm";

const Pelayanan = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [layanan, setLayanan] = useState([]);
    const [modalData, setModalData] = useState(null);

    const fetchData = async () => {
        try {
            const res = await api.get("/layanan");
            setLayanan(res.data);
        } catch (err) {
            console.error("Gagal fetch data:", err);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsLoggedIn(true);
        }
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Yakin ingin menghapus layanan ini?")) return;
        try {
            await api.delete(`/layanan/${id}`);
            fetchData();
        } catch (err) {
            console.error("Gagal delete:", err);
        }
    };

    return (
        <div
            id="layanan"
            className="bg-[#F1AA1F] py-12 text-white min-h-screen"
        >
            <div className="flex justify-center items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold">Pelayanan Kami</h2>
                {isLoggedIn && (
                    <button
                        onClick={() => setModalData({})}
                        className="bg-white text-[#F1AA1F] p-2 rounded-full hover:scale-105 transition"
                    >
                        <FaPlus />
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 md:px-16">
                {layanan.map((item) => (
                    <div
                        key={item.id}
                        className="flex gap-4 items-center text-white"
                    >
                        <img
                            src={`http://127.0.0.1:8000/storage/layanan/${item.gambar}`}
                            alt={item.judul}
                            className="w-24 h-24 object-cover rounded-md"
                        />

                        <div className="flex-1">
                        {isLoggedIn && (

                            <h3 className="font-bold text-lg flex items-center gap-2">
                                {item.judul}
                                <FaEdit
                                    className="cursor-pointer hover:text-blue-500"
                                    onClick={() => setModalData(item)}
                                />
                                <FaTrash
                                    className="cursor-pointer text-red-500 hover:text-red-600"
                                    onClick={() => handleDelete(item.id)}
                                />
                            </h3>
 )}
                            <p
                                className="text-sm"
                                style={{ textAlign: "justify" }}
                            >
                                {item.deskripsi}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {modalData && (
                <PelayananForm
                    visible={!!modalData}
                    data={modalData}
                    onClose={() => setModalData(null)}
                    onSaved={() => {
                        fetchData();
                        setModalData(null);
                    }}
                />
            )}
        </div>
    );
};

export default Pelayanan;
