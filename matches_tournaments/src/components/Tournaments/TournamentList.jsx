// src/components/Tournaments/TournamentList.jsx
import React, { useState } from 'react';
import TournamentCard from './TournamentCard';

const TournamentList = ({ title, icon, tournaments, countdownTimers, formatTime, onViewDetails }) => {
    const [visibleCount, setVisibleCount] = useState(3);
    
    return (
        <div>
            <div className="section-header">
                {icon}
                <h2>{title}</h2>
            </div>
            <div className="grid-container">
                {tournaments.slice(0, visibleCount).map((t, i) => (
                    <TournamentCard 
                        key={i} 
                        tournament={t} 
                        countdown={countdownTimers[t.name] || 0}
                        formatTime={formatTime} 
                        onViewDetails={onViewDetails}
                    />
                ))}
            </div>
            {tournaments.length > visibleCount && (
                <div className="view-more-container">
                    <button onClick={() => setVisibleCount(tournaments.length)} className="view-more-btn">
                        View More
                    </button>
                </div>
            )}
        </div>
    );
};

export default TournamentList;