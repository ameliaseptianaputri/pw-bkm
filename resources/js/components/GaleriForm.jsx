import React, { useState, useEffect } from "react";
import { Modal, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import api from "../api";

const GaleriForm = ({ visible, onClose, onSubmit, isEdit, initialData, galeriId }) => {
    const [fileList, setFileList] = useState([]);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (!visible) {
            setFileList([]);
            setImage(null);
            setImagePreview(null);
        }
    }, [visible]);

    useEffect(() => {
        if (visible && isEdit && initialData) {
            const imageUrl = `/storage/galeri/${initialData.image}`;
            setImagePreview(imageUrl);
            setFileList([
                {
                    uid: "-1",
                    name: initialData.image,
                    status: "done",
                    url: imageUrl,
                },
            ]);
        }
    }, [visible, isEdit, initialData]);

    const handleImageChange = ({ fileList: newFileList }) => {
        const updatedFile = newFileList[0];

        if (updatedFile?.originFileObj) {
            const file = updatedFile.originFileObj;
            setImage(file);

            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
                setFileList([
                    {
                        ...updatedFile,
                        uid: String(Date.now()),
                        status: "done",
                        url: e.target.result,
                    },
                ]);
            };
            reader.readAsDataURL(file);
        } else {
            setImage(null);
            setImagePreview(null);
            setFileList([]);
        }
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            if (image) {
                formData.append("image", image);
            }

            if (isEdit) {
                formData.append("_method", "PUT");
                await api.post(`/galeri/${galeriId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await api.post("/galeri", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            onSubmit();
        } catch (error) {
            console.error("Error submit galeri:", error.response?.data || error.message);
        }
    };

    return (
        <Modal
            visible={visible}
            title={isEdit ? "Edit Gambar" : "Tambah Gambar"}
            onCancel={onClose}
            onOk={handleSubmit}
            okText={isEdit ? "Update" : "Tambah"}
        >
            <Upload
                fileList={fileList}
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleImageChange}
            >
                <Button icon={<UploadOutlined />}>Upload Gambar</Button>
            </Upload>

            {imagePreview && (
                <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-4 w-40 h-40 object-cover rounded-lg"
                />
            )}
        </Modal>
    );
};

export default GaleriForm;