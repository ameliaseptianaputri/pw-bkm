import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import eventImg from "../assets/images/KE-2.png"; // gambar default
import KalenderForm from "./KalenderForm";
import api from "../api";
import { message } from "antd";

const Kalender = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [event, setEvent] = useState(null); // cuma satu event
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) setIsLoggedIn(true);
        fetchEvent();
    }, []);

    const fetchEvent = async () => {
        try {
            const res = await api.get("/kalenders");
            // Ambil event pertama (karena satu kotak aja tampil)
            setEvent(res.data[0] || null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreate = () => {
        setEvent(null);
        setModalVisible(true);
    };

    const handleEdit = () => {
        setModalVisible(true);
    };

    const handleDelete = async () => {
        if (event && window.confirm("Yakin mau hapus event ini?")) {
            await api.delete(`/kalenders/${event.id}`);
            message.success("Event dihapus");
            fetchEvent();
        }
    };

    const handleSubmit = async (values, file) => {
        const formData = new FormData();
    
        // Ensure date and time are dayjs objects before formatting
        const date = dayjs(values.date).format("YYYY-MM-DD");  // Convert to dayjs if not already
        const time = dayjs(values.time).format("HH:mm");       // Convert to dayjs if not already
    
        formData.append("description", values.description);
        formData.append("date", date);
        formData.append("time", time);
        formData.append("location", values.location);
    
        if (file && file.originFileObj) {
            formData.append("image", file.originFileObj);
        }
    
        try {
            if (event) {
                await api.post(`/kalenders/${event.id}?_method=PUT`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                message.success("Event berhasil diupdate");
            } else {
                await api.post("/kalenders", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                message.success("Event berhasil dibuat");
            }
            setModalVisible(false);
            fetchEvent();
        } catch (err) {
            console.error(err);
            message.error("Ada error saat submit");
        }
    };
    
    return (
        <div
            id="kalender"
            className="flex items-center bg-[#EFA720] p-10 pt-25 pb-25 rounded-lg relative"
        >
            {/* Gambar Event */}
            <div className="w-1/4 ml-30 relative">
                <img
                    src={event?.image ? `http://127.0.0.1:8000/storage/${event.image}` : eventImg}
                    alt="Event"
                    className="w-full rounded-lg shadow-lg"
                />
            </div>

            {/* Deskripsi Event */}
            <div className="w-1/2 pl-10 text-white">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Kalender Event</h3>

                    {/* Tombol Create/Edit/Delete */}
                    {isLoggedIn && (
                        <div className="flex space-x-4">
                            <button
                                className="p-2 rounded-full bg-white text-green-500"
                                onClick={handleCreate}
                            >
                                <FaPlus />
                            </button>
                            {event && (
                                <>
                                    <button
                                        className="p-2 rounded-full bg-white text-blue-500"
                                        onClick={handleEdit}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="p-2 rounded-full bg-white text-red-500"
                                        onClick={handleDelete}
                                    >
                                        <FaTrash />
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <h1 className="text-xl font-bold mt-2">Bintang Kreasi Multivision</h1>

                {/* Garis putih */}
                <div className="w-80 h-1 bg-white mt-2 mb-4 rounded-full"></div>

                {/* Deskripsi Event */}
                <p className="text-sm leading-relaxed">
                    {event?.description || "-"}
                </p>

                {/* Info Event */}
                <div className="mt-6 space-y-2">
                    <div className="flex items-center space-x-3">
                        <i className="ri-calendar-event-fill"></i>
                        <p className="text-sm">{event?.date || "-"}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <i className="ri-time-fill"></i>
                        <p className="text-sm">{event?.time || "-"}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <i className="ri-map-pin-fill"></i>
                        <p className="text-sm">{event?.location || "-"}</p>
                    </div>
                </div>
            </div>

            {/* Modal Form */}
            <KalenderForm
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onSubmit={handleSubmit}
                initialValues={event}
            />
        </div>
    );
};

export default Kalender;
