import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import api from "../api";
import BiodataForm from "./BiodataForm";

const Biodata = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [biodata, setBiodata] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedBiodata, setSelectedBiodata] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsLoggedIn(true);
        }

        fetchBiodata();
    }, []);

    const fetchBiodata = async () => {
        try {
            const response = await api.get("/biodata");
            setBiodata(response.data);
        } catch (error) {
            console.error("Error fetching biodata:", error);
        }
    };

    const handleOpenCreate = () => {
        setIsEdit(false);
        setSelectedBiodata(null);
        setModalVisible(true);
    };

    const handleOpenEdit = (biodata) => {
        setSelectedId(biodata.id);
        setIsEdit(true);
        setSelectedBiodata(biodata);
        setModalVisible(true);
    };

    const handleUpdate = async (selectedId, formData) => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            console.log(
                "Token tidak ditemukan. Silakan login terlebih dahulu."
            );
            return;
        }

        try {
            await axios.post(
                `http://localhost:8000/api/biodata/${selectedId}?_method=PUT`, // fix URL here
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            fetchBiodata();
            setModalVisible(false);
        } catch (error) {
            console.error("Error updating biodata:", error);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        try {
            await axios.delete(`http://localhost:8000/api/biodata/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchBiodata(); // refresh data setelah delete
        } catch (error) {
            console.error("Error deleting biodata:", error);
        }
    };

    const groupedBiodata = biodata.reduce((acc, person) => {
        if (!acc[person.category]) {
            acc[person.category] = [];
        }
        acc[person.category].push(person);
        return acc;
    }, {});

    return (
        <div
            id="biodata"
            className="biodata w-full flex flex-col items-center py-10 relative"
        >
            <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-[#F1AA1F]">BIODATA</h2>
                {isLoggedIn && (
                    <button
                        className="bg-[#F1AA1F] text-white p-2 rounded-full shadow-md hover:bg-yellow-600"
                        onClick={handleOpenCreate}
                    >
                        <FaPlus />
                    </button>
                )}
            </div>
            <div className="w-250 border-t-2 border-[#F1AA1F] mb-6 mt-2"></div>

            {Object.entries(groupedBiodata).map(([category, people]) => (
                <div key={category} className="w-full max-w-4xl text-center">
                    <div className="col-span-4 text-[#F1AA1F] font-bold mt-6 mb-4 text-lg">
                        {category}
                    </div>
                    <div
                        className={`grid gap-6 ${
                            category === "Leader"
                                ? "flex justify-center"
                                : category === "Tim Lapangan"
                                ? "grid grid-cols-3 justify-center"
                                : "grid grid-cols-4"
                        }`}
                    >
                        {people.map((person) => (
                            <div
                                key={person.id}
                                className="flex flex-col items-center relative"
                            >
                                <img
                                    src={`http://localhost:8000/storage/biodata/${
                                        person.image || "default-avatar.png"
                                    }`}
                                    alt={person.name}
                                    className="w-24 h-24 bg-gray-300 object-cover rounded-md"
                                />

                                {isLoggedIn && (
                                    <div className="absolute top-2 right-2 flex flex-col p-2 rounded-full z-40">
                                        <FaEdit
                                            className="text-gray-600 mb-1 cursor-pointer"
                                            onClick={() =>
                                                handleOpenEdit(person)
                                            }
                                        />
                                        <FaTrash
                                            className="text-red-500 cursor-pointer"
                                            onClick={() =>
                                                handleDelete(person.id)
                                            }
                                        />
                                    </div>
                                )}
                                <p className="text-[#F1AA1F] font-bold text-[13px]">
                                    {person.name}
                                </p>
                                <p className="text-xs text-[#F1AA1F]">
                                    {person.division}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Modal Form bisa kamu tampilkan di sini */}
            {/* {modalVisible && (
        <BiodataForm
          onClose={() => setModalVisible(false)}
          onSubmit={isEdit ? (data) => handleUpdate(selectedId, data) : handleCreate}
          defaultValue={selectedBiodata}
          isEdit={isEdit}
        />
      )} */}
            <BiodataForm
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={() => {
                    fetchBiodata(); // reload data setelah update
                    setModalVisible(false); // tutup modal
                }}
                isEdit={isEdit}
                initialData={selectedBiodata}
                biodataId={selectedId}
                token={localStorage.getItem("authToken")}
            />
        </div>
    );
};

export default Biodata;
