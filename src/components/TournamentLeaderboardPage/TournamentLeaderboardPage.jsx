// // import React, { useState, useEffect } from 'react';

// // // ✅ BƯỚC 1: Import hàm API
// // import { fetchTournamentLeaderboard } from '../../api/leaderboard.js';

// // // Import CSS
// // import './TournamentLeaderboardPage.css';

// // const TournamentLeaderboardPage = () => {
// //     // ✅ BƯỚC 2: Thêm state cho dữ liệu và trạng thái loading
// //     const [leaderboardData, setLeaderboardData] = useState([]);
// //     const [isLoading, setIsLoading] = useState(true);
// //     const [activeTab, setActiveTab] = useState('tournament');

// //     // ✅ BƯỚC 3: Dùng useEffect để gọi API
// //     useEffect(() => {
// //         const loadLeaderboard = async () => {
// //             setIsLoading(true);
// //             try {
// //                 // Hiện tại chỉ có dữ liệu cho 'tournament',
// //                 // sau này bạn có thể thêm logic cho các tab khác
// //                 if (activeTab === 'tournament') {
// //                     const data = await fetchTournamentLeaderboard();
// //                     setLeaderboardData(data);
// //                 } else {
// //                     setLeaderboardData([]); // Xóa dữ liệu khi chuyển tab không có data
// //                 }
// //             } catch (error) {
// //                 console.error("Lỗi khi tải dữ liệu bảng xếp hạng:", error);
// //             } finally {
// //                 setIsLoading(false);
// //             }
// //         };

// //         loadLeaderboard();
// //     }, [activeTab]); // Chạy lại khi tab thay đổi

// //     const getRankClass = (rank) => {
// //         if (rank === 1) return 'gold';
// //         if (rank === 2) return 'silver';
// //         if (rank === 3) return 'bronze';
// //         return '';
// //     };

// //     const renderTableContent = () => {
// //         if (isLoading) {
// //             return <div className="placeholder-content small"><p>Loading leaderboard...</p></div>;
// //         }

// //         if (leaderboardData.length > 0) {
// //             return leaderboardData.map((user) => (
// //                 <div key={user.rank} className="leaderboard-v2-row">
// //                     <div className={`rank ${getRankClass(user.rank)}`}>
// //                         <span>{user.rank}</span>
// //                     </div>
// //                     <div className="trader">
// //                         <div className={`trader-avatar ${getRankClass(user.rank)}`}>{user.initials}</div>
// //                         <span className="trader-name">{user.name}</span>
// //                     </div>
// //                     <div className="wins">{user.wins}</div>
// //                     <div className="profit">{user.profit.toLocaleString()}</div>
// //                 </div>
// //             ));
// //         }

// //         return (
// //             <div className="placeholder-content small">
// //                 <p>Personal Winners data is not available yet.</p>
// //             </div>
// //         );
// //     };

// //     return (
// //         <div className="leaderboard-v2-container">
// //             <div className="leaderboard-tabs">
// //                 <button 
// //                     className={`tab-btn ${activeTab === 'tournament' ? 'active' : ''}`}
// //                     onClick={() => setActiveTab('tournament')}
// //                 >
// //                     Top Tournament Winners
// //                 </button>
// //                 <button 
// //                     className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
// //                     onClick={() => setActiveTab('personal')}
// //                 >
// //                     Top Personal Winners
// //                 </button>
// //             </div>

// //             <div className="leaderboard-table-v2">
// //                 <div className="leaderboard-v2-header">
// //                     <span className="rank">Rank</span>
// //                     <span className="trader">Trader</span>
// //                     <span className="wins">Wins</span>
// //                     <span className="profit">Profit (USDT)</span>
// //                 </div>
// //                 <div className="leaderboard-v2-body">
// //                     {renderTableContent()}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default TournamentLeaderboardPage;

// import React, { useState, useEffect } from 'react';
// import './TournamentLeaderboardPage.css';
// import { fetchTournamentLeaderboard, fetchPersonalLeaderboard } from '../../api/leaderboard';

