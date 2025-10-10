// import React, { useState } from 'react';
// import { CloseIcon } from '../../icons/Icons';
// import './AuthModal.css';
// import { userProfile } from '../../data/mockData.js';

// const LoginForm = ({ onSwitchToRegister, onLoginSuccess }) => {
//     // ✅ 1. Đổi state cho phù hợp với Telegram
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [password, setPassword] = useState('');

//     const handleLoginClick = () => {
//         // ✅ 2. Định nghĩa thông tin đăng nhập giả mới
//         const MOCK_PHONE = '0348435190';
//         const MOCK_PASSWORD = '123'; // Giả lập mật khẩu 2 bước

//         // ✅ 3. Kiểm tra thông tin đăng nhập mới
//         if (phoneNumber === MOCK_PHONE && password === MOCK_PASSWORD) {
//             onLoginSuccess(userProfile);
//         } else {
//             alert('Số điện thoại hoặc mật khẩu không đúng!');
//         }
//     };

//     return (
//         <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
//             <h2>Login</h2>
            
//             {/* ✅ 4. Thay đổi các ô input */}
//             <input 
//                 className="auth-input" 
//                 type="tel" 
//                 placeholder="Phone Number"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//             />
//             <input 
//                 className="auth-input" 
//                 type="password" 
//                 placeholder="Two-Step Verification Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
            
//             <button type="button" className="auth-button-primary" onClick={handleLoginClick}>
//                 Login
//             </button>

//             <div className="auth-switch-section">
//                 <span>Don't have an account? </span>
//                 <button type="button" className="auth-switch-button" onClick={onSwitchToRegister}>
//                     Register
//                 </button>
//             </div>
//         </form>
//     );
// };

// const RegisterForm = ({ onSwitchToLogin }) => {
//     return (
//         <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
//             <h2>Register</h2>
//             <input className="auth-input" type="text" placeholder="Username" />
//             <input className="auth-input" type="password" placeholder="Password" />
//             <input className="auth-input" type="password" placeholder="Confirm Password" />
//             <input className="auth-input" type="tel" placeholder="Phone Number" />
//             <input className="auth-input" type="text" placeholder="Enter verification code" />
//             <button className="auth-button-primary">Register</button>
//             <div className="auth-switch-section">
//                 <span>Already have an account? </span>
//                 <button type="button" className="auth-switch-button" onClick={onSwitchToLogin}>
//                     Login
//                 </button>
//             </div>
//         </form>
//     );
// };

// const AuthModal = ({ onClose, onLoginSuccess }) => {
//     const [formType, setFormType] = useState('login');

//     return (
//         <div className="modal-backdrop" onClick={onClose}>
//             <div className="auth-modal-content" onClick={e => e.stopPropagation()}>
//                 <button onClick={onClose} className="modal-close-btn"><CloseIcon /></button>
//                 <div className="auth-modal-body">
//                     {formType === 'login' ? (
//                         <LoginForm 
//                             onSwitchToRegister={() => setFormType('register')}
//                             onLoginSuccess={onLoginSuccess}
//                         />
//                     ) : (
//                         <RegisterForm onSwitchToLogin={() => setFormType('login')} />
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AuthModal;
import React, { useState } from 'react';
import './AuthModal.css';
const AuthModal = ({ onClose, onLogin, isLoggingIn }) => {
    const [userId, setUserId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userId.trim()) {
            onLogin(userId.trim());
        }
    };

    return (
        <div className="auth-modal-overlay" onClick={onClose}>
            <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Login</h2>
                <p>Enter your User ID to continue.</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="number"
                            className="form-input"
                            placeholder="User ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                    <button type="submit" className="login-btn-modal" disabled={isLoggingIn}>
                        {isLoggingIn ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;