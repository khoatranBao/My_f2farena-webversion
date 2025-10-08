// // import React, { useState, useEffect } from 'react';
// // import './ReviewPage.css';
// // import BrokerReview from './broker_review/BrokerReview';
// // import ComplaintPage from './complaint_page/ComplaintPage';
// // import { fetchBrokerReviews, fetchComplaints } from '../../api/reviews.js';

// // const ReviewPage = ({ onReviewClick }) => {
// //     const [activeSubTab, setActiveSubTab] = useState('broker');
// //     const [reviews, setReviews] = useState([]);
// //     const [complaints, setComplaints] = useState([]);
// //     const [isLoading, setIsLoading] = useState(true);

// //     useEffect(() => {
// //         const loadData = async () => {
// //             setIsLoading(true);
// //             // ✅ DÒNG LOG DEBUG
// //             console.log('>>> [ReviewPage] Active tab is:', activeSubTab);

// //             try {
// //                 if (activeSubTab === 'broker') {
// //                     const reviewsData = await fetchBrokerReviews();
// //                     // ✅ DÒNG LOG DEBUG
// //                     console.log('>>> [ReviewPage] Data received from API:', reviewsData);
// //                     setReviews(reviewsData);
// //                 } else {
// //                     const complaintsData = await fetchComplaints();
// //                     const brokersData = await fetchBrokerReviews();
// //                     setComplaints(complaintsData);
// //                     setReviews(brokersData);
// //                 }
// //             } catch (error) {
// //                 console.error(`Error loading data for tab ${activeSubTab}:`, error);
// //             } finally {
// //                 setIsLoading(false);
// //             }
// //         };

// //         loadData();
// //     }, [activeSubTab]);

// //     const renderContent = () => {
// //         if (isLoading) {
// //             return <div className="placeholder-content"><h3>Loading content...</h3></div>;
// //         }

// //         if (activeSubTab === 'broker') {
// //             return <BrokerReview reviews={reviews} onReviewClick={onReviewClick} />;
// //         } else {
// //             return <ComplaintPage complaints={complaints} brokers={reviews} />;
// //         }
// //     };

// //     return (
// //         <div className="review-page">
// //             <div className="review-nav">
// //                 <button 
// //                     className={`review-nav-btn ${activeSubTab === 'broker' ? 'active' : ''}`} 
// //                     onClick={() => setActiveSubTab('broker')} 
// //                 > 
// //                     Broker Review 
// //                 </button>
// //                 <button 
// //                     className={`review-nav-btn ${activeSubTab === 'complaint' ? 'active' : ''}`} 
// //                     onClick={() => setActiveSubTab('complaint')} 
// //                 > 
// //                     Complaint 
// //                 </button>
// //             </div>
// //             <div className="review-content">
// //                 {renderContent()}
// //             </div>
// //         </div>
// //     );
// // };

// // export default ReviewPage;
// import React, { useState, useEffect } from 'react';
// import './ReviewPage.css';
// import BrokerReview from './broker_review/BrokerReview';
// import ComplaintPage from './complaint_page/ComplaintPage';

// const ReviewPage = ({ onReviewClick, user }) => { 
//     const [activeSubTab, setActiveSubTab] = useState('broker');
//     const [reviews, setReviews] = useState([]);
//     const [complaints, setComplaints] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const loadData = async () => {
//             setIsLoading(true);
//             try {
//                 if (activeSubTab === 'broker') {
//                     // Logic cho tab Broker Review (không thay đổi)
//                     const response = await fetch('https://f2farena.com/api/brokers/list');
//                     if (!response.ok) throw new Error('API request for brokers failed');
//                     const apiData = await response.json();
//                     const formattedReviews = apiData.brokers.map(broker => ({
//                         id: broker.id, name: broker.broker_name, image: broker.thumbnail,
//                         description: broker.description, country: broker.nation_code,
//                         years: broker.years, score: broker.average_star
//                     }));
//                     setReviews(formattedReviews);
//                 } else {
//                     // Logic cho tab Complaint
//                     console.log("📝 [INFO] ReviewPage: Bắt đầu lấy dữ liệu complaints từ API...");
//                     const complaintsRes = await fetch('https://f2farena.com/api/complaints/');
//                     if (!complaintsRes.ok) {
//                         console.warn(`⚠️ [WARN] ReviewPage: API complaints trả về lỗi! Status: ${complaintsRes.status}`);
//                         throw new Error('API request for complaints failed');
//                     }
//                     const complaintsData = await complaintsRes.json();
//                     console.log("[INFO] ReviewPage: Dữ liệu complaints gốc từ API:", complaintsData);
                    
