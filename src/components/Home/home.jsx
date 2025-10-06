// import React, { useState, useEffect } from 'react';
// import './home.css';

// // ✅ BƯỚC 1: Import các hàm API
// import { fetchTournaments } from '../../api/tournaments.js';
// import { fetchLiveMatches } from '../../api/matches.js';

// // Import các component con
// import TournamentCard from '../tournament_card/TournamentCard.jsx';
// import LiveMatchCard from './LiveMatchCard.jsx';

// // --- ICONS (vẫn giữ lại vì chúng là một phần của UI) ---
// const LiveIconNew = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-red animate-pulse" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M12 1.5a1.05 1.05 0 100 2.1 1.05 1.05 0 000-2.1zM10.23 15.795a.75.75 0 001.06 0l4.5-4.5a.75.75 0 00-1.06-1.06L11.25 13.19l-1.97-1.97a.75.75 0 00-1.06 1.06l2.5 2.5z" clipRule="evenodd" /></svg> );
// const UpcomingTournamentIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon icon-blue"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" /></svg> );
// const LiveMatchIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon icon-red"><path d="M4.5 9.75a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM12 9.75a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM19.5 9.75a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM4.5 16.5a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM12 16.5a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM19.5 16.5a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5z" /></svg> );


// const Home = ({ onlinePlayers, countdownTimers, formatTime, setViewingTournament }) => {
//     // ✅ BƯỚC 2: Thêm state để lưu dữ liệu từ API
//     const [allTournaments, setAllTournaments] = useState([]);
//     const [liveMatches, setLiveMatches] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     const [visibleLiveTournaments, setVisibleLiveTournaments] = useState(3);
//     const [visibleUpcomingTournaments, setVisibleUpcomingTournaments] = useState(3);
    
//     // ✅ BƯỚC 3: Dùng useEffect để gọi đồng thời nhiều API
//     useEffect(() => {
//         const loadAllHomeData = async () => {
//             setIsLoading(true);
//             try {
//                 // Gọi đồng thời các API để tăng tốc độ tải
//                 const [tournamentsData, matchesData] = await Promise.all([
//                     fetchTournaments(),
//                     fetchLiveMatches()
//                 ]);
//                 setAllTournaments(tournamentsData);
//                 setLiveMatches(matchesData);
//             } catch (error) {
//                 console.error("Lỗi khi tải dữ liệu trang Home:", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         loadAllHomeData();
//     }, []);

//     const now = new Date();
//     const liveTournaments = allTournaments.filter(t => new Date(t.startTimeUTC) <= now && new Date(t.endTimeUTC) > now);
//     const upcomingTournaments = allTournaments.filter(t => new Date(t.startTimeUTC) > now);

//     if (isLoading) {
//         return <div className="placeholder-content"><h1>Loading data...</h1></div>;
//     }

//     return (
//         <div className="home-container">
//             <div>
//                 <div className="section-header">
//                     <LiveIconNew />
//                     <h2>Live Tournaments</h2>
//                 </div>
//                 <div className="grid-container">
//                     {liveTournaments.slice(0, visibleLiveTournaments).map((t) =>
//                         <TournamentCard key={`live-${t.name}`} tournament={t} countdownTimers={countdownTimers} formatTime={formatTime} onViewDetails={setViewingTournament} />
//                     )}
//                 </div>
//                 {liveTournaments.length > visibleLiveTournaments && (
//                     <div className="view-more-container">
//                         <button onClick={() => setVisibleLiveTournaments(liveTournaments.length)} className="view-more-btn">View More</button>
//                     </div>
//                 )}
//             </div>

//             <div className="online-players-banner">
//                 <div className="text-center">
//                     <h3>PLAYERS ONLINE</h3>
//                     <p>{onlinePlayers.toLocaleString()}</p>
//                 </div>
//             </div>

//             <div>
//                 <div className="section-header">
//                     <UpcomingTournamentIcon />
//                     <h2>Upcoming Tournaments</h2>
//                 </div>
//                 <div className="grid-container">
//                     {upcomingTournaments.slice(0, visibleUpcomingTournaments).map((t) =>
//                         <TournamentCard key={`upcoming-${t.name}`} tournament={t} countdownTimers={countdownTimers} formatTime={formatTime} onViewDetails={setViewingTournament} />
//                     )}
//                 </div>
//                 {upcomingTournaments.length > visibleUpcomingTournaments && (
//                     <div className="view-more-container">
//                         <button onClick={() => setVisibleUpcomingTournaments(upcomingTournaments.length)} className="view-more-btn">View More</button>
//                     </div>
//                 )}
//             </div>

//             <div>
//                 <div className="section-header">
//                     <LiveMatchIcon />
//                     <h2>Live Matches</h2>
//                 </div>
//                 <div className="live-match-grid">
//                     {liveMatches.map((match, index) => (
//                         <LiveMatchCard key={index} match={match} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;
import React, { useState, useEffect } from 'react';
import './home.css';

// [XÓA BỎ] Không cần import các hàm API cũ từ file riêng nữa
// import { fetchTournaments } from '../../api/tournaments.js';
// import { fetchLiveMatches } from '../../api/matches.js';

// Import các component con của bạn vẫn được giữ nguyên
import TournamentCard from '../tournament_card/TournamentCard.jsx';
import LiveMatchCard from './LiveMatchCard.jsx';