// // Component giờ nhận props `activeTab` và `setActiveTab` từ App.jsx
// const TournamentLeaderboardPage = ({ activeTab, setActiveTab }) => {
//     const [leaderboardData, setLeaderboardData] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // useEffect sẽ chạy lại mỗi khi `activeTab` (được truyền từ App.jsx) thay đổi
//     useEffect(() => {
//         const fetchLeaderboard = async () => {
//             console.log(`[LeaderboardPage] 🔄 Bắt đầu tải dữ liệu cho tab: ${activeTab}`);
//             setIsLoading(true);
//             setError(null);
            
//             try {
//                 // Lựa chọn hàm API dựa trên tab đang hoạt động
//                 const fetchFunction = activeTab === 'tournament' 
//                     ? fetchTournamentLeaderboard 
//                     : fetchPersonalLeaderboard;
                
//                 const data = await fetchFunction();

//                 // Sắp xếp dữ liệu dựa trên "score" hoặc "profit" từ cao đến thấp
//                 const sortedData = data.sort((a, b) => (b.score ?? b.profit) - (a.score ?? a.profit));

//                 // Định dạng lại dữ liệu để hiển thị trên giao diện
//                 const formattedData = sortedData.map((user, index) => ({
//                     key: user.user_id || `user-${index}`,
//                     rank: index + 1,
//                     name: user.user_name || 'Unknown User',
//                     initials: (user.user_name || 'NN').split(' ').map(n => n[0]).join('').toUpperCase(),
//                     wins: user.wins ?? 0,
//                     profit: user.profit ?? 0,
//                 }));
                
//                 setLeaderboardData(formattedData);
//                 console.log(`[LeaderboardPage] ✅ Tải và xử lý dữ liệu thành công cho tab: ${activeTab}`);

//             } catch (err) {
//                 const errorMessage = 'Could not fetch leaderboard data. Please try again later.';
//                 setError(errorMessage);
//                 console.error(`[LeaderboardPage] ❌ Lỗi khi tải dữ liệu cho tab '${activeTab}':`, err);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchLeaderboard();
//     }, [activeTab]);

//     const getRankClass = (rank) => {
//         if (rank === 1) return 'gold';
//         if (rank === 2) return 'silver';
//         if (rank === 3) return 'bronze';
//         return '';
//     };

//     const renderContent = () => {
//         if (isLoading) {
//             return <div className="status-message">Loading...</div>;
//         }
//         if (error) {
//             return <div className="status-message error">{error}</div>;
//         }
//         if (leaderboardData.length === 0) {
//             return <div className="status-message">Personal Winners data is not available yet.</div>;
//         }
//         return leaderboardData.map((user) => (
//             <div key={user.key} className="leaderboard-row">
//                 <div className={`rank ${getRankClass(user.rank)}`}><span>{user.rank}</span></div>
//                 <div className="trader">
//                     <div className={`trader-avatar ${getRankClass(user.rank)}`}>{user.initials}</div>
//                     <span className="trader-name">{user.name}</span>
//                 </div>
//                 <div className="wins">{user.wins.toLocaleString()}</div>
//                 <div className={`profit ${user.profit >= 0 ? 'positive' : 'negative'}`}>
//                     {user.profit.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace('$', '')} USDT
//                 </div>
//             </div>
//         ));
//     };

//     return (
//         <div className="leaderboard-container">
//             <div className="leaderboard-tabs">
//                 {/* onClick giờ sẽ gọi hàm `setActiveTab` từ App.jsx */}
//                 <button 
//                     className={`tab-button ${activeTab === 'tournament' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('tournament')}
//                 >
//                     Top Tournament Winners
//                 </button>
//                 <button 
//                     className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('personal')}
//                 >
//                     Top Personal Winners
//                 </button>
//             </div>

//             <div className="leaderboard-header">
//                 <div className="rank">Rank</div>
//                 <div className="trader">Trader</div>
//                 <div className="wins">Wins</div>
//                 <div className="profit">Profit (USDT)</div>
//             </div>

//             <div className="leaderboard-body">
//                 {renderContent()}
//             </div>
//         </div>
//     );
// };

