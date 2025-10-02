import React, { useState } from 'react';
import { CloseIcon } from '../../icons/Icons';
import './AuthModal.css';

// --- Các component con được chuyển từ App.jsx vào đây ---

const LoginForm = ({ onSwitchToRegister }) => {
    return (
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <h2>Login</h2>
            <input className="auth-input" type="text" placeholder="Username" />
            <input className="auth-input" type="password" placeholder="Password" />
            <input className="auth-input" type="text" placeholder="Verification Code" />
            <button className="auth-button-primary">Login</button>
            <div className="auth-forgot-password">
                <a href="#">Forgot password?</a>
            </div>
            <div className="auth-switch-section">
                <span>Don't have an account? </span>
                <button type="button" className="auth-switch-button" onClick={onSwitchToRegister}>
                    Register
                </button>
            </div>
        </form>
    );
};

const RegisterForm = ({ onSwitchToLogin }) => {
    return (
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <h2>Register</h2>
            <input className="auth-input" type="text" placeholder="Username" />
            <input className="auth-input" type="password" placeholder="Password" />
            <input className="auth-input" type="password" placeholder="Confirm Password" />
            <input className="auth-input" type="tel" placeholder="Phone Number" />
            <input className="auth-input" type="text" placeholder="Enter verification code" />
            <button className="auth-button-primary">Register</button>
            <div className="auth-switch-section">
                <span>Already have an account? </span>
                <button type="button" className="auth-switch-button" onClick={onSwitchToLogin}>
                    Login
                </button>
            </div>
        </form>
    );
};

// --- Component chính của file này ---

const AuthModal = ({ onClose }) => {
    const [formType, setFormType] = useState('login');
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="auth-modal-content" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="modal-close-btn"><CloseIcon /></button>
                <div className="auth-modal-body">
                    {formType === 'login' ? (
                        <LoginForm onSwitchToRegister={() => setFormType('register')} />
                    ) : (
                        <RegisterForm onSwitchToLogin={() => setFormType('login')} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
