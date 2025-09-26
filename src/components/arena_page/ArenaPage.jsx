import React, { useState } from 'react';
import './ArenaPage.css'; // Import file CSS riêng
import TournamentCard from '../tournament_card/TournamentCard.jsx';
import CreateCupModal from '../create_cup_modal/CreateCupModal';
// Import Icons & Mock Data (điều chỉnh đường dẫn nếu cần)
import { ClockIcon } from '../../icons/Icons';
import { allTournaments, mockPrivateCups, mockOneVsOneMatches } from '../../data/mockData';

// =======================================================
// CÁC COMPONENT CON (ĐƯỢC DI CHUYỂN TỪ App.jsx VÀO ĐÂY)
// =======================================================

const PrivateCupCard = ({ cup }) => {
    return (
        <div className="private-cup-card">
            <div className="cup-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={cup.avatar} alt="Creator Avatar" className="cup-creator-avatar" />
                    <div className="cup-creator-info">
                        <h4>{cup.creatorName}</h4>
                        <p>Creator</p>
                    </div>
                </div>
                <div className="cup-timer">
                    <ClockIcon />
                    <span>Ends in: {cup.timer}</span>
                </div>
            </div>
  
            <hr className="cup-divider" />
  
            <div className="cup-card-content">
                <h3 className="cup-name">{cup.cupName}</h3>
                <div className="cup-info-bar">
                    <div><span>Prize Pool</span><strong className="prize">{cup.prize}</strong></div>
                    <div><span>Participants</span><strong>{cup.participants}</strong></div>
                    <div><span>Symbol</span><strong className="symbol">{cup.symbol}</strong></div>
                </div>
            </div>
  
            <button className="cup-detail-btn">Detail</button>
        </div>
    );
};

const OneVsOneMatchCard = ({ match }) => (
    <div className="match-card">
        <div className="match-card-header">
            <div className="match-card-avatar">P1</div>
            <div className="match-card-name">{match.name}</div>
        </div>
        <div className="match-card-details">
            <div><span>Duration</span><span>{match.duration}</span></div>
            <div><span>Symbol</span><span>{match.symbol}</span></div>
            <div><span>Bet</span><span className="bet-amount">{match.bet} USDT</span></div>
        </div>
        <button className="join-challenge-btn">Join Challenge</button>
    </div>
);


// =======================================================
// COMPONENT CHÍNH CỦA TRANG
// =======================================================

const ArenaPage = ({ onViewDetails, countdownTimers, formatTime  }) => {
    const [activeArenaTab, setActiveArenaTab] = useState('tournament');
    const [activeTournamentTab, setActiveTournamentTab] = useState('all');
    const [isCreateCupModalOpen, setIsCreateCupModalOpen] = useState(false);
    const now = new Date();
    const liveTournaments = allTournaments.filter(t => new Date(t.startTimeUTC) <= now && new Date(t.endTimeUTC) > now);
  
    const renderTournamentContent = () => {
      let tournamentsToShow = [];
      // ... (phần switch case giữ nguyên)
      switch (activeTournamentTab) {
        case 'live':
          tournamentsToShow = liveTournaments;
          break;
        case 'demo':
          return ( <div className="placeholder-content"><h3>Demo Tournaments</h3><p>No demo tournaments available at the moment.</p></div>);
        case 'all':
        default:
          tournamentsToShow = allTournaments;
          break;
      }
    
      return (
        <div className="grid-container">
          {tournamentsToShow.map((t) => 
              <TournamentCard 
                  key={t.name}
                  tournament={t}
                  timer={formatTime(countdownTimers[t.name] || 0)}
                  onViewDetails={onViewDetails}
              />
          )}
        </div>
      );
    };
  
    const renderArenaContent = () => {
      switch (activeArenaTab) {
        case 'tournament':
          return (
            <div>
              <div className="tournament-sub-nav">
                <button className={`sub-nav-btn ${activeTournamentTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTournamentTab('all')}>All</button>
                <button className={`sub-nav-btn ${activeTournamentTab === 'live' ? 'active' : ''}`} onClick={() => setActiveTournamentTab('live')}>Live</button>
                <button className={`sub-nav-btn ${activeTournamentTab === 'demo' ? 'active' : ''}`} onClick={() => setActiveTournamentTab('demo')}>Demo</button>
              </div>
              {renderTournamentContent()}
            </div>
          );
        case 'private_cup':
          return ( 
            <>
                <div className="arena-page-header">
                    <h3>Private Cups</h3>
                    <button className="create-cup-btn" onClick={() => setIsCreateCupModalOpen(true)}>+ Create Cup</button>
                </div>
                <div className="private-cup-grid">{mockPrivateCups.map(cup => <PrivateCupCard key={cup.id} cup={cup} />)}</div>
            </>
          );
        case '1v1_match':
          return ( <div className="one-vs-one-grid">{mockOneVsOneMatches.map(match => <OneVsOneMatchCard key={match.id} match={match} />)}</div> );
        default:
          return null;
      }
    };
  
    return (
      <div className="arena-page">
        <CreateCupModal isOpen={isCreateCupModalOpen} onClose={() => setIsCreateCupModalOpen(false)} />
        <aside className="arena-sidebar">
          <h1>Arena</h1>
          <nav className="arena-sidebar-nav">
            <button className={`arena-sidebar-btn ${activeArenaTab === 'tournament' ? 'active' : ''}`} onClick={() => setActiveArenaTab('tournament')}>Tournament</button>
            <button className={`arena-sidebar-btn ${activeArenaTab === 'private_cup' ? 'active' : ''}`} onClick={() => setActiveArenaTab('private_cup')}>Private Cup</button>
            <button className={`arena-sidebar-btn ${activeArenaTab === '1v1_match' ? 'active' : ''}`} onClick={() => setActiveArenaTab('1v1_match')}>1 vs 1 Match</button>
          </nav>
        </aside>
        <main className="arena-main-content">
          {renderArenaContent()}
        </main>
      </div>
    );
};

export default ArenaPage;