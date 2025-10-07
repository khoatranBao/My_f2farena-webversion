// import React, { useState } from 'react';

// // Import các component con cần thiết
// import InfoPanel from './InfoPanels.jsx'; // Giả định là component InfoPanel
// import ClashDisplay from './ClashDisplay.jsx'; // Giả định là component ClashDisplay
// import TournamentNav from './TournamentNav.jsx';
// import RoundsAccordion from '../rounds_detail_view/RoundsAccordion.jsx'; // Giả định component RoundsAccordion
// import DiscussionContent from '../discussion_content/DiscussionContent.jsx'; // Giả định component DiscussionContent
// import LeaderboardPage from '../TournamentLeaderboardPage/TournamentLeaderboardPage.jsx';
// import ResultPage from '../result_page/ResultPage.jsx'; // Giả định component ResultPage

// // Import CSS
// import './TournamentDetailPage.css';
// import '../../components/TournamentDetailLeaderboard.css';

// // Import dữ liệu giả từ mockData (chỉ dùng trong Matches tab)
// import { mockActivities, liveMatchData, matchInfoData } from '../../data/mockData'; 

// // Hàm helper để định dạng ngày tháng (từ phiên bản 2)
// const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     // Sử dụng 'en-US' thay vì 'vi-VN' để tránh lỗi Locale nếu môi trường không hỗ trợ
//     return new Date(dateString).toLocaleString('en-US', {
//         year: 'numeric', month: '2-digit', day: '2-digit',
//         hour: '2-digit', minute: '2-digit', second: '2-digit'
//     });
// };

// const TournamentDetailPage = ({ tournament, onClose, onMatchClick }) => {
//     // State cho menu dọc chính (từ phiên bản 1)
//     const [activeDetailTab, setActiveDetailTab] = useState('Info'); 
//     // State giả lập trạng thái người dùng (từ phiên bản 1)
//     const [isUserParticipating, setIsUserParticipating] = useState(true);
//     // State quản lý tab của bảng xếp hạng con (từ phiên bản 1)
//     const [leaderboardActiveTab, setLeaderboardActiveTab] = useState('tournament');

//     // Lấy dữ liệu và cung cấp giá trị mặc định (từ phiên bản 2)
//     const {
//         title = 'Tournament Name',
//         creator_name = 'Unknown Creator',
//         event_time,
//         prize_pool = 0,
//         participants = 0,
//         max_participants = 100,
//         symbol = 'N/A',
//         broker_name = 'N/A',
//         description = 'No description available.',
//         prize_structure = [],
//         rounds = [],
//         thumbnail,
//         image // Dùng trường image cho banner nếu thumbnail là ảnh nhỏ
//     } = tournament || {};

//     // =========================================================================
//     // HÀM RENDER NỘI DUNG CHÍNH THEO TAB
//     // =========================================================================
//     const renderContent = () => {
//         if (!tournament) return <p>Loading tournament details...</p>;

//         switch (activeDetailTab) {
//             case 'Info':
//                 // Nội dung chi tiết/tổng quan (từ phiên bản 2)
//                 return (
//                     <>
//                         <p className="card-meta">By {creator_name} - {formatDate(event_time)}</p>
                        
//                         {/* Lưới thông tin chính */}
//                         <div className="static-info-grid">
//                             <div className="static-info-item"><span>Prize Pool</span><strong className="prize">{prize_pool.toLocaleString()} USDT</strong></div>
//                             <div className="static-info-item"><span>Participants</span><strong>{participants} / {max_participants}</strong></div>
//                             <div className="static-info-item"><span>Symbol</span><strong className="symbol">{symbol}</strong></div>
//                             <div className="static-info-item"><span>Event Time</span><strong>{formatDate(event_time)}</strong></div>
//                             <div className="static-info-item"><span>Broker</span><strong>{broker_name}</strong></div>
//                         </div>

//                         {/* Các phần chi tiết */}
//                         <div className="detail-section">
//                             <h3>ℹ️ Description</h3>
//                             <p>{description}</p>
//                         </div>

