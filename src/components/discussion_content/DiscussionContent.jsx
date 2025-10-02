import React, { useState, useEffect } from 'react';
import './DiscussionContent.css';
import { SendIcon } from '../../icons/Icons';
import { fetchComments, postComment } from '../../api/discussion.js';

// Mảng màu để tạo avatar
const AVATAR_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f97316', '#ef4444', '#14b8a6', '#64748b'];

// Hàm tạo avatar dựa trên tên người dùng
const generateAvatar = (username) => {
    if (!username) return { initial: '?', color: '#4b5563' };
    const initial = username.charAt(0).toUpperCase();
    // Tạo màu nhất quán cho mỗi username
    const charCodeSum = username.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const color = AVATAR_COLORS[charCodeSum % AVATAR_COLORS.length];
    return { initial, color };
};


const DiscussionContent = () => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const loadComments = async () => {
            setIsLoading(true);
            try {
                const data = await fetchComments();
                setComments(data);
            } catch (error) {
                console.error("Lỗi khi tải bình luận:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadComments();
    }, []);

    const handleSendComment = async () => {
        if (newComment.trim() === '') return;
        try {
            const postedComment = await postComment(newComment);
            setComments(prevComments => [postedComment, ...prevComments]);
            setNewComment('');
        } catch (error) {
            console.error("Lỗi khi gửi bình luận:", error);
        }
    };

    if (isLoading) {
        return <div className="placeholder-content small"><p>Loading discussion...</p></div>;
    }

    return (
        <div className="discussion-content-container">
            <div className="comment-list">
                {comments.map((comment, index) => {
                    const avatar = generateAvatar(comment.user);
                    return (
                        // ✅ Cấu trúc mới cho mỗi bình luận
                        <div key={index} className="comment-item">
                            <div className="comment-avatar" style={{ backgroundColor: avatar.color }}>
                                {avatar.initial}
                            </div>
                            <div className="comment-content">
                                <div className="comment-header">
                                    <span className="comment-user">{comment.user}</span>
                                    <span className="comment-time">{comment.time}</span>
                                </div>
                                <p className="comment-body">{comment.text}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="comment-input-area">
                <textarea 
                    value={newComment} 
                    onChange={(e) => setNewComment(e.target.value)} 
                    placeholder="Write a comment..." 
                    rows="1" 
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendComment())}
                />
                <button onClick={handleSendComment} className="send-comment-btn">
                    <SendIcon />
                </button>
            </div>
        </div>
    );
};

export default DiscussionContent;