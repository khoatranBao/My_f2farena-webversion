// // import React from 'react';
// // import { ClockIcon } from '../../../icons/Icons'; // Đảm bảo đường dẫn này chính xác
// // import './PrivateCupCard.css';

// // // Component nhận prop là `cup`, chứa toàn bộ dữ liệu của một giải đấu từ API
// // const PrivateCupCard = ({ cup, onViewDetails }) => {

// //     // ✅ BƯỚC 1: Xử lý dữ liệu một cách an toàn
// //     // Lấy thông tin từ object `cup` và cung cấp giá trị mặc định nếu thiếu
// //     const creatorName = cup.creator?.name || 'Unknown Creator';
// //     // Ưu tiên lấy avatar từ object creator, nếu không có thì tìm ở cấp cao nhất, cuối cùng dùng ảnh mặc định
// //     const avatarUrl = cup.creator?.avatar_url || cup.creator?.avatar || cup.avatar || 'https://i.pravatar.cc/150';
// //     const cupName = cup.name || 'Private Cup';
// //     const prizePool = cup.prize_pool || 0;
// //     const participants = cup.participants_count || cup.participants || 0;
// //     const symbol = cup.symbol || 'N/A';
// //     // Giả sử có một trường timer hoặc bạn sẽ cần định dạng từ `ends_at`
// //     const timer = cup.timer || 'N/A'; 

// //     return (
// //         // ✅ BƯỚC 2: Thêm sự kiện onClick cho thẻ để người dùng có thể click vào toàn bộ thẻ
// //         <div className="private-cup-card" onClick={() => onViewDetails(cup)}>
// //             <div className="cup-card-header">
// //                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
// //                     {/* Sử dụng avatarUrl đã được xử lý an toàn */}
// //                     <img src={avatarUrl} alt="Creator Avatar" className="cup-creator-avatar" />
// //                     <div className="cup-creator-info">
// //                         {/* Sử dụng creatorName đã được xử lý an toàn */}
// //                         <h4>{creatorName}</h4>
// //                         <p>Creator</p>
// //                     </div>
// //                 </div>
// //                 <div className="cup-timer">
// //                     <ClockIcon />
// //                     <span>Ends in: {timer}</span>
// //                 </div>
// //             </div>
 
// //             <hr className="cup-divider" />
 
// //             <div className="cup-card-content">
// //                 <h3 className="cup-name">{cupName}</h3>
// //                 <div className="cup-info-bar">
// //                     <div>
// //                         <span>Prize Pool</span>
// //                         {/* Định dạng lại số cho dễ đọc */}
// //                         <strong className="prize">{prizePool.toLocaleString()} USDT</strong>
// //                     </div>
// //                     <div>
// //                         <span>Participants</span>
// //                         <strong>{participants.toLocaleString()}</strong>
// //                     </div>
// //                     <div>
// //                         <span>Symbol</span>
// //                         <strong className="symbol">{symbol}</strong>
// //                     </div>
// //                 </div>
// //             </div>
 
// //             {/* ✅ BƯỚC 3: Khôi phục lại chức năng cho nút Detail */}
// //             {/* Nút này sẽ hoạt động đồng bộ với việc click vào cả thẻ */}
// //             <button className="cup-detail-btn" onClick={() => onViewDetails(cup)}>
// //                 Detail
// //             </button>
// //         </div>
// //     );
// // };

// // export default PrivateCupCard;

// import React from 'react';
// import { ClockIcon } from '../../../icons/Icons';
// import './PrivateCupCard.css';

// const PrivateCupCard = ({ cup, onViewDetails }) => {

//     // Lấy thông tin trực tiếp từ object `cup` và cung cấp giá trị mặc định để tránh lỗi
//     const creatorName = cup.creator_name || 'Unknown Creator';
    
//     // Xử lý trường hợp avatar bị null, sử dụng ảnh mặc định
//     const avatarUrl = cup.creator_avatar || 'https://i.pravatar.cc/150'; // pravatar là ảnh placeholder ngẫu nhiên
    
//     // API trả về 'title' cho tên của cup
//     const cupName = cup.title || 'Private Cup';
//     const prizePool = cup.prize_pool || 0;
//     const participants = cup.participants || 0;
//     const symbol = cup.symbol || 'N/A';
    
//     // Cần có logic để tính toán thời gian còn lại từ `end_time`
//     const timer = 'N/A'; 

//     console.log(`[LOG] PrivateCupCard: Đang render card cho cup "${cupName}" với avatar: ${avatarUrl}`);

