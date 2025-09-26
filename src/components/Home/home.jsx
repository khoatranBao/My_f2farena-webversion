import React, { useState } from 'react';
import './home.css'; // Import file CSS riêng của Home

// --- CÁC COMPONENT CON & ICON CHỈ DÙNG CHO TRANG HOME ---
const LiveIconNew = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-red animate-pulse" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M12 1.5a1.05 1.05 0 100 2.1 1.05 1.05 0 000-2.1zM10.23 15.795a.75.75 0 001.06 0l4.5-4.5a.75.75 0 00-1.06-1.06L11.25 13.19l-1.97-1.97a.75.75 0 00-1.06 1.06l2.5 2.5z" clipRule="evenodd" /></svg> );
const UpcomingTournamentIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon icon-blue"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" /></svg> );
const LiveMatchIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon icon-red"><path d="M4.5 9.75a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM12 9.75a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM19.5 9.75a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM4.5 16.5a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM12 16.5a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM19.5 16.5a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5z" /></svg> );
const ClockIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon-sm icon-gray-light"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> );

const TournamentCard = ({ tournament, countdownTimers, formatTime, onViewDetails }) => {
    const timeValue = countdownTimers[tournament.name] || 0;
    const now = new Date();
    const startTime = new Date(tournament.startTimeUTC);
    const isLive = now >= startTime && timeValue > 0;

    return (
        <div className="tournament-card">
            <img src={tournament.image} alt={tournament.name} className="tournament-card-img" />
            <div className="tournament-card-timer">
                <ClockIcon />
                <span> {isLive ? `Ends in: ${formatTime(timeValue)}` : `Starts in: ${formatTime(timeValue)}`} </span>
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

// --- COMPONENT CHÍNH CỦA TRANG HOME (KHÔNG CÓ BANNER) ---
const Home = ({ allTournaments, liveMatches, onlinePlayers, countdownTimers, formatTime, setViewingTournament }) => {
    const [visibleLiveTournaments, setVisibleLiveTournaments] = useState(3);
    const [visibleUpcomingTournaments, setVisibleUpcomingTournaments] = useState(3);
    
    const now = new Date();
    const liveTournaments = allTournaments.filter(t => new Date(t.startTimeUTC) <= now && new Date(t.endTimeUTC) > now);
    const upcomingTournaments = allTournaments.filter(t => new Date(t.startTimeUTC) > now);

    return (
        <div className="home-container">
            <div>
                <div className="section-header">
                    <LiveIconNew />
                    <h2>Live Tournaments</h2>
                </div>
                <div className="grid-container">
                    {liveTournaments.slice(0, visibleLiveTournaments).map((t, i) =>
                        <TournamentCard key={`live-${i}`} tournament={t} countdownTimers={countdownTimers} formatTime={formatTime} onViewDetails={setViewingTournament} />
                    )}
                </div>
                {liveTournaments.length > visibleLiveTournaments && (
                    <div className="view-more-container">
                        <button onClick={() => setVisibleLiveTournaments(liveTournaments.length)} className="view-more-btn">View More</button>
                    </div>
                )}
            </div>

            <div className="online-players-banner">
                <div className="text-center">
                    <h3>PLAYERS ONLINE</h3>
                    <p>{onlinePlayers.toLocaleString()}</p>
                </div>
            </div>

            <div>
                <div className="section-header">
                    <UpcomingTournamentIcon />
                    <h2>Upcoming Tournaments</h2>
                </div>
                <div className="grid-container">
                    {upcomingTournaments.slice(0, visibleUpcomingTournaments).map((t, i) =>
                        <TournamentCard key={`upcoming-${i}`} tournament={t} countdownTimers={countdownTimers} formatTime={formatTime} onViewDetails={setViewingTournament} />
                    )}
                </div>
                {upcomingTournaments.length > visibleUpcomingTournaments && (
                    <div className="view-more-container">
                        <button onClick={() => setVisibleUpcomingTournaments(upcomingTournaments.length)} className="view-more-btn">View More</button>
                    </div>
                )}
            </div>

            <div>
                <div className="section-header">
                    <LiveMatchIcon />
                    <h2>Live Matches</h2>
                </div>
                <div className="live-match-grid">
                    {liveMatches.map((match, index) => (
                        <div key={index} className="live-match-card-new">
                            <div>
                                <p className="match-teams">{match.team1} vs {match.team2}</p>
                                <p className="match-game">{match.game}</p>
                            </div>
                            <div className="match-score">
                                <span className={match.score1 > match.score2 ? 'score-winner' : match.score1 < match.score2 ? 'score-loser' : 'score-tie'}>{match.score1}</span>
                                <span>-</span>
                                <span className={match.score2 > match.score1 ? 'score-winner' : match.score2 < match.score1 ? 'score-loser' : 'score-tie'}>{match.score2}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
