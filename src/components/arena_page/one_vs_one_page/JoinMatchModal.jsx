// // ✅ BƯỚC 1: Thêm `useState` vào dòng import từ 'react'
// import React, { useState } from 'react';
// import './OneVsOneMatchPage.css'; // Sử dụng chung file CSS

// const JoinMatchModal = ({ match, onClose, onConfirm }) => {
//     // State để lưu trữ giá trị các ô input
//     const [tradingAccount, setTradingAccount] = useState('');
//     const [tradingPassword, setTradingPassword] = useState('');
//     const [brokerServer, setBrokerServer] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Kiểm tra xem các trường bắt buộc đã được điền chưa
//         if (!tradingAccount || !brokerServer) {
//             alert('Please fill in all required fields.');
//             return;
//         }
//         // Gọi hàm onConfirm được truyền từ component cha với dữ liệu đã nhập
//         onConfirm({
//             tradingAccount,
//             tradingPassword,
//             brokerServer,
//         });
//     };

//     // Nếu không có `match`, không render gì cả
//     if (!match) {
//         return null;
//     }

//     return (
//         // Lớp phủ màu đen phía sau
//         <div className="modal-overlay" onClick={onClose}>
//             {/* Nội dung của modal */}
//             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                 <div className="modal-header">
//                     <h3>Join Match #{match.id}</h3>
//                     <button onClick={onClose} className="close-button">&times;</button>
//                 </div>

//                 <p className="modal-subtitle">Select your trading account for this match.</p>

//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label htmlFor="tradingAccount">Trading Account</label>
//                         <input
//                             id="tradingAccount"
//                             type="text"
//                             placeholder="e.g., 1234567"
//                             value={tradingAccount}
//                             onChange={(e) => setTradingAccount(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="tradingPassword">Trading Password (Optional)</label>
//                         <input
//                             id="tradingPassword"
//                             type="password"
//                             placeholder="Enter your trading password"
//                             value={tradingPassword}
//                             onChange={(e) => setTradingPassword(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="brokerServer">Broker Server</label>
//                         <input
//                             id="brokerServer"
//                             type="text"
//                             placeholder="e.g., Exness-Real7"
//                             value={brokerServer}
//                             onChange={(e) => setBrokerServer(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <button type="submit" className="confirm-join-btn">
//                         Confirm and Join
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default JoinMatchModal;
import React, { useState } from 'react';

const JoinMatchModal = ({ match, onClose, onConfirm }) => {
    const [tradingAccount, setTradingAccount] = useState('');
    const [tradingPassword, setTradingPassword] = useState('');
    const [brokerServer, setBrokerServer] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!tradingAccount || !brokerServer) {
            alert('Please fill in all required fields.');
            return;
        }
        onConfirm({
            tradingAccount,
            tradingPassword,
            brokerServer,
        });
    };

    if (!match) {
        return null;
    }

    return (
        // ✅ SỬA ĐỔI: Thêm class "join-match-modal" vào đây
        <div className="modal-overlay join-match-modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Join Match #{match.id}</h3>
                    <button onClick={onClose} className="close-button">&times;</button>
                </div>

                <p className="modal-subtitle">Select your trading account for this match.</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="tradingAccount">Trading Account</label>
                        <input
                            id="tradingAccount"
                            type="text"
                            placeholder="e.g., 1234567"
                            value={tradingAccount}
                            onChange={(e) => setTradingAccount(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tradingPassword">Trading Password (Optional)</label>
                        <input
                            id="tradingPassword"
                            type="password"
                            placeholder="Enter your trading password"
                            value={tradingPassword}
                            onChange={(e) => setTradingPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="brokerServer">Broker Server</label>
                        <input
                            id="brokerServer"
                            type="text"
                            placeholder="e.g., Exness-Real7"
                            value={brokerServer}
                            onChange={(e) => setBrokerServer(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="confirm-join-btn">
                        Confirm and Join
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JoinMatchModal;
