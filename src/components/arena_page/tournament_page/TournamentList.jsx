// import React, { useState, useEffect } from 'react';
// import TournamentCard from '../../tournament_card/TournamentCard.jsx';
// import { fetchTournaments } from '../../../api/tournaments.js';

// const TournamentList = ({ onViewDetails, countdownTimers, formatTime }) => {
//     const [tournaments, setTournaments] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [activeTournamentTab, setActiveTournamentTab] = useState('all');

//     useEffect(() => {
//         const loadTournaments = async () => {
//             setIsLoading(true);
//             const data = await fetchTournaments();
//             setTournaments(data);
//             setIsLoading(false);
//         };
//         loadTournaments();
//     }, []);

//     const getFilteredTournaments = () => {
//         const now = new Date();
//         switch (activeTournamentTab) {
//             case 'live':
//                 return tournaments.filter(t => new Date(t.startTimeUTC) <= now && new Date(t.endTimeUTC) > now);
//             case 'demo':
//                 return []; // Chưa có dữ liệu demo
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
//                             key={t.name}
//                             tournament={t}
//                             timer={formatTime(countdownTimers[t.name] || 0)}
//                             onViewDetails={onViewDetails}
//                         />
//                     )}
//                 </div>
//             ) : (
//                 <div className="placeholder-content"><h3>No tournaments available.</h3></div>
//             )}
//         </div>
//     );
// };

// export default TournamentList;


import React, { useState, useEffect } from 'react';
import TournamentCard from '../../tournament_card/TournamentCard.jsx';
// [XÓA BỎ] Không dùng API giả nữa
// import { fetchTournaments } from '../../../api/tournaments.js';

const TournamentList = ({ onViewDetails, countdownTimers, formatTime }) => {
    const [tournaments, setTournaments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTournamentTab, setActiveTournamentTab] = useState('all');

    // [CHỈNH SỬA] Cập nhật useEffect để gọi API thật
    useEffect(() => {
        const loadTournaments = async () => {
            setIsLoading(true);
            console.log("📝 [INFO] TournamentList: Bắt đầu lấy dữ liệu 'Official' tournaments...");
            try {
                // Gọi đến API thật cho các giải đấu official
                const response = await fetch('https://f2farena.com/api/tournaments/?type=official');
                if (!response.ok) {
                    throw new Error(`API Official Tournaments failed with status ${response.status}`);
                }
                const apiData = await response.json();
                console.log("[INFO] TournamentList: Dữ liệu gốc từ API:", apiData);

                // Đồng nhất dữ liệu để tương thích với TournamentCard
                const formattedData = apiData.map(item => ({
                    id: item.id,
                    name: item.title,
                    prize: `${(item.prize_pool || 0).toLocaleString('en-US')} USDT`,
                    participants: item.participants,
                    image: item.thumbnail,
                    startTimeUTC: item.event_time,
                    endTimeUTC: item.end_time,
                    status: item.status,
                }));
                console.log("[INFO] TournamentList: Dữ liệu sau khi đồng nhất:", formattedData);

                setTournaments(formattedData);
                console.log("✅ [SUCCESS] TournamentList: Tải dữ liệu thành công.");
            } catch (error) {
                console.error("❌ [ERROR] TournamentList: Lỗi khi tải dữ liệu:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadTournaments();
    }, []); // <-- Dependency array rỗng sẽ đảm bảo code chỉ chạy 1 LẦN, không bị lặp lại

    const getFilteredTournaments = () => {
        const now = new Date();
        switch (activeTournamentTab) {
            case 'live':
                // Dùng `status` từ API để lọc chính xác hơn
                return tournaments.filter(t => t.status === 'ongoing');
            case 'demo':
                return []; // Chưa có dữ liệu demo
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
                            key={t.id} // Dùng ID cho key sẽ tốt hơn
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

export default TournamentList;