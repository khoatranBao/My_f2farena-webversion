import React, { useState, useEffect } from 'react';
import './ReviewPage.css';
import BrokerReview from './broker_review/BrokerReview';
import ComplaintPage from './complaint_page/ComplaintPage';
import { fetchBrokerReviews, fetchComplaints } from '../../api/reviews.js';

const ReviewPage = ({ onReviewClick }) => {
    const [activeSubTab, setActiveSubTab] = useState('broker');
    const [reviews, setReviews] = useState([]);
    const [complaints, setComplaints] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            // ✅ DÒNG LOG DEBUG
            console.log('>>> [ReviewPage] Active tab is:', activeSubTab);

            try {
                if (activeSubTab === 'broker') {
                    const reviewsData = await fetchBrokerReviews();
                    // ✅ DÒNG LOG DEBUG
                    console.log('>>> [ReviewPage] Data received from API:', reviewsData);
                    setReviews(reviewsData);
                } else {
                    const complaintsData = await fetchComplaints();
                    const brokersData = await fetchBrokerReviews();
                    setComplaints(complaintsData);
                    setReviews(brokersData);
                }
            } catch (error) {
                console.error(`Error loading data for tab ${activeSubTab}:`, error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [activeSubTab]);

    const renderContent = () => {
        if (isLoading) {
            return <div className="placeholder-content"><h3>Loading content...</h3></div>;
        }

        if (activeSubTab === 'broker') {
            return <BrokerReview reviews={reviews} onReviewClick={onReviewClick} />;
        } else {
            return <ComplaintPage complaints={complaints} brokers={reviews} />;
        }
    };

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
                {renderContent()}
            </div>
        </div>
    );
};

export default ReviewPage;