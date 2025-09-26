import React, { useState, useMemo } from 'react';

// === DỮ LIỆU MẪU (BẠN SẼ THAY BẰNG DỮ LIỆU THẬT TỪ API) ===
const mockChallenges = [
  { id: 1, creator: 'Thanh', duration: '5 min', symbol: 'BTC/USDT', bet: 12, status: 'Waiting' },
  { id: 2, creator: 'CryptoKing', duration: '15 min', symbol: 'ETH/USDT', bet: 50, status: 'Waiting' },
  { id: 3, creator: 'ProTraderX', duration: '3 min', symbol: 'SOL/USDT', bet: 25, status: 'Waiting' },
  { id: 4, creator: 'MarketWhiz', duration: '30 min', symbol: 'XAU/USD', bet: 100, status: 'Live' },
  { id: 5, creator: 'BearSlayer', duration: '10 min', symbol: 'BTC/USDT', bet: 75, status: 'Live' },
  { id: 6, creator: 'GoldenCross', duration: '5 min', symbol: 'ETH/USDT', bet: 200, status: 'Done' },
];

// === COMPONENT CHO MỘT THẺ TRẬN ĐẤU ===
const ChallengeCard = ({ challenge }) => {
  return (
    <div className="challenge-card">
      <div className="challenge-header">
        <div className="challenge-avatar">P1</div>
        <span className="creator-name">{challenge.creator}</span>
      </div>

      <hr className="challenge-divider" />

      <div className="challenge-info">
        <div className="info-item">
          <span>Duration</span>
          <strong>{challenge.duration}</strong>
        </div>
        <div className="info-item">
          <span>Symbol</span>
          <strong>{challenge.symbol}</strong>
        </div>
        <div className="info-item">
          <span>Bet</span>
          <strong className="bet-amount">{challenge.bet} USDT</strong>
        </div>
      </div>

      <button className="join-challenge-btn">
        Join Challenge
      </button>
    </div>
  );
};

// === COMPONENT CHÍNH CỦA TRANG ===
const OneVsOneMatchPage = () => {
  // --- State Management ---
  const [isFilterOpen, setIsFilterOpen] = useState(true); // Mở sẵn để dễ thấy
  const [filters, setFilters] = useState({
    Live: true,
    Waiting: true,
    Done: false,
  });

  // --- Logic ---
  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  // Lọc danh sách các trận đấu dựa trên filter, chỉ tính toán lại khi cần
  const filteredMatches = useMemo(() => {
    const activeFilters = Object.keys(filters).filter(key => filters[key]);
    if (activeFilters.length === 0) {
      return []; // Nếu không chọn filter nào, không hiển thị trận nào
    }
    return mockChallenges.filter(match => activeFilters.includes(match.status));
  }, [filters]);

  // --- JSX Render ---
  return (
    <div className="one-vs-one-page">
      {/* Header và Filter Panel giữ nguyên */}
      <header className="ovo-header">
        {/* ... */}
      </header>

      {/* Sửa lại phần danh sách này */}
      <main className="match-list">
        {filteredMatches.length > 0 ? (
          filteredMatches.map(challenge => <ChallengeCard key={challenge.id} challenge={challenge} />)
        ) : (
          <p className="no-matches-found">No matches found for the selected filters.</p>
        )}
      </main>
    </div>
);
};

export default OneVsOneMatchPage;