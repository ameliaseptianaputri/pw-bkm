import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../api";
import NewsForm from "./NewsForm";

const News = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [newsList, setNewsList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) setIsLoggedIn(true);
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const res = await api.get("/news");
            setNewsList(res.data);
        } catch (err) {
            console.error("Error fetching news:", err);
        }
    };

    const handleOpenCreate = () => {
        setIsEdit(false);
        setSelectedNews(null);
        setModalVisible(true);
    };

    const handleOpenEdit = (news) => {
        setSelectedId(news.id);
        setIsEdit(true);
        setSelectedNews(news);
        setModalVisible(true);
    };

    const handleUpdate = async (id, formData) => {
        try {
            await api.post(`/news/${id}?_method=PUT`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            fetchNews();
            setModalVisible(false);
        } catch (err) {
            console.error("Error updating news:", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/news/${id}`);
            fetchNews();
        } catch (err) {
            console.error("Error deleting news:", err);
        }
    };

    return (
        <div className="w-full flex flex-col items-center py-10 bg-white">
            {/* Heading */}
            <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center px-4 mb-6">
                <div className="text-left">
                <h2 className="text-xl text-[#F1AA1F] font-semibold">News</h2>
                <h1 className="text-2xl font-bold text-[#F1AA1F]">Bintang Kreasi Multivision</h1>
                </div>
                <div className="text-center text-sm text-gray-800 mt-2 md:mt-0">
                    Merupakan bukti nyata kita telah menangani
                    berbagai event
                </div>
                {isLoggedIn && (
                    <button
                        className="bg-[#F1AA1F] text-white p-2 rounded-full hover:bg-yellow-600 ml-4"
                        onClick={handleOpenCreate}
                    >
                        <FaPlus />
                    </button>
                )}
            </div>

            <div className="w-full max-w-6xl border-t-2 border-[#F1AA1F] mb-8"></div>

            {/* Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl px-4">
                {newsList.map((news) => (
                    <div
                        key={news.id}
                        className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg"
                    >
                        {/* Image */}
                        <img
                            src={news.image_url}
                            alt={news.title}
                            className="w-full h-full object-cover"
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#F1AA1F] to-transparent"></div>

                        {/* Admin buttons */}
                        {isLoggedIn && (
                            <div className="absolute top-2 right-2 flex gap-2 z-20">
                                <FaEdit
                                    className="text-gray-600 cursor-pointer"
                                    onClick={() => handleOpenEdit(news)}
                                />
                                <FaTrash
                                    className="text-red-500 cursor-pointer"
                                    onClick={() => handleDelete(news.id)}
                                />
                            </div>
                        )}

                        {/* Content */}
                        <div className="absolute bottom-0 w-full p-4 z-10 text-white">
                            <h3 className="text-sm font-semibold mb-2">
                                {news.title}
                            </h3>
                            <p className="text-xs line-clamp-3 leading-snug">
                                {news.content}
                            </p>
                            <div className="flex justify-between items-center mt-3">
                                <button
                                    className="text-xs border border-white px-3 py-1 rounded-full hover:bg-white hover:text-[#F1AA1F] transition"
                                    onClick={() =>
                                        navigate(`/news/${news.id}`, {
                                            state: news,
                                        })
                                    }
                                >
                                    See more
                                </button>
                                <FaRegHeart className="text-white text-sm" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Form */}
            <NewsForm
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSaved={fetchNews} // Change this to onSaved for refreshing the news list
                isEdit={isEdit}
                data={selectedNews}
            />
        </div>
    );
};

export default News;
