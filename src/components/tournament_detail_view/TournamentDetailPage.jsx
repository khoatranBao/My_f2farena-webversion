import React, { useState } from 'react';
import DiscussionContent from '../discussion_content/DiscussionContent.jsx';
import LeaderboardPage from '../leaderboard_page/LeaderboardPage.jsx';
import ResultPage from '../result_page/ResultPage.jsx';

// CSS
import './TournamentDetailPage.css';

// Components con đã tách trước đó
import RoundsAccordion from '../rounds_detail_view/RoundsAccordion.jsx'; 
// (Lưu ý: điều chỉnh đường dẫn này nếu cần)

// Icons
import { NewMatchesIcon, NewRoundsIcon, NewDiscussionIcon, NewLeaderboardIcon, NewResultIcon, SendIcon } from '../../icons/Icons'; // Giả sử file Icons.jsx nằm ở thư mục gốc /icons

// Dữ liệu Mock (tạm thời import trực tiếp, sau này có thể truyền qua props)
import { mockComments, mockLeaderboardData, winners, mockActivities, liveMatchData, matchInfoData } from '../../data/mockData'; // Giả sử file mockData.js nằm ở thư mục gốc /data


// =======================================================
// CÁC COMPONENT CON (ĐƯỢC DI CHUYỂN TỪ App.jsx VÀO ĐÂY)
// =======================================================



const ClashDisplay = ({ match, team1Color, team2Color, onClick }) => {
    const score1 = match.team1.score;
    const score2 = match.team2.score;
    const totalScore = score1 + score2;
    const score1Percentage = totalScore > 0 ? (score1 / totalScore) * 100 : 50;
    return (
        <div className="clash-container clickable" onClick={onClick}>
            <div className="player-panel left"><div className="clash-avatar" style={{ borderColor: team1Color }}>{match.team1.short}</div><h2 className="clash-player-name">{match.team1.name}</h2><p className="clash-team-name">Team Alpha</p><div className="clash-score" style={{ color: team1Color }}>{match.team1.score}</div><p className="clash-pts-label">pts</p><div className="clash-progress-bar-track"><div className="clash-progress-bar-fill" style={{ width: `${score1Percentage}%`, backgroundColor: team1Color }}></div></div></div>
            <div className="clash-center-info"><div className="clash-timer">{match.countdown}</div><div className="clash-vs">VS</div><div className="clash-live-badge">LIVE</div></div>
            <div className="player-panel right"><div className="clash-avatar" style={{ borderColor: team2Color }}>{match.team2.short}</div><h2 className="clash-player-name">{match.team2.name}</h2><p className="clash-team-name">Team Omega</p><div className="clash-score" style={{ color: team2Color }}>{match.team2.score}</div><p className="clash-pts-label">pts</p><div className="clash-progress-bar-track"><div className="clash-progress-bar-fill" style={{ width: `${100 - score1Percentage}%`, backgroundColor: team2Color }}></div></div></div>
        </div>
    );
};

const MatchInformationSection = ({ info }) => (
    <div className="match-info-section"><h3>Match Information</h3><div className="info-grid"><span>Prize Pool</span> <strong>{info.prizePool}</strong><span>Symbol</span> <strong>{info.symbol}</strong><span>Format</span> <strong>{info.format}</strong></div></div>
);

const RecentActivitySection = ({ activities }) => {
    const getActivityDotClass = (type) => { switch (type.toLowerCase()) { case 'buy': return 'dot-buy'; case 'sell': return 'dot-sell'; case 'close': return 'dot-close'; default: return ''; } };
    return (
        <div className="recent-activity-section"><h3>Recent Activity</h3><div className="activity-feed">{activities.map((activity, index) => (<div key={index} className="activity-item"><div className={`activity-dot ${getActivityDotClass(activity.type)}`}></div><div className="activity-content"><div className="activity-header"><strong className={`activity-action ${getActivityDotClass(activity.type)}`}>{activity.type}</strong><span className="activity-player">{activity.player}</span><span className="activity-time">@{activity.time} mins ago</span></div><div className="activity-details"><span>{activity.quantity} {activity.symbol}</span><span>@ {activity.price}</span></div></div></div>))}</div></div>
    );
};

const NewTournamentNav = ({ activeItem, onClick }) => {
    const navItems = [
        { name: 'Matches', icon: <NewMatchesIcon /> }, { name: 'Rounds', icon: <NewRoundsIcon /> },
        { name: 'Discussion', icon: <NewDiscussionIcon /> }, { name: 'Leaderboard', icon: <NewLeaderboardIcon /> },
        { name: 'Result', icon: <NewResultIcon /> }
    ];
    return (<nav className="new-tournament-nav">{navItems.map(item => (<button key={item.name} className={`new-nav-item ${activeItem === item.name ? 'active' : ''}`} onClick={() => onClick(item.name)}>{item.icon}<span>{item.name}</span></button>))}</nav>);
};


// =======================================================
// COMPONENT CHÍNH CỦA TRANG
// =======================================================

const TournamentDetailPage = ({ tournament, onClose, onMatchClick }) => {
    const [activeDetailTab, setActiveDetailTab] = useState('Matches');
    const backgroundImage = tournament ? tournament.image : ''; // Lấy ảnh từ prop

    const renderContent = () => {
        switch (activeDetailTab) {
            case 'Matches':
                return (
                    <div className="match-page-layout">
                        <div className="info-panel">
                            <MatchInformationSection info={matchInfoData} />
                            <RecentActivitySection activities={mockActivities} />
                        </div>
                        <div className="info-panel">
                            <ClashDisplay
                                match={liveMatchData}
                                team1Color="#3b82f6"
                                team2Color="#a855f7"
                                onClick={() => onMatchClick(liveMatchData)}
                            />
                        </div>
                    </div>
                );
            case 'Rounds':
                return <RoundsAccordion />;
            case 'Discussion':
                return <DiscussionContent />;
            case 'Leaderboard':
                return <LeaderboardPage />;
            case 'Result':
                return <ResultPage />;
            default:
                return null;
        }
    };

    return (
        <div className="new-detail-page-wrapper">
            <aside className="new-detail-sidebar">
                <div className="sidebar-logo">
                    GOMARKETS
                </div>
                <NewTournamentNav activeItem={activeDetailTab} onClick={setActiveDetailTab} />
                <button onClick={onClose} className="sidebar-back-btn">
                    &larr; Back to Tournaments
                </button>
            </aside>
            <main className="unified-main-content">
                <div
                    className="tournament-header-banner"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                    <div className="header-banner-overlay">
                        <h1>{tournament ? tournament.name : 'Tournament Detail'}</h1>
                        <div className="status-badge-new finished">
                            <span></span>
                            FINISHED
                        </div>
                    </div>
                </div>
                <div className="unified-content-body">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default TournamentDetailPage;