//     return (
//         <div className="private-cup-card" onClick={() => onViewDetails(cup)}>
//             <div className="cup-card-header">
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//                     <img src={avatarUrl} alt="Creator Avatar" className="cup-creator-avatar" />
//                     <div className="cup-creator-info">
//                         <h4>{creatorName}</h4>
//                         <p>Creator</p>
//                     </div>
//                 </div>
//                 <div className="cup-timer">
//                     <ClockIcon />
//                     <span>Ends in: {timer}</span>
//                 </div>
//             </div>
 
//             <hr className="cup-divider" />
 
//             <div className="cup-card-content">
//                 <h3 className="cup-name">{cupName}</h3>
//                 <div className="cup-info-bar">
//                     <div>
//                         <span>Prize Pool</span>
//                         <strong className="prize">{prizePool.toLocaleString()} USDT</strong>
//                     </div>
//                     <div>
//                         <span>Participants</span>
//                         <strong>{participants.toLocaleString()}</strong>
//                     </div>
//                     <div>
//                         <span>Symbol</span>
//                         <strong className="symbol">{symbol}</strong>
//                     </div>
//                 </div>
//             </div>
 
//             <button className="cup-detail-btn" onClick={(e) => {
//                 e.stopPropagation(); // Ngăn sự kiện click của thẻ cha khi bấm nút
//                 onViewDetails(cup);
//             }}>
//                 Detail
//             </button>
//         </div>
//     );
// };

// export default PrivateCupCard;
import React from 'react';
import { ClockIcon } from '../../../icons/Icons';
import CountdownTimer from '../../common/CountdownTimer'; // Import component đếm ngược
import './PrivateCupCard.css';

const PrivateCupCard = ({ cup, onViewDetails }) => {

    // Lấy thông tin từ object `cup` và cung cấp giá trị mặc định
    const creatorName = cup.creator_name || 'Unknown Creator';
    const avatarUrl = cup.creator_avatar || 'https://i.pravatar.cc/150';
    const cupName = cup.title || 'Private Cup';
    const prizePool = cup.prize_pool || 0;
    const participants = cup.participants || 0;
    const symbol = cup.symbol || 'N/A';

    /**
     * Phân tích dữ liệu từ API để hiển thị đúng thông tin thời gian/trạng thái.
     * Hàm này sẽ trả về một component hoàn chỉnh (đồng hồ đếm ngược hoặc huy hiệu trạng thái).
     */
    const renderTimerOrStatus = () => {
        // Trường hợp 1: Giải đấu sắp bắt đầu và có thời gian đếm ngược
        if (cup.status === 'upcoming' && cup.timeRemaining && cup.timeRemaining > 0) {
            return (
                <div className="cup-timer">
                    <ClockIcon />
                    <CountdownTimer initialSeconds={cup.timeRemaining} />
                </div>
            );
        }

        // ✅ THAY ĐỔI TẠI ĐÂY: Trả về JSX với huy hiệu trạng thái có màu sắc nổi bật
        switch (cup.status) {
            case 'completed':
                return <span className="status-badge finished">Finished</span>;
            case 'cancel':
                return <span className="status-badge canceled">Canceled</span>;
            case 'ongoing':
                return <span className="status-badge live">Live Now</span>;
            default:
                // Nếu không có trạng thái rõ ràng, hiển thị N/A
                console.warn(`[WARN] PrivateCupCard "${cupName}": Không có trạng thái hoặc thời gian hợp lệ.`, cup);
                return (
                    <div className="cup-timer">
                        <span>N/A</span>
                    </div>
                );
        }
    };

    return (
        <div className="private-cup-card" onClick={() => onViewDetails(cup)}>
            <div className="cup-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={avatarUrl} alt="Creator Avatar" className="cup-creator-avatar" />
                    <div className="cup-creator-info">
                        <h4>{creatorName}</h4>
                        <p>Creator</p>
                    </div>
                </div>
                {/* Gọi hàm render để hiển thị đúng component thời gian/trạng thái */}
                {renderTimerOrStatus()}
            </div>
 
            <hr className="cup-divider" />
 
            <div className="cup-card-content">
                <h3 className="cup-name">{cupName}</h3>
                <div className="cup-info-bar">
                    <div>
                        <span>Prize Pool</span>
                        <strong className="prize">{prizePool.toLocaleString()} USDT</strong>
                    </div>
                    <div>
                        <span>Participants</span>
                        <strong>{participants.toLocaleString()}</strong>
                    </div>
                    <div>
                        <span>Symbol</span>
                        <strong className="symbol">{symbol}</strong>
                    </div>
                </div>
            </div>
 
            <button className="cup-detail-btn" onClick={(e) => {
                e.stopPropagation(); // Ngăn sự kiện click lan ra thẻ cha
                onViewDetails(cup);
            }}>
                Detail
            </button>
        </div>
    );
};

export default PrivateCupCard;