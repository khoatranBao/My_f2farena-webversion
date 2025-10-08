// import React, { useState, useEffect } from 'react';
// import OneVsOneMatchCard from './OneVsOneMatchCard';
// import JoinMatchModal from './JoinMatchModal.jsx'; // BƯỚC 1: IMPORT MODAL
// import './OneVsOneMatchPage.css';

// const OneVsOneMatchPage = ({ user }) => {
//     const [allMatches, setAllMatches] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [filters, setFilters] = useState({
//         live: true,
//         waiting: true,
//         done: false,
//     });

//     // BƯỚC 2: THÊM STATE ĐỂ QUẢN LÝ MODAL
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedMatch, setSelectedMatch] = useState(null);

//     useEffect(() => {
//         const fetchMatches = async () => {
//             console.log('[LOG] OneVsOneMatchPage: Bắt đầu quá trình tải dữ liệu trận đấu.');
//             setIsLoading(true);
//             try {
//                 console.log('[LOG] OneVsOneMatchPage: Bắt đầu gọi API /api/matches/active...');
//                 const activeResponse = await fetch('https://f2farena.com/api/matches/active');
//                 if (!activeResponse.ok) throw new Error('Failed to fetch active matches');
//                 const activeMatches = await activeResponse.json();
//                 console.log('[LOG] OneVsOneMatchPage: Nhận được dữ liệu active matches:', activeMatches);

//                 let doneMatches = [];
//                 if (user && filters.done) {
//                     console.log(`[LOG] OneVsOneMatchPage: Bắt đầu gọi API lịch sử cho user ${user.telegram_id}...`);
//                     const historyResponse = await fetch(`https://f2farena.com/api/matches/history/${user.telegram_id}`);
//                     if (historyResponse.ok) {
//                         const historyData = await historyResponse.json();
//                         doneMatches = historyData.map(m => ({ ...m, status: 'done' }));
//                         console.log('[LOG] OneVsOneMatchPage: Nhận được dữ liệu lịch sử:', doneMatches);
//                     } else {
//                         console.warn(`[WARN] OneVsOneMatchPage: Gọi API lịch sử thất bại, status: ${historyResponse.status}`);
//                     }
//                 }
                
//                 setAllMatches([...activeMatches, ...doneMatches]);

//             } catch (error) {
//                 console.error('[ERROR] OneVsOneMatchPage: Lỗi khi tải dữ liệu:', error);
//                 setAllMatches([]);
//             } finally {
//                 setIsLoading(false);
//                 console.log('[LOG] OneVsOneMatchPage: Quá trình tải dữ liệu kết thúc.');
//             }
//         };

//         fetchMatches();
//     }, [filters.done, user]);

//     const handleFilterChange = (event) => {
//         const { name, checked } = event.target;
//         setFilters(prevFilters => ({
//             ...prevFilters,
//             [name]: checked,
//         }));
//         console.log(`[LOG] OneVsOneMatchPage: Bộ lọc thay đổi - ${name}: ${checked}`);
//     };
    
//     const filteredMatches = allMatches.filter(match => {
//         if (filters.live && match.status === 'live') return true;
//         if (filters.waiting && match.status === 'waiting') return true;
//         if (filters.done && match.status === 'done') return true;
//         return false;
//     });

//     // BƯỚC 3: SỬA LẠI HÀM NÀY
//     const handleJoinChallenge = (match) => {
//         console.log('[ACTION] User wants to join match:', match);
//         setSelectedMatch(match); // Lưu lại thông tin trận đấu
//         setIsModalOpen(true);    // Mở modal
//     };

//     // BƯỚC 4: THÊM HÀM MỚI NÀY
//     const handleConfirmJoin = (formData) => {
//         console.log("Form submitted for match:", selectedMatch);
//         console.log("Account Details:", formData);
        
//         // TODO: Gọi API để gửi thông tin join trận đấu lên server tại đây
//         // Ví dụ: await api.joinMatch(selectedMatch.id, formData);

//         // Đóng modal sau khi đã xử lý xong
//         setIsModalOpen(false);
//         setSelectedMatch(null);
//     };

//     return (
//         <div className="one-vs-one-page">
//             <div className="page-header">
//                 <button className="new-match-btn">+ New Match</button>
//             </div>

//             <div className="filter-section card">
//                 <h4>Filter by Status</h4>
//                 <div className="checkbox-group">
//                     <label>
//                         <input
//                             type="checkbox"
//                             name="live"
//                             checked={filters.live}
//                             onChange={handleFilterChange}
//                         />
//                         Live
//                     </label>
//                     <label>
//                         <input
//                             type="checkbox"
//                             name="waiting"
//                             checked={filters.waiting}
//                             onChange={handleFilterChange}
//                         />
//                         Waiting
//                     </label>
//                     <label>
//                         <input
//                             type="checkbox"
//                             name="done"
//                             checked={filters.done}
//                             onChange={handleFilterChange}
//                         />
//                         Done
//                     </label>
//                 </div>
//             </div>