//                     // Đồng nhất dữ liệu
//                     const formattedComplaints = complaintsData.complaints.map(c => ({
//                         id: c.id,
//                         title: c.title,
//                         broker: c.broker_name,
//                         user: c.username,
//                         date: new Date(c.created_at).toLocaleDateString('en-GB'),
                        
//                         // [SỬA LỖI] Kiểm tra `resolved` một cách chính xác
//                         // Chỉ khi `c.resolved` là `true` thì status mới là 'Resolved'
//                         status: c.resolved === true ? 'Resolved' : 'Open'
//                     }));
//                     console.log("[INFO] ReviewPage: Dữ liệu complaints sau khi đồng nhất:", formattedComplaints);
                    
//                     setComplaints(formattedComplaints);
//                     console.log("✅ [SUCCESS] ReviewPage: Đã tải và đồng nhất dữ liệu complaints thành công.");
//                 }
//             } catch (error) {
//                 console.error(`❌ [ERROR] Lỗi khi tải dữ liệu cho tab ${activeSubTab}:`, error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         loadData();
//     }, [activeSubTab]);

//     const handleCreateComplaint = async (formData) => {
//         if (!user || !user.id) {
//             alert("Bạn cần đăng nhập để tạo khiếu nại.");
//             return;
//         }
//         console.log("📝 [INFO] ReviewPage: Bắt đầu gửi complaint mới lên API...", formData);
//         try {
//             const response = await fetch('https://f2farena.com/api/complaints/', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     user_id: user.id,
//                     broker_name: formData.broker,
//                     title: formData.title,
//                     comment: formData.description
//                 })
//             });
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 console.warn(`⚠️ [WARN] ReviewPage: API tạo complaint trả về lỗi!`, errorData);
//                 throw new Error(errorData.detail || 'Failed to create complaint');
//             }
//             const newComplaint = await response.json();
//             console.log("✅ [SUCCESS] ReviewPage: Tạo complaint mới thành công:", newComplaint);

//             const formattedComplaint = {
//                 id: newComplaint.id, title: newComplaint.title, broker: newComplaint.broker_name,
//                 user: newComplaint.username, date: new Date(newComplaint.created_at).toLocaleDateString('en-GB'),
//                 status: newComplaint.resolved === true ? 'Resolved' : 'Open'
//             };
//             setComplaints(prev => [formattedComplaint, ...prev]);

//         } catch (error) {
//             console.error("❌ [ERROR] ReviewPage: Lỗi khi tạo complaint:", error);
//             alert(`Error: ${error.message}`);
//         }
//     };

//     const renderContent = () => {
//         if (isLoading) {
//             return <div className="placeholder-content"><h3>Loading content...</h3></div>;
//         }
//         if (activeSubTab === 'broker') {
//             return <BrokerReview reviews={reviews} onReviewClick={onReviewClick} />;
//         } else {
//             return <ComplaintPage complaints={complaints} brokers={reviews} user={user} onCreateComplaint={handleCreateComplaint} />;
//         }
//     };

//     return (
//         <div className="review-page">
//             <div className="review-nav">
//                 <button className={`review-nav-btn ${activeSubTab === 'broker' ? 'active' : ''}`} onClick={() => setActiveSubTab('broker')}>Broker Review</button>
//                 <button className={`review-nav-btn ${activeSubTab === 'complaint' ? 'active' : ''}`} onClick={() => setActiveSubTab('complaint')}>Complaint</button>
//             </div>
//             <div className="review-content">
//                 {renderContent()}
//             </div>
//         </div>
//     );
// };
// export default ReviewPage;
import React, { useState, useEffect } from 'react';
import './ReviewPage.css';
import BrokerReview from './broker_review/BrokerReview';
import ComplaintPage from './complaint_page/ComplaintPage';

