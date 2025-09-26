import React from 'react';
import './BrokerReview.css'; // Import CSS
import { brokerReviews } from '../../../data/mockData'; // Điều chỉnh đường dẫn

// --- Card Component (di chuyển vào đây) ---
const BrokerReviewCard = ({ review, onCardClick }) => {
    return (
        <div className="broker-card" onClick={() => onCardClick(review)}>
            <img src={review.image} alt={`${review.name} review`} className="broker-card-img" />
            <div className="broker-card-body">
                <div className="broker-card-header">
                    <div className="broker-card-title">
                        <h2>{review.name}</h2>
                        <p><span>🇦🇺</span> AU • {review.years} years</p>
                    </div>
                    <div className="broker-card-score">
                        <span>{review.score.toFixed(1)}</span>
                        <p>SCORE</p>
                    </div>
                </div>
                <p className="broker-card-description">{review.description}</p>
            </div>
        </div>
    );
};

// --- Main Component ---
const BrokerReview = ({ onReviewClick }) => {
    return (
        <div className="review-grid">
            {brokerReviews.map(review => (
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