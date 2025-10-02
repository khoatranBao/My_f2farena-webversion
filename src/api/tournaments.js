// src/api/tournaments.js

// Import dữ liệu tĩnh từ mockData
import { allTournaments } from '../data/mockData.js';

/**
 * Hàm này giả lập việc gọi một API endpoint để lấy danh sách tất cả giải đấu.
 * @returns {Promise<Array>} Một Promise sẽ resolve với danh sách các giải đấu.
 */
export const fetchTournaments = () => {
    console.log("Fetching tournaments from mock API...");
    // Chúng ta gói dữ liệu trong một Promise và dùng setTimeout
    // để giả lập độ trễ mạng (ví dụ: 500ms).
    return new Promise(resolve => {
        setTimeout(() => {
            // Trong ứng dụng thực tế, ở đây sẽ là lệnh fetch() hoặc axios.get()
            resolve(allTournaments);
        }, 500);
    });
};

// Bạn có thể tạo thêm các hàm API giả khác ở đây, ví dụ:
// export const fetchTournamentById = (id) => { ... };
// export const createTournament = (data) => { ... };
