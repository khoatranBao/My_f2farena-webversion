// src/api/discussion.js

import { mockComments } from '../data/mockData.js';

/**
 * Giả lập việc gọi API để lấy danh sách các bình luận.
 * @returns {Promise<Array>}
 */
export const fetchComments = () => {
    console.log("Fetching comments from mock API...");
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockComments);
        }, 300); // Giả lập độ trễ
    });
};

/**
 * Giả lập việc gửi một bình luận mới.
 * @param {string} commentText - Nội dung bình luận.
 * @returns {Promise<Object>} - Bình luận mới đã được tạo.
 */
export const postComment = (commentText) => {
    console.log("Posting new comment to mock API:", commentText);
    return new Promise(resolve => {
        setTimeout(() => {
            const newComment = {
                user: 'CurrentUser', // Giả lập người dùng hiện tại
                time: 'Just now',
                text: commentText,
            };
            resolve(newComment);
        }, 200);
    });
};
