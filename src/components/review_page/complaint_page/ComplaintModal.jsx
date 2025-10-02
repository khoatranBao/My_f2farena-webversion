import React, { useState } from 'react';
import './ComplaintModal.css'; // Sử dụng CSS riêng
import { CloseIcon } from '../../../icons/Icons';

const ComplaintModal = ({ isOpen, onClose, brokers = []}) => {
    const [formData, setFormData] = useState({
        title: '',
        broker: brokers.length > 0 ? brokers[0].name : '', // Mặc định chọn broker đầu tiên
        description: '',
    });

    if (!isOpen) {
        return null;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic để gửi khiếu nại mới lên API sẽ được đặt ở đây
        console.log("Submitting new complaint:", formData);
        alert('Complaint submitted successfully! (This is a mock action)'); // Thông báo giả lập
        onClose(); // Đóng modal sau khi gửi
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="complaint-modal-content" onClick={e => e.stopPropagation()}>
                <div className="complaint-modal-header">
                    <h2>Create New Complaint</h2>
                    <button onClick={onClose} className="modal-close-btn"><CloseIcon /></button>
                </div>
                <div className="complaint-modal-body">
                    <form onSubmit={handleSubmit} className="complaint-form">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="e.g., Delayed withdrawal for over 72 hours"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="broker">Broker</label>
                            <select
                                id="broker"
                                name="broker"
                                value={formData.broker}
                                onChange={handleInputChange}
                                required
                            >
                                {brokers.map(broker => (
                                    <option key={broker.id} value={broker.name}>
                                        {broker.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="5"
                                placeholder="Provide a detailed description of the issue, including transaction IDs, dates, and amounts..."
                                required
                            ></textarea>
                        </div>
                        
                        <button type="submit" className="complaint-submit-btn">
                            Submit Complaint
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ComplaintModal;