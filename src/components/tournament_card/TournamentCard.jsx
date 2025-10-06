import React from 'react';
import './TournamentCard.css'; // Import CSS riêng
import { ClockIcon } from '../../icons/Icons'; // Điều chỉnh đường dẫn nếu cần

const TournamentCard = ({ tournament, timer, onViewDetails }) => {
    const isLive = new Date() >= new Date(tournament.startTimeUTC) && new Date() < new Date(tournament.endTimeUTC);
    
    // ✅ XÁC ĐỊNH TRẠNG THÁI (STATUS)
    const getStatus = () => {
        const now = new Date();
        const startTime = new Date(tournament.startTimeUTC);
        const endTime = new Date(tournament.endTimeUTC);
        if (now >= startTime && now < endTime) return 'live';
        if (now < startTime) return 'upcoming';
        return 'finished';
    };
    const status = getStatus();

    return (
        // ✅ TRUYỀN THÊM 'status' VÀO HÀM onViewDetails
        <div className="tournament-card" onClick={() => onViewDetails(tournament, status)}>
            <div className="card-image-container">
                <img src={tournament.image} alt={tournament.name} className="tournament-card-img" />
            </div>

            {isLive && (
                <div className="tournament-card-live">
                    <span className="animate-ping"></span>
                    LIVE
                </div>
            )}
            
            <div className="tournament-card-timer">
                <ClockIcon />
                <span>{timer}</span>
            </div>

            <div className="tournament-card-body">
                <h3>{tournament.name}</h3>
                <div className="tournament-card-info">
                    <div>
                        <span>Prize Pool</span>
                        <strong className="text-yellow">{tournament.prize}</strong>
                    </div>
                    <div>
                        <span>Participants</span>
                        <strong className="font-bold">{tournament.participants}</strong>
                    </div>
                </div>
                <button className="tournament-card-btn">
                    View Detail
                </button>
            </div>
        </div>
    );
};

export default TournamentCard;