//             <div className="matches-grid">
//                 {isLoading ? (
//                     <p>Loading matches...</p>
//                 ) : filteredMatches.length > 0 ? (
//                     filteredMatches.map(match => (
//                         <OneVsOneMatchCard 
//                             key={match.id} 
//                             match={match}
//                             onJoinChallenge={handleJoinChallenge} // Hàm này đã được sửa
//                         />
//                     ))
//                 ) : (
//                     <p>No matches found with the selected filters.</p>
//                 )}
//             </div>
            
//             {/* BƯỚC 5: RENDER MODAL TẠI ĐÂY */}
//             <JoinMatchModal 
//                 match={selectedMatch}
//                 onClose={() => setIsModalOpen(false)}
//                 onConfirm={handleConfirmJoin}
//             />
//         </div>
//     );
// };

// export default OneVsOneMatchPage;
import React, { useState, useEffect } from 'react';
import OneVsOneMatchCard from './OneVsOneMatchCard';
import JoinMatchModal from './JoinMatchModal.jsx';
import './OneVsOneMatchPage.css';

const OneVsOneMatchPage = ({ user }) => {
    const [allMatches, setAllMatches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        live: true,
        waiting: true,
        done: false,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState(null);

    useEffect(() => {
        const fetchMatches = async () => {
            console.log('[LOG] OneVsOneMatchPage: Bắt đầu quá trình tải dữ liệu trận đấu.');
            setIsLoading(true);
            try {
                console.log('[LOG] OneVsOneMatchPage: Bắt đầu gọi API /api/matches/active...');
                const activeResponse = await fetch('https://f2farena.com/api/matches/active');
                if (!activeResponse.ok) throw new Error('Failed to fetch active matches');
                const activeMatches = await activeResponse.json();
                console.log('[LOG] OneVsOneMatchPage: Nhận được dữ liệu active matches:', activeMatches);

                let doneMatches = [];
                if (user && filters.done) {
                    console.log(`[LOG] OneVsOneMatchPage: Bắt đầu gọi API lịch sử cho user ${user.telegram_id}...`);
                    const historyResponse = await fetch(`https://f2farena.com/api/matches/history/${user.telegram_id}`);
                    if (historyResponse.ok) {
                        const historyData = await historyResponse.json();
                        doneMatches = historyData.map(m => ({ ...m, status: 'done' }));
                        console.log('[LOG] OneVsOneMatchPage: Nhận được dữ liệu lịch sử:', doneMatches);
                    } else {
                        console.warn(`[WARN] OneVsOneMatchPage: Gọi API lịch sử thất bại, status: ${historyResponse.status}`);
                    }
                }
                
                setAllMatches([...activeMatches, ...doneMatches]);

            } catch (error) {
                console.error('[ERROR] OneVsOneMatchPage: Lỗi khi tải dữ liệu:', error);
                setAllMatches([]);
            } finally {
                setIsLoading(false);
                console.log('[LOG] OneVsOneMatchPage: Quá trình tải dữ liệu kết thúc.');
            }
        };

        fetchMatches();
    }, [filters.done, user]);

    const handleFilterChange = (event) => {
        const { name, checked } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: checked,
        }));
        console.log(`[LOG] OneVsOneMatchPage: Bộ lọc thay đổi - ${name}: ${checked}`);
    };
    
    const filteredMatches = allMatches.filter(match => {
        if (filters.live && match.status === 'live') return true;
        if (filters.waiting && match.status === 'waiting') return true;
        if (filters.done && match.status === 'done') return true;
        return false;
    });

    const handleJoinChallenge = (match) => {
        console.log('[ACTION] User wants to join match:', match);
        setSelectedMatch(match);
        setIsModalOpen(true);
    };

    const handleConfirmJoin = (formData) => {
        console.log("Form submitted for match:", selectedMatch);
        console.log("Account Details:", formData);
        
        // TODO: Gọi API để gửi thông tin join trận đấu lên server tại đây
        // Ví dụ: await api.joinMatch(selectedMatch.id, formData);

        setIsModalOpen(false);
        setSelectedMatch(null);
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
            
            {/* === SỬA LỖI TẠI ĐÂY === */}
            {isModalOpen && (
                <JoinMatchModal 
                    match={selectedMatch}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirmJoin}
                />
            )}
        </div>
    );
};

export default OneVsOneMatchPage;