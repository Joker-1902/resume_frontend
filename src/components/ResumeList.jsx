import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import CreateResumeModal from './CreateResumeModal';

const ResumeList = () => {
    const [resumes, setResumes] = useState([]);
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const response = await api.get('/resumes/get_list');
            setResumes(response.data);
        } catch (error) {
            console.error('Ошибка загрузки резюме:', error);
            setMessage('Ошибка загрузки резюме.');
        }
    };

    const handleCreate = () => {
        setIsModalOpen(true);
    };

    const handleSaveNewResume = async ({ title, content }) => {
        try {
            const response = await api.post('/resumes', { title, content });
            setResumes([...resumes, response.data]);
            // Переходим на страницу нового резюме
            navigate(`/resumes/${response.data.id}`);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Ошибка создания резюме:', error);
            setMessage('Ошибка создания резюме.');
        }
    };

    return (
        <div>
            <h2>Ваши резюме</h2>
            <button onClick={handleCreate}>Добавить новое резюме</button>
            <ul>
                {resumes.map(resume => (
                    // Переходим на URL-адрес резюме
                    <li key={resume.id} onClick={() => navigate(`/resumes/${resume.id}`)}>
                        {resume.title}
                    </li>
                ))}
            </ul>
            {message && <p>{message}</p>}
            {isModalOpen && (
                <CreateResumeModal
                    onSave={handleSaveNewResume}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ResumeList;