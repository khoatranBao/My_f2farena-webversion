import React from 'react';
import './Utils.css';

export const OfflineOverlay = () => (
    <div className="offline-overlay">
        <p>No Internet Connection</p>
    </div>
);

// Component này đã có trong ReviewDetailPage, nhưng tách ra đây để dùng chung nếu cần
export const StarRating = ({ score, max = 5 }) => {
    const fullStars = Math.floor(score);
    const halfStar = score % 1 !== 0;
    const emptyStars = max - fullStars - (halfStar ? 1 : 0);
    return (
        <div className="star-rating">
            {[...Array(fullStars)].map((_, i) => <span key={`full-${i}`}>⭐</span>)}
            {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`} className="empty-star">⭐</span>)}
        </div>
    );
};
