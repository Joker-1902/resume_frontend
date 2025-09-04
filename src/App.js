import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import ResumeList from './components/ResumeList';
import ResumeDetail from './components/ResumeDetail';
import './App.css'; 

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    const handleAuthSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div className="container">
                <header>
                    <h1>Управление резюме</h1>
                    {isAuthenticated && <button onClick={handleLogout}>Выйти</button>}
                </header>
                <Routes>
                    <Route path="/auth" element={
                        isAuthenticated ? <Navigate to="/resumes" /> : <AuthForm onAuth={handleAuthSuccess} />
                    } />
                    <Route path="/resumes" element={
                        isAuthenticated ? (
                            <div className="main-content">
                                <div className="sidebar">
                                    <ResumeList />
                                </div>
                                <div className="details">
                                    <p>Выберите резюме из списка.</p>
                                </div>
                            </div>
                        ) : <Navigate to="/auth" />
                    } />
                    <Route path="/resumes/:id" element={
                        isAuthenticated ? (
                            <div className="main-content">
                                <div className="sidebar">
                                    <ResumeList />
                                </div>
                                <div className="details">
                                    <ResumeDetail />
                                </div>
                            </div>
                        ) : <Navigate to="/auth" />
                    } />
                    <Route path="/" element={<Navigate to="/auth" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;