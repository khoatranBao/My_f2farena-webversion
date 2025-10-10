import React, { useState } from 'react';
import './ComplaintPage.css';
import ComplaintModal from './ComplaintModal.jsx';

// Icon cho nút xóa
const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon-sm">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);


const ComplaintPage = ({ complaints = [], brokers = [], user, onCreateComplaint, onResolveComplaint }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="complaint-page">
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
                {complaints.map(complaint => {
                    // ✅ SỬA LỖI: So sánh username với username để nhận diện chính xác
                    const isOwner = user && user.username && complaint.username === user.username;

                    return (
                        <div key={complaint.id} className={`complaint-card ${isOwner ? 'is-owner' : ''}`}>
                            <div className="complaint-card-main">
                                <h3>{complaint.title}</h3>
                                <p>
                                    <span>Broker: <strong>{complaint.broker}</strong></span>
                                    <span>&bull;</span>
                                    <span>By: <strong>{complaint.username || 'Anonymous'}</strong></span>
                                    <span>&bull;</span>
                                    <span>{complaint.date}</span>
                                </p>
                            </div>
                            <div className="complaint-card-status">
                                {   (isOwner && complaint.status === 'Open') ? (
                                    <button 
                                        className="resolve-btn" 
                                        onClick={() => onResolveComplaint(complaint.id)}
                                        title="Mark as Resolved"
                                    >
                                        <TrashIcon />
                                        <span>Resolve</span>
                                    </button>
                                ) : (
                                    <span className={`status-badge ${complaint.status === 'Open' ? 'status-open' : 'status-resolved'}`}>
                                        {complaint.status}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ComplaintPage;
// import React, { useState } from 'react';
// import './ComplaintPage.css';
// import ComplaintModal from './ComplaintModal.jsx';

// // Icon cho nút xóa
// const TrashIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon-sm">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
//     </svg>
// );


// const ComplaintPage = ({ complaints = [], brokers = [], user, onCreateComplaint, onResolveComplaint }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     return (
//         <div className="complaint-page">
//             {isModalOpen && (
//                  <ComplaintModal 
//                     isOpen={isModalOpen} 
//                     onClose={() => setIsModalOpen(false)} 
//                     brokers={brokers} 
//                     user={user}
//                     onCreateComplaint={onCreateComplaint}
//                 />
//             )}
//             <div className="complaint-header">
//                 <h2>Community Complaints</h2>
//                 <button className="new-thread-btn" onClick={() => setIsModalOpen(true)}>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon-sm"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
//                     <span>New Thread</span>
//                 </button>
//             </div>
//             <div className="complaint-list">
//                 {complaints.map(complaint => {
//                     // ✅ SỬA LỖI: So sánh `complaint.username` với `user.displayName`
//                     const isOwner = user && user.displayName && complaint.username === user.displayName;

//                     return (
//                         <div key={complaint.id} className={`complaint-card ${isOwner ? 'is-owner' : ''}`}>
//                             <div className="complaint-card-main">
//                                 <h3>{complaint.title}</h3>
//                                 <p>
//                                     <span>Broker: <strong>{complaint.broker}</strong></span>
//                                     <span>&bull;</span>
//                                     <span>By: <strong>{complaint.username || 'Anonymous'}</strong></span>
//                                     <span>&bull;</span>
//                                     <span>{complaint.date}</span>
//                                 </p>
//                             </div>
//                             <div className="complaint-card-status">
//                                 {   (isOwner && complaint.status === 'Open') ? (
//                                     <button 
//                                         className="resolve-btn" 
//                                         onClick={() => onResolveComplaint(complaint.id)}
//                                         title="Mark as Resolved"
//                                     >
//                                         <TrashIcon />
//                                         <span>Resolve</span>
//                                     </button>
//                                 ) : (
//                                     <span className={`status-badge ${complaint.status === 'Open' ? 'status-open' : 'status-resolved'}`}>
//                                         {complaint.status}
//                                     </span>
//                                 )}
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default ComplaintPage;

