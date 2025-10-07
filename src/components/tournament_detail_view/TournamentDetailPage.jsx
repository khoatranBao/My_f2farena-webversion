// import React, { useState, useEffect } from 'react';
// import './TournamentDetailPage.css';

// // Hàm helper để định dạng ngày tháng
// const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleString('vi-VN', {
//         year: 'numeric', month: '2-digit', day: '2-digit',
//         hour: '2-digit', minute: '2-digit'
//     });
// };

// const TournamentDetailPage = ({ tournament: initialTournament, onClose }) => {
//     const [tournament, setTournament] = useState(initialTournament);
//     const [isLoading, setIsLoading] = useState(!initialTournament?.description);

//     useEffect(() => {
//         if (initialTournament?.id && !initialTournament.description) {
//             const fetchDetails = async () => {
//                 setIsLoading(true);
//                 try {
//                     const response = await fetch(`https://f2farena.com/api/tournaments/${initialTournament.id}`);
//                     if (!response.ok) throw new Error('Failed to fetch details');
//                     const data = await response.json();
//                     setTournament(data);
//                 } catch (error) {
//                     console.error("Error fetching tournament details:", error);
//                 } finally {
//                     setIsLoading(false);
//                 }
//             };
//             fetchDetails();
//         }
//     }, [initialTournament]);

//     if (isLoading) {
//         return <div className="static-detail-page-wrapper"><p style={{textAlign: 'center', paddingTop: '5rem'}}>Loading tournament details...</p></div>;
//     }
    
//     if (!tournament) {
//         return <div className="static-detail-page-wrapper"><p style={{textAlign: 'center', paddingTop: '5rem'}}>Could not load tournament details.</p></div>;
//     }

//     const {
//         title, creator_name, event_time, prize_pool, participants, max_participants,
//         symbol, broker_name, description, prize_structure, rounds, thumbnail
//     } = tournament;

//     return (
//         <div className="static-detail-page-wrapper">
//             <header className="static-detail-header" style={{ backgroundImage: `url(${thumbnail})` }}>
//                 <div className="static-header-overlay"></div>
//                 <div className="static-header-content">
//                     <h1>{title}</h1>
//                     <p>By {creator_name} - Starts on {formatDate(event_time)}</p>
//                 </div>
//             </header>

//             <main className="static-detail-body">
//                 <div className="static-info-card">
//                     <div className="static-info-item"><span>Prize Pool</span><strong className="prize">{prize_pool.toLocaleString()} USDT</strong></div>
//                     <div className="static-info-item"><span>Participants</span><strong>{participants} / {max_participants}</strong></div>
//                     <div className="static-info-item"><span>Symbol</span><strong className="symbol">{symbol}</strong></div>
//                     <div className="static-info-item"><span>Broker</span><strong>{broker_name}</strong></div>
//                 </div>

//                 {/* ✅ THÊM CONTAINER CHO BỐ CỤC LƯỚI */}
//                 <div className="detail-grid-container">
//                     <div className="detail-section description-section">
//                         <h3>ℹ️ Description</h3>
//                         <p>{description}</p>
//                     </div>

//                     <div className="detail-section prize-section">
//                         <h3>🏆 Prize Structure</h3>
//                         <div className="prize-structure-list">
//                             {(prize_structure || []).map((prize, index) => (
//                                 <div key={index} className="prize-item">
//                                     <span>{prize.name} {prize.rank ? `(Rank ${prize.rank})` : ''}</span>
//                                     <strong>{prize.prize}</strong>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="detail-section rules-section">
//                         <h3>📜 Rounds & Rules</h3>
//                         <div className="rules-list">
//                             {(rounds || []).map((round, index) => (
//                                 <div key={index} className="round-item">
//                                     <h4>{round.name}</h4>
//                                     <div className="round-details-grid">
//                                         <div className="static-info-item"><span>Format</span><strong>{round.competition_format}</strong></div>
//                                         <div className="static-info-item"><span>Match Duration</span><strong>{round.duration_minutes} min</strong></div>
//                                         <div className="static-info-item"><span>Players Advance</span><strong>{round.advancement_count}</strong></div>
//                                         <div className="static-info-item"><span>Matches / Player</span><strong>{round.matches_per_player}</strong></div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
                
//                 <button onClick={onClose} className="static-back-btn">
//                     &larr; Back
//                 </button>
//             </main>
//         </div>
//     );
// };

// export default TournamentDetailPage;

import React, { useState, useEffect } from 'react';
import './TournamentDetailPage.css';

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
    const [isLoading, setIsLoading] = useState(!initialTournament?.description);

    useEffect(() => {
        if (initialTournament?.id && !initialTournament.description) {
            const fetchDetails = async () => {
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

                {/* ✅ CONTAINER MỚI CHỈ DÀNH CHO 2 THẺ TRÊN */}
                <div className="top-detail-row">
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
                </div>

                {/* ✅ THẺ "ROUNDS & RULES" NẰM RIÊNG Ở DƯỚI */}
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