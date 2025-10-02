// Import biến với tên đúng và đường dẫn đúng
import { mockOneVsOneMatches } from '../data/mockData.js';

let challenges = [...mockOneVsOneMatches]; // Sử dụng biến đã import đúng

// Giả lập việc lấy danh sách các trận đấu
export const fetchChallenges = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(challenges);
        }, 500); // Giả lập độ trễ mạng
    });
};

// Giả lập việc tạo một trận đấu mới
export const createChallenge = (newChallengeData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newMatch = {
                id: challenges.length + 1, // Tạo id mới
                ...newChallengeData
            };
            // Thêm trận đấu mới vào đầu danh sách để hiển thị ngay lập tức
            challenges = [newMatch, ...challenges]; 
            resolve(newMatch);
        }, 300);
    });
};
