// import React, { useState } from 'react';
// import './ComplaintModal.css';
// // import { CloseIcon } from '../../../icons/Icons'; // Giả sử bạn có icon này

// const ComplaintModal = ({ isOpen, onClose, brokers = [], user, onCreateComplaint }) => {
//     const [formData, setFormData] = useState({
//         title: '',
//         broker: brokers.length > 0 ? brokers[0].name : '',
//         description: '',
//     });
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     if (!isOpen) {
//         return null;
//     }

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         try {
//             // Gọi hàm từ props để gửi dữ liệu lên component cha (ReviewPage)
//             await onCreateComplaint(formData); 
//             onClose(); // Đóng modal sau khi gửi thành công
//         } catch (error) {
//             // Lỗi đã được xử lý ở component cha, không cần làm gì thêm
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="modal-backdrop" onClick={onClose}>
//             <div className="complaint-modal-content" onClick={e => e.stopPropagation()}>
//                 <div className="complaint-modal-header">
//                     <h2>Create New Complaint</h2>
//                     <button onClick={onClose} className="modal-close-btn">X</button>
//                 </div>
//                 <div className="complaint-modal-body">
//                     <form onSubmit={handleSubmit} className="complaint-form">
//                         <div className="form-group">
//                             <label htmlFor="title">Title</label>
//                             <input
//                                 type="text"
//                                 id="title"
//                                 name="title"
//                                 value={formData.title}
//                                 onChange={handleInputChange}
//                                 placeholder="e.g., Delayed withdrawal for over 72 hours"
//                                 required
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="broker">Broker</label>
//                             <select
//                                 id="broker"
//                                 name="broker"
//                                 value={formData.broker}
//                                 onChange={handleInputChange}
//                                 required
//                             >
//                                 {brokers.map(broker => (
//                                     <option key={broker.id} value={broker.name}>
//                                         {broker.name}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="description">Description</label>
//                             <textarea
//                                 id="description"
//                                 name="description"
//                                 value={formData.description}
//                                 onChange={handleInputChange}
//                                 rows="5"
//                                 placeholder="Provide a detailed description of the issue..."
//                                 required
//                             ></textarea>
//                         </div>
                        
//                         <button type="submit" className="complaint-submit-btn" disabled={isSubmitting}>
//                             {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ComplaintModal;
import React, { useState } from 'react';
import './ComplaintModal.css';

const ComplaintModal = ({ isOpen, onClose, brokers = [], user, onCreateComplaint }) => {
    const [formData, setFormData] = useState({
        title: '',
        broker: brokers.length > 0 ? brokers[0].name : '',
        description: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) {
        return null;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Kiểm tra xem các trường bắt buộc đã được điền chưa
        if (!formData.title || !formData.broker || !formData.description) {
            alert("Please fill in all fields.");
            return;
        }

        setIsSubmitting(true);
        try {
            // Gọi hàm từ props để gửi dữ liệu lên component cha (ReviewPage)
            await onCreateComplaint(formData); 
            onClose(); // Đóng modal sau khi gửi thành công
        } catch (error) {
            // Lỗi đã được log và alert ở component cha
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="complaint-modal-content" onClick={e => e.stopPropagation()}>
                <div className="complaint-modal-header">
                    <h2>Create New Complaint</h2>
                    <button onClick={onClose} className="modal-close-btn">X</button>
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
                                placeholder="Provide a detailed description of the issue..."
                                required
                            ></textarea>
                        </div>
                        
                        <button type="submit" className="complaint-submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ComplaintModal;
