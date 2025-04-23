import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import api from "../api";

const PelayananForm = ({ visible, onClose, onSaved, data }) => {
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
    if (visible && data?.id) {
      form.setFieldsValue({
        judul: data.judul,
        deskripsi: data.deskripsi,
      });

      if (data.gambar) {
        const imageUrl = `/storage/layanan/${data.gambar}`;
        setImagePreview(imageUrl);
        setFileList([
          {
            uid: "-1",
            name: data.gambar,
            status: "done",
            url: imageUrl,
          },
        ]);
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
      formData.append("judul", values.judul);
      formData.append("deskripsi", values.deskripsi);
      if (image) {
        formData.append("gambar", image);
      }

      if (data?.id) {
        await api.post(`/layanan/${data.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/layanan", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onSaved(); // refresh data
      onClose(); // tutup modal
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <Modal
      open={visible}
      title={data?.id ? "Edit Layanan" : "Tambah Layanan"}
      onCancel={onClose}
      onOk={handleSubmit}
      okText={data?.id ? "Update" : "Simpan"}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Judul"
          name="judul"
          rules={[{ required: true, message: "Judul wajib diisi!" }]}
        >
          <Input placeholder="Masukkan judul layanan" />
        </Form.Item>

        <Form.Item
          label="Deskripsi"
          name="deskripsi"
          rules={[{ required: true, message: "Deskripsi wajib diisi!" }]}
        >
          <Input.TextArea placeholder="Masukkan deskripsi layanan" rows={4} />
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

export default PelayananForm;
