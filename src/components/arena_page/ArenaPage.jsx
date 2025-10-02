import React, { useState } from 'react';

// Import CSS
import './ArenaPage.css';

// Import các component con
import CreateCupModal from '../create_cup_modal/CreateCupModal';
import PrivateCupCard from '../arena_page/private_cup_page/PrivateCupCard.jsx';
import OneVsOneMatchPage from './one_vs_one_page/OneVsOneMatchPage.jsx';
import TournamentList from '../../components/arena_page/tournament_page/TournamentList.jsx'; 

// Import mock data (chỉ dùng cho Private Cup)
import { mockPrivateCups } from '../../data/mockData';

const ArenaPage = ({ onViewDetails, countdownTimers, formatTime }) => {
    // State để quản lý tab nào đang active trong Arena
    const [activeArenaTab, setActiveArenaTab] = useState('tournament');
    
    // State cho modal tạo cup
    const [isCreateCupModalOpen, setIsCreateCupModalOpen] = useState(false);

    // Hàm để render nội dung chính dựa trên tab được chọn
    const renderArenaContent = () => {
      switch (activeArenaTab) {
        case 'tournament':
          // Component này sẽ tự gọi API để lấy danh sách giải đấu
          return <TournamentList 
                    onViewDetails={onViewDetails} 
                    countdownTimers={countdownTimers}
                    formatTime={formatTime}
                 />;
        case 'private_cup':
          return ( 
            <>
                <div className="arena-page-header">
                    <h3>Private Cups</h3>
                    <button className="create-cup-btn" onClick={() => setIsCreateCupModalOpen(true)}>+ Create Cup</button>
                </div>
                <div className="private-cup-grid">
                    {mockPrivateCups.map(cup => <PrivateCupCard key={cup.id} cup={cup} />)}
                </div>
            </>
          );
        
        // KHI CHỌN TAB "1 vs 1 Match", RENDER COMPONENT DÀNH RIÊNG CHO NÓ
        case '1v1_match':
          return <OneVsOneMatchPage />; 
        
        default:
          return null;
      }
    };
  
    return (
      <div className="arena-page">
        <CreateCupModal isOpen={isCreateCupModalOpen} onClose={() => setIsCreateCupModalOpen(false)} />
        
        {/* Sidebar điều hướng */}
        <aside className="arena-sidebar">
          <h1>Arena</h1>
          <nav className="arena-sidebar-nav">
            <button className={`arena-sidebar-btn ${activeArenaTab === 'tournament' ? 'active' : ''}`} onClick={() => setActiveArenaTab('tournament')}>Tournament</button>
            <button className={`arena-sidebar-btn ${activeArenaTab === 'private_cup' ? 'active' : ''}`} onClick={() => setActiveArenaTab('private_cup')}>Private Cup</button>
            <button className={`arena-sidebar-btn ${activeArenaTab === '1v1_match' ? 'active' : ''}`} onClick={() => setActiveArenaTab('1v1_match')}>1 vs 1 Match</button>
          </nav>
        </aside>
        
        {/* Nội dung chính sẽ thay đổi theo tab */}
        <main className="arena-main-content">
          {renderArenaContent()}
        </main>
      </div>
    );
};

export default ArenaPage;