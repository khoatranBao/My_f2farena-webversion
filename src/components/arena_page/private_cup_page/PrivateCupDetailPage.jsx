import React from 'react';
import './PrivateCupDetailPage.css';
import { CloseIcon } from '../../../icons/Icons';

// Component con để hiển thị thông tin một vòng đấu
const RoundInfo = ({ round }) => (
    <div className="round-info-card">
        <h4>{round.name}</h4>
        <div className="round-details-grid">
            <span>Format</span><strong>{round.format}</strong>
            <span>Match Duration</span><strong>{round.matchDuration}</strong>
            <span>Players Advance</span><strong>{round.playersAdvance}</strong>
            <span>Matches / Player</span><strong>{round.matchesPerPlayer}</strong>
            <span>Round Duration</span><strong>{round.roundDuration}</strong>
            <span>Match Interval</span><strong>{round.matchInterval}</strong>
            <div className="full-width-item">
                <span>Scheduling Timeframes (UTC)</span>
                <strong>{round.schedulingTimeframes}</strong>
            </div>
        </div>
    </div>
);

const PrivateCupDetailPage = ({ cup, onClose }) => {
    if (!cup) return null;

    const eventDate = new Date(cup.eventTime);
    const formattedDate = eventDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

    return (
        <div className="cup-detail-wrapper">
            <div className="cup-detail-content">
                <button onClick={onClose} className="cup-detail-close-btn"><CloseIcon /></button>
                
                <h1 className="cup-detail-title">{cup.cupName}</h1>
                <p className="cup-detail-creator">By {cup.creatorName} - {formattedDate}</p>

                <div className="cup-detail-main-info">
                    <div><span>Prize Pool</span><strong>{cup.prize}</strong></div>
                    <div><span>Participants</span><strong>{cup.participants}</strong></div>
                    <div><span>Symbol</span><strong>{cup.symbol}</strong></div>
                    <div>
                        <span>Event Time</span>
                        <strong>{eventDate.toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}</strong>
                    </div>
                    <div><span>Broker</span><strong>{cup.broker}</strong></div>
                </div>

                <div className="cup-detail-section">
                    <h3>Description</h3>
                    <p>{cup.description}</p>
                </div>

                <div className="cup-detail-section">
                    <h3>Rounds & Rules</h3>
                    <div className="rounds-list">
                        {cup.rounds.map((round, index) => (
                            <RoundInfo key={index} round={round} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivateCupDetailPage;