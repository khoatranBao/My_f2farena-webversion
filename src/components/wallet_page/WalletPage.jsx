// import React, { useState } from 'react';
// import './WalletPage.css';
// import { CloseIcon } from '../../icons/Icons';
// import { walletData, transactionData } from '../../data/mockData';

// // --- Các component con được chuyển từ App.jsx vào đây ---

// const WithdrawModal = ({ isOpen, onClose }) => {
//     if (!isOpen) return null;

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Wallet address updated.");
//         onClose();
//     };

//     return (
//         <div className="modal-backdrop" onClick={onClose}>
//             <div className="wallet-modal-content" onClick={e => e.stopPropagation()}>
//                 <div className="modal-header">
//                     <h2>Add wallet address</h2>
//                     <button onClick={onClose} className="modal-close-btn"><CloseIcon /></button>
//                 </div>
//                 <div className="wallet-modal-body">
//                     <p>You need to update your USDT (TRC20) wallet address to proceed with withdrawals.</p>
//                     <form onSubmit={handleSubmit} className="wallet-address-form">
//                         <label htmlFor="wallet-address">USDT (TRC20) Wallet Address</label>
//                         <input
//                             id="wallet-address"
//                             type="text"
//                             placeholder="Enter your wallet address..."
//                             required
//                         />
//                         <button type="submit" className="auth-button-primary">Update Wallet Address</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const AssetInformation = ({ walletData, onWithdrawClick }) => (
//     <div className="asset-info-grid">
//         <div className="asset-info-item">
//             <span>Current Balance</span>
//             <span className="text-balance">{walletData.balance.toFixed(2)} USDT</span>
//         </div>
//         <div className="asset-info-item">
//             <span>Total Deposits</span>
//             <span className="text-gain">{walletData.deposits.toFixed(2)} USDT</span>
//         </div>
//         <div className="asset-info-item">
//             <span>Total Withdrawals</span>
//             <span className="text-gain">{walletData.withdrawals.toFixed(2)} USDT</span>
//         </div>
//         <div className="asset-info-item">
//             <span>Total Winnings</span>
//             <span className="text-gain">{walletData.winnings.toFixed(2)} USDT</span>
//         </div>
//         <div className="asset-info-item">
//             <span>Total Losses</span>
//             <span className="text-loss">{walletData.losses.toFixed(2)} USDT</span>
//         </div>
//         <div className="asset-info-item">
//             <span>Affiliate Commission</span>
//             <span className="text-balance">{walletData.commission.toFixed(2)} USDT</span>
//         </div>
//         <button className="withdraw-btn" onClick={onWithdrawClick}>Withdraw</button>
//     </div>
// );

// const TransactionHistory = ({ transactions }) => (
//     <div className="transaction-history-table">
//         <table>
//             <thead>
//                 <tr>
//                     <th>Date</th>
//                     <th>Type</th>
//                     <th>Amount</th>
//                     <th>Status</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {transactions.map(tx => (
//                     <tr key={tx.id}>
//                         <td>{tx.date}</td>
//                         <td>{tx.type}</td>
//                         <td className={tx.type === 'Deposit' || tx.type === 'Winnings' ? 'text-gain' : 'text-loss'}>
//                            {tx.amount.toFixed(2)} USDT
//                         </td>
//                         <td>
//                             <span className={`status-badge-tx status-${tx.status.toLowerCase()}`}>
//                                 {tx.status}
//                             </span>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     </div>
// );

// // --- Component chính của file này ---

// const WalletPage = () => {
//     const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    
//     return (
//         <div className="wallet-page">
//             <WithdrawModal isOpen={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)} />

//             <div className="wallet-section">
//                 <h2>Asset Information</h2>
//                 <AssetInformation walletData={walletData} onWithdrawClick={() => setIsWithdrawModalOpen(true)} />
//             </div>

//             <div className="wallet-section">
//                 <h2>Transaction History</h2>
//                 <TransactionHistory transactions={transactionData} />
//             </div>
//         </div>
//     );
// };

// export default WalletPage;
import React, { useState, useEffect } from 'react';
import './WalletPage.css';
import { CloseIcon } from '../../icons/Icons';
import { walletData } from '../../data/mockData';
import TransactionHistory from './TransactionHistory';

// --- Các component con ---

const WithdrawModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
    };
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="wallet-modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add wallet address</h2>
                    <button onClick={onClose} className="modal-close-btn"><CloseIcon /></button>
                </div>
                <div className="wallet-modal-body">
                    <p>You need to update your USDT (TRC20) wallet address to proceed with withdrawals.</p>
                    <form onSubmit={handleSubmit} className="wallet-address-form">
                        <label htmlFor="wallet-address">USDT (TRC20) Wallet Address</label>
                        <input id="wallet-address" type="text" placeholder="Enter your wallet address..." required />
                        <button type="submit" className="auth-button-primary">Update Wallet Address</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const AssetInformation = ({ walletData, onWithdrawClick }) => (
    <div className="asset-info-grid">
        <div className="asset-info-item">
            <span>Current Balance</span>
            <span className="text-balance">{walletData.balance.toFixed(2)} USDT</span>
        </div>
        <div className="asset-info-item">
            <span>Total Deposits</span>
            <span className="text-gain">{walletData.deposits.toFixed(2)} USDT</span>
        </div>
        <div className="asset-info-item">
            <span>Total Withdrawals</span>
            <span className="text-gain">{walletData.withdrawals.toFixed(2)} USDT</span>
        </div>
        <div className="asset-info-item">
            <span>Total Winnings</span>
            <span className="text-gain">{walletData.winnings.toFixed(2)} USDT</span>
        </div>
        <div className="asset-info-item">
            <span>Total Losses</span>
            <span className="text-loss">{walletData.losses.toFixed(2)} USDT</span>
        </div>
        <div className="asset-info-item">
            <span>Affiliate Commission</span>
            <span className="text-balance">{walletData.commission.toFixed(2)} USDT</span>
        </div>
        <button className="withdraw-btn" onClick={onWithdrawClick}>Withdraw</button>
    </div>
);

// --- Component chính của trang Wallet ---

const WalletPage = ({ user }) => {
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Log đối tượng user mỗi khi component re-render
        console.log("📝 [INFO] WalletPage: Component rendered. User object:", user);

        // API yêu cầu telegram_id, nên chúng ta kiểm tra `user.uid`
        if (!user || !user.uid) {
            console.log(" M [WARN] WalletPage: User chưa đăng nhập hoặc thiếu telegram_id (user.uid). Dừng tải lịch sử giao dịch.");
            setIsLoading(false);
            setTransactions([]); // Đảm bảo danh sách rỗng
            return;
        }

        const fetchTransactionHistory = async () => {
            const userId = user.uid; // Sử dụng telegram_id (đã được gán cho uid khi login)
            const endpoint = `https://f2farena.com/api/users/${userId}/history-transactions`;
            
            console.log(`📝 [INFO] WalletPage: Bắt đầu tải lịch sử giao dịch cho user ID: ${userId} từ endpoint: ${endpoint}`);
            setIsLoading(true);

            try {
                const response = await fetch(endpoint);
                const responseData = await response.json();

                if (!response.ok) {
                    console.warn(`⚠️ [WARN] WalletPage: API trả về lỗi! Status: ${response.status}`, responseData);
                    throw new Error(responseData.detail || `API request failed with status ${response.status}`);
                }

                console.log("✅ [SUCCESS] WalletPage: Tải dữ liệu thành công! Dữ liệu gốc:", responseData);
                
                // Kiểm tra xem dữ liệu có phải là mảng không
                if (Array.isArray(responseData.transaction_history)) {
                    setTransactions(responseData.transaction_history);
                } else {
                    console.warn("⚠️ [WARN] WalletPage: Dữ liệu transaction_history không phải là một mảng. Set về mảng rỗng.");
                    setTransactions([]);
                }

            } catch (error) {
                console.error("❌ [ERROR] WalletPage: Lỗi nghiêm trọng khi tải lịch sử giao dịch:", error);
                setTransactions([]); // Set về mảng rỗng nếu có lỗi
            } finally {
                setIsLoading(false);
                console.log(" M [INFO] WalletPage: Quá trình tải dữ liệu kết thúc.");
            }
        };

        fetchTransactionHistory();
    }, [user]); 

    return (
        <div className="wallet-page">
            <WithdrawModal isOpen={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)} />

            <div className="wallet-section">
                <h2>Asset Information</h2>
                <AssetInformation walletData={walletData} onWithdrawClick={() => setIsWithdrawModalOpen(true)} />
            </div>

            <div className="wallet-section">
                <h2>Transaction History</h2>
                <TransactionHistory transactions={transactions} isLoading={isLoading} />
            </div>
        </div>
    );
};

export default WalletPage;

