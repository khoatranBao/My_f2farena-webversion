// src/api/rounds.js

import { mockTop400Players } from '../data/mockData.js';

/**
 * Giả lập việc gọi API để lấy danh sách top 400 người chơi.
 * @returns {Promise<Array>}
 */
export const fetchTop400Players = () => {
    console.log("Fetching top 400 players from mock API...");
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockTop400Players);
        }, 800); // Giả lập độ trễ mạng
    });
};