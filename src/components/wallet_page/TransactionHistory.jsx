// import React from 'react';

// // Hàm định dạng chữ cái đầu thành in hoa
// const capitalizeFirstLetter = (string) => {
//     if (!string) return '';
//     return string.charAt(0).toUpperCase() + string.slice(1);
// };

// // Hàm định dạng ngày giờ
// const formatDateTime = (isoString) => {
//     if (!isoString) return 'N/A';
//     try {
//         const date = new Date(isoString);
//         // Định dạng dd/MM/yyyy, HH:mm
//         return date.toLocaleString('en-GB', {
//             day: '2-digit',
//             month: '2-digit',
//             year: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         }).replace(',', '');
//     } catch (error) {
//         return 'Invalid Date';
//     }
// };

// const TransactionHistory = ({ transactions, isLoading }) => {
//     if (isLoading) {
//         return <div className="loading-placeholder">Loading transaction history...</div>;
//     }

//     if (!transactions || transactions.length === 0) {
//         return <div className="loading-placeholder">No transactions found. Please log in to see your history.</div>;
//     }

//     return (
//         <div className="transaction-history-table">
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Date</th>
//                         <th>Type</th>
//                         <th>Amount</th>
//                         {/* ✅ THÊM LẠI CỘT STATUS */}
//                         <th>Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {transactions.map((tx, index) => {
//                         // Kiểm tra an toàn
//                         if (!tx) return null;

//                         const isGain = tx.amount > 0;
//                         const amountClass = isGain ? 'text-gain' : 'text-loss';
                        
//                         return (
//                             <tr key={`${tx.created_at}-${index}`}>
//                                 <td>{formatDateTime(tx.created_at)}</td>
//                                 <td>{capitalizeFirstLetter(tx.type)}</td>
//                                 <td className={amountClass}>
//                                     {isGain ? '+' : ''}{tx.amount.toFixed(2)} USDT
//                                 </td>
//                                 {/* ✅ THÊM LẠI CỘT STATUS VỚI GIÁ TRỊ MẶC ĐỊNH */}
//                                 <td>
//                                     <span className="status-badge-tx status-completed">
//                                         Completed
//                                     </span>
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default TransactionHistory;
import React from 'react';

// Hàm định dạng chữ cái đầu thành in hoa
const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// Hàm định dạng ngày giờ
const formatDateTime = (isoString) => {
    if (!isoString) return 'N/A';
    try {
        const date = new Date(isoString);
        // Định dạng dd/MM/yyyy, HH:mm
        return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).replace(',', '');
    } catch (error) {
        return 'Invalid Date';
    }
};

const TransactionHistory = ({ transactions, isLoading }) => {
    if (isLoading) {
        return <div className="loading-placeholder">Loading transaction history...</div>;
    }

    if (!transactions || transactions.length === 0) {
        return <div className="loading-placeholder">No transactions found. Please log in to see your history.</div>;
    }

    return (
        <div className="transaction-history-table">
            {/* ✅ THÊM WRAPPER ĐỂ TẠO KHUNG CUỘN */}
            <div className="table-scroll-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx, index) => {
                            // Kiểm tra an toàn
                            if (!tx) return null;

                            const isGain = tx.amount > 0;
                            const amountClass = isGain ? 'text-gain' : 'text-loss';
                            
                            return (
                                <tr key={`${tx.created_at}-${index}`}>
                                    <td>{formatDateTime(tx.created_at)}</td>
                                    <td>{capitalizeFirstLetter(tx.type)}</td>
                                    <td className={amountClass}>
                                        {isGain ? '+' : ''}{tx.amount.toFixed(2)} USDT
                                    </td>
                                    <td>
                                        <span className="status-badge-tx status-completed">
                                            Completed
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionHistory;


