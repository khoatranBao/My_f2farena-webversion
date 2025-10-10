import React, { useState, useEffect } from 'react';
import './LeaderboardPage.css';
import { fetchTournamentLeaderboard, fetchPersonalLeaderboard } from '../../api/leaderboard';

const LeaderboardPage = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('tournament');

    // DEBUG: Thêm log vào đây để xem useEffect có được kích hoạt lại không
    useEffect(() => {
        // DEBUG LOG 1: Dòng này sẽ cho biết useEffect có chạy lại khi tab thay đổi không
        console.log(`%c[Effect] useEffect duoc kich hoat vi activeTab la: '${activeTab}'`, 'color: #22d3ee');

        const fetchLeaderboard = async () => {
            console.log(`[LeaderboardPage] 🔄 Dang tai du lieu cho tab: ${activeTab}`);
            setIsLoading(true);
            setError(null);
            
            try {
                const fetchFunction = activeTab === 'tournament' 
                    ? fetchTournamentLeaderboard 
                    : fetchPersonalLeaderboard;
                
                const data = await fetchFunction();

                const sortedData = data.sort((a, b) => (b.score ?? b.profit) - (a.score ?? a.profit));

                const formattedData = sortedData.map((user, index) => ({
                    key: user.user_id || `user-${index}`,
                    rank: index + 1,
                    name: user.user_name || 'Unknown User',
                    initials: (user.user_name || 'NN').split(' ').map(n => n[0]).join('').toUpperCase(),
                    wins: user.wins ?? 0,
                    profit: user.profit ?? 0,
                }));
                
                setLeaderboardData(formattedData);

            } catch (err) {
                const errorMessage = 'Could not fetch leaderboard data. Please try again later.';
                setError(errorMessage);
                console.error(`[LeaderboardPage] ❌ Loi khi tai du lieu cho tab '${activeTab}':`, err);
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
            return <div className="status-message">Data is not available yet.</div>;
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

    // DEBUG LOG 2: Dòng này sẽ cho biết component có được render lại với đúng tab không
    console.log(`%c[Render] Component dang render voi activeTab: '${activeTab}'`, 'color: #facc15');

    return (
        <div className="leaderboard-container">
            <div className="leaderboard-tabs">
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
    );
};

export default LeaderboardPage;