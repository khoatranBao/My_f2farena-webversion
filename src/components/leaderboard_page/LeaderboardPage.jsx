import React from 'react';
import './LeaderboardPage.css'; // Import CSS
import { mockLeaderboardData } from '../../data/mockData'; // Điều chỉnh đường dẫn nếu cần

const LeaderboardPage = () => {
    const getRankClass = (rank) => {
        if (rank === 1) return 'gold';
        if (rank === 2) return 'silver';
        if (rank === 3) return 'bronze';
        return '';
    };

    return (
        <div className="leaderboard-container">
            <div className="leaderboard-header">
                <div className="rank">Rank</div>
                <div className="trader">Trader</div>
                <div className="score">Score</div>
                <div className="volume">Volume</div>
            </div>
            <div className="leaderboard-body">
                {mockLeaderboardData.map((user) => (
                    <div key={user.rank} className="leaderboard-row">
                        <div className={`rank ${getRankClass(user.rank)}`}><span>{user.rank}</span></div>
                        <div className="trader">
                            <div className={`trader-avatar ${getRankClass(user.rank)}`}>{user.initials}</div>
                            <span className="trader-name">{user.name}</span>
                        </div>
                        <div className="score">{user.score.toFixed(2)}</div>
                        <div className="volume">{user.volume}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeaderboardPage;