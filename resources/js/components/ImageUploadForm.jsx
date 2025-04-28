import React, { useState, useEffect } from "react";
import { Modal, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import api from "../api";

const ImageUploadForm = ({ visible, onClose, onSubmit, newsId, initialImage }) => {
  const [fileList, setFileList] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (visible) {
      setFileList([]);
      setImagePreview(null);
      setImage(null);

      if (initialImage) {
        const imageUrl = `/storage/news/${initialImage}`;
        setImagePreview(imageUrl);
        setFileList([
          {
            uid: "-1",
            name: initialImage,
            status: "done",
            url: imageUrl,
          },
        ]);
      }
    }
  }, [visible, initialImage]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Menyiapkan data untuk upload...");

    // Cek apakah file ada
    if (!image) {
      console.log("Tidak ada file untuk di-upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await api.post(`/news/${newsId}/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload sukses:", response.data);
      onSubmit(response.data); // Pastikan ini dipanggil dengan data yang benar
    } catch (error) {
      console.error("Error submit:", error);
      alert("Gagal mengupload gambar");
    }
  };

  return (
    <Modal
      visible={visible}
      title="Tambah Gambar"
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Upload"
    >
      <Upload
        fileList={fileList}
        showUploadList={false}
        beforeUpload={() => false} // Prevent auto-upload
        onChange={handleImageChange}
        maxCount={1}
        accept="image/*"
      >
        <Button icon={<UploadOutlined />}>Upload Gambar</Button>
      </Upload>

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          style={{
            marginTop: 10,
            width: 100,
            height: 100,
            borderRadius: 8,
            objectFit: "cover",
          }}
        />
      )}
    </Modal>
  );
};

export default ImageUploadForm;