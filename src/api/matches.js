// src/api/matches.js

import { liveMatches } from '../data/mockData.js';

/**
 * Giả lập việc gọi API để lấy danh sách các trận đấu đang diễn ra.
 * @returns {Promise<Array>}
 */
export const fetchLiveMatches = () => {
    console.log("Fetching live matches from mock API...");
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(liveMatches);
        }, 300); // Giả lập độ trễ khác
    });
};
