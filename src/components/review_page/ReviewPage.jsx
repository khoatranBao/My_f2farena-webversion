// import React, { useState, useEffect } from 'react';
// import './ReviewPage.css';
// import BrokerReview from './broker_review/BrokerReview';
// import ComplaintPage from './complaint_page/ComplaintPage';

// const ReviewPage = ({ onReviewClick, user }) => { 
//     const [activeSubTab, setActiveSubTab] = useState('broker');
//     const [reviews, setReviews] = useState([]);
//     const [complaints, setComplaints] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     // FIX: Thêm useEffect để đóng trang chi tiết khi chuyển tab
//     useEffect(() => {
//         // Effect này sẽ chạy mỗi khi `activeSubTab` thay đổi.
//         // Nó gọi onReviewClick(null) để đảm bảo ReviewDetailPage được gỡ bỏ.
//         if (onReviewClick) {
//             onReviewClick(null);
//         }
//     }, [activeSubTab]);

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
//         // SỬA LỖI: Thêm `key` để buộc component re-mount khi chuyển tab
//         if (activeSubTab === 'broker') {
//             return <BrokerReview key="broker" reviews={reviews} onReviewClick={onReviewClick} />;
//         } else {
//             return <ComplaintPage key="complaint" complaints={complaints} brokers={reviews} user={user} onCreateComplaint={handleCreateComplaint} />;
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
    const [reviews, setReviews] = useState([]); // State này sẽ chứa danh sách broker
    const [complaints, setComplaints] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (onReviewClick) {
            onReviewClick(null);
        }
    }, [activeSubTab]);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                // Luôn tải danh sách broker để dùng cho form
                console.log("📝 [INFO] ReviewPage: Bắt đầu lấy danh sách broker cho dropdown...");
                const brokersResponse = await fetch('https://f2farena.com/api/brokers/list');
                if (!brokersResponse.ok) throw new Error('API request for brokers failed');
                const brokersApiData = await brokersResponse.json();
                const formattedBrokers = brokersApiData.brokers.map(broker => ({
                    id: broker.id, name: broker.broker_name, image: broker.thumbnail,
                    description: broker.description, country: broker.nation_code,
                    years: broker.years, score: broker.average_star
                }));
                setReviews(formattedBrokers); // Cập nhật state chứa danh sách broker
                console.log("✅ [SUCCESS] ReviewPage: Đã tải danh sách broker thành công.");

                if (activeSubTab === 'broker') {
                    // Nếu ở tab broker thì không cần làm gì thêm
                } else {
                    // Nếu ở tab complaint, tải thêm danh sách complaint
                    console.log("📝 [INFO] ReviewPage: Bắt đầu lấy dữ liệu complaints từ API...");
                    const complaintsRes = await fetch('https://f2farena.com/api/complaints/');
                    if (!complaintsRes.ok) throw new Error('API request for complaints failed');
                    
                    const complaintsData = await complaintsRes.json();
                    const formattedComplaints = complaintsData.complaints.map(c => ({
                        id: c.id,
                        title: c.title,
                        broker: c.broker_name,
                        user: c.username,
                        date: new Date(c.created_at).toLocaleDateString('en-GB'),
                        status: c.resolved === true ? 'Resolved' : 'Open'
                    }));
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
        // Sửa lại điều kiện kiểm tra, dùng telegram_id
        if (!user || !user.telegram_id) {
            alert("Bạn cần đăng nhập để tạo khiếu nại. User ID không hợp lệ.");
            console.warn(`⚠️ [WARN] ReviewPage: Thất bại, người dùng chưa đăng nhập hoặc thiếu telegram_id.`);
            return;
        }

        // Chuẩn bị dữ liệu để gửi đi
        const payload = {
            broker_name: formData.broker,
            title: formData.title,
            comment: formData.description,
            user_id: user.telegram_id // ✅ SỬA LỖI: Gửi telegram_id thay vì id
        };

        console.log("📝 [INFO] ReviewPage: Chuẩn bị gửi complaint mới lên API. Dữ liệu:", payload);

        try {
            const response = await fetch('https://f2farena.com/api/complaints/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const responseData = await response.json(); 

            if (!response.ok) {
                console.warn(`⚠️ [WARN] ReviewPage: API tạo complaint trả về lỗi! Status: ${response.status}`, responseData);
                // Lấy lỗi từ server, nếu không có thì dùng lỗi mặc định
                throw new Error(responseData.detail || 'Failed to create complaint');
            }
            
            console.log("✅ [SUCCESS] ReviewPage: Tạo complaint mới thành công! Dữ liệu trả về:", responseData);

            // Định dạng lại complaint mới để hiển thị ngay lập tức trên UI
            const formattedComplaint = {
                id: responseData.id,
                title: responseData.title,
                broker: responseData.broker_name,
                user: responseData.username,
                date: new Date(responseData.created_at).toLocaleDateString('en-GB'),
                status: responseData.resolved === true ? 'Resolved' : 'Open'
            };
            // Thêm vào đầu danh sách
            setComplaints(prev => [formattedComplaint, ...prev]);

        } catch (error) {
            console.error("❌ [ERROR] ReviewPage: Lỗi nghiêm trọng khi tạo complaint:", error);
            // Hiển thị lỗi cho người dùng
            alert(`Error creating complaint: ${error.message}`);
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return <div className="placeholder-content"><h3>Loading content...</h3></div>;
        }
        if (activeSubTab === 'broker') {
            return <BrokerReview key="broker" reviews={reviews} onReviewClick={onReviewClick} />;
        } else {
            // `reviews` giờ đây luôn chứa danh sách broker
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

