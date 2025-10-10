import React, { useState, useEffect } from 'react';
import './TraderReview.css';

const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const time = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    const day = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return `${time} ${day}`;
};

const ConfirmationModal = ({ comment, onCancel, onConfirm, isSubmitting }) => (
    <div className="confirmation-modal-backdrop">
        <div className="confirmation-modal-content">
            <h3>Confirm Submission</h3>
            <p>Are you sure you want to post the following comment?</p>
            <div className="comment-preview">
                {comment}
            </div>
            <div className="confirmation-modal-buttons">
                <button onClick={onCancel} className="modal-btn cancel-btn" disabled={isSubmitting}>
                    Cancel
                </button>
                <button onClick={onConfirm} className="modal-btn confirm-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Posting...' : 'Confirm'}
                </button>
            </div>
        </div>
    </div>
);


const TraderReview = ({ brokerId, user }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadComments = async () => {
            if (!brokerId) {
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            try {
                const response = await fetch(`https://f2farena.com/api/trader_reviews/${brokerId}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        setComments([]);
                    } else {
                        throw new Error('API request for comments failed');
                    }
                } else {
                    const data = await response.json();
                    const commentList = data.list_comments; 
                    if (Array.isArray(commentList)) {
                        setComments(commentList);
                    } else {
                        setComments([]);
                    }
                }
            } catch (error) {
                console.error("❌ [ERROR] TraderReview: Lỗi khi tải bình luận:", error);
                setComments([]);
            } finally {
                setIsLoading(false);
            }
        };
        
        loadComments();
    }, [brokerId]);

    const handlePostComment = () => {
        if (!newComment.trim()) {
            alert("Comment cannot be empty.");
            return;
        }
        if (!user || !user.uid) { // Kiểm tra user.uid (telegram_id)
            alert("You must be logged in to post a comment.");
            return;
        }
        setIsConfirmModalOpen(true);
    };

    const handleConfirmPost = async () => {
        setIsSubmitting(true);

        const payload = {
            broker_id: brokerId,
            user_id: user.uid, // ✅ SỬA LỖI: Gửi user.uid (telegram_id) thay vì user.id
            comment: newComment.trim(),
            vote: 5
        };

        console.log("📝 [INFO] TraderReview: Preparing to post new comment. Payload:", payload);

        try {
            const response = await fetch('https://f2farena.com/api/trader_reviews/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const responseData = await response.json();

            if (!response.ok) {
                console.warn(`⚠️ [WARN] TraderReview: API post comment returned an error! Status: ${response.status}`, responseData);
                let errorMessage = 'Failed to post comment.';
                if (responseData.detail) {
                    // Xử lý trường hợp lỗi là một mảng các đối tượng
                    if (Array.isArray(responseData.detail) && responseData.detail[0] && responseData.detail[0].msg) {
                        errorMessage = responseData.detail[0].msg;
                    } else if (typeof responseData.detail === 'string') {
                        errorMessage = responseData.detail;
                    }
                }
                throw new Error(errorMessage);
            }

            console.log("✅ [SUCCESS] TraderReview: Comment posted successfully! Response:", responseData);

            setComments(prevComments => [responseData, ...prevComments]);
            setNewComment(''); 
            setIsConfirmModalOpen(false);

        } catch (error) {
            console.error("❌ [ERROR] TraderReview: A critical error occurred while posting the comment:", error);
            alert(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };


    if (isLoading) return <p>Loading comments...</p>;

    return (
        <div className="trader-reviews-container">
            {isConfirmModalOpen && (
                <ConfirmationModal 
                    comment={newComment}
                    onCancel={() => setIsConfirmModalOpen(false)}
                    onConfirm={handleConfirmPost}
                    isSubmitting={isSubmitting}
                />
            )}

            <h3 className="comments-title">Comments ({comments ? comments.length : 0})</h3>
            <div className="comment-list">
                {Array.isArray(comments) && comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment.id} className="comment-card">
                            <div className="comment-card-header">
                                <span className="comment-user">{comment.username || 'Anonymous'}</span>
                                <span className="comment-date">{formatDate(comment.created_at)}</span>
                            </div>
                            <p className="comment-text">{comment.comment}</p>
                        </div>
                    ))
                ) : (
                    <p>No comments yet. Be the first to leave a review!</p>
                )}
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

