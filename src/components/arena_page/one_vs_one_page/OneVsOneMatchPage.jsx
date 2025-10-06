import React, { useState, useEffect } from 'react';
import OneVsOneMatchCard from './OneVsOneMatchCard'; // Import component card
import './OneVsOneMatchPage.css'; // File CSS sẽ tạo ở bước tiếp theo

const OneVsOneMatchPage = ({ user }) => {
    // State quản lý toàn bộ dữ liệu gốc từ API
    const [allMatches, setAllMatches] = useState([]);
    // State quản lý trạng thái loading
    const [isLoading, setIsLoading] = useState(true);
    // State quản lý các checkbox của bộ lọc
    const [filters, setFilters] = useState({
        live: true,
        waiting: true,
        done: false,
    });

    // Hàm gọi API để lấy dữ liệu
    useEffect(() => {
        const fetchMatches = async () => {
            console.log('[LOG] OneVsOneMatchPage: Bắt đầu quá trình tải dữ liệu trận đấu.');
            setIsLoading(true);
            try {
                // Endpoint lấy các trận đang active (live & waiting)
                console.log('[LOG] OneVsOneMatchPage: Bắt đầu gọi API /api/matches/active...');
                const activeResponse = await fetch('https://f2farena.com/api/matches/active');
                if (!activeResponse.ok) throw new Error('Failed to fetch active matches');
                const activeMatches = await activeResponse.json();
                console.log('[LOG] OneVsOneMatchPage: Nhận được dữ liệu active matches:', activeMatches);

                let doneMatches = [];
                // Nếu người dùng có đăng nhập và muốn xem lịch sử
                if (user && filters.done) {
                    console.log(`[LOG] OneVsOneMatchPage: Bắt đầu gọi API lịch sử cho user ${user.telegram_id}...`);
                    const historyResponse = await fetch(`https://f2farena.com/api/matches/history/${user.telegram_id}`);
                    if (historyResponse.ok) {
                        const historyData = await historyResponse.json();
                        // Gán status 'done' để dễ lọc
                        doneMatches = historyData.map(m => ({ ...m, status: 'done' }));
                        console.log('[LOG] OneVsOneMatchPage: Nhận được dữ liệu lịch sử:', doneMatches);
                    } else {
                         console.warn(`[WARN] OneVsOneMatchPage: Gọi API lịch sử thất bại, status: ${historyResponse.status}`);
                    }
                }
                
                // Gộp tất cả dữ liệu lại
                setAllMatches([...activeMatches, ...doneMatches]);

            } catch (error) {
                console.error('[ERROR] OneVsOneMatchPage: Lỗi khi tải dữ liệu:', error);
                setAllMatches([]); // Reset về mảng rỗng nếu có lỗi
            } finally {
                setIsLoading(false);
                console.log('[LOG] OneVsOneMatchPage: Quá trình tải dữ liệu kết thúc.');
            }
        };

        fetchMatches();
    // Chạy lại mỗi khi bộ lọc 'done' thay đổi hoặc khi có thông tin `user`
    }, [filters.done, user]); 

    // Hàm xử lý khi người dùng thay đổi checkbox
    const handleFilterChange = (event) => {
        const { name, checked } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: checked,
        }));
        console.log(`[LOG] OneVsOneMatchPage: Bộ lọc thay đổi - ${name}: ${checked}`);
    };
    
    // Lọc danh sách các trận đấu để hiển thị dựa trên state của `filters`
    const filteredMatches = allMatches.filter(match => {
        if (filters.live && match.status === 'live') return true;
        if (filters.waiting && match.status === 'waiting') return true;
        if (filters.done && match.status === 'done') return true;
        return false;
    });

    const handleJoinChallenge = (match) => {
        console.log('[ACTION] User wants to join match:', match);
        alert(`Joining challenge for match ID: ${match.id}`);
    };

    return (
        <div className="one-vs-one-page">
            <div className="page-header">
                <button className="new-match-btn">+ New Match</button>
            </div>

            <div className="filter-section card">
                <h4>Filter by Status</h4>
                <div className="checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            name="live"
                            checked={filters.live}
                            onChange={handleFilterChange}
                        />
                        Live
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="waiting"
                            checked={filters.waiting}
                            onChange={handleFilterChange}
                        />
                        Waiting
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="done"
                            checked={filters.done}
                            onChange={handleFilterChange}
                        />
                        Done
                    </label>
                </div>
            </div>

            <div className="matches-grid">
                {isLoading ? (
                    <p>Loading matches...</p>
                ) : filteredMatches.length > 0 ? (
                    filteredMatches.map(match => (
                        <OneVsOneMatchCard 
                            key={match.id} 
                            match={match}
                            onJoinChallenge={handleJoinChallenge}
                        />
                    ))
                ) : (
                    <p>No matches found with the selected filters.</p>
                )}
            </div>
        </div>
    );
};

export default OneVsOneMatchPage;