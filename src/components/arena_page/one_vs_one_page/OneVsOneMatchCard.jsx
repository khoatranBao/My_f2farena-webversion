import React from 'react';
import defaultAvatar from '../../../assets/logo.png'; // Sửa lại đường dẫn import

const OneVsOneMatchCard = ({ match, onJoinChallenge }) => {
    const player1 = match.player1;
    const betAmount = match.betAmount || 0;
    const symbol = match.symbol || 'N/A';
    const duration = match.duration_time || 0; 
    const status = match.status || 'unknown';

    const avatarUrl = player1.avatar && player1.avatar.startsWith('http') 
        ? player1.avatar 
        : defaultAvatar;

    const handleJoinClick = (e) => {
        e.stopPropagation();
        onJoinChallenge(match);
    };

    return (
        <div className="one-vs-one-card">
            <div className="card-player-info">
                <img 
                    src={avatarUrl} 
                    alt={player1.name} 
                    className="player-avatar" 
                    onError={(e) => { e.target.src = defaultAvatar; }}
                />
                <span className="player-name">{player1.name}</span>
            </div>

            <div className="card-match-details">
                <div className="detail-item">
                    <span>Duration</span>
                    <p>{duration} min</p>
                </div>
                <div className="detail-item">
                    <span>Symbol</span>
                    <p className="symbol-text">{symbol}</p>
                </div>
                <div className="detail-item">
                    <span>Bet</span>
                    <p className="bet-text">{betAmount.toLocaleString()} USDT</p>
                </div>
            </div>

            {status === 'waiting' && (
                <button className="join-challenge-btn" onClick={handleJoinClick}>
                    Join Challenge
                </button>
            )}

            {status === 'live' && (
                <button className="view-match-btn live" onClick={() => { /* Logic to view live match */ }}>
                    <span className="live-indicator"></span>
                    View Live
                </button>
            )}

            {status === 'done' && (
                <button className="view-match-btn done" onClick={() => { /* Logic to view result */ }}>
                    View Result
                </button>
            )}
        </div>
    );
};

export default OneVsOneMatchCard;