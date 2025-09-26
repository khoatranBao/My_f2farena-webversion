import React, { useState } from 'react';
import './ReviewPage.css'; // Import CSS
import BrokerReview from './broker_review/BrokerReview';
import ComplaintPage from './complaint_page/ComplaintPage';
import { brokerReviews } from '../../data/mockData'; // Import để truyền prop

const ReviewPage = ({ onReviewClick }) => {
    const [activeSubTab, setActiveSubTab] = useState('broker');

    return (
        <div className="review-page">
            <div className="review-nav">
                <button 
                    className={`review-nav-btn ${activeSubTab === 'broker' ? 'active' : ''}`} 
                    onClick={() => setActiveSubTab('broker')} 
                > 
                    Broker Review 
                </button>
                <button 
                    className={`review-nav-btn ${activeSubTab === 'complaint' ? 'active' : ''}`} 
                    onClick={() => setActiveSubTab('complaint')} 
                > 
                    Complaint 
                </button>
            </div>
            <div className="review-content">
                {activeSubTab === 'broker' ? (
                    <BrokerReview onReviewClick={onReviewClick} />
                ) : (
                    <ComplaintPage brokers={brokerReviews} />
                )}
            </div>
        </div>
    );
};

export default ReviewPage;