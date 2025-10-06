import React, { useState, useEffect } from 'react';
import './ArenaPage.css';

// Import các component con cần thiết
import CreateCupModal from '../create_cup_modal/CreateCupModal';
import PrivateCupCard from './private_cup_page/PrivateCupCard.jsx';
import OneVsOneMatchPage from './one_vs_one_page/OneVsOneMatchPage.jsx'; // Sửa đổi để tích hợp trực tiếp
import TournamentCard from '../tournament_card/TournamentCard.jsx';

// --- COMPONENT CHO TAB TOURNAMENT (Official) ---
const TournamentList = ({ tournaments, isLoading, onViewDetails, countdownTimers, formatTime }) => {
    const [activeTournamentTab, setActiveTournamentTab] = useState('all');

    const getFilteredTournaments = () => {
        if (!tournaments) return [];
        switch (activeTournamentTab) {
            case 'live':
                return tournaments.filter(t => t.status === 'ongoing');
            case 'demo':
                return []; // Logic cho demo sẽ được thêm sau
            case 'all':
            default:
                return tournaments;
        }
    };

    const tournamentsToShow = getFilteredTournaments();

    return (
        <div>
            <div className="tournament-sub-nav">
                <button className={`sub-nav-btn ${activeTournamentTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTournamentTab('all')}>All</button>
                <button className={`sub-nav-btn ${activeTournamentTab === 'live' ? 'active' : ''}`} onClick={() => setActiveTournamentTab('live')}>Live</button>
                <button className={`sub-nav-btn ${activeTournamentTab === 'demo' ? 'active' : ''}`} onClick={() => setActiveTournamentTab('demo')}>Demo</button>
            </div>

            {isLoading ? (
                <div className="placeholder-content"><h3>Loading tournaments...</h3></div>
            ) : tournamentsToShow.length > 0 ? (
                <div className="grid-container">
                    {tournamentsToShow.map((t) =>
                        <TournamentCard
                            key={t.id}
                            tournament={t}
                            timer={formatTime(countdownTimers[t.name] || 0)}
                            onViewDetails={onViewDetails}
                        />
                    )}
                </div>
            ) : (
                <div className="placeholder-content"><h3>No tournaments available.</h3></div>
            )}
        </div>
    );
};

// --- COMPONENT CHÍNH CỦA TRANG ARENA ---
// ✨ THÊM `user` VÀO PROPS
const ArenaPage = ({ onViewDetails, countdownTimers, formatTime, user }) => {
    // --- State Management ---
    const [activeArenaTab, setActiveArenaTab] = useState('tournament');
    const [isCreateCupModalOpen, setIsCreateCupModalOpen] = useState(false);
    
    const [tournaments, setTournaments] = useState([]);
    const [privateCups, setPrivateCups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // --- Data Fetching ---
    useEffect(() => {
        const loadDataForTab = async () => {
            setIsLoading(true);

            // ✨ LOGIC MỚI CHO 1v1 SẼ ĐƯỢC XỬ LÝ TRONG COMPONENT `OneVsOneMatchPage`
            if (activeArenaTab === '1v1_match') {
                setIsLoading(false); // Component con sẽ tự quản lý loading của nó
                return;
            }

            let endpoint = '';
            if (activeArenaTab === 'tournament') {
                endpoint = 'https://f2farena.com/api/tournaments/?type=official';
            } else if (activeArenaTab === 'private_cup') {
                endpoint = 'https://f2farena.com/api/tournaments/?type=private';
            } else {
                setIsLoading(false);
                return;
            }

            console.log(`[LOG] ArenaPage: Bắt đầu gọi API cho tab '${activeArenaTab}' tại endpoint: ${endpoint}`);
            try {
                const response = await fetch(endpoint);
                if (!response.ok) {
                    throw new Error(`API for tab ${activeArenaTab} failed with status ${response.status}`);
                }
                const apiData = await response.json();
                console.log(`[LOG] ArenaPage: Đã nhận được dữ liệu gốc từ API cho tab '${activeArenaTab}':`, apiData);

                if (activeArenaTab === 'tournament') {
                    const formattedData = apiData.map(item => ({
                        id: item.id,
                        name: item.title,
                        image: item.thumbnail,
                        prize: `${(item.prize_pool || 0).toLocaleString()} USDT`,
                        participants: item.participants,
                        startTimeUTC: item.event_time,
                        endTimeUTC: item.end_time,
                        status: item.status,
                    }));
                    setTournaments(formattedData);
                    console.log(`[LOG] ArenaPage: Đã định dạng lại dữ liệu cho tab 'tournament'.`);
                } else {
                    setPrivateCups(apiData);
                    console.log(`[LOG] ArenaPage: Đã gán dữ liệu gốc cho tab 'private_cup'.`);
                }

                console.log(`✅ [SUCCESS] ArenaPage: Tải dữ liệu cho tab '${activeArenaTab}' thành công.`);
            } catch (error) {
                console.error(`❌ [ERROR] ArenaPage: Lỗi khi tải dữ liệu:`, error);
            } finally {
                setIsLoading(false);
            }
        };

        loadDataForTab();
    }, [activeArenaTab]);


    const handleCreateCup = (newCupData) => {
        console.log("Creating new cup:", newCupData);
        setIsCreateCupModalOpen(false);
    };

    // --- Rendering Logic ---
    const renderArenaContent = () => {
        switch (activeArenaTab) {
            case 'tournament':
                return <TournamentList 
                            tournaments={tournaments}
                            isLoading={isLoading}
                            onViewDetails={onViewDetails} 
                            countdownTimers={countdownTimers} 
                            formatTime={formatTime} 
                        />;
            case 'private_cup':
                return ( 
                    <>
                        <div className="arena-page-header">
                            <h3>Private Cups</h3>
                            <button className="create-cup-btn" onClick={() => setIsCreateCupModalOpen(true)}>+ Create Cup</button>
                        </div>
                        {isLoading ? (
                            <div className="placeholder-content"><h3>Loading private cups...</h3></div>
                        ) : (
                            <div className="private-cup-grid">
                                {privateCups.map(cup => 
                                    <PrivateCupCard 
                                        key={cup.id} 
                                        cup={cup} 
                                        onViewDetails={onViewDetails}
                                    />
                                )}
                            </div>
                        )}
                    </>
                );
            
            case '1v1_match':
                // ✨ GỌI COMPONENT MỚI VÀ TRUYỀN `user` XUỐNG
                return <OneVsOneMatchPage user={user} />; 
            
            default:
                return null;
        }
    };
 
    return (
        <div className="arena-page">
            <CreateCupModal 
                isOpen={isCreateCupModalOpen} 
                onClose={() => setIsCreateCupModalOpen(false)}
                onCreateCup={handleCreateCup}
            />
            
            <aside className="arena-sidebar">
                <h1>Arena</h1>
                <nav className="arena-sidebar-nav">
                    <button className={`arena-sidebar-btn ${activeArenaTab === 'tournament' ? 'active' : ''}`} onClick={() => setActiveArenaTab('tournament')}>Tournament</button>
                    <button className={`arena-sidebar-btn ${activeArenaTab === 'private_cup' ? 'active' : ''}`} onClick={() => setActiveArenaTab('private_cup')}>Private Cup</button>
                    <button className={`arena-sidebar-btn ${activeArenaTab === '1v1_match' ? 'active' : ''}`} onClick={() => setActiveArenaTab('1v1_match')}>1 vs 1 Match</button>
                </nav>
            </aside>
            
            <main className="arena-main-content">
                {renderArenaContent()}
            </main>
        </div>
    );
};

export default ArenaPage;