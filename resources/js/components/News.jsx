import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import newsImg from "../assets/images/news.png";

const News = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Contoh cek login pakai token dari localStorage
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);
    return (
        <div id="news" className="py-12 bg-white">
            <div className="container mx-auto px-4">
                {/* Header News dengan Dropdown */}
                <div className="flex items-center justify-between mb-8 relative">
                    <div className="flex items-center gap-3">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                News
                            </h2>
                            <h1 className="text-3xl font-bold text-black">
                                Headings
                            </h1>
                        </div>

                        {/* Dropdown Menu */}
                        {isLoggedIn && (
                            <div className="relative">
                                <FaEllipsisV
                                    className="cursor-pointer text-gray-600 hover:text-gray-800"
                                    onClick={() =>
                                        setDropdownOpen(!dropdownOpen)
                                    }
                                />
                                {dropdownOpen && (
                                    <div className="absolute left-0 mt-2 w-32 bg-white shadow-lg rounded-md border z-50">
                                        <button
                                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"
                                            onClick={() => alert("Create News")}
                                        >
                                            <FaPlus className="text-green-500" />{" "}
                                            Create
                                        </button>
                                        <button
                                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"
                                            onClick={() => alert("Edit News")}
                                        >
                                            <FaEdit className="text-blue-500" />{" "}
                                            Edit
                                        </button>
                                        <button
                                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"
                                            onClick={() => alert("Delete News")}
                                        >
                                            <FaTrash className="text-red-500" />{" "}
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="w-1/2 text-gray-600 text-right font-bold">
                        <p>
                            News Heading merupakan bukti nyata kita telah
                            menangani berbagai event
                        </p>
                    </div>
                </div>

                <div className="border-t-4 border-[#F1AA1F] mt-6"></div>

                {/* News Cards */}
                <div className="flex justify-between mt-8 space-x-10 relative">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="relative w-1/3">
                            <img
                                src={newsImg}
                                alt={`News ${item}`}
                                className="w-full h-75 object-cover"
                            />

                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[#FFB300]"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-semibold text-center px-4 translate-y-15">
                                Lorem Ipsum dolor sit amet
                            </div>

                            {/* Tombol Edit di setiap foto */}
                            {isLoggedIn && (
                                <div className="absolute top-2 right-2 bg-white p-2 rounded-full shadow cursor-pointer z-40">
                                    <FaEdit
                                        className="text-gray-600"
                                        onClick={() => alert("Edit Image")}
                                    />
                                </div>
                            )}
                            {/* Tombol See More dan Like */}
                            <div className="absolute bottom-2 left-4 flex items-center space-x-2 w-full justify-between pr-4">
                                <button className="bg-white text-black px-4 py-2 text-xs font-semibold rounded-md">
                                    See More
                                </button>
                                <span className="text-2xl">❤️</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default News;
