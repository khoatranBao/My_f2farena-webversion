// src/api/wallet.js

import { walletData, transactionData } from '../data/mockData.js';

/**
 * Giả lập việc gọi API để lấy dữ liệu tổng quan về ví.
 * @returns {Promise<Object>}
 */
export const fetchWalletData = () => {
    console.log("Fetching wallet data from mock API...");
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(walletData);
        }, 350); // Giả lập độ trễ
    });
};

/**
 * Giả lập việc gọi API để lấy lịch sử giao dịch.
 * @returns {Promise<Array>}
 */
export const fetchTransactionHistory = () => {
    console.log("Fetching transaction history from mock API...");
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(transactionData);
        }, 550); // Giả lập độ trễ khác
    });
};
