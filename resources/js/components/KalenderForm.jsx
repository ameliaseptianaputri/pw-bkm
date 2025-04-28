import React, { useState, useEffect } from "react";
import { Modal, Form, Input, DatePicker, TimePicker, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";  // Jangan lupa impor dayjs untuk parsing tanggal
import api from "../api";  // Import api.js yang sudah ada

const KalenderForm = ({ visible, onCancel, onSubmit, initialValues }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    // Menyiapkan data awal jika ada initialValues
    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                ...initialValues,
                date: initialValues.date ? dayjs(initialValues.date) : null,
                time: initialValues.time ? dayjs(initialValues.time, 'HH:mm') : null,
            });
            if (initialValues.image) {
                setFileList([{
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: `http://127.0.0.1:8000/storage/${initialValues.image}`,
                }]);
            }
        } else {
            form.resetFields();
            setFileList([]);
        }
    }, [initialValues, form]);

    // Fungsi untuk mengirim form dan data
    const handleOk = async () => {
        try {
            const values = await form.validateFields();  // Validate the form before submission
            const formData = new FormData();
    
            // Convert date and time to the correct format if they're valid dayjs objects
            const date = values.date ? dayjs(values.date).format('YYYY-MM-DD') : '';  // Ensure it's a valid dayjs object and convert
            const time = values.time ? dayjs(values.time).format('HH:mm') : '';  // Ensure it's a valid dayjs object and convert
    
            // Append form data
            formData.append('description', values.description);
            formData.append('date', date);
            formData.append('time', time);
            formData.append('location', values.location);
    
            // If an image is provided, append it to FormData
            if (fileList.length > 0) {
                formData.append('image', fileList[0].originFileObj);  // The actual file object
            }
    
            // Send the request to the API
            const response = await api.post("/kalender", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",  // Ensure the correct content type for form-data
                },
            });
    
            if (response && response.data) {
                // On success, trigger the callback
                message.success('Data berhasil dikirim!');
                onSubmit(response.data);
            } else {
                message.error('Terjadi kesalahan saat mengirim data.');
            }
    
            // Reset the form and file list after submission
            form.resetFields();
            setFileList([]);
    
        } catch (error) {
            // Handle validation or API errors
            console.error("Error while submitting form: ", error);
            message.error('Tolong periksa semua field yang diperlukan.');
        }
    };
    
    return (
        <Modal
            open={visible}
            title={initialValues ? "Edit Event" : "Create Event"}
            onCancel={onCancel}
            onOk={handleOk}
            okText="Submit"
        >
            <Form
                form={form}
                layout="vertical"
            >
                <Form.Item name="description" label="Deskripsi" rules={[{ required: true, message: 'Deskripsi wajib diisi!' }]}>
                    <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item name="date" label="Tanggal" rules={[{ required: true, message: 'Tanggal wajib diisi!' }]}>
                    <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item name="time" label="Waktu" rules={[{ required: true, message: 'Waktu wajib diisi!' }]}>
                    <TimePicker format="HH:mm" style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item name="location" label="Lokasi" rules={[{ required: true, message: 'Lokasi wajib diisi!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="image" label="Gambar">
                    <Upload
                        listType="picture"
                        fileList={fileList}
                        beforeUpload={(file) => {
                            // Validasi hanya menerima file gambar
                            const isImage = file.type.startsWith('image/');
                            if (!isImage) {
                                message.error('Hanya gambar yang diperbolehkan!');
                            }
                            return isImage; // Mencegah upload jika bukan gambar
                        }}
                        onRemove={(file) => {
                            setFileList((prevFileList) => prevFileList.filter(item => item.uid !== file.uid));
                        }}
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default KalenderForm;
