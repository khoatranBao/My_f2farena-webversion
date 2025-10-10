// import React, { useState, useEffect } from 'react';
// import './ArenaPage.css';
// import CreateCupModal from '../create_cup_modal/CreateCupModal';
// import PrivateCupCard from './private_cup_page/PrivateCupCard.jsx';
// import OneVsOneMatchPage from './one_vs_one_page/OneVsOneMatchPage.jsx';
// import TournamentCard from '../tournament_card/TournamentCard.jsx';

// const TournamentList = ({ tournaments, isLoading, onViewDetails, countdownTimers, formatTime }) => {
//     const [activeTournamentTab, setActiveTournamentTab] = useState('all');

//     const getFilteredTournaments = () => {
//         if (!tournaments) return [];
//         switch (activeTournamentTab) {
//             case 'live':
//                 return tournaments.filter(t => t.status === 'ongoing' || t.status === 'live');
//             case 'demo':
//                 return []; 
//             case 'all':
//             default:
//                 return tournaments;
//         }
//     };

//     const tournamentsToShow = getFilteredTournaments();

//     return (
//         <div>
//             <div className="tournament-sub-nav">
//                 <button className={`sub-nav-btn ${activeTournamentTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTournamentTab('all')}>All</button>
//                 <button className={`sub-nav-btn ${activeTournamentTab === 'live' ? 'active' : ''}`} onClick={() => setActiveTournamentTab('live')}>Live</button>
//                 <button className={`sub-nav-btn ${activeTournamentTab === 'demo' ? 'active' : ''}`} onClick={() => setActiveTournamentTab('demo')}>Demo</button>
//             </div>

//             {isLoading ? (
//                 <div className="placeholder-content"><h3>Loading tournaments...</h3></div>
//             ) : tournamentsToShow.length > 0 ? (
//                 <div className="grid-container">
//                     {tournamentsToShow.map((t) =>
//                         <TournamentCard
//                             key={t.id}
//                             tournament={t}
//                             onViewDetails={onViewDetails}
//                             countdownTimers={countdownTimers}
//                             formatTime={formatTime}
//                         />
//                     )}
//                 </div>
//             ) : (
//                 <div className="placeholder-content"><h3>No tournaments available.</h3></div>
//             )}
//         </div>
//     );
// };

// const ArenaPage = ({ tournaments, countdownTimers, formatTime, onViewDetails, user, initialSubTab, setInitialSubTab }) => {
//     const [activeArenaTab, setActiveArenaTab] = useState(initialSubTab || 'tournament');
//     const [isCreateCupModalOpen, setIsCreateCupModalOpen] = useState(false);
    
//     const [privateCups, setPrivateCups] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     // ✅ THÊM MỚI: State để trigger việc tải lại dữ liệu
//     const [refreshTrigger, setRefreshTrigger] = useState(0);

//     useEffect(() => {
//         if (initialSubTab) {
//             setActiveArenaTab(initialSubTab);
//             setInitialSubTab(null);
//         }
//     }, [initialSubTab, setInitialSubTab]);

//     // ✅ SỬA ĐỔI: Thêm `refreshTrigger` vào dependency array
//     useEffect(() => {
//         const loadDataForTab = async () => {
//             if (activeArenaTab !== 'private_cup') {
//                 setIsLoading(false);
//                 return;
//             }

//             setIsLoading(true);
//             const endpoint = 'https://f2farena.com/api/tournaments/?type=private';

//             try {
//                 const response = await fetch(endpoint);
//                 if (!response.ok) throw new Error(`API for tab ${activeArenaTab} failed`);
//                 const apiData = await response.json();
//                 setPrivateCups(apiData);
//             } catch (error) {
//                 console.error(`❌ [ERROR] ArenaPage: Lỗi khi tải dữ liệu cho tab ${activeArenaTab}:`, error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         loadDataForTab();
//     }, [activeArenaTab, refreshTrigger]); // Chạy lại khi refreshTrigger thay đổi

//     // ✅ THÊM MỚI: Hàm được gọi khi tạo cup thành công
//     const handleCupCreated = () => {
//         setIsCreateCupModalOpen(false); // Đóng modal
//         setRefreshTrigger(prev => prev + 1); // Kích hoạt tải lại danh sách
//         alert("Private Cup created successfully!");
//     };

