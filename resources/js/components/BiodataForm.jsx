import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import api from "../api";

const { Option } = Select;

const BiodataForm = ({ visible, onClose, onSubmit, isEdit, initialData, biodataId, token }) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (!visible) {
      form.resetFields();
      setImage(null);
      setImagePreview(null);
      setFileList([]);
    }
  }, [visible]);

  useEffect(() => {
    if (visible && isEdit && initialData) {
      form.setFieldsValue({
        name: initialData.name,
        category: initialData.category,
        division: initialData.division,
      });

      if (initialData.image) {
        const imageUrl = `/storage/biodata/${initialData.image}`;
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
      const values = await form.validateFields();
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("category", values.category);
      formData.append("division", values.division);

      // Jika user upload ulang gambar
      if (image) {
        formData.append("image", image);
      }

      // Kalau edit, tambahkan _method PUT
      if (isEdit) {
        formData.append("_method", "PUT");

        // Kirim juga image_lama supaya backend tahu
        if (!image && initialData?.image) {
          formData.append("image_lama", initialData.image);
        }

        const response = await api.post(`/biodata/${biodataId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        onSubmit(response.data);
      } else {
        const response = await api.post("/biodata", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        onSubmit(response.data);
      }

      form.resetFields();
      setImage(null);
      setImagePreview(null);
      setFileList([]);
    } catch (error) {
      console.error("Error submit:", error.response?.data || error.message);
    }
  };

  return (
    <Modal
      visible={visible}
      title={isEdit ? "Edit Biodata" : "Tambah Biodata"}
      onCancel={onClose}
      onOk={handleSubmit}
      okText={isEdit ? "Update" : "Tambah"}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Nama"
          name="name"
          rules={[{ required: true, message: "Nama wajib diisi!" }]}
        >
          <Input placeholder="Masukkan nama" />
        </Form.Item>

        <Form.Item
          label="Kategori"
          name="category"
          rules={[{ required: true, message: "Kategori wajib dipilih!" }]}
        >
          <Select placeholder="Pilih kategori">
            <Option value="Leader">Leader</Option>
            <Option value="Tim Produksi">Tim Produksi</Option>
            <Option value="Tim Marketing">Tim Marketing</Option>
            <Option value="Tim Lapangan">Tim Lapangan</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Divisi"
          name="division"
          rules={[{ required: true, message: "Divisi wajib diisi!" }]}
        >
          <Input placeholder="Masukkan divisi" />
        </Form.Item>

        <Form.Item label="Foto Profil">
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
              style={{
                marginTop: 10,
                width: 100,
                height: 100,
                borderRadius: 8,
                objectFit: "cover",
              }}
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BiodataForm;