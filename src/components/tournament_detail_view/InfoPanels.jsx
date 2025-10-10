import React from 'react';
import './InfoPanels.css';

// Component con hiển thị thông tin chung
const MatchInformationSection = ({ info }) => (
    <div className="match-info-section">
        <h3>Match Information</h3>
        <div className="info-grid">
            <span>Prize Pool</span> <strong>{info.prizePool}</strong>
            <span>Symbol</span> <strong>{info.symbol}</strong>
            <span>Format</span> <strong>{info.format}</strong>
        </div>
    </div>
);

// Component con hiển thị hoạt động gần đây
const RecentActivitySection = ({ activities }) => {
    const getActivityDotClass = (type) => {
        switch (type.toLowerCase()) {
            case 'buy': return 'dot-buy';
            case 'sell': return 'dot-sell';
            case 'close': return 'dot-close';
            default: return '';
        }
    };
    return (
        <div className="recent-activity-section">
            <h3>Recent Activity</h3>
            <div className="activity-feed">
                {activities.map((activity, index) => (
                    <div key={index} className="activity-item">
                        <div className={`activity-dot ${getActivityDotClass(activity.type)}`}></div>
                        <div className="activity-content">
                            <div className="activity-header">
                                <strong className={`activity-action ${getActivityDotClass(activity.type)}`}>{activity.type}</strong>
                                <span className="activity-player">{activity.player}</span>
                                <span className="activity-time">@{activity.time} mins ago</span>
                            </div>
                            <div className="activity-details">
                                <span>{activity.quantity} {activity.symbol}</span>
                                <span>@ {activity.price}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Component chính để bọc 2 component trên
const InfoPanel = ({ info, activities }) => (
    <div className="info-panel">
        <MatchInformationSection info={info} />
        <RecentActivitySection activities={activities} />
    </div>
);

export default InfoPanel;