const ReviewPage = ({ onReviewClick, user }) => { 
    const [activeSubTab, setActiveSubTab] = useState('broker');
    const [reviews, setReviews] = useState([]);
    const [complaints, setComplaints] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // FIX: Thêm useEffect để đóng trang chi tiết khi chuyển tab
    useEffect(() => {
        // Effect này sẽ chạy mỗi khi `activeSubTab` thay đổi.
        // Nó gọi onReviewClick(null) để đảm bảo ReviewDetailPage được gỡ bỏ.
        if (onReviewClick) {
            onReviewClick(null);
        }
    }, [activeSubTab]);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                if (activeSubTab === 'broker') {
                    // Logic cho tab Broker Review (không thay đổi)
                    const response = await fetch('https://f2farena.com/api/brokers/list');
                    if (!response.ok) throw new Error('API request for brokers failed');
                    const apiData = await response.json();
                    const formattedReviews = apiData.brokers.map(broker => ({
                        id: broker.id, name: broker.broker_name, image: broker.thumbnail,
                        description: broker.description, country: broker.nation_code,
                        years: broker.years, score: broker.average_star
                    }));
                    setReviews(formattedReviews);
                } else {
                    // Logic cho tab Complaint
                    console.log("📝 [INFO] ReviewPage: Bắt đầu lấy dữ liệu complaints từ API...");
                    const complaintsRes = await fetch('https://f2farena.com/api/complaints/');
                    if (!complaintsRes.ok) {
                        console.warn(`⚠️ [WARN] ReviewPage: API complaints trả về lỗi! Status: ${complaintsRes.status}`);
                        throw new Error('API request for complaints failed');
                    }
                    const complaintsData = await complaintsRes.json();
                    console.log("[INFO] ReviewPage: Dữ liệu complaints gốc từ API:", complaintsData);
                    
                    // Đồng nhất dữ liệu
                    const formattedComplaints = complaintsData.complaints.map(c => ({
                        id: c.id,
                        title: c.title,
                        broker: c.broker_name,
                        user: c.username,
                        date: new Date(c.created_at).toLocaleDateString('en-GB'),
                        
                        // [SỬA LỖI] Kiểm tra `resolved` một cách chính xác
                        // Chỉ khi `c.resolved` là `true` thì status mới là 'Resolved'
                        status: c.resolved === true ? 'Resolved' : 'Open'
                    }));
                    console.log("[INFO] ReviewPage: Dữ liệu complaints sau khi đồng nhất:", formattedComplaints);
                    
                    setComplaints(formattedComplaints);
                    console.log("✅ [SUCCESS] ReviewPage: Đã tải và đồng nhất dữ liệu complaints thành công.");
                }
            } catch (error) {
                console.error(`❌ [ERROR] Lỗi khi tải dữ liệu cho tab ${activeSubTab}:`, error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [activeSubTab]);

    const handleCreateComplaint = async (formData) => {
        if (!user || !user.id) {
            alert("Bạn cần đăng nhập để tạo khiếu nại.");
            return;
        }
        console.log("📝 [INFO] ReviewPage: Bắt đầu gửi complaint mới lên API...", formData);
        try {
            const response = await fetch('https://f2farena.com/api/complaints/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: user.id,
                    broker_name: formData.broker,
                    title: formData.title,
                    comment: formData.description
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.warn(`⚠️ [WARN] ReviewPage: API tạo complaint trả về lỗi!`, errorData);
                throw new Error(errorData.detail || 'Failed to create complaint');
            }
            const newComplaint = await response.json();
            console.log("✅ [SUCCESS] ReviewPage: Tạo complaint mới thành công:", newComplaint);

            const formattedComplaint = {
                id: newComplaint.id, title: newComplaint.title, broker: newComplaint.broker_name,
                user: newComplaint.username, date: new Date(newComplaint.created_at).toLocaleDateString('en-GB'),
                status: newComplaint.resolved === true ? 'Resolved' : 'Open'
            };
            setComplaints(prev => [formattedComplaint, ...prev]);

        } catch (error) {
            console.error("❌ [ERROR] ReviewPage: Lỗi khi tạo complaint:", error);
            alert(`Error: ${error.message}`);
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return <div className="placeholder-content"><h3>Loading content...</h3></div>;
        }
        // SỬA LỖI: Thêm `key` để buộc component re-mount khi chuyển tab
        if (activeSubTab === 'broker') {
            return <BrokerReview key="broker" reviews={reviews} onReviewClick={onReviewClick} />;
        } else {
            return <ComplaintPage key="complaint" complaints={complaints} brokers={reviews} user={user} onCreateComplaint={handleCreateComplaint} />;
        }
    };

    return (
        <div className="review-page">
            <div className="review-nav">
                <button className={`review-nav-btn ${activeSubTab === 'broker' ? 'active' : ''}`} onClick={() => setActiveSubTab('broker')}>Broker Review</button>
                <button className={`review-nav-btn ${activeSubTab === 'complaint' ? 'active' : ''}`} onClick={() => setActiveSubTab('complaint')}>Complaint</button>
            </div>
            <div className="review-content">
                {renderContent()}
            </div>
        </div>
    );
};
export default ReviewPage;

