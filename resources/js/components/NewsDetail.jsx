import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { Modal } from "antd";
import api from "../api";
import NewsDetailForm from "../components/NewsDetailForm"; // form untuk edit judul, deskripsi, tanggal
import ImageUploadForm from "../components/ImageUploadForm"; // form untuk tambah gambar

const NewsDetail = () => {
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [news, setNews] = useState(location.state || null);
    const [images, setImages] = useState([]);
    const [modalOpen, setModalOpen] = useState(false); // untuk form edit berita
    const [imageModalOpen, setImageModalOpen] = useState(false); // untuk form tambah gambar

    const isLoggedIn = localStorage.getItem("authToken"); // Cek apakah token ada di localStorage

    useEffect(() => {
        if (!news) {
            api.get(`/news/${id}`).then((res) => setNews(res.data));
        }
        fetchImages();
    }, [id]);

    const fetchImages = () => {
        api.get(`/news/${id}/images`).then((res) => setImages(res.data));
    };

    const handleDeleteNews = async () => {
        Modal.confirm({
            title: "Hapus Berita",
            content: "Yakin mau hapus berita ini?",
            okText: "Ya, hapus",
            okType: "danger",
            cancelText: "Batal",
            onOk: async () => {
                await api.delete(`/news/${id}`);
                navigate("/news"); // balik ke list news
            },
        });
    };

    const handleDeleteImage = async (imageId) => {
        Modal.confirm({
            title: "Hapus Gambar",
            content: "Yakin mau hapus gambar ini?",
            okText: "Ya, hapus",
            okType: "danger",
            cancelText: "Batal",
            onOk: async () => {
                await api.delete(`/news/images/${imageId}`);
                fetchImages();
            },
        });
    };

    const handleImageSubmit = (updatedNews) => {
        // Lakukan sesuatu setelah gambar berhasil di-upload
        console.log(updatedNews);
        setNews(updatedNews); // Update berita dengan data terbaru
        fetchImages(); // Memperbarui daftar gambar
        setImageModalOpen(false); // Menutup modal setelah gambar berhasil ditambahkan
    };

    if (!news) return <div className="p-6">Loading...</div>;

    return (
        <div className="pt-[100px] px-6 pb-10 max-w-6xl mx-auto font-sans">
            <div className="text-left">
                <h2 className="text-xl text-[#F1AA1F] font-semibold">News</h2>
                <h1 className="text-2xl font-bold text-[#F1AA1F]">
                    Bintang Kreasi Multivision
                </h1>
                <div className="w-full max-w-6xl border-t-2 border-[#F1AA1F] mb-8"></div>

            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
                <div className="relative">
                    <img
                        src={news.image_url}
                        alt={news.title}
                        className="rounded-xl w-full h-72 object-cover"
                    />
                </div>

                <div>
                    <h2 className="text-xl font-bold text-[#F1AA1F] mb-4">
                        {news.title}
                    </h2>
                    <p className="text-sm text-gray-800 leading-relaxed mb-4">
                        {news.description}
                    </p>
                    <p className="text-right text-sm text-[#F1AA1F]">
                        {news.date}
                    </p>
                </div>
            </div>

            {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                    {images.map((img) => (
                        <div key={img.id} className="relative group">
                            <img
                                src={img.url}
                                alt=""
                                className="w-full h-40 object-cover rounded-lg"
                            />
                            <button
                                onClick={() => handleDeleteImage(img.id)}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                            >
                                <FiTrash2 />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {isLoggedIn && ( // Cek apakah pengguna sudah login
                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => setModalOpen(true)}
                        className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                        <FiEdit2 /> Edit
                    </button>
                    <button
                        onClick={handleDeleteNews}
                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        <FiTrash2 /> Hapus
                    </button>
                    <button
                        onClick={() => setImageModalOpen(true)}
                        className="flex items-center gap-1 bg-[#F1AA1F] hover:bg-[#e49a1c] text-white px-4 py-2 rounded"
                    >
                        <FiPlus /> Tambah Gambar
                    </button>
                </div>
            )}

            <button
                onClick={() => navigate(-1)}
                className="mt-10 px-6 py-2 bg-[#F1AA1F] text-white rounded-lg"
            >
                Kembali
            </button>

            <NewsDetailForm
                visible={modalOpen}
                onClose={() => setModalOpen(false)}
                onSuccess={() => {
                    fetchImages();
                    setModalOpen(false);
                }}
                news={news}
                newsId={id}
            />
            <ImageUploadForm
                visible={imageModalOpen}
                onClose={() => setImageModalOpen(false)}
                onSubmit={handleImageSubmit} // Pastikan onSubmit di-passing
                newsId={id} // ID berita yang sedang diedit
                initialImage={news?.image} // Gambar awal jika ada
            />
        </div>
    );
};

export default NewsDetail;