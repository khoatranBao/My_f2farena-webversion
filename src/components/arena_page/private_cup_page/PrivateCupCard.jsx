import React from 'react';
import { ClockIcon } from '../../../icons/Icons';
import './PrivateCupCard.css';

const PrivateCupCard = ({ cup }) => {
    return (
        <div className="private-cup-card">
            <div className="cup-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={cup.avatar} alt="Creator Avatar" className="cup-creator-avatar" />
                    <div className="cup-creator-info">
                        <h4>{cup.creatorName}</h4>
                        <p>Creator</p>
                    </div>
                </div>
                <div className="cup-timer">
                    <ClockIcon />
                    <span>Ends in: {cup.timer}</span>
                </div>
            </div>
  
            <hr className="cup-divider" />
  
            <div className="cup-card-content">
                <h3 className="cup-name">{cup.cupName}</h3>
                <div className="cup-info-bar">
                    <div><span>Prize Pool</span><strong className="prize">{cup.prize}</strong></div>
                    <div><span>Participants</span><strong>{cup.participants}</strong></div>
                    <div><span>Symbol</span><strong className="symbol">{cup.symbol}</strong></div>
                </div>
            </div>
  
            <button className="cup-detail-btn">Detail</button>
        </div>
    );
};

export default PrivateCupCard;
