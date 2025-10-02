import React, { useState } from 'react';

// Import các component con
import InfoPanel from './InfoPanels.jsx';
import ClashDisplay from './ClashDisplay.jsx';
import TournamentNav from './TournamentNav.jsx';
import RoundsAccordion from '../rounds_detail_view/RoundsAccordion.jsx';
import DiscussionContent from '../discussion_content/DiscussionContent.jsx';
import LeaderboardPage from '../TournamentLeaderboardPage/TournamentLeaderboardPage.jsx';
import ResultPage from '../result_page/ResultPage.jsx';

// Import CSS
import './TournamentDetailPage.css';

// Import dữ liệu giả từ mockData
import { mockActivities, liveMatchData, matchInfoData } from '../../data/mockData';

const TournamentDetailPage = ({ tournament, onClose, onMatchClick }) => {
    // State cho menu dọc
    const [activeDetailTab, setActiveDetailTab] = useState('Matches');
    // Giả lập trạng thái người dùng có tham gia trận đấu hay không
    const [isUserParticipating, setIsUserParticipating] = useState(true);

    const renderContent = () => {
        switch (activeDetailTab) {
            case 'Matches':
                if (isUserParticipating) {
                    return (
                        <div className="match-page-layout">
                            <InfoPanel info={matchInfoData} activities={mockActivities} />
                            <ClashDisplay
                                match={liveMatchData}
                                team1Color="#3b82f6"
                                team2Color="#a855f7"
                                onClick={() => onMatchClick(liveMatchData)}
                            />
                        </div>
                    );
                } else {
                    return (
                        <div className="placeholder-view">
                            <h2>You are not participating in this tournament.</h2>
                            <p>Upcoming matches and your history will be shown here.</p>
                            <button className="dev-toggle-button-inner" onClick={() => setIsUserParticipating(true)}>
                                (Simulate Joining)
                            </button>
                        </div>
                    );
                }
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
             {/* Nút giả lập để chuyển đổi trạng thái cho bạn test */}
             <button className="dev-toggle-button" onClick={() => setIsUserParticipating(!isUserParticipating)}>
                Toggle Participation View
            </button>

            {/* ✅ KHÔI PHỤC THANH MENU BÊN TRÁI */}
            <aside className="new-detail-sidebar">
                <div className="sidebar-logo">
                    GOMARKETS
                </div>
                <TournamentNav activeItem={activeDetailTab} onClick={setActiveDetailTab} />
                <button onClick={onClose} className="sidebar-back-btn">
                    &larr; Back to Arena
                </button>
            </aside>

            {/* Nội dung chính bên phải */}
            <main className="unified-main-content">
                <div
                    className="tournament-header-banner"
                    style={{ backgroundImage: `url(${tournament?.image})` }}
                >
                    <div className="header-banner-overlay">
                        <h1>{tournament?.name || 'Tournament Detail'}</h1>
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