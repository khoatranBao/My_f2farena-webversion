// src/api/leaderboard.js

import { tournamentWinners, mockLeaderboardData } from '../data/mockData.js';

/**
 * Giả lập việc gọi API để lấy dữ liệu bảng xếp hạng giải đấu.
 * @returns {Promise<Array>}
 */
export const fetchTournamentLeaderboard = () => {
    console.log("Fetching tournament leaderboard from mock API...");
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(tournamentWinners);
        }, 500); // Giả lập độ trễ
    });
};

/**
 * Giả lập việc gọi API để lấy dữ liệu bảng xếp hạng cũ (nếu cần).
 * @returns {Promise<Array>}
 */
export const fetchOldLeaderboard = () => {
    console.log("Fetching old leaderboard from mock API...");
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockLeaderboardData);
        }, 500);
    });
};
