// import React, { useState, useEffect } from 'react';
// import './ArenaPage.css';

// // Import các component con cần thiết
// import CreateCupModal from '../create_cup_modal/CreateCupModal';
// import PrivateCupCard from './private_cup_page/PrivateCupCard.jsx';
// import OneVsOneMatchPage from './one_vs_one_page/OneVsOneMatchPage.jsx';
// import TournamentCard from '../tournament_card/TournamentCard.jsx';

// // --- COMPONENT CHO TAB TOURNAMENT (Official) ---
// const TournamentList = ({ tournaments, isLoading, onViewDetails, currentTime }) => {
//     const [activeTournamentTab, setActiveTournamentTab] = useState('all');

//     const getFilteredTournaments = () => {
//         if (!tournaments) return [];
//         switch (activeTournamentTab) {
//             case 'live':
//                 return tournaments.filter(t => t.status === 'ongoing');
//             case 'demo':
//                 return []; // Logic cho demo sẽ được thêm sau
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
//                             currentTime={currentTime}
//                         />
//                     )}
//                 </div>
//             ) : (
//                 <div className="placeholder-content"><h3>No tournaments available.</h3></div>
//             )}
//         </div>
//     );
// };

// // --- COMPONENT CHÍNH CỦA TRANG ARENA ---
// // NHẬN PROP MỚI `initialTab`
// const ArenaPage = ({ onViewDetails, currentTime, user, initialTab }) => {
//     // Khởi tạo state với giá trị mặc định
//     const [activeArenaTab, setActiveArenaTab] = useState('tournament');
//     const [isCreateCupModalOpen, setIsCreateCupModalOpen] = useState(false);
    
//     const [tournaments, setTournaments] = useState([]);
//     const [privateCups, setPrivateCups] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
    
//     // THÊM useEffect MỚI: Tự động cập nhật tab khi prop `initialTab` thay đổi
//     useEffect(() => {
//         if (initialTab) {
//             setActiveArenaTab(initialTab);
//         }
//     }, [initialTab]); // Chạy lại mỗi khi initialTab thay đổi

//     useEffect(() => {
//         const loadDataForTab = async () => {
//             setIsLoading(true);

//             if (activeArenaTab === '1v1_match') {
//                 setIsLoading(false);
//                 return;
//             }

//             let endpoint = '';
//             if (activeArenaTab === 'tournament') {
//                 endpoint = 'https://f2farena.com/api/tournaments/?type=official';
//             } else if (activeArenaTab === 'private_cup') {
//                 endpoint = 'https://f2farena.com/api/tournaments/?type=private';
//             } else {
//                 setIsLoading(false);
//                 return;
//             }

//             try {
//                 const response = await fetch(endpoint);
//                 if (!response.ok) {
//                     throw new Error(`API for tab ${activeArenaTab} failed with status ${response.status}`);
//                 }
//                 const apiData = await response.json();

//                 if (activeArenaTab === 'tournament') {
//                     const formattedData = apiData.map(item => ({
//                         id: item.id,
//                         name: item.title,
//                         image: item.thumbnail,
//                         prize: `${(item.prize_pool || 0).toLocaleString()} USDT`,
//                         participants: item.participants,
//                         startTimeUTC: item.event_time,
//                         endTimeUTC: item.end_time,
//                         status: item.status,
//                     }));
//                     setTournaments(formattedData);
//                 } else {
//                     setPrivateCups(apiData);
//                 }

//             } catch (error) {
//                 console.error(`❌ [ERROR] ArenaPage: Lỗi khi tải dữ liệu:`, error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         loadDataForTab();
//     }, [activeArenaTab]);


//     const handleCreateCup = (newCupData) => {
//         console.log("Creating new cup:", newCupData);
//         setIsCreateCupModalOpen(false);
//     };

//     const renderArenaContent = () => {
//         switch (activeArenaTab) {
//             case 'tournament':
//                 return <TournamentList 
//                             tournaments={tournaments}
//                             isLoading={isLoading}
//                             onViewDetails={onViewDetails}
//                             currentTime={currentTime}
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
//                                         currentTime={currentTime}
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
//             <CreateCupModal 
//                 isOpen={isCreateCupModalOpen} 
//                 onClose={() => setIsCreateCupModalOpen(false)}
//                 onCreateCup={handleCreateCup}
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

// Component con cho tab Tournament (Official)
// Nó sẽ nhận dữ liệu đã được xử lý từ ArenaPage
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
                            countdownTimers={countdownTimers} // Truyền xuống
                            formatTime={formatTime}       // Truyền xuống
                        />
                    )}
                </div>
            ) : (
                <div className="placeholder-content"><h3>No tournaments available.</h3></div>
            )}
        </div>
    );
};

// Component chính của trang Arena
// Giờ đây nó nhận `tournaments` và các props thời gian từ App.jsx
const ArenaPage = ({ tournaments, countdownTimers, formatTime, onViewDetails, user, initialSubTab, setInitialSubTab }) => {
    const [activeArenaTab, setActiveArenaTab] = useState(initialSubTab || 'tournament');
    const [isCreateCupModalOpen, setIsCreateCupModalOpen] = useState(false);
    
    const [privateCups, setPrivateCups] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    // Đồng bộ hóa tab nếu có thay đổi từ bên ngoài (ví dụ: footer)
    useEffect(() => {
        if (initialSubTab) {
            setActiveArenaTab(initialSubTab);
            setInitialSubTab(null); // Reset lại để không bị kẹt
        }
    }, [initialSubTab, setInitialSubTab]);


    useEffect(() => {
        const loadDataForTab = async () => {
            // Chỉ fetch data cho các tab không phải là 'tournament'
            if (activeArenaTab === 'tournament' || activeArenaTab === '1v1_match') {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            let endpoint = '';
            if (activeArenaTab === 'private_cup') {
                endpoint = 'https://f2farena.com/api/tournaments/?type=private';
            } else {
                setIsLoading(false);
                return;
            }

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
    }, [activeArenaTab]);


    const handleCreateCup = (newCupData) => {
        console.log("Creating new cup:", newCupData);
        setIsCreateCupModalOpen(false);
    };

    const renderArenaContent = () => {
        switch (activeArenaTab) {
            case 'tournament':
                // Truyền thẳng `tournaments` và các props thời gian từ App.jsx xuống
                return <TournamentList 
                            tournaments={tournaments}
                            isLoading={tournaments.length === 0} // Loading nếu chưa có tournaments
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

