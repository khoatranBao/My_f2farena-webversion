// import React, { useState, useEffect } from 'react';
// import './home.css';

// import TournamentCard from '../tournament_card/TournamentCard.jsx';
// import LiveMatchCard from './LiveMatchCard.jsx';

// // --- ICONS ---
// const LiveIconNew = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-red animate-pulse" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M12 1.5a1.05 1.05 0 100 2.1 1.05 1.05 0 000-2.1zM10.23 15.795a.75.75 0 001.06 0l4.5-4.5a.75.75 0 00-1.06-1.06L11.25 13.19l-1.97-1.97a.75.75 0 00-1.06 1.06l2.5 2.5z" clipRule="evenodd" /></svg> );
// const UpcomingTournamentIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon icon-blue"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" /></svg> );
// const LiveMatchIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon icon-red"><path d="M4.5 9.75a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM12 9.75a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM19.5 9.75a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM4.5 16.5a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM12 16.5a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM19.5 16.5a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5z" /></svg> );

// // ✅ NHẬN `onViewDetails` VÀ `currentTime` TỪ APP.JSX
// const Home = ({ onlinePlayers, onViewDetails, currentTime }) => {
//     const [allTournaments, setAllTournaments] = useState([]);
//     const [liveMatches, setLiveMatches] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [visibleLiveTournaments, setVisibleLiveTournaments] = useState(3);
//     const [visibleUpcomingTournaments, setVisibleUpcomingTournaments] = useState(3);
    
//     useEffect(() => {
//         const loadAllHomeData = async () => {
//             setIsLoading(true);
//             try {
//                 const [tournamentsRes, matchesRes] = await Promise.all([
//                     fetch('https://f2farena.com/api/tournaments/?offset=0&limit=5'),
//                     fetch('https://f2farena.com/api/matches/active').then(res => res.json())
//                 ]);

//                 if (!tournamentsRes.ok) throw new Error('API request for tournaments failed');
//                 const tournamentsData = await tournamentsRes.json();
                
//                 const formattedTournaments = tournamentsData.map(apiTournament => ({
//                     id: apiTournament.id,
//                     name: apiTournament.title,
//                     prize: `${(apiTournament.prize_pool || 0).toLocaleString('en-US')} USDT`,
//                     participants: apiTournament.participants,
//                     image: apiTournament.thumbnail,
//                     startTimeUTC: apiTournament.event_time,
//                     endTimeUTC: apiTournament.end_time,
//                     status: apiTournament.status, 
//                 }));
//                 setAllTournaments(formattedTournaments);
//                 setLiveMatches(matchesRes);
//             } catch (error) {
//                 console.error("❌ [ERROR] Lỗi khi tải dữ liệu trang Home:", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         loadAllHomeData();
//     }, []);

//     const liveTournaments = allTournaments.filter(t => t.status === 'live' || t.status === 'ongoing');
//     const upcomingTournaments = allTournaments.filter(t => t.status === 'upcoming');

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
//                         // ✅ TRUYỀN `onViewDetails` VÀ `currentTime` XUỐNG
//                         <TournamentCard 
//                             key={`live-${t.id}`} 
//                             tournament={t} 
//                             onViewDetails={onViewDetails} 
//                             currentTime={currentTime} 
//                         />
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
//                         // ✅ TRUYỀN `onViewDetails` VÀ `currentTime` XUỐNG
//                         <TournamentCard 
//                             key={`upcoming-${t.id}`} 
//                             tournament={t} 
//                             onViewDetails={onViewDetails} 
//                             currentTime={currentTime} 
//                         />
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
import TournamentCard from '../tournament_card/TournamentCard.jsx';
import LiveMatchCard from './LiveMatchCard.jsx';

// Icons
const LiveIconNew = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-red animate-pulse" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M12 1.5a1.05 1.05 0 100 2.1 1.05 1.05 0 000-2.1zM10.23 15.795a.75.75 0 001.06 0l4.5-4.5a.75.75 0 00-1.06-1.06L11.25 13.19l-1.97-1.97a.75.75 0 00-1.06 1.06l2.5 2.5z" clipRule="evenodd" /></svg> );
const UpcomingTournamentIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon icon-blue"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" /></svg> );
const LiveMatchIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon icon-red"><path d="M4.5 9.75a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM12 9.75a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM19.5 9.75a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM4.5 16.5a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM12 16.5a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM19.5 16.5a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5z" /></svg> );

// Component Home giờ chỉ nhận props, không tự fetch data giải đấu nữa
const Home = ({ onlinePlayers, tournaments, countdownTimers, formatTime, onViewDetails }) => {
    const [liveMatches, setLiveMatches] = useState([]);
    const [isLoadingMatches, setIsLoadingMatches] = useState(true);
    const [visibleLiveTournaments, setVisibleLiveTournaments] = useState(3);
    const [visibleUpcomingTournaments, setVisibleUpcomingTournaments] = useState(3);
    
    // useEffect này chỉ dùng để tải Live Matches
    useEffect(() => {
        const loadLiveMatches = async () => {
            setIsLoadingMatches(true);
            try {
                const matchesRes = await fetch('https://f2farena.com/api/matches/active');
                if (!matchesRes.ok) throw new Error('API request for live matches failed');
                const matchesData = await matchesRes.json();
                setLiveMatches(matchesData);
            } catch (error) {
                console.error("❌ [ERROR] Lỗi khi tải dữ liệu Live Matches:", error);
            } finally {
                setIsLoadingMatches(false);
            }
        };
        loadLiveMatches();
    }, []);

    // Lọc trực tiếp từ `tournaments` prop thay vì state nội bộ
    const liveTournaments = tournaments.filter(t => t.status === 'live' || t.status === 'ongoing');
    const upcomingTournaments = tournaments.filter(t => t.status === 'upcoming');

    // Trạng thái loading của trang giờ phụ thuộc vào việc đã nhận được `tournaments` hay chưa
    if (!tournaments || tournaments.length === 0) {
        return <div className="placeholder-content"><h1>Loading tournaments...</h1></div>;
    }

    return (
        <div className="home-container">
            <div>
                <div className="section-header">
                    <LiveIconNew />
                    <h2>Live Tournaments</h2>
                </div>
                <div className="grid-container">
                    {liveTournaments.slice(0, visibleLiveTournaments).map((t) =>
                        // Truyền đầy đủ props xuống TournamentCard
                        <TournamentCard 
                            key={`live-${t.id}`} 
                            tournament={t} 
                            onViewDetails={onViewDetails} 
                            countdownTimers={countdownTimers}
                            formatTime={formatTime}
                        />
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
                        // Truyền đầy đủ props xuống TournamentCard
                        <TournamentCard 
                            key={`upcoming-${t.id}`} 
                            tournament={t} 
                            onViewDetails={onViewDetails}
                            countdownTimers={countdownTimers}
                            formatTime={formatTime}
                        />
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
                    {isLoadingMatches ? <p>Loading matches...</p> : 
                        liveMatches.map((match, index) => (
                            <LiveMatchCard key={index} match={match} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;

