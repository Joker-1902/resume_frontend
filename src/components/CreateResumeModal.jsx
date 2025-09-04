import React, { useState } from 'react';
import './Modal.css'; 

const CreateResumeModal = ({ onSave, onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSave = () => {
        if (title.trim() && content.trim()) {
            onSave({ title, content });
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Создать новое резюме</h2>
                <input
                    type="text"
                    placeholder="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="modal-input"
                />
                <textarea
                    placeholder="Контент"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="modal-textarea"
                />
                <div className="modal-actions">
                    <button onClick={handleSave} className="modal-button primary">Сохранить</button>
                    <button onClick={onClose} className="modal-button secondary">Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default CreateResumeModal;