import React, { useState, useEffect } from 'react'; 
import './ReviewDetailPage.css'; // Sẽ tạo file CSS này ngay sau đây
import TraderReview from './TraderReview.jsx';
// --- Các component con chỉ dùng cho trang này ---

const StarRating = ({ score, max = 5 }) => {
    const fullStars = Math.floor(score);
    const halfStar = score % 1 !== 0; // Check for half star, not implemented visually yet
    const emptyStars = max - fullStars - (halfStar ? 1 : 0);
    return (
        <div className="star-rating">
            {[...Array(fullStars)].map((_, i) => <span key={`full-${i}`}>⭐</span>)}
            {/* Implement half-star logic if needed */}
            {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`} className="empty-star">⭐</span>)}
        </div>
    );
};

const ProsCons = ({ pros, cons }) => (
    <div className="pros-cons-container">
        <div className="pros-list">
            <h4>Pros</h4>
            <ul>{pros.map((pro, index) => <li key={index}>{pro}</li>)}</ul>
        </div>
        <div className="cons-list">
            <h4>Cons</h4>
            <ul>{cons.map((con, index) => <li key={index}>{con}</li>)}</ul>
        </div>
    </div>
);

const BrokerDetailSidebar = ({ review }) => (
    <div className="broker-detail-sidebar">
        <div className="rating-summary-box">
            <h4>PK Team Rating</h4>
            <div className="overall-score">{review.score.toFixed(1)}<span>/5.0</span></div>
            <StarRating score={review.score} />
            <button className="visit-broker-btn">Visit Broker</button>
        </div>
        <div className="at-a-glance-box">
            <h4>At a Glance</h4>
            <ul>
                {Object.entries(review.glanceInfo).map(([key, value]) => (
                    <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
            </ul>
        </div>
    </div>
);

const DetailedAnalysis = ({ analysis }) => (
    <div className="detailed-analysis">
        <p>{analysis.introduction}</p>
        <h4>{analysis.detailedIntro}</h4>
        {analysis.sections.map(section => (
            <div key={section.title} className="analysis-section">
                <h5>{section.title}</h5>
                {section.content.split('\n\n').map((paragraph, index) =>
                    <p key={index}>{paragraph.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}</p>
                )}
                <p><strong>PK Team Rating:</strong> <span className="pk-team-rating">{section.rating}</span></p>
            </div>
        ))}
        <h4>Conclusion & Recommendation</h4>
        {analysis.conclusion.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        {analysis.recommendation.split('\n\n').map((paragraph, index) =>
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        )}
    </div>
);
const ExpertReviewContent = ({ review }) => (
    <div className="broker-detail-layout">
        <main className="broker-detail-main">
            <header className="broker-header">
                <img src={review.logo} alt={`${review.name} Logo`} className="broker-logo" />
                <div><h1>{review.name} Review</h1><p>An in-depth look at fees, platforms, and trust.</p></div>
            </header>
            <ProsCons pros={review.pros} cons={review.cons} />
            <DetailedAnalysis analysis={review.analysis} />
        </main>
        <aside><BrokerDetailSidebar review={review} /></aside>
    </div>
);

// --- Component chính ---

const ReviewDetailPage = ({ review, onClose }) => {
    const [activeTab, setActiveTab] = useState('expert');

    useEffect(() => {
        const pageElement = document.querySelector('.review-detail-page');
        if (pageElement) pageElement.scrollTo(0, 0);
    }, [review]);

    if (!review) return null;

    return (
        <div className="review-detail-page">
            <div className="review-detail-header-bar">
                <button onClick={onClose} className="back-button-detail">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                    <span>All Reviews</span>
                </button>
            </div>

            {/* ✅ KHU VỰC TAB MỚI */}
            <div className="review-detail-content-wrapper">
                <div className="review-detail-tabs">
                    <button 
                        className={`tab-button ${activeTab === 'expert' ? 'active' : ''}`}
                        onClick={() => setActiveTab('expert')}
                    >
                        Expert Review
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'trader' ? 'active' : ''}`}
                        onClick={() => setActiveTab('trader')}
                    >
                        Trader Review
                    </button>
                </div>
                
                {/* ✅ HIỂN THỊ NỘI DUNG DỰA TRÊN TAB ĐANG CHỌN */}
                <div className="tab-content">
                    {activeTab === 'expert' ? (
                        <ExpertReviewContent review={review} />
                    ) : (
                        <TraderReview brokerId={review.id} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewDetailPage;
