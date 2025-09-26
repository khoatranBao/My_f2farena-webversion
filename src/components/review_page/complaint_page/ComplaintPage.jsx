import React, { useState } from 'react';
import './ComplaintPage.css'; // Import CSS
import { CloseIcon } from '../../../icons/Icons'; // Điều chỉnh đường dẫn
import { mockComplaints } from '../../../data/mockData'; // Điều chỉnh đường dẫn

// --- Modal Component (di chuyển vào đây) ---
const ComplaintModal = ({ isOpen, onClose, brokers }) => {
    const [broker, setBroker] = useState('');
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ broker, title, comment });
        onClose();
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
                        <div className="form-group"><label htmlFor="broker-name">Broker Name</label><select id="broker-name" value={broker} onChange={(e) => setBroker(e.target.value)} required><option value="" disabled>Select a broker</option>{brokers.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}</select></div>
                        <div className="form-group"><label htmlFor="title">Title</label><input id="title" type="text" placeholder="Enter a brief title" value={title} onChange={(e) => setTitle(e.target.value)} required /></div>
                        <div className="form-group"><label htmlFor="comment">Comment</label><textarea id="comment" placeholder="Describe your issue in detail" value={comment} onChange={(e) => setComment(e.target.value)} required rows="5"></textarea></div>
                        <button type="submit" className="complaint-submit-btn">Submit Complaint</button>
                    </form>
                </div>
            </div>
        </div>
    );
};


// --- Main Page Component ---
const ComplaintPage = ({ brokers }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="complaint-page">
            <ComplaintModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} brokers={brokers} />
            <div className="complaint-header">
                <h2>Community Complaints</h2>
                <button className="new-thread-btn" onClick={() => setIsModalOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon-sm"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                    <span>New Thread</span>
                </button>
            </div>
            <div className="complaint-list">
                {mockComplaints.map(complaint => (
                    <div key={complaint.id} className="complaint-card">
                        <div className="complaint-card-main"><h3>{complaint.title}</h3><p><span>Broker: <strong>{complaint.broker}</strong></span><span>&bull;</span><span>By: <strong>{complaint.user}</strong></span><span>&bull;</span><span>{complaint.date}</span></p></div>
                        <div className="complaint-card-status"><span className={`status-badge ${complaint.status === 'Open' ? 'status-open' : 'status-resolved'}`}>{complaint.status}</span></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ComplaintPage;