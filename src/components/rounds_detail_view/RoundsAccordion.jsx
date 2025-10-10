import React,{useState, useEffect } from 'react';
import './RoundsAccordion.css'; // Import file CSS riêng

// Import hàm API vừa tạo
import { fetchTop400Players } from '../../api/rounds.js';

// Component con để hiển thị bảng dữ liệu
const PlayerTable = ({ players }) => (
    <div className="player-table-container">
        <table>
            <thead>
                <tr>
                    <th className="rank-col">Rank</th>
                    <th className="player-col">Player</th>
                    <th className="score-col">Score</th>
                </tr>
            </thead>
            <tbody>
                {players.map(player => (
                    <tr key={player.id}>
                        <td className="rank-col">{player.rank}</td>
                        <td className="player-col">
                            <div className="player-info">
                                <div className="player-avatar">{player.avatarInitial}</div>
                                <span>{player.name}</span>
                            </div>
                        </td>
                        <td className="score-col">{player.score}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);


const RoundsAccordion = () => {
    const [openRound, setOpenRound] = useState(null);
    const [players, setPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Dùng useEffect để gọi API một lần khi component được tạo
    useEffect(() => {
        const loadData = async () => {
            try {
                const playersData = await fetchTop400Players();
                setPlayers(playersData);
            } catch (error) {
                console.error("Failed to fetch players:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const rounds = ['Final', 'Semi-finals', 'Quarter-finals', 'Round of 50', 'Round of 100'];

    const renderRoundContent = (round) => {
        if (isLoading) {
            return <p>Loading player data...</p>;
        }
        
        if (round === 'Round of 100') {
            return <PlayerTable players={players.slice(0, 100)} />;
        }
        
        if (round === 'Round of 50') {
            return <PlayerTable players={players.slice(0, 50)} />;
        }
        
        // Placeholder cho các vòng khác
        return <p>Details and matches for the {round} will be displayed here.</p>;
    }

    return (
        <div className="rounds-container">
            {rounds.map(round => (
                <div key={round} className="round-item">
                    <button
                        className={`round-header ${openRound === round ? 'open' : ''}`}
                        onClick={() => setOpenRound(openRound === round ? null : round)}
                    >
                        <h3>{round}</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="arrow-icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                    <div className={`round-content ${openRound === round ? 'open' : ''}`}>
                        {/* Render nội dung tương ứng khi mở tab */}
                        {openRound === round && renderRoundContent(round)}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RoundsAccordion;