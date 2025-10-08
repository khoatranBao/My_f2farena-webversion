// import React, { useState } from 'react';
// import './ComplaintPage.css';
// import ComplaintModal from './ComplaintModal.jsx';

// const ComplaintPage = ({ complaints = [], brokers = [], user, onCreateComplaint }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     return (
//         <div className="complaint-page">
//             {/* Truyền thêm user và hàm xử lý xuống modal */}
//             <ComplaintModal 
//                 isOpen={isModalOpen} 
//                 onClose={() => setIsModalOpen(false)} 
//                 brokers={brokers} 
//                 user={user}
//                 onCreateComplaint={onCreateComplaint}
//             />
//             <div className="complaint-header">
//                 <h2>Community Complaints</h2>
//                 <button className="new-thread-btn" onClick={() => setIsModalOpen(true)}>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon-sm"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
//                     <span>New Thread</span>
//                 </button>
//             </div>
//             <div className="complaint-list">
//                 {complaints.map(complaint => (
//                     <div key={complaint.id} className="complaint-card">
//                         <div className="complaint-card-main"><h3>{complaint.title}</h3><p><span>Broker: <strong>{complaint.broker}</strong></span><span>&bull;</span><span>By: <strong>{complaint.user}</strong></span><span>&bull;</span><span>{complaint.date}</span></p></div>
//                         <div className="complaint-card-status"><span className={`status-badge ${complaint.status === 'Open' ? 'status-open' : 'status-resolved'}`}>{complaint.status}</span></div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ComplaintPage;
import React, { useState } from 'react';
import './ComplaintPage.css';
import ComplaintModal from './ComplaintModal.jsx';

const ComplaintPage = ({ complaints = [], brokers = [], user, onCreateComplaint }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="complaint-page">
            {/* SỬA LỖI TẠI ĐÂY: Chỉ render Modal khi isModalOpen là true */}
            {isModalOpen && (
                <ComplaintModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    brokers={brokers} 
                    user={user}
                    onCreateComplaint={onCreateComplaint}
                />
            )}
            
            <div className="complaint-header">
                <h2>Community Complaints</h2>
                <button className="new-thread-btn" onClick={() => setIsModalOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon-sm"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                    <span>New Thread</span>
                </button>
            </div>
            <div className="complaint-list">
                {complaints.map(complaint => (
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
