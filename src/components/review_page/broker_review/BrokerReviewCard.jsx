import React from 'react';
import './BrokerReviewCard.css';

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

export default BrokerReviewCard;