// --- ICONS (giữ nguyên) ---
const LiveIconNew = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-red animate-pulse" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M12 1.5a1.05 1.05 0 100 2.1 1.05 1.05 0 000-2.1zM10.23 15.795a.75.75 0 001.06 0l4.5-4.5a.75.75 0 00-1.06-1.06L11.25 13.19l-1.97-1.97a.75.75 0 00-1.06 1.06l2.5 2.5z" clipRule="evenodd" /></svg> );
const UpcomingTournamentIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon icon-blue"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" /></svg> );
const LiveMatchIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon icon-red"><path d="M4.5 9.75a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM12 9.75a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM19.5 9.75a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM4.5 16.5a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM12 16.5a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM19.5 16.5a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5z" /></svg> );


const Home = ({ onlinePlayers, countdownTimers, formatTime, setViewingTournament }) => {
    const [allTournaments, setAllTournaments] = useState([]);
    const [liveMatches, setLiveMatches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [visibleLiveTournaments, setVisibleLiveTournaments] = useState(3);
    const [visibleUpcomingTournaments, setVisibleUpcomingTournaments] = useState(3);
    
    // [CHỈNH SỬA] Dùng useEffect để gọi API thật và đồng nhất dữ liệu
    useEffect(() => {
        const loadAllHomeData = async () => {
            setIsLoading(true);
            console.log("📝 [INFO] Home.jsx: Bắt đầu lấy dữ liệu Tournaments và Live Matches từ API...");
            try {
                // Gọi đồng thời các API để tăng tốc độ tải
                const [tournamentsRes, matchesRes] = await Promise.all([
                    fetch('https://f2farena.com/api/tournaments/?offset=0&limit=5'),
                    fetch('https://f2farena.com/api/matches/active').then(res => res.json()) // Giả định API cho matches
                ]);

                if (!tournamentsRes.ok) {
                    console.warn(`⚠️ [WARN] API Tournaments trả về lỗi! Status: ${tournamentsRes.status}`);
                    throw new Error('API request for tournaments failed');
                }

                const tournamentsData = await tournamentsRes.json();
                console.log("[INFO] Dữ liệu Tournaments gốc từ API:", tournamentsData);
                
                // --- BƯỚC ĐỒNG NHẤT DỮ LIỆU ---
                const formattedTournaments = tournamentsData.map(apiTournament => {
                    return {
                        id: apiTournament.id, // Giữ lại id
                        name: apiTournament.title, // title -> name
                        prize: `${apiTournament.prize_pool.toLocaleString('en-US')} USDT`, // prize_pool -> prize (định dạng lại)
                        participants: apiTournament.participants, // Giữ nguyên
                        image: apiTournament.thumbnail, // thumbnail -> image
                        startTimeUTC: apiTournament.event_time, // event_time -> startTimeUTC
                        endTimeUTC: apiTournament.end_time, // end_time -> endTimeUTC
                        // Giữ lại các trường hữu ích khác từ API
                        status: apiTournament.status, 
                        timeRemaining: apiTournament.timeRemaining
                    };
                });
                console.log("[INFO] Dữ liệu Tournaments sau khi đồng nhất:", formattedTournaments);

                setAllTournaments(formattedTournaments);
                setLiveMatches(matchesRes); // Giả định matchesData đã đúng định dạng
                
                console.log("✅ [SUCCESS] Home.jsx: Đã tải và đồng nhất dữ liệu thành công.");

            } catch (error) {
                console.error("❌ [ERROR] Lỗi khi tải dữ liệu trang Home:", error);
                setAllTournaments([]);
                setLiveMatches([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadAllHomeData();
    }, []);

    const now = new Date();
    // Logic lọc không cần thay đổi vì dữ liệu đã được đồng nhất
    const liveTournaments = allTournaments.filter(t => new Date(t.startTimeUTC) <= now && new Date(t.endTimeUTC) > now);
    const upcomingTournaments = allTournaments.filter(t => new Date(t.startTimeUTC) > now);

    if (isLoading) {
        return <div className="placeholder-content"><h1>Loading data...</h1></div>;
    }

    return (
        <div className="home-container">
            {/* Phần giao diện không cần thay đổi vì dữ liệu đã được đồng nhất */}
            <div>
                <div className="section-header">
                    <LiveIconNew />
                    <h2>Live Tournaments</h2>
                </div>
                <div className="grid-container">
                    {liveTournaments.slice(0, visibleLiveTournaments).map((t) =>
                        <TournamentCard key={`live-${t.name}`} tournament={t} countdownTimers={countdownTimers} formatTime={formatTime} onViewDetails={setViewingTournament} />
                    )}
                </div>
                {liveTournaments.length > visibleLiveTournaments && (
                    <div className="view-more-container">
                        <button onClick={() => setVisibleLiveTournaments(liveTournaments.length)} className="view-more-btn">View More</button>
                    </div>
                )}
            </div>

            <div className="online-players-banner">
                <div className="text-center">
                    <h3>PLAYERS ONLINE</h3>
                    <p>{onlinePlayers.toLocaleString()}</p>
                </div>
            </div>

            <div>
                <div className="section-header">
                    <UpcomingTournamentIcon />
                    <h2>Upcoming Tournaments</h2>
                </div>
                <div className="grid-container">
                    {upcomingTournaments.slice(0, visibleUpcomingTournaments).map((t) =>
                        <TournamentCard key={`upcoming-${t.name}`} tournament={t} countdownTimers={countdownTimers} formatTime={formatTime} onViewDetails={setViewingTournament} />
                    )}
                </div>
                {upcomingTournaments.length > visibleUpcomingTournaments && (
                    <div className="view-more-container">
                        <button onClick={() => setVisibleUpcomingTournaments(upcomingTournaments.length)} className="view-more-btn">View More</button>
                    </div>
                )}
            </div>

            <div>
                <div className="section-header">
                    <LiveMatchIcon />
                    <h2>Live Matches</h2>
                </div>
                <div className="live-match-grid">
                    {liveMatches.map((match, index) => (
                        <LiveMatchCard key={index} match={match} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;