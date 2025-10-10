// import React, { useState } from 'react';
// import { CloseIcon } from '../../icons/Icons'; // Điều chỉnh đường dẫn nếu cần
// import './CreateMatchModal.css'; // Sẽ tạo file CSS này ngay sau đây

// const CreateMatchModal = ({ isOpen, onClose, onCreateMatch }) => {
//     const [formData, setFormData] = useState({
//         duration: '5 min',
//         symbol: 'BTC/USDT',
//         bet: 10,
//     });

//     if (!isOpen) return null;

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Gọi hàm callback được truyền từ component cha
//         onCreateMatch(formData);
//         onClose(); // Đóng modal sau khi submit
//     };

//     return (
//         <div className="modal-backdrop" onClick={onClose}>
//             <div className="create-cup-modal-content" onClick={e => e.stopPropagation()}>
//                 <div className="create-cup-header">
//                     <h2>Create 1 vs 1 Match</h2>
//                     <button onClick={onClose} className="modal-close-btn"><CloseIcon /></button>
//                 </div>
//                 <div className="create-cup-body">
//                     <form onSubmit={handleSubmit} className="create-cup-form">
//                         <div className="form-row">
//                             <div className="form-group">
//                                 <label htmlFor="duration">Duration</label>
//                                 <select id="duration" name="duration" value={formData.duration} onChange={handleInputChange}>
//                                     <option>3 min</option>
//                                     <option>5 min</option>
//                                     <option>10 min</option>
//                                     <option>15 min</option>
//                                     <option>30 min</option>
//                                 </select>
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="symbol">Symbol</label>
//                                 <select id="symbol" name="symbol" value={formData.symbol} onChange={handleInputChange}>
//                                     <option>BTC/USDT</option>
//                                     <option>ETH/USDT</option>
//                                     <option>SOL/USDT</option>
//                                     <option>XAU/USD</option>
//                                 </select>
//                             </div>
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="bet">Bet Amount (USDT)</label>
//                             <input
//                                 type="number"
//                                 id="bet"
//                                 name="bet"
//                                 value={formData.bet}
//                                 onChange={handleInputChange}
//                                 min="1"
//                                 required
//                             />
//                         </div>
                        
//                         <button type="submit" className="create-cup-submit-btn">Create Match</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CreateMatchModal;
import React, { useState } from 'react';
// ✅ SỬA LỖI: Đường dẫn đã được sửa lại cho đúng
import { CloseIcon } from '../../icons/Icons';

const CreateMatchModal = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        betAmount: '',
        symbol: 'BTC/USDT',
        challengeMode: 'Challenge User',
        duration: '15',
        broker: '',
        tradingAccount: '',
        tradingPassword: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.betAmount || !formData.broker || !formData.tradingAccount) {
            alert('Please fill in all required fields.');
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content create-match-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>New Match Setup</h3>
                    <button onClick={onClose} className="close-button">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="create-match-form">
                    {/* KHU VỰC CUỘN */}
                    <div className="form-body">
                        {/* Bet Amount */}
                        <div className="form-group">
                            <label htmlFor="betAmount">Bet Amount (USDT)</label>
                            <input
                                type="number"
                                id="betAmount"
                                name="betAmount"
                                placeholder="e.g., 100"
                                value={formData.betAmount}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {/* Trading Symbol */}
                        <div className="form-group">
                            <label htmlFor="symbol">Trading Symbol</label>
                            <select id="symbol" name="symbol" value={formData.symbol} onChange={handleInputChange}>
                                <option value="BTC/USDT">BTC/USDT</option>
                                <option value="XAU/USD">XAU/USD</option>
                                <option value="EUR/USD">EUR/USD</option>
                            </select>
                        </div>

                        {/* Challenge Mode */}
                        <div className="form-group">
                            <label>Challenge Mode</label>
                            <div className="radio-group-container">
                                <label className={`radio-option ${formData.challengeMode === 'Challenge User' ? 'selected' : ''}`}>
                                    <input type="radio" name="challengeMode" value="Challenge User" checked={formData.challengeMode === 'Challenge User'} onChange={handleInputChange} />
                                    Challenge User
                                </label>
                                <label className={`radio-option ${formData.challengeMode === 'Waiting Mode' ? 'selected' : ''}`}>
                                    <input type="radio" name="challengeMode" value="Waiting Mode" checked={formData.challengeMode === 'Waiting Mode'} onChange={handleInputChange} />
                                    Waiting Mode
                                </label>
                            </div>
                        </div>

                        {/* Duration Time */}
                        <div className="form-group">
                            <label htmlFor="duration">Duration Time (minutes)</label>
                            <select id="duration" name="duration" value={formData.duration} onChange={handleInputChange}>
                                <option value="5">5 Minutes</option>
                                <option value="15">15 Minutes</option>
                                <option value="30">30 Minutes</option>
                                <option value="60">60 Minutes</option>
                            </select>
                        </div>

                        {/* Broker */}
                        <div className="form-group">
                            <label htmlFor="broker">Broker</label>
                            <select id="broker" name="broker" value={formData.broker} onChange={handleInputChange} required>
                                <option value="" disabled>Select Broker</option>
                                <option value="GOMarkets">GOMarkets</option>
                                <option value="Exness">Exness</option>
                                <option value="ICMarkets">ICMarkets</option>
                            </select>
                        </div>
                        
                        {/* Trading Account & Password */}
                        <div className="form-group">
                            <label htmlFor="tradingAccount">Trading Account</label>
                            <input type="text" id="tradingAccount" name="tradingAccount" placeholder="e.g., 1234567" value={formData.tradingAccount} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tradingPassword">Trading Password (Optional)</label>
                            <input type="password" id="tradingPassword" name="tradingPassword" placeholder="Enter your trading password" value={formData.tradingPassword} onChange={handleInputChange} />
                        </div>
                    </div>

                     {/* KHU VỰC NÚT BẤM CỐ ĐỊNH */}
                    <div className="form-footer">
                        <button type="submit" className="confirm-setup-btn">
                            Confirm Setup
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateMatchModal;