//     const renderArenaContent = () => {
//         switch (activeArenaTab) {
//             case 'tournament':
//                 return <TournamentList 
//                             tournaments={tournaments}
//                             isLoading={tournaments.length === 0}
//                             onViewDetails={onViewDetails}
//                             countdownTimers={countdownTimers}
//                             formatTime={formatTime}
//                         />;
//             case 'private_cup':
//                 return (
//                     <>
//                         <div className="arena-page-header">
//                             <h3>Private Cups</h3>
//                             <button className="create-cup-btn" onClick={() => setIsCreateCupModalOpen(true)}>+ Create Cup</button>
//                         </div>
//                         {isLoading ? (
//                             <div className="placeholder-content"><h3>Loading private cups...</h3></div>
//                         ) : (
//                             <div className="private-cup-grid">
//                                 {privateCups.map(cup => 
//                                     <PrivateCupCard 
//                                         key={cup.id} 
//                                         cup={cup} 
//                                         onViewDetails={onViewDetails}
//                                     />
//                                 )}
//                             </div>
//                         )}
//                     </>
//                 );
//             case '1v1_match':
//                 return <OneVsOneMatchPage user={user} />; 
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="arena-page">
//             {/* ✅ SỬA ĐỔI: Truyền `user` và hàm `onCupCreated` xuống modal */}
//             <CreateCupModal 
//                 isOpen={isCreateCupModalOpen} 
//                 onClose={() => setIsCreateCupModalOpen(false)}
//                 onCupCreated={handleCupCreated}
//                 user={user}
//             />
            
//             <aside className="arena-sidebar">
//                 <h1>Arena</h1>
//                 <nav className="arena-sidebar-nav">
//                     <button className={`arena-sidebar-btn ${activeArenaTab === 'tournament' ? 'active' : ''}`} onClick={() => setActiveArenaTab('tournament')}>Tournament</button>
//                     <button className={`arena-sidebar-btn ${activeArenaTab === 'private_cup' ? 'active' : ''}`} onClick={() => setActiveArenaTab('private_cup')}>Private Cup</button>
//                     <button className={`arena-sidebar-btn ${activeArenaTab === '1v1_match' ? 'active' : ''}`} onClick={() => setActiveArenaTab('1v1_match')}>1 vs 1 Match</button>
//                 </nav>
//             </aside>
            
//             <main className="arena-main-content">
//                 {renderArenaContent()}
//             </main>
//         </div>
//     );
// };

// export default ArenaPage;

import React, { useState, useEffect } from 'react';
import './ArenaPage.css';
import CreateCupModal from '../create_cup_modal/CreateCupModal';
import PrivateCupCard from './private_cup_page/PrivateCupCard.jsx';
import OneVsOneMatchPage from './one_vs_one_page/OneVsOneMatchPage.jsx';
import TournamentCard from '../tournament_card/TournamentCard.jsx';

const TournamentList = ({ tournaments, isLoading, onViewDetails, countdownTimers, formatTime }) => {
    const [activeTournamentTab, setActiveTournamentTab] = useState('all');

    const getFilteredTournaments = () => {
        if (!tournaments) return [];
        switch (activeTournamentTab) {
            case 'live':
                return tournaments.filter(t => t.status === 'ongoing' || t.status === 'live');
            case 'demo':
                return []; 
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
                            onViewDetails={onViewDetails}
                            countdownTimers={countdownTimers}
                            formatTime={formatTime}
                        />
                    )}
                </div>
            ) : (
                <div className="placeholder-content"><h3>No tournaments available.</h3></div>
            )}
        </div>
    );
};

const ArenaPage = ({ tournaments, countdownTimers, formatTime, onViewDetails, user, initialSubTab, setInitialSubTab }) => {
    const [activeArenaTab, setActiveArenaTab] = useState(initialSubTab || 'tournament');
    const [isCreateCupModalOpen, setIsCreateCupModalOpen] = useState(false);
    
    const [privateCups, setPrivateCups] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        if (initialSubTab) {
            setActiveArenaTab(initialSubTab);
            setInitialSubTab(null);
        }
    }, [initialSubTab, setInitialSubTab]);

    useEffect(() => {
        const loadDataForTab = async () => {
            if (activeArenaTab !== 'private_cup') {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            const endpoint = 'https://f2farena.com/api/tournaments/?type=private';

            try {
                const response = await fetch(endpoint);
                if (!response.ok) throw new Error(`API for tab ${activeArenaTab} failed`);
                const apiData = await response.json();
                setPrivateCups(apiData);
            } catch (error) {
                console.error(`❌ [ERROR] ArenaPage: Lỗi khi tải dữ liệu cho tab ${activeArenaTab}:`, error);
            } finally {
                setIsLoading(false);
            }
        };

        loadDataForTab();
    }, [activeArenaTab, refreshTrigger]);

    const handleCupCreated = () => {
        setIsCreateCupModalOpen(false);
        setRefreshTrigger(prev => prev + 1);
        alert("Private Cup created successfully!");
    };

    const renderArenaContent = () => {
        switch (activeArenaTab) {
            case 'tournament':
                return <TournamentList 
                            tournaments={tournaments}
                            isLoading={tournaments.length === 0}
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
                onCupCreated={handleCupCreated}
                user={user}
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

