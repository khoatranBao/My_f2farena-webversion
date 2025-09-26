import React, { useState } from 'react';
import './DiscussionContent.css'; // Import CSS
import { SendIcon } from '../../icons/Icons'; // Điều chỉnh đường dẫn nếu cần
import { mockComments } from '../../data/mockData'; // Điều chỉnh đường dẫn nếu cần

const DiscussionContent = () => {
    const [newComment, setNewComment] = useState('');
    const handleSendComment = () => {
        if (newComment.trim() === '') return;
        console.log("Sending comment:", newComment);
        setNewComment('');
    };
    return (
        <div className="discussion-content-container">
            <div className="comment-list">
                {mockComments.map((comment, index) => (
                    <div key={index} className="comment">
                        <div className="comment-header">
                            <span className="comment-user">{comment.user}</span>
                            <span className="comment-time">{comment.time}</span>
                        </div>
                        <p className="comment-body">{comment.text}</p>
                    </div>
                ))}
            </div>
            <div className="comment-input-area">
                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment..." rows="1" />
                <button onClick={handleSendComment} className="send-comment-btn">
                    <SendIcon />
                </button>
            </div>
        </div>
    );
};

export default DiscussionContent;