import React, { useState, useEffect } from 'react';
import './TraderReview.css';
import { fetchTraderComments, postTraderComment } from '../../api/reviews';

const formatDate = (isoString) => {
    const date = new Date(isoString);
    const time = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    const day = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return `${time} ${day}`;
};

const TraderReview = ({ brokerId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadComments = async () => {
            if (!brokerId) return;
            setIsLoading(true);
            const data = await fetchTraderComments(brokerId);

            // ✅ CÁC DÒNG DEBUG ĐÃ ĐƯỢC THÊM VÀO ĐÂY
            console.log('>>> [COMPONENT] Data received:', data);
            console.log('>>> [COMPONENT] Is data an array?', Array.isArray(data));

            setComments(data);
            setIsLoading(false);
        };
        loadComments();
    }, [brokerId]);

    const handlePostComment = async () => {
        if (newComment.trim() === '' || !brokerId) return;
        const postedComment = await postTraderComment(brokerId, newComment);
        setComments(prev => [postedComment, ...prev]);
        setNewComment('');
    };

    if (isLoading) return <p>Loading comments...</p>;

    return (
        <div className="trader-reviews-container">
            <h3 className="comments-title">Comments ({comments ? comments.length : 0})</h3>
            <div className="comment-list">
                {/* Thêm kiểm tra Array.isArray để tránh lỗi */}
                {Array.isArray(comments) && comments.map(comment => (
                    <div key={comment.id} className="comment-card">
                        <div className="comment-card-header">
                            <span className="comment-user">{comment.user}</span>
                            <span className="comment-date">{formatDate(comment.date)}</span>
                        </div>
                        <p className="comment-text">{comment.text}</p>
                    </div>
                ))}
            </div>
            <div className="add-comment-card">
                <h4>Add a Comment</h4>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your comment here..."
                    rows="4"
                />
                <button onClick={handlePostComment} className="post-comment-btn">
                    Post Comment
                </button>
            </div>
        </div>
    );
};

export default TraderReview;