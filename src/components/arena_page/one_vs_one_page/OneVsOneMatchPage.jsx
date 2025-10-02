import React, { useState, useEffect, useMemo } from 'react';

// Component con và Modal
import ChallengeCard from './ChallengeCard.jsx';
import CreateMatchModal from "../../CreateMatchModal/CreateMatchModal.jsx";

// API functions
import { fetchChallenges, createChallenge } from '../../../api/oneVsOne.js';

// CSS cho trang
import './OneVsOneMatchPage.css';

const OneVsOneMatchPage = () => {
  // --- State Management ---
  const [challenges, setChallenges] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    Live: true,
    Waiting: true,
    Done: false,
  });

  useEffect(() => {
      const loadChallenges = async () => {
          setIsLoading(true);
          try {
              const data = await fetchChallenges();
              setChallenges(data);
          } catch (error) {
              console.error("Lỗi khi tải danh sách trận 1v1:", error);
          } finally {
              setIsLoading(false);
          }
      };
      loadChallenges();
  }, []); 

  const handleCreateMatch = async (matchData) => {
      try {
          const newMatch = await createChallenge(matchData);
          setChallenges(prevChallenges => [newMatch, ...prevChallenges]);
      } catch (error) {
          console.error("Lỗi khi tạo trận đấu mới:", error);
      }
  };

  const filteredMatches = useMemo(() => {
    const activeFilters = Object.keys(filters).filter(key => filters[key]);
    if (activeFilters.length === 0) return [];
    return challenges.filter(match => activeFilters.includes(match.status));
  }, [filters, challenges]);

  return (
    <div className="one-vs-one-page">
      
      <CreateMatchModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreateMatch={handleCreateMatch}
      />

      {/* ✅ KHUNG HEADER ĐỂ CHỨA NÚT BẤM */}
      <header className="ovo-header">
        {/* Bạn có thể thêm phần Filter vào đây nếu muốn */}
        
        {/* ✅ NÚT TẠO TRẬN ĐẤU MỚI */}
        <button className="new-match-btn ovo-btn" onClick={() => setIsModalOpen(true)}>
          + New Match
        </button>
      </header>

      <main className="match-list">
        {isLoading ? (
            <p className="no-matches-found">Loading matches...</p>
        ) : filteredMatches.length > 0 ? (
          filteredMatches.map(challenge => <ChallengeCard key={challenge.id} challenge={challenge} />)
        ) : (
          <p className="no-matches-found">No matches found for the selected filters.</p>
        )}
      </main>
    </div>
  );
};

export default OneVsOneMatchPage;