//                         <div className="detail-section">
//                             <h3>🏆 Prize Structure</h3>
//                             <div className="prize-structure-list">
//                                 {prize_structure.map((prize, index) => (
//                                     <div key={index} className="prize-item">
//                                         <span>{prize.name} {prize.rank ? `(Rank ${prize.rank})` : ''}</span>
//                                         <strong>{prize.prize}</strong>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </>
//                 );

//             case 'Matches':
//                 // Nội dung Matches (từ phiên bản 1)
//                 if (isUserParticipating) {
//                     return (
//                         <div className="match-page-layout">
//                             <InfoPanel info={matchInfoData} activities={mockActivities} />
//                             <ClashDisplay
//                                 match={liveMatchData}
//                                 team1Color="#3b82f6"
//                                 team2Color="#a855f7"
//                                 onClick={() => onMatchClick(liveMatchData)}
//                             />
//                         </div>
//                     );
//                 } else {
//                     return (
//                         <div className="placeholder-view">
//                             <h2>You are not participating in this tournament.</h2>
//                             <p>Upcoming matches and your history will be shown here.</p>
//                             <button className="dev-toggle-button-inner" onClick={() => setIsUserParticipating(true)}>
//                                 (Simulate Joining)
//                             </button>
//                         </div>
//                     );
//                 }
            
//             case 'Rounds':
//                 // Nội dung Rounds & Rules (kết hợp logic và JSX từ phiên bản 2)
//                 return (
//                     <div className="detail-section">
//                         <h3>📜 Rounds & Rules</h3>
//                         <RoundsAccordion /> {/* Giữ nguyên component RoundsAccordion nếu có */}
//                         {/* Hoặc dùng JSX chi tiết nếu RoundsAccordion không được sử dụng */}
//                         <div className="rules-list">
//                             {rounds.map((round, index) => (
//                                 <div key={index} className="round-item">
//                                     <h4>{round.name}</h4>
//                                     <div className="round-details-grid">
//                                         <div className="static-info-item"><span>Format</span><strong>{round.competition_format}</strong></div>
//                                         <div className="static-info-item"><span>Match Duration</span><strong>{round.duration_minutes} min</strong></div>
//                                         <div className="static-info-item"><span>Players Advance</span><strong>{round.advancement_count}</strong></div>
//                                         <div className="static-info-item"><span>Matches / Player</span><strong>{round.matches_per_player}</strong></div>
//                                         <div className="static-info-item"><span>Round Duration</span><strong>{(round.total_round_duration_minutes / 60).toFixed(0)} hours</strong></div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 );

//             case 'Leaderboard':
//                 // Nội dung Leaderboard (từ phiên bản 1)
//                 return (
//                     <div className="tournament-detail-leaderboard">
//                         <LeaderboardPage
//                             activeTab={leaderboardActiveTab}
//                             setActiveTab={setLeaderboardActiveTab}
//                         />
//                     </div>
//                 );

//             case 'Discussion':
//                 return <DiscussionContent />;

//             case 'Result':
//                 return <ResultPage />;

//             default:
//                 return null;
//         }
//     };

//     // =========================================================================
//     // JSX CHUNG
//     // =========================================================================
//     return (
//         <div className="new-detail-page-wrapper">
            
//             {/* Nút giả lập để chuyển đổi trạng thái cho bạn test */}
//             <button className="dev-toggle-button" onClick={() => setIsUserParticipating(!isUserParticipating)}>
//                 Toggle Participation View ({isUserParticipating ? 'On' : 'Off'})
//             </button>

//             {/* Thanh menu bên trái */}
//             <aside className="new-detail-sidebar">
//                 <div className="sidebar-logo">
//                     GOMARKETS
//                 </div>
//                 {/* TournamentNav cần được cập nhật để chấp nhận 'Info' làm tab mặc định */}
//                 <TournamentNav activeItem={activeDetailTab} onClick={setActiveDetailTab} /> 
//                 <button onClick={onClose} className="sidebar-back-btn">
//                     &larr; Back to Arena
//                 </button>
//             </aside>

//             {/* Nội dung chính bên phải */}
//             <main className="unified-main-content">
//                 <div
//                     className="tournament-header-banner"
//                     style={{ backgroundImage: `url(${image || thumbnail})` }}
//                 >
//                     <div className="header-banner-overlay">
//                         <h1>{title || 'Tournament Detail'}</h1>
//                     </div>
//                 </div>
//                 <div className="unified-content-body">
//                     {renderContent()}
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default TournamentDetailPage;

