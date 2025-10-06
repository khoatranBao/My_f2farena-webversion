// // src/api/leaderboard.js

// const API_BASE_URL = 'https://f2farena.com/api/leaderboard';

// /**
//  * A general function to fetch data from leaderboard endpoints.
//  * @param {string} type - The type of leaderboard ('tournament' or 'personal').
//  * @returns {Promise<Array>} - The leaderboard data or an empty array on error.
//  */
// const getLeaderboardData = async (type) => {
//     const endpoint = `${API_BASE_URL}/${type}`;
//     console.log(`[API] 📝 Calling endpoint: ${endpoint}`);

//     try {
//         const response = await fetch(endpoint);

//         if (!response.ok) {
//             console.error(`[API] ❌ HTTP Error! Status: ${response.status} for ${endpoint}`);
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log(`[API] ✅ Successfully received data from ${endpoint}:`, data);
        
//         // Ensure we always return an array
//         return Array.isArray(data) ? data : [];
//     } catch (error) {
//         console.error(`[API] ❌ A critical error occurred while fetching from ${endpoint}:`, error);
//         return []; // Return an empty array to prevent the UI from crashing
//     }
// };

// /**
//  * Fetches the tournament leaderboard data.
//  */
// export const fetchTournamentLeaderboard = () => {
//     return getLeaderboardData('tournament');
// };

// /**
//  * Fetches the personal (1v1) leaderboard data.
//  */
// export const fetchPersonalLeaderboard = () => {
//     return getLeaderboardData('personal');
// };

const API_BASE_URL = 'https://f2farena.com/api';

// Hàm helper để xử lý gọi API và lỗi chung
const callApi = async (endpoint) => {
    console.log(`[API] 📞 Bắt đầu gọi endpoint: ${endpoint}`);
    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            console.error(`[API] ❌ Lỗi HTTP! Status: ${response.status} khi gọi ${endpoint}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`[API] ✅ Nhận dữ liệu thành công từ ${endpoint}:`, data);
        
        // Đảm bảo luôn trả về một mảng
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error(`[API] ❌ Đã xảy ra lỗi nghiêm trọng khi gọi ${endpoint}:`, error);
        // Trả về một mảng rỗng để không làm hỏng giao diện
        return [];
    }
};

/**
 * Lấy dữ liệu bảng xếp hạng cho các giải đấu.
 */
export const fetchTournamentLeaderboard = () => {
    const endpoint = `${API_BASE_URL}/leaderboard/tournament`;
    return callApi(endpoint);
};

/**
 * Lấy dữ liệu bảng xếp hạng cá nhân (1 vs 1).
 */
export const fetchPersonalLeaderboard = () => {
    const endpoint = `${API_BASE_URL}/leaderboard/personal`;
    return callApi(endpoint);
};