import React, { useState } from 'react';
import { CloseIcon } from '../../icons/Icons'; // Điều chỉnh đường dẫn nếu cần
import './CreateMatchModal.css'; // Sẽ tạo file CSS này ngay sau đây

const CreateMatchModal = ({ isOpen, onClose, onCreateMatch }) => {
    const [formData, setFormData] = useState({
        duration: '5 min',
        symbol: 'BTC/USDT',
        bet: 10,
    });

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gọi hàm callback được truyền từ component cha
        onCreateMatch(formData);
        onClose(); // Đóng modal sau khi submit
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="create-cup-modal-content" onClick={e => e.stopPropagation()}>
                <div className="create-cup-header">
                    <h2>Create 1 vs 1 Match</h2>
                    <button onClick={onClose} className="modal-close-btn"><CloseIcon /></button>
                </div>
                <div className="create-cup-body">
                    <form onSubmit={handleSubmit} className="create-cup-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="duration">Duration</label>
                                <select id="duration" name="duration" value={formData.duration} onChange={handleInputChange}>
                                    <option>3 min</option>
                                    <option>5 min</option>
                                    <option>10 min</option>
                                    <option>15 min</option>
                                    <option>30 min</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="symbol">Symbol</label>
                                <select id="symbol" name="symbol" value={formData.symbol} onChange={handleInputChange}>
                                    <option>BTC/USDT</option>
                                    <option>ETH/USDT</option>
                                    <option>SOL/USDT</option>
                                    <option>XAU/USD</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="bet">Bet Amount (USDT)</label>
                            <input
                                type="number"
                                id="bet"
                                name="bet"
                                value={formData.bet}
                                onChange={handleInputChange}
                                min="1"
                                required
                            />
                        </div>
                        
                        <button type="submit" className="create-cup-submit-btn">Create Match</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateMatchModal;
