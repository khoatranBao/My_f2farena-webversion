import React from 'react';
import './BrokerReview.css';
import BrokerReviewCard from './BrokerReviewCard.jsx';

// ✅ Dữ liệu giờ được truyền vào qua props
const BrokerReview = ({ reviews =[], onReviewClick }) => {
    return (
        <div className="review-grid">
            {reviews.map(review => (
                <BrokerReviewCard 
                    key={review.id} 
                    review={review} 
                    onCardClick={onReviewClick} 
                />
            ))}
        </div>
    );
};

export default BrokerReview;
