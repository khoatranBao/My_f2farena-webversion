import React from 'react';
import './ChallengeCard.css';

const ChallengeCard = ({ challenge }) => {
    return (
        <div className="challenge-card">
            <div className="challenge-header">
                <div className="challenge-avatar">P1</div>
                <span className="creator-name">{challenge.creator}</span>
            </div>
            <hr className="challenge-divider" />
            <div className="challenge-info">
                <div className="info-item">
                    <span>Duration</span>
                    <strong>{challenge.duration}</strong>
                </div>
                <div className="info-item">
                    <span>Symbol</span>
                    <strong>{challenge.symbol}</strong>
                </div>
                <div className="info-item">
                    <span>Bet</span>
                    <strong className="bet-amount">{challenge.bet} USDT</strong>
                </div>
            </div>
            <button className="join-challenge-btn">
                Join Challenge
            </button>
        </div>
    );
};

export default ChallengeCard;
