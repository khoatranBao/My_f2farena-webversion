import { brokerReviews, mockComplaints, mockTraderComments } from '../data/mockData.js';

const COMMENTS_STORAGE_KEY = 'traderComments';

/**
 * Giả lập việc gọi API để lấy danh sách tất cả các bài đánh giá broker.
 */
export const fetchBrokerReviews = () => {
    console.log("Fetching broker reviews from mock API...");
    return new Promise(resolve => {
        setTimeout(() => {
            // Dòng này sẽ hoạt động đúng khi brokerReviews được import chính xác
            resolve(brokerReviews);
        }, 400);
    });
};

/**
 * Giả lập việc gọi API để lấy danh sách tất cả các khiếu nại.
 */
export const fetchComplaints = () => {
    console.log("Fetching complaints from mock API...");
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockComplaints);
        }, 600);
    });
};

/**
 * Giả lập việc gọi API để lấy bình luận của traders cho một broker cụ thể.
 */
export const fetchTraderComments = (brokerId) => {
    console.log(`Fetching trader comments for broker ID: ${brokerId}...`);
    return new Promise(resolve => {
        setTimeout(() => {
            const storedCommentsObject = localStorage.getItem(COMMENTS_STORAGE_KEY);
            let allComments = {};

            if (storedCommentsObject) {
                allComments = JSON.parse(storedCommentsObject);
            } else {
                allComments = mockTraderComments;
                localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(allComments));
            }
            
            resolve(allComments[brokerId] || []);
        }, 500);
    });
};

/**
 * Giả lập việc gửi một bình luận mới cho broker cụ thể và lưu vào localStorage.
 */
export const postTraderComment = (brokerId, commentText) => {
    console.log(`Posting new comment for broker ID: ${brokerId} and saving...`);
    return new Promise(resolve => {
        setTimeout(() => {
            const newComment = {
                id: Date.now(),
                user: 'CurrentUser',
                date: new Date().toISOString(),
                text: commentText,
            };
            
            const allComments = JSON.parse(localStorage.getItem(COMMENTS_STORAGE_KEY) || '{}');
            const brokerComments = allComments[brokerId] || [];
            brokerComments.unshift(newComment);
            allComments[brokerId] = brokerComments;
            localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(allComments));
            
            resolve(newComment);
        }, 300);
    });
};