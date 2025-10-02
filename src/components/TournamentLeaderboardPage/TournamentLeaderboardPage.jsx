import React, { useState, useEffect } from 'react';

// ✅ BƯỚC 1: Import hàm API
import { fetchTournamentLeaderboard } from '../../api/leaderboard.js';

// Import CSS
import './TournamentLeaderboardPage.css';

const TournamentLeaderboardPage = () => {
    // ✅ BƯỚC 2: Thêm state cho dữ liệu và trạng thái loading
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('tournament');

    // ✅ BƯỚC 3: Dùng useEffect để gọi API
    useEffect(() => {
        const loadLeaderboard = async () => {
            setIsLoading(true);
            try {
                // Hiện tại chỉ có dữ liệu cho 'tournament',
                // sau này bạn có thể thêm logic cho các tab khác
                if (activeTab === 'tournament') {
                    const data = await fetchTournamentLeaderboard();
                    setLeaderboardData(data);
                } else {
                    setLeaderboardData([]); // Xóa dữ liệu khi chuyển tab không có data
                }
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu bảng xếp hạng:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadLeaderboard();
    }, [activeTab]); // Chạy lại khi tab thay đổi

    const getRankClass = (rank) => {
        if (rank === 1) return 'gold';
        if (rank === 2) return 'silver';
        if (rank === 3) return 'bronze';
        return '';
    };

    const renderTableContent = () => {
        if (isLoading) {
            return <div className="placeholder-content small"><p>Loading leaderboard...</p></div>;
        }

        if (leaderboardData.length > 0) {
            return leaderboardData.map((user) => (
                <div key={user.rank} className="leaderboard-v2-row">
                    <div className={`rank ${getRankClass(user.rank)}`}>
                        <span>{user.rank}</span>
                    </div>
                    <div className="trader">
                        <div className={`trader-avatar ${getRankClass(user.rank)}`}>{user.initials}</div>
                        <span className="trader-name">{user.name}</span>
                    </div>
                    <div className="wins">{user.wins}</div>
                    <div className="profit">{user.profit.toLocaleString()}</div>
                </div>
            ));
        }

        return (
            <div className="placeholder-content small">
                <p>Personal Winners data is not available yet.</p>
            </div>
        );
    };

    return (
        <div className="leaderboard-v2-container">
            <div className="leaderboard-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'tournament' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tournament')}
                >
                    Top Tournament Winners
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
                    onClick={() => setActiveTab('personal')}
                >
                    Top Personal Winners
                </button>
            </div>

            <div className="leaderboard-table-v2">
                <div className="leaderboard-v2-header">
                    <span className="rank">Rank</span>
                    <span className="trader">Trader</span>
                    <span className="wins">Wins</span>
                    <span className="profit">Profit (USDT)</span>
                </div>
                <div className="leaderboard-v2-body">
                    {renderTableContent()}
                </div>
            </div>
        </div>
    );
};

export default TournamentLeaderboardPage;
