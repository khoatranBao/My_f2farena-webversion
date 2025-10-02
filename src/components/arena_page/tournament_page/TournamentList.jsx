import React, { useState, useEffect } from 'react';
import TournamentCard from '../../tournament_card/TournamentCard.jsx';
import { fetchTournaments } from '../../../api/tournaments.js';

const TournamentList = ({ onViewDetails, countdownTimers, formatTime }) => {
    const [tournaments, setTournaments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTournamentTab, setActiveTournamentTab] = useState('all');

    useEffect(() => {
        const loadTournaments = async () => {
            setIsLoading(true);
            const data = await fetchTournaments();
            setTournaments(data);
            setIsLoading(false);
        };
        loadTournaments();
    }, []);

    const getFilteredTournaments = () => {
        const now = new Date();
        switch (activeTournamentTab) {
            case 'live':
                return tournaments.filter(t => new Date(t.startTimeUTC) <= now && new Date(t.endTimeUTC) > now);
            case 'demo':
                return []; // Chưa có dữ liệu demo
            case 'all':
            default:
                return tournaments;
        }
    };

    const tournamentsToShow = getFilteredTournaments();

    return (
        <div>
            <div className="tournament-sub-nav">
                <button className={`sub-nav-btn ${activeTournamentTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTournamentTab('all')}>All</button>
                <button className={`sub-nav-btn ${activeTournamentTab === 'live' ? 'active' : ''}`} onClick={() => setActiveTournamentTab('live')}>Live</button>
                <button className={`sub-nav-btn ${activeTournamentTab === 'demo' ? 'active' : ''}`} onClick={() => setActiveTournamentTab('demo')}>Demo</button>
            </div>

            {isLoading ? (
                <div className="placeholder-content"><h3>Loading tournaments...</h3></div>
            ) : tournamentsToShow.length > 0 ? (
                <div className="grid-container">
                    {tournamentsToShow.map((t) =>
                        <TournamentCard
                            key={t.name}
                            tournament={t}
                            timer={formatTime(countdownTimers[t.name] || 0)}
                            onViewDetails={onViewDetails}
                        />
                    )}
                </div>
            ) : (
                <div className="placeholder-content"><h3>No tournaments available.</h3></div>
            )}
        </div>
    );
};

export default TournamentList;