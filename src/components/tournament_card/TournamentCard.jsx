// import React from 'react';
// import './TournamentCard.css'; // Import CSS riêng
// import { ClockIcon } from '../../icons/Icons'; // Điều chỉnh đường dẫn nếu cần

// const TournamentCard = ({ tournament, timer, onViewDetails }) => {
//     const isLive = new Date() >= new Date(tournament.startTimeUTC) && new Date() < new Date(tournament.endTimeUTC);
    
//     // ✅ XÁC ĐỊNH TRẠNG THÁI (STATUS)
//     const getStatus = () => {
//         const now = new Date();
//         const startTime = new Date(tournament.startTimeUTC);
//         const endTime = new Date(tournament.endTimeUTC);
//         if (now >= startTime && now < endTime) return 'live';
//         if (now < startTime) return 'upcoming';
//         return 'finished';
//     };
//     const status = getStatus();

//     return (
//         // ✅ TRUYỀN THÊM 'status' VÀO HÀM onViewDetails
//         <div className="tournament-card" onClick={() => onViewDetails(tournament, status)}>
//             <div className="card-image-container">
//                 <img src={tournament.image} alt={tournament.name} className="tournament-card-img" />
//             </div>

//             {isLive && (
//                 <div className="tournament-card-live">
//                     <span className="animate-ping"></span>
//                     LIVE
//                 </div>
//             )}
            
//             <div className="tournament-card-timer">
//                 <ClockIcon />
//                 <span>{timer}</span>
//             </div>

//             <div className="tournament-card-body">
//                 <h3>{tournament.name}</h3>
//                 <div className="tournament-card-info">
//                     <div>
//                         <span>Prize Pool</span>
//                         <strong className="text-yellow">{tournament.prize}</strong>
//                     </div>
//                     <div>
//                         <span>Participants</span>
//                         <strong className="font-bold">{tournament.participants}</strong>
//                     </div>
//                 </div>
//                 <button className="tournament-card-btn">
//                     View Detail
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default TournamentCard;
import React from 'react';
import './TournamentCard.css';

// --- Icon Đồng hồ ---
const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="clock-icon">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
    </svg>
);

// --- Component con để hiển thị Trạng thái hoặc Bộ đếm ngược ---
const StatusDisplay = ({ tournament, countdownTimers, formatTime }) => {
    if (!tournament || !tournament.id) return null;

    const remainingSeconds = countdownTimers[tournament.id];
    const status = tournament.status ? tournament.status.toLowerCase() : 'upcoming';

    // Xử lý các trạng thái cố định trước
    if (status === 'finished' || status === 'closed') {
        return <div className="status-badge finished">FINISHED</div>;
    }
    if (status === 'canceled') {
        return <div className="status-badge canceled">CANCELED</div>;
    }

    // Nếu không phải trạng thái cố định và thời gian đã hết, hiển thị Finished
    if (remainingSeconds <= 0) {
        return <div className="status-badge finished">FINISHED</div>;
    }

    // Mặc định, hiển thị bộ đếm ngược
    return (
        <div className="timer-display">
            <ClockIcon />
            <span>{formatTime(remainingSeconds)}</span>
        </div>
    );
};

// --- Component Card chính ---
const TournamentCard = ({ tournament, onViewDetails, countdownTimers, formatTime }) => {
    if (!tournament) return null;

    const handleDetailClick = () => {
        if (onViewDetails) {
            onViewDetails(tournament);
        }
    };

    return (
        <div className="tournament-card">
            {/* ✅ SỬA LỖI: Di chuyển StatusDisplay vào đây */}
            <div className="card-image-container">
                <img src={tournament.image} alt={tournament.name} className="card-image" />
                <StatusDisplay 
                    tournament={tournament}
                    countdownTimers={countdownTimers}
                    formatTime={formatTime}
                />
            </div>
            <div className="card-content">
                {/* Loại bỏ card-header không cần thiết */}
                <h3 className="card-title">{tournament.name}</h3>

                <div className="card-details">
                    <div className="detail-item">
                        <span>Prize Pool</span>
                        <p>{tournament.prize}</p>
                    </div>
                    <div className="detail-item participants">
                        <span>Participants</span>
                        <p>{tournament.participants}</p>
                    </div>
                </div>

                <button className="detail-button" onClick={handleDetailClick}>
                    Detail
                </button>
            </div>
        </div>
    );
};

export default TournamentCard;

