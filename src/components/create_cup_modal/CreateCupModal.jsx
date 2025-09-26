import React, { useState } from 'react';
import './CreateCupModal.css'; // Import CSS cho modal
import { CloseIcon } from '../../icons/Icons'; // Điều chỉnh đường dẫn nếu cần

const CreateCupModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        broker: 'GOMarkets', // Giá trị mặc định
        symbol: 'BTC/USDT', // Giá trị mặc định
        maxParticipants: '',
        startTime: '',
        endTime: '',
        minimumBalance: ''
    });

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Nơi xử lý logic gửi dữ liệu đi, hiện tại chỉ log ra console
        console.log("Cup data submitted:", formData);
        onClose(); // Đóng modal sau khi submit
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="create-cup-modal-content" onClick={e => e.stopPropagation()}>
                <div className="create-cup-header">
                    <h2>Create Private Cup</h2>
                    <button onClick={onClose} className="modal-close-btn"><CloseIcon /></button>
                </div>
                <div className="create-cup-body">
                    <form onSubmit={handleSubmit} className="create-cup-form">
                        {/* Title */}
                        <div className="form-group"><label htmlFor="title">Title</label><input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required /></div>
                        
                        {/* Description */}
                        <div className="form-group"><label htmlFor="description">Description</label><textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows="3"></textarea></div>

                        {/* Broker & Symbol (chung một hàng) */}
                        <div className="form-row">
                            <div className="form-group"><label htmlFor="broker">Broker</label><select id="broker" name="broker" value={formData.broker} onChange={handleInputChange}><option value="GOMarkets">GOMarkets</option><option value="Other">Other</option></select></div>
                            <div className="form-group"><label htmlFor="symbol">Symbol</label><select id="symbol" name="symbol" value={formData.symbol} onChange={handleInputChange}><option value="BTC/USDT">BTC/USDT</option><option value="ETH/USDT">ETH/USDT</option><option value="SOL/USDT">SOL/USDT</option></select></div>
                        </div>

                        {/* Max Participants & Min Balance (chung một hàng) */}
                        <div className="form-row">
                             <div className="form-group"><label htmlFor="maxParticipants">Max Participants</label><input type="number" id="maxParticipants" name="maxParticipants" value={formData.maxParticipants} onChange={handleInputChange} required /></div>
                             <div className="form-group"><label htmlFor="minimumBalance">Minimum Balance (USDT)</label><input type="number" id="minimumBalance" name="minimumBalance" value={formData.minimumBalance} onChange={handleInputChange} required /></div>
                        </div>
                        
                        {/* Start Time & End Time (chung một hàng) */}
                        <div className="form-row">
                            <div className="form-group"><label htmlFor="startTime">Start Time</label><input type="datetime-local" id="startTime" name="startTime" value={formData.startTime} onChange={handleInputChange} required /></div>
                            <div className="form-group"><label htmlFor="endTime">End Time</label><input type="datetime-local" id="endTime" name="endTime" value={formData.endTime} onChange={handleInputChange} required /></div>
                        </div>
                        
                        <button type="submit" className="create-cup-submit-btn">Create Cup</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCupModal;