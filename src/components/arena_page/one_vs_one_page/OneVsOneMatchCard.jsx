import React from 'react';
import './OneVsOneMatchCard.css';

const OneVsOneMatchCard = ({ match }) => (
    <div className="match-card">
        <div className="match-card-header">
            <div className="match-card-avatar">P1</div>
            <div className="match-card-name">{match.name}</div>
        </div>
        <div className="match-card-details">
            <div><span>Duration</span><span>{match.duration}</span></div>
            <div><span>Symbol</span><span>{match.symbol}</span></div>
            <div><span>Bet</span><span className="bet-amount">{match.bet} USDT</span></div>
        </div>
        <button className="join-challenge-btn">Join Challenge</button>
    </div>
);

export default OneVsOneMatchCard;
