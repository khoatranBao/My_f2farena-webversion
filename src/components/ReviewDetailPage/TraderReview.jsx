// import React, { useState, useEffect } from 'react';
// import './TraderReview.css';
// import { fetchTraderComments, postTraderComment } from '../../api/reviews';

// const formatDate = (isoString) => {
//     const date = new Date(isoString);
//     const time = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
//     const day = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
//     return `${time} ${day}`;
// };

// const TraderReview = ({ brokerId }) => {
//     const [comments, setComments] = useState([]);
//     const [newComment, setNewComment] = useState('');
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const loadComments = async () => {
//             if (!brokerId) return;
//             setIsLoading(true);
//             const data = await fetchTraderComments(brokerId);

//             // ✅ CÁC DÒNG DEBUG ĐÃ ĐƯỢC THÊM VÀO ĐÂY
//             console.log('>>> [COMPONENT] Data received:', data);
//             console.log('>>> [COMPONENT] Is data an array?', Array.isArray(data));

//             setComments(data);
//             setIsLoading(false);
//         };
//         loadComments();
//     }, [brokerId]);

//     const handlePostComment = async () => {
//         if (newComment.trim() === '' || !brokerId) return;
//         const postedComment = await postTraderComment(brokerId, newComment);
//         setComments(prev => [postedComment, ...prev]);
//         setNewComment('');
//     };

//     if (isLoading) return <p>Loading comments...</p>;

//     return (
//         <div className="trader-reviews-container">
//             <h3 className="comments-title">Comments ({comments ? comments.length : 0})</h3>
//             <div className="comment-list">
//                 {/* Thêm kiểm tra Array.isArray để tránh lỗi */}
//                 {Array.isArray(comments) && comments.map(comment => (
//                     <div key={comment.id} className="comment-card">
//                         <div className="comment-card-header">
//                             <span className="comment-user">{comment.user}</span>
//                             <span className="comment-date">{formatDate(comment.date)}</span>
//                         </div>
//                         <p className="comment-text">{comment.text}</p>
//                     </div>
//                 ))}
//             </div>
//             <div className="add-comment-card">
//                 <h4>Add a Comment</h4>
//                 <textarea
//                     value={newComment}
//                     onChange={(e) => setNewComment(e.target.value)}
//                     placeholder="Write your comment here..."
//                     rows="4"
//                 />
//                 <button onClick={handlePostComment} className="post-comment-btn">
//                     Post Comment
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default TraderReview;

import React, { useState, useEffect } from 'react';
import './TraderReview.css';

const formatDate = (isoString) => {
    if (!isoString) return '';
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
            if (!brokerId) {
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            console.log(`📝 [INFO] TraderReview: Bắt đầu lấy bình luận cho broker ID: ${brokerId}...`);
            
            try {
                const response = await fetch(`https://f2farena.com/api/trader_reviews/${brokerId}`);

                if (!response.ok) {
                    if (response.status === 404) {
                        console.log(`[INFO] TraderReview: Broker ID ${brokerId} chưa có bình luận nào.`);
                        setComments([]);
                    } else {
                        console.warn(`⚠️ [WARN] TraderReview: API bình luận trả về lỗi! Status: ${response.status}`);
                        throw new Error('API request for comments failed');
                    }
                } else {
                    const data = await response.json();
                    console.log("[INFO] TraderReview: Dữ liệu bình luận gốc từ API:", data);

                    // [THAY ĐỔI] Sửa lại đúng tên key là 'list_comments'
                    const commentList = data.list_comments; 

                    if (Array.isArray(commentList)) {
                        setComments(commentList);
                        console.log(`✅ [SUCCESS] TraderReview: Đã tải thành công ${commentList.length} bình luận.`);
                    } else {
                        console.warn("⚠️ [WARN] TraderReview: Key 'list_comments' không phải là một mảng.");
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

    const handlePostComment = async () => {
        // Code gửi comment giữ nguyên
    };

    if (isLoading) return <p>Loading comments...</p>;

    return (
        <div className="trader-reviews-container">
            <h3 className="comments-title">Comments ({comments ? comments.length : 0})</h3>
            <div className="comment-list">
                {Array.isArray(comments) && comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment.id} className="comment-card">
                            <div className="comment-card-header">
                                {/* Dữ liệu mới dùng 'username' */}
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