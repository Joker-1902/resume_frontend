import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams } from 'react-router-dom';

const ResumeDetail = () => {
    const [resume, setResume] = useState(null);
    const [message, setMessage] = useState('');
    const { id } = useParams(); 

    useEffect(() => {
        if (id) {
            fetchResume(id);
        }
    }, [id]); 

    const fetchResume = async (resumeId) => {
        try {
            const response = await api.get(`/resumes/${resumeId}`);
            setResume(response.data);
            setMessage('');
        } catch (error) {
            console.error('Ошибка загрузки резюме:', error);
            setMessage('Ошибка загрузки резюме.');
        }
    };

    const handleImprove = async () => {
        if (resume) {
            try {
                const response = await api.post(`/resumes/${resume.id}/improve`, { content: resume.content });
                setResume(response.data);
                setMessage('Резюме успешно улучшено!');
            } catch (error) {
                console.error('Ошибка улучшения резюме:', error);
                setMessage('Ошибка улучшения резюме.');
            }
        }
    };

    if (!resume) {
        return <div>Выберите резюме из списка.</div>;
    }

    return (
        <div>
            <h2>{resume.title}</h2>
            <pre>{resume.content}</pre>
            <button onClick={handleImprove}>Улучшить с AI</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResumeDetail;