// src/components/Tournaments/TournamentCard.jsx
import React from 'react';
import { ClockIcon } from '../../icons/Icons';

const TournamentCard = ({ tournament, countdown, formatTime, onViewDetails }) => {
    const isLive = tournament.startTime === 0;
    return (
        <div className="tournament-card">
            <img src={tournament.image} alt={tournament.name} className="tournament-card-img" />
            <div className="tournament-card-timer">
                <ClockIcon />
                <span>
                    {isLive ? `Ends in: ${formatTime(countdown)}` : `Starts in: ${formatTime(countdown)}`}
                </span>
            </div>
            {isLive && <div className="tournament-card-live">LIVE</div>}
            <div className="tournament-card-body">
                <h3>{tournament.name}</h3>
                <div className="tournament-card-info">
                    <span>Prize: <span className="font-bold text-yellow">{tournament.prize}</span></span>
                    <span>Players: <span className="font-bold">{tournament.participants}</span></span>
                </div>
                <button onClick={() => onViewDetails(tournament)} className="tournament-card-btn">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default TournamentCard;