// export default TournamentLeaderboardPage;

import React, { useState, useEffect } from 'react';
import './TournamentLeaderboardPage.css';
import { fetchTournamentLeaderboard, fetchPersonalLeaderboard } from '../../api/leaderboard';

// Component giờ nhận props `activeTab` và `setActiveTab` từ App.jsx
const TournamentLeaderboardPage = ({ activeTab, setActiveTab }) => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect sẽ chạy lại mỗi khi `activeTab` (được truyền từ App.jsx) thay đổi
    useEffect(() => {
        const fetchLeaderboard = async () => {
            console.log(`[LeaderboardPage] 🔄 Bắt đầu tải dữ liệu cho tab: ${activeTab}`);
            setIsLoading(true);
            setError(null);
            
            try {
                // Lựa chọn hàm API dựa trên tab đang hoạt động
                const fetchFunction = activeTab === 'tournament' 
                    ? fetchTournamentLeaderboard 
                    : fetchPersonalLeaderboard;
                
                const data = await fetchFunction();

                // Sắp xếp dữ liệu dựa trên "score" hoặc "profit" từ cao đến thấp
                const sortedData = data.sort((a, b) => (b.score ?? b.profit) - (a.score ?? a.profit));

                // Định dạng lại dữ liệu để hiển thị trên giao diện
                const formattedData = sortedData.map((user, index) => ({
                    key: user.user_id || `user-${index}`,
                    rank: index + 1,
                    name: user.user_name || 'Unknown User',
                    initials: (user.user_name || 'NN').split(' ').map(n => n[0]).join('').toUpperCase(),
                    wins: user.wins ?? 0,
                    profit: user.profit ?? 0,
                }));
                
                setLeaderboardData(formattedData);
                console.log(`[LeaderboardPage] ✅ Tải và xử lý dữ liệu thành công cho tab: ${activeTab}`);

            } catch (err) {
                const errorMessage = 'Could not fetch leaderboard data. Please try again later.';
                setError(errorMessage);
                console.error(`[LeaderboardPage] ❌ Lỗi khi tải dữ liệu cho tab '${activeTab}':`, err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeaderboard();
    }, [activeTab]);

    const getRankClass = (rank) => {
        if (rank === 1) return 'gold';
        if (rank === 2) return 'silver';
        if (rank === 3) return 'bronze';
        return '';
    };

    const renderContent = () => {
        if (isLoading) {
            return <div className="status-message">Loading...</div>;
        }
        if (error) {
            return <div className="status-message error">{error}</div>;
        }
        if (leaderboardData.length === 0) {
            return <div className="status-message">Personal Winners data is not available yet.</div>;
        }
        return leaderboardData.map((user) => (
            <div key={user.key} className="leaderboard-row">
                <div className={`rank ${getRankClass(user.rank)}`}><span>{user.rank}</span></div>
                <div className="trader">
                    <div className={`trader-avatar ${getRankClass(user.rank)}`}>{user.initials}</div>
                    <span className="trader-name">{user.name}</span>
                </div>
                <div className="wins">{user.wins.toLocaleString()}</div>
                <div className={`profit ${user.profit >= 0 ? 'positive' : 'negative'}`}>
                    {user.profit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
                </div>
            </div>
        ));
    };

    return (
        <div className="leaderboard-page-container">
            <div className="leaderboard-container">
                <div className="leaderboard-tabs">
                    {/* onClick giờ sẽ gọi hàm `setActiveTab` từ App.jsx */}
                    <button 
                        className={`tab-button ${activeTab === 'tournament' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tournament')}
                    >
                        Top Tournament Winners
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
                        onClick={() => setActiveTab('personal')}
                    >
                        Top Personal Winners
                    </button>
                </div>

                <div className="leaderboard-header">
                    <div className="rank">Rank</div>
                    <div className="trader">Trader</div>
                    <div className="wins">Wins</div>
                    <div className="profit">Profit (USDT)</div>
                </div>

                <div className="leaderboard-body">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default TournamentLeaderboardPage;