import React, { useState, useEffect } from 'react';
import './TournamentDetailPage.css'; // Import file CSS mới

// Hàm helper để định dạng ngày tháng
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('vi-VN', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
    });
};

const TournamentDetailPage = ({ tournament: initialTournament, onClose }) => {
    const [tournament, setTournament] = useState(initialTournament);
    const [isLoading, setIsLoading] = useState(!initialTournament?.description); // Chỉ loading nếu chưa có dữ liệu chi tiết

    // useEffect để fetch dữ liệu chi tiết nếu nó chưa được truyền vào hoặc chưa đầy đủ
    useEffect(() => {
        // Chỉ fetch khi component được render lần đầu và chưa có dữ liệu chi tiết (vd: description)
        if (initialTournament?.id && !initialTournament.description) {
            const fetchDetails = async () => {
                console.log(`[LOG] Fetching full details for tournament ID: ${initialTournament.id}`);
                setIsLoading(true);
                try {
                    const response = await fetch(`https://f2farena.com/api/tournaments/${initialTournament.id}`);
                    if (!response.ok) throw new Error('Failed to fetch details');
                    const data = await response.json();
                    setTournament(data);
                } catch (error) {
                    console.error("Error fetching tournament details:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchDetails();
        }
    }, [initialTournament]);

    if (isLoading) {
        return <div className="static-detail-page-wrapper"><p style={{textAlign: 'center', paddingTop: '5rem'}}>Loading tournament details...</p></div>;
    }
    
    if (!tournament) {
        return <div className="static-detail-page-wrapper"><p style={{textAlign: 'center', paddingTop: '5rem'}}>Could not load tournament details.</p></div>;
    }

    const {
        title, creator_name, event_time, prize_pool, participants, max_participants,
        symbol, broker_name, description, prize_structure, rounds, thumbnail
    } = tournament;

    return (
        <div className="static-detail-page-wrapper">
            <header className="static-detail-header" style={{ backgroundImage: `url(${thumbnail})` }}>
                <div className="static-header-overlay"></div>
                <div className="static-header-content">
                    <h1>{title}</h1>
                    <p>By {creator_name} - Starts on {formatDate(event_time)}</p>
                </div>
            </header>

            <main className="static-detail-body">
                <div className="static-info-card">
                    <div className="static-info-item"><span>Prize Pool</span><strong className="prize">{prize_pool.toLocaleString()} USDT</strong></div>
                    <div className="static-info-item"><span>Participants</span><strong>{participants} / {max_participants}</strong></div>
                    <div className="static-info-item"><span>Symbol</span><strong className="symbol">{symbol}</strong></div>
                    <div className="static-info-item"><span>Broker</span><strong>{broker_name}</strong></div>
                </div>

                <div className="detail-section">
                    <h3>ℹ️ Description</h3>
                    <p>{description}</p>
                </div>

                <div className="detail-section">
                    <h3>🏆 Prize Structure</h3>
                    <div className="prize-structure-list">
                        {(prize_structure || []).map((prize, index) => (
                            <div key={index} className="prize-item">
                                <span>{prize.name} {prize.rank ? `(Rank ${prize.rank})` : ''}</span>
                                <strong>{prize.prize}</strong>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="detail-section">
                    <h3>📜 Rounds & Rules</h3>
                    <div className="rules-list">
                        {(rounds || []).map((round, index) => (
                            <div key={index} className="round-item">
                                <h4>{round.name}</h4>
                                <div className="round-details-grid">
                                    <div className="static-info-item"><span>Format</span><strong>{round.competition_format}</strong></div>
                                    <div className="static-info-item"><span>Match Duration</span><strong>{round.duration_minutes} min</strong></div>
                                    <div className="static-info-item"><span>Players Advance</span><strong>{round.advancement_count}</strong></div>
                                    <div className="static-info-item"><span>Matches / Player</span><strong>{round.matches_per_player}</strong></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <button onClick={onClose} className="static-back-btn">
                    &larr; Back
                </button>
            </main>
        </div>
    );
};

export default TournamentDetailPage;