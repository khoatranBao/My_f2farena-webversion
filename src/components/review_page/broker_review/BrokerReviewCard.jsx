import React from 'react';
import './BrokerReviewCard.css';

const BrokerReviewCard = ({ review, onCardClick }) => {
    // Tạo URL ảnh lá cờ từ mã quốc gia (ví dụ: 'au', 'gb', 'sg')
    // Chúng ta dùng dịch vụ miễn phí flagcdn.com
    const flagUrl = `https://flagcdn.com/w20/${review.country.toLowerCase()}.png`;

    return (
        <div className="broker-card" onClick={() => onCardClick(review)}>
            <img src={review.image} alt={`${review.name} review`} className="broker-card-img" />
            <div className="broker-card-body">
                <div className="broker-card-header">
                    <div className="broker-card-title">
                        <h2>{review.name}</h2>
                        <p>
                            {/* Thêm thẻ <img> để hiển thị logo lá cờ */}
                            <img 
                                src={flagUrl} 
                                alt={`${review.country} flag`} 
                                className="country-flag-icon" 
                            /> 
                            {review.country} • {review.years} years
                        </p>
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