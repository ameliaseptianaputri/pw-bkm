import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import api from "../api";
import GaleriForm from "./GaleriForm";

const Galeri = () => {
    const [galeri, setGaleri] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedGaleri, setSelectedGaleri] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

    // Cek apakah pengguna sudah login
    const isLoggedIn = localStorage.getItem("authToken"); // Cek token di localStorage

    useEffect(() => {
        fetchGaleri();
    }, []);

    const fetchGaleri = async () => {
        try {
            const response = await api.get("/galeri");
            setGaleri(response.data);
        } catch (error) {
            console.error("Error fetching galeri:", error);
        }
    };

    const handleOpenCreate = () => {
        setIsEdit(false);
        setSelectedGaleri(null);
        setModalVisible(true);
    };

    const handleOpenEdit = (galeri) => {
        setIsEdit(true);
        setSelectedId(galeri.id);
        setSelectedGaleri(galeri);
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/galeri/${id}`);
            fetchGaleri();
        } catch (error) {
            console.error("Error deleting galeri:", error);
        }
    };

    return (
        <div className="w-full flex flex-col items-center py-10 relative">
            <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-[#F1AA1F]">GALERI</h2>
                {isLoggedIn && ( // Cek apakah pengguna sudah login
                    <button
                        className="bg-[#F1AA1F] text-white p-2 rounded-full shadow-md hover:bg-yellow-600"
                        onClick={handleOpenCreate}
                    >
                        <FaPlus />
                    </button>
                )}
            </div>
            <div className="w-250 border-t-2 border-[#F1AA1F] mb-6 mt-2"></div>

            {/* Grid galeri */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-8">
                {galeri.map((item) => (
                    <div key={item.id} className="relative">
                        <img
                            src={`http://localhost:8000/storage/galeri/${item.image}`}
                            alt="Galeri"
                            className="w-48 h-48 object-cover rounded-lg shadow-lg"
                        />
                        {/* Tampilkan ikon Edit dan Hapus hanya jika sudah login */}
                        {isLoggedIn && (
                            <div className="absolute top-2 right-2 flex gap-2 z-20">
                                <FaEdit
                                    onClick={() => handleOpenEdit(item)}
                                    className="text-white cursor-pointer"
                                    title="Edit"
                                />
                                <FaTrash
                                    onClick={() => handleDelete(item.id)}
                                    className="text-red-500 cursor-pointer"
                                    title="Hapus"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal untuk tambah/edit galeri */}
            <GaleriForm
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={() => {
                    fetchGaleri();
                    setModalVisible(false);
                }}
                isEdit={isEdit}
                initialData={selectedGaleri}
                galeriId={selectedId}
            />
        </div>
    );
};

export default Galeri;
