// import React from 'react';
// import './LiveTournamentDetailPage.css';
// import { CloseIcon } from '../../icons/Icons';

// const LiveTournamentDetailPage = ({ tournament, onClose }) => {
//     if (!tournament) return null;

//     return (
//         <div className="live-detail-page-wrapper">
//             <div className="live-detail-page-content">
//                 <button onClick={onClose} className="live-detail-close-btn">
//                     <CloseIcon />
//                 </button>
                
//                 <header className="live-detail-header">
//                     <h1>{tournament.title}</h1>
//                     <p>By {tournament.creator} - {tournament.date}</p>
//                 </header>

//                 <div className="live-detail-main-info">
//                     {Object.entries(tournament.details).map(([key, value]) => (
//                         <div key={key}>
//                             <span>{key}</span>
//                             <strong>{value}</strong>
//                         </div>
//                     ))}
//                 </div>

//                 <section className="live-detail-section">
//                     <h3><span>ℹ️</span> Description</h3>
//                     <p>{tournament.description}</p>
//                 </section>

//                 <section className="live-detail-section">
//                     <h3><span>🏆</span> Prize Structure</h3>
//                     <div className="prize-list">
//                         {tournament.prizes.map((prize, index) => (
//                             <div key={index} className="prize-item">
//                                 <span>{prize.rank}</span>
//                                 <strong>{prize.amount}</strong>
//                             </div>
//                         ))}
//                     </div>
//                 </section>

//                 <section className="live-detail-section">
//                     <h3><span>📜</span> Rounds & Rules</h3>
//                     <div className="rounds-list">
//                         {tournament.rounds.map((round, index) => (
//                             <div key={index} className="round-card">
//                                 <h4>{round.name}</h4>
//                                 <div className="round-details-grid">
//                                     {Object.entries(round.rules).map(([rule, value]) => (
//                                         <React.Fragment key={rule}>
//                                             <span>{rule}</span>
//                                             <strong>{value}</strong>
//                                         </React.Fragment>
//                                     ))}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </section>
//             </div>
//         </div>
//     );
// };

// export default LiveTournamentDetailPage;
import React, { useState, useEffect } from 'react';
import './LiveTournamentDetailPage.css';
import { CloseIcon } from '../../icons/Icons';

const LiveTournamentDetailPage = ({ tournamentId, user, onClose }) => {
    const [tournament, setTournament] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLiveTournament = async () => {
            if (!tournamentId || !user) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            console.log(`📝 [INFO] LiveTournamentDetail: Bắt đầu lấy dữ liệu chi tiết cho giải đấu LIVE ID: ${tournamentId} với user ID: ${user.id}...`);
            try {
                const response = await fetch(`https://f2farena.com/api/tournaments/ongoing/${tournamentId}?current_user_id=${user.id}`);
                
                if (!response.ok) {
                    console.warn(`⚠️ [WARN] LiveTournamentDetail: API trả về lỗi! Status: ${response.status}`);
                    throw new Error('Failed to fetch live tournament data');
                }
                const apiData = await response.json();
                console.log("[INFO] LiveTournamentDetail: Dữ liệu gốc từ API:", apiData);

                // --- BƯỚC ĐỒNG NHẤT DỮ LIỆU ---
                const formattedData = {
                    title: apiData.title,
                    creator: apiData.creator_name,
                    date: apiData.event_time ? new Date(apiData.event_time).toLocaleDateString('en-GB') : 'N/A',
                    details: {
                      // ✅ [SỬA LỖI] Thêm `|| 0` để có giá trị mặc định nếu prize_pool không tồn tại
                      "Prize Pool": `${(apiData.prize_pool || 0).toLocaleString()} USDT`,
                      
                      "Participants": `${apiData.participants || 0} / ${apiData.max_participants || 'N/A'}`,
                      "Symbol": apiData.symbol || 'N/A',
                      "Event Time": apiData.event_time ? new Date(apiData.event_time).toLocaleString('en-US') : 'N/A',
                      "Broker": apiData.broker_name || 'N/A',
                    },
                    description: apiData.description,
                    prizes: (apiData.prize_structure || []).map(p => ({
                      rank: p.rank ? `Rank ${p.rank}` : p.name,
                      amount: p.prize
                    })),
                    rounds: (apiData.rounds || []).map(r => ({
                      name: r.name,
                      rules: {
                        "Format": r.competition_format,
                        "Match Duration": `${r.duration_minutes} min`,
                        "Players Advance": r.advancement_count,
                        "Matches / Player": r.matches_per_player,
                        "Round Duration": r.total_round_duration_minutes ? `${r.total_round_duration_minutes / 60} hours` : 'N/A',
                        "Match Interval": `${r.match_interval_minutes} min`,
                        "Scheduling Timeframes (UTC)": (r.scheduling_timeframes || []).map(tf => `${tf.start} - ${tf.end}`).join(', ')
                      }
                    }))
                };
                
                setTournament(formattedData);
                console.log("✅ [SUCCESS] LiveTournamentDetail: Tải và đồng nhất dữ liệu thành công.");

            } catch (error) {
                console.error("❌ [ERROR] LiveTournamentDetail: Lỗi khi tải dữ liệu:", error);
                setTournament(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLiveTournament();
    }, [tournamentId, user]);

    if (isLoading) {
        return (
            <div className="live-detail-page-wrapper">
                <div style={{color: 'white', textAlign: 'center'}}>Loading live tournament details...</div>
            </div>
        );
    }

    if (!tournament) {
        return (
            <div className="live-detail-page-wrapper">
                <div className="live-detail-page-content">
                    <button onClick={onClose} className="live-detail-close-btn">
                        <CloseIcon />
                    </button>
                    <p>Could not load tournament data. The API might have returned an error (e.g., 422).</p>
                </div>
            </div>
        );
    }

    // Phần JSX hiển thị không đổi
    return (
        <div className="live-detail-page-wrapper">
            <div className="live-detail-page-content">
                <button onClick={onClose} className="live-detail-close-btn">
                    <CloseIcon />
                </button>
                
                <header className="live-detail-header">
                    <h1>{tournament.title}</h1>
                    <p>By {tournament.creator} - {tournament.date}</p>
                </header>

                <div className="live-detail-main-info">
                    {Object.entries(tournament.details).map(([key, value]) => (
                        <div key={key}>
                            <span>{key}</span>
                            <strong>{value}</strong>
                        </div>
                    ))}
                </div>

                <section className="live-detail-section">
                    <h3><span>ℹ️</span> Description</h3>
                    <p>{tournament.description}</p>
                </section>

                <section className="live-detail-section">
                    <h3><span>🏆</span> Prize Structure</h3>
                    <div className="prize-list">
                        {tournament.prizes.map((prize, index) => (
                            <div key={index} className="prize-item">
                                <span>{prize.rank}</span>
                                <strong>{prize.amount}</strong>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="live-detail-section">
                    <h3><span>📜</span> Rounds & Rules</h3>
                    <div className="rounds-list">
                        {tournament.rounds.map((round, index) => (
                            <div key={index} className="round-card">
                                <h4>{round.name}</h4>
                                <div className="round-details-grid">
                                    {Object.entries(round.rules).map(([rule, value]) => (
                                        <React.Fragment key={rule}>
                                            <span>{rule}</span>
                                            <strong>{value}</strong>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default LiveTournamentDetailPage;