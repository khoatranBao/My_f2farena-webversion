

import React, { useState, useEffect } from 'react'; 
import './ReviewDetailPage.css';
import TraderReview from './TraderReview.jsx';
// [XÓA BỎ] Không cần import RankDetails vì đã gộp logic
// import RankDetails from './RankDetails.jsx';

// --- Các component con chỉ dùng cho trang này ---

// Component hiển thị sao lớn
const StarRating = ({ score, max = 5 }) => {
    const fullStars = Math.floor(score);
    const emptyStars = max - fullStars;
    return (
        <div className="star-rating">
            {[...Array(fullStars)].map((_, i) => <span key={`full-${i}`}>⭐</span>)}
            {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`} className="empty-star">⭐</span>)}
        </div>
    );
};

// Component hiển thị các sao nhỏ cho từng mục
const StarRatingDisplay = ({ score = 0, max = 5 }) => {
    const fullStars = Math.floor(score);
    const emptyStars = max - fullStars;
    return (
        <div className="star-rating-display">
            {[...Array(fullStars)].map((_, i) => <span key={`full-${i}`} className="star filled">★</span>)}
            {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`} className="star">★</span>)}
        </div>
    );
};

// Component Sidebar đã được cập nhật để chứa tất cả
const BrokerDetailSidebar = ({ review }) => (
    <div className="broker-detail-sidebar">
        <div className="rating-summary-box">
            <h4>PK Team Rating</h4>
            <div className="overall-score">{review.score.toFixed(1)}<span>/5.0</span></div>
            <StarRating score={review.score} />
            
            {/* Đường gạch ngang phân cách */}
            <hr className="rank-divider" />

            {/* Danh sách xếp hạng chi tiết */}
            <div className="rank-criteria-list">
                {review.rankDetails && review.rankDetails.map((item) => (
                    <div className="rank-criteria-item" key={item.name}>
                        <span>{item.name}</span>
                        <StarRatingDisplay score={item.score} />
                    </div>
                ))}
            </div>

            <a href={review.registration_url} target="_blank" rel="noopener noreferrer">
                 <button className="visit-broker-btn">Visit Broker</button>
            </a>
        </div>
    </div>
);

const DetailedAnalysis = ({ content }) => (
    <div className="detailed-analysis">
        <p style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: 'inherit' }}>
            {content}
        </p>
    </div>
);

const ExpertReviewContent = ({ review }) => (
    <div className="broker-detail-layout">
        <main className="broker-detail-main">
            <header className="broker-header">
                <img src={review.logo} alt={`${review.name} Logo`} className="broker-logo" />
                <div><h1>{review.name} Review</h1><p>An in-depth look at fees, platforms, and trust.</p></div>
            </header>
            <DetailedAnalysis content={review.pkReviewContent} />
        </main>
        <aside><BrokerDetailSidebar review={review} /></aside>
    </div>
);


// --- Component chính ---
const ReviewDetailPage = ({ review, user, onClose }) => {
    const [activeTab, setActiveTab] = useState('expert');
    const [detailedReview, setDetailedReview] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!review || !review.id) {
            setIsLoading(false);
            return;
        }

        const fetchReviewDetail = async () => {
            setIsLoading(true);
            console.log(`📝 [INFO] ReviewDetailPage: Bắt đầu lấy dữ liệu chi tiết cho broker ID: ${review.id}...`);
            try {
                const response = await fetch(`https://f2farena.com/api/brokers/${review.id}`);
                if (!response.ok) {
                    console.warn(`⚠️ [WARN] ReviewDetailPage: API chi tiết broker trả về lỗi! Status: ${response.status}`);
                    throw new Error('API request for broker detail failed');
                }
                const apiData = await response.json();
                console.log("[INFO] ReviewDetailPage: Dữ liệu chi tiết gốc từ API:", apiData);

                const formattedDetail = {
                    id: apiData.id,
                    name: apiData.broker_name,
                    score: apiData.average_stars || 0,
                    logo: apiData.logo,
                    registration_url: apiData.registration_url,
                    pkReviewContent: apiData.pk_review || "No detailed review available.",
                    rankDetails: [
                        { name: 'License & Regulation', score: apiData.star_1 || 0 },
                        { name: 'Fund Security', score: apiData.star_2 || 0 },
                        { name: 'Localization & Support', score: apiData.star_3 || 0 },
                        { name: 'Commissions & Fees', score: apiData.star_4 || 0 },
                        { name: 'Platform Stability & Tools', score: apiData.star_5 || 0 },
                        { name: 'Onboarding & Ease of Use', score: apiData.star_6 || 0 },
                    ]
                };
                console.log("[INFO] ReviewDetailPage: Dữ liệu chi tiết sau khi đồng nhất:", formattedDetail);
                
                setDetailedReview(formattedDetail);
                console.log("✅ [SUCCESS] ReviewDetailPage: Đã tải và đồng nhất dữ liệu chi tiết thành công.");

            } catch (error) {
                console.error("❌ [ERROR] ReviewDetailPage: Lỗi khi tải dữ liệu chi tiết:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReviewDetail();
    }, [review]);

    useEffect(() => {
        const pageElement = document.querySelector('.review-detail-page');
        if (pageElement) pageElement.scrollTo(0, 0);
    }, [review]);

    if (isLoading) {
         return (
            <div className="review-detail-page" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <h3>Loading review details...</h3>
            </div>
        );
    }
    
    if (!detailedReview) {
         return (
            <div className="review-detail-page">
                <div className="review-detail-header-bar">
                    <button onClick={onClose} className="back-button-detail">
                        <span>&larr; All Reviews</span>
                    </button>
                </div>
                <div style={{ textAlign: 'center', padding: '5rem' }}>
                    <h3>Could not load review details.</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="review-detail-page">
            <div className="review-detail-header-bar">
                <button onClick={onClose} className="back-button-detail">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                    <span>All Reviews</span>
                </button>
            </div>

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
                
                <div className="tab-content">
                    {activeTab === 'expert' ? (
                        <ExpertReviewContent review={detailedReview} />
                    ) : (
                        <TraderReview brokerId={detailedReview.id} user={user} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewDetailPage;
