import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Upload, Button, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import api from "../api";
import moment from "moment";

const NewsForm = ({ visible, onClose, onSaved, data }) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [date, setDate] = useState(null); // 🛠 Tambahin ini

  useEffect(() => {
    if (!visible) {
      form.resetFields();
      setImage(null);
      setImagePreview(null);
      setFileList([]);
      setDate(null);
    }
  }, [visible]);

  useEffect(() => {
    if (visible && data?.id) {
      form.setFieldsValue({
        title: data.title,
        description: data.description,
        date: data.date ? moment(data.date) : null,
      });

      setDate(data.date ? moment(data.date) : null); // 🛠 Set date nya juga
      if (data.image) {
        const imageUrl = `/storage/news/${data.image}`;
        setImagePreview(imageUrl);
        setFileList([{
          uid: "-1",
          name: data.image,
          status: "done",
          url: imageUrl,
        }]);
      }
    }
  }, [visible, data]);

  const handleImageChange = ({ fileList: newFileList }) => {
    const updatedFile = newFileList[0];

    if (updatedFile?.originFileObj) {
      const file = updatedFile.originFileObj;
      setImage(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setFileList([{
          ...updatedFile,
          uid: String(Date.now()),
          status: "done",
          url: e.target.result,
        }]);
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
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("date", values.date.format('YYYY-MM-DD')); // Format date
  
      if (image) {
        formData.append("image", image);
      }
  
      if (data?.id) {
        formData.append('_method', 'PUT'); // ✅ Tambahkan ini buat update
        await api.post(`/news/${data.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/news", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
  
      onSaved();
      onClose();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };
  
  return (
    <Modal
      open={visible}
      title={data?.id ? "Edit News" : "Tambah News"}
      onCancel={onClose}
      onOk={handleSubmit}
      okText={data?.id ? "Update" : "Simpan"}
      width={600}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Judul"
          name="title"
          rules={[{ required: true, message: "Judul wajib diisi!" }]}
        >
          <Input placeholder="Masukkan judul berita" />
        </Form.Item>

        <Form.Item
          label="Deskripsi"
          name="description"
          rules={[{ required: true, message: "Deskripsi wajib diisi!" }]}
        >
          <Input.TextArea placeholder="Masukkan deskripsi berita" rows={4} />
        </Form.Item>

        <Form.Item
          label="Tanggal"
          name="date"
          rules={[{ required: true, message: "Tanggal wajib diisi!" }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            value={date}
            onChange={setDate}
            format="YYYY-MM-DD"
          />
        </Form.Item>

        <Form.Item label="Gambar">
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

export default NewsForm;