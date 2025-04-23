import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa";
import eventImg from "../assets/images/ke-1.png";

const Kalender = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Contoh cek login pakai token dari localStorage
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <div
            id="kalender"
            className="flex items-center bg-[#EFA720] p-10 pt-25 pb-25 rounded-lg relative"
        >
            {/* Gambar Event */}
            <div className="w-1/4 ml-30 relative">
                <img
                    src={eventImg}
                    alt="Event Image"
                    className="w-full rounded-lg shadow-lg"
                />

                {/* Tombol Edit di Foto */}
                {isLoggedIn && (
                    <button
                        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer"
                        onClick={() => alert("Edit Foto")}
                    >
                        <FaEdit className="text-gray-600" />
                    </button>
                )}
            </div>

            {/* Deskripsi Event */}
            <div className="w-1/2 pl-10 text-white">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Kalender Event</h3>

                    {/* Dropdown Menu */}
                    {isLoggedIn && (
                        <div className="relative">
                            <button
                                className="bg-white p-2 rounded-full shadow-md cursor-pointer"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <FaEllipsisV className="text-black" />
                            </button>

                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg">
                                    <button
                                        className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-200 w-full"
                                        onClick={() => alert("Tambah Event")}
                                    >
                                        <FaPlus className="mr-2 text-green-500" />{" "}
                                        Create
                                    </button>
                                    <button
                                        className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-200 w-full"
                                        onClick={() => alert("Edit Event")}
                                    >
                                        <FaEdit className="mr-2 text-blue-500" />{" "}
                                        Edit
                                    </button>
                                    <button
                                        className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-200 w-full"
                                        onClick={() => alert("Hapus Event")}
                                    >
                                        <FaTrash className="mr-2 text-red-500" />{" "}
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <h1 className="text-xl font-bold">Headings</h1>
                <p className="mt-4 text-sm leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur. Rhoncus cras mauris
                    suscipit in. Nunc malesuada iaculis non facilisi enim
                    malesuada ullamcorper euismod eu. Tincidunt quam diam id
                    ipsum amet in. Eget neque risus porta cursus.
                </p>

                {/* Info Event */}
                <div className="mt-6 space-y-2">
                    <div className="flex items-center space-x-3">
                        <i className="ri-calendar-event-fill"></i>
                        <p className="text-sm">12 Maret 2025</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <i className="ri-time-fill"></i>
                        <p className="text-sm">10.00 - 17.00</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <i className="ri-map-pin-fill"></i>
                        <p className="text-sm">Lapangan Merdeka</p>
                    </div>
                </div>

                {/* Tombol See More */}
                <button className="mt-6 px-4 py-2 text-xs font-semibold text-black bg-white rounded-md shadow-md">
                    See More
                </button>
            </div>
        </div>
    );
};

export default Kalender;
