import React, { useState } from "react";
import { Modal, Input, DatePicker, Button, message } from "antd";
import moment from "moment";
import api from "../api";

const NewsDetailForm = ({ visible, onClose, onSuccess, news, newsId }) => {
    const [title, setTitle] = useState(news.title || "");
    const [description, setDescription] = useState(news.description || "");
    const [date, setDate] = useState(news.date ? moment(news.date) : null);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        try {
            setLoading(true);

            await api.put(`/news/${newsId}`, {
                title,
                description,
                date: date ? date.format("YYYY-MM-DD") : null,
            });

            message.success("Data berhasil disimpan.");
            onSuccess();
        } catch (error) {
            console.error(error);
            message.error("Gagal menyimpan data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={visible}
            title="Edit Berita"
            onCancel={onClose}
            onOk={handleSave}
            confirmLoading={loading}
            okText="Simpan"
        >
            <div className="flex flex-col gap-4">
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Judul"
                />
                <Input.TextArea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Deskripsi"
                    rows={4}
                />
                <DatePicker
                    value={date}
                    onChange={(d) => setDate(d)}
                    format="YYYY-MM-DD"
                    className="w-full"
                />
            </div>
        </Modal>
    );
};

export default NewsDetailForm;
