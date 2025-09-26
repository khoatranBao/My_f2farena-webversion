import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, onSnapshot, collection, query, addDoc } from 'firebase/firestore';
import { setLogLevel } from 'firebase/app';
import TradingChart from './components/TradingChart.jsx';
import ReviewPage from './components/review_page/ReviewPage.jsx';
import ArenaPage from './components/arena_page/ArenaPage.jsx';
import Home from './components/Home/home.jsx';
import Chatbot from './components/chatbot/Chatbot';
import Footer from './components/footer/Footer.jsx';
import {
    HomeIcon, ReviewIcon, ArenaIcon, LeaderboardIcon, WalletIcon,
    CloseIcon, ClockIcon, FacebookIcon, InstagramIcon, TelegramIcon,
    XIcon, ArrowUpIcon, NewMatchesIcon, NewRoundsIcon, NewDiscussionIcon,
    NewLeaderboardIcon, NewResultIcon, SendIcon, BarsIcon, CandlesIcon,
    HollowCandlesIcon, LineIcon, LineWithMarkersIcon, StepLineIcon,
    AreaIcon, HlcAreaIcon, HeikinAshiIcon, IndicatorsIcon, DropdownArrowIcon,
    TimeframeArrowIcon
} from './icons/Icons.jsx';
import RoundsAccordion from './components/rounds_detail_view/RoundsAccordion.jsx';
import TournamentDetailPage from './components/tournament_detail_view/TournamentDetailPage.jsx';
import { db, auth } from './firebaseConfig';
// IMAGES
import logoImage from './assets/logo.png';
import eliteBattleImage from './assets/tournament_elite_battle.jpg';

// IMPORT MOCK DATA
import {
    allTournaments, userProfile, bannerImages, liveMatches, brokerReviews,
    instrumentList, mockComments, mockComplaints, mockPrivateCups, mockOneVsOneMatches,
    mockActivities, liveMatchData, matchInfoData, mockLeaderboardData, winners,
    tournamentWinners, walletData, transactionData
} from './data/mockData.js';
// =======================================================
// HELPER COMPONENTS
// =======================================================
const LeftMenu = ({ isOpen, onClose, user }) => { const [view, setView] = useState('main'); useEffect(() => { if (isOpen) { setView('main'); } }, [isOpen]); if (!isOpen) return null; return ( <div className="left-menu-container"> <div className="left-menu-overlay" onClick={onClose}></div> <div className="left-menu"> {view === 'main' ? ( <> <div className="left-menu-header"> <h2>Menu</h2> <button onClick={onClose} className="close-button"><CloseIcon /></button> </div> <ul className="left-menu-nav-list"> <li onClick={() => setView('personal')}>Personal Information</li> <li>Language</li> </ul> </> ) : ( <> <div className="left-menu-header"> <button onClick={() => setView('main')} className="back-button"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon"> <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /> </svg> </button> <h2>Personal Information</h2> <button onClick={onClose} className="close-button"><CloseIcon /></button> </div> <div className="left-menu-profile"> <div className="left-menu-avatar"> <span>{user.avatarInitials}</span> </div> <h3 className="left-menu-user-name">{user.name}</h3> <p className="left-menu-username">{user.username}</p> </div> <div className="left-menu-details-list"> <div className="left-menu-info-row"> <span className="info-label">Email</span> <span className="info-value">{user.email}</span> </div> <div className="left-menu-info-row"> <span className="info-label">Wallet Address</span> <span className="info-value">{user.walletAddress}</span> </div> <div className="left-menu-info-row"> <span className="info-label">VIP Level</span> <span className="info-value vip-level">{user.vipLevel}</span> </div> <div className="left-menu-info-row"> <span className="info-label">Verified</span> <span className={`info-value ${user.isVerified ? 'verified-yes' : 'verified-no'}`}> {user.isVerified ? 'Yes' : 'No'} </span> </div> <div className="left-menu-info-row"> <span className="info-label">Join Date</span> <span className="info-value">{user.joinDate}</span> </div> </div> </> )} </div> </div> ); };
const OfflineOverlay = () => ( <div className="offline-overlay"> <p>No Internet Connection</p> </div> );
const LoginForm = ({ onSwitchToRegister }) => { return ( <form className="auth-form" onSubmit={(e) => e.preventDefault()}> <h2>Login</h2> <input className="auth-input" type="text" placeholder="Username" /> <input className="auth-input" type="password" placeholder="Password" /> <input className="auth-input" type="text" placeholder="Verification Code" /> <button className="auth-button-primary">Login</button> <div className="auth-forgot-password"> <a href="#">Forgot password?</a> </div> <div className="auth-switch-section"> <span>Don't have an account? </span> <button type="button" className="auth-switch-button" onClick={onSwitchToRegister}> Register </button> </div> </form> ); };
const RegisterForm = ({ onSwitchToLogin }) => { return ( <form className="auth-form" onSubmit={(e) => e.preventDefault()}> <h2>Register</h2> <input className="auth-input" type="text" placeholder="Username" /> <input className="auth-input" type="password" placeholder="Password" /> <input className="auth-input" type="password" placeholder="Confirm Password" /> <input className="auth-input" type="tel" placeholder="Phone Number" /> <input className="auth-input" type="text" placeholder="Enter verification code" /> <button className="auth-button-primary">Register</button> <div className="auth-switch-section"> <span>Already have an account? </span> <button type="button" className="auth-switch-button" onClick={onSwitchToLogin}> Login </button> </div> </form> ); };
const AuthModal = ({ onClose }) => { const [formType, setFormType] = useState('login'); return ( <div className="modal-backdrop" onClick={onClose}> <div className="auth-modal-content" onClick={e => e.stopPropagation()}> <button onClick={onClose} className="modal-close-btn"><CloseIcon /></button> <div className="auth-modal-body"> {formType === 'login' ? ( <LoginForm onSwitchToRegister={() => setFormType('register')} /> ) : ( <RegisterForm onSwitchToLogin={() => setFormType('login')} /> )} </div> </div> </div> ); };
const StarRating = ({ score, max = 5 }) => { const fullStars = Math.floor(score); const halfStar = score % 1 !== 0; const emptyStars = max - fullStars - (halfStar ? 1 : 0); return ( <div className="star-rating"> {[...Array(fullStars)].map((_, i) => <span key={`full-${i}`}>⭐</span>)} {halfStar && <span className="half-star">⭐</span>} {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`} className="empty-star">⭐</span>)} </div> ); };
const ReviewDetailPage = ({ review, onClose }) => { useEffect(() => { const pageElement = document.querySelector('.review-detail-page'); if (pageElement) pageElement.scrollTo(0, 0); }, [review]); return ( <div className="review-detail-page"> <div className="review-detail-header-bar"> <button onClick={onClose} className="back-button-detail"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg> <span>All Reviews</span> </button> </div> <div className="broker-detail-layout"> <main className="broker-detail-main"> <header className="broker-header"> <img src={review.logo} alt={`${review.name} Logo`} className="broker-logo"/> <div> <h1>{review.name} Review</h1> <p>An in-depth look at fees, platforms, and trust.</p> </div> </header> <ProsCons pros={review.pros} cons={review.cons} /> <DetailedAnalysis analysis={review.analysis} /> </main> <aside> <BrokerDetailSidebar review={review} /> </aside> </div> </div> ); };
const ProsCons = ({ pros, cons }) => ( <div className="pros-cons-container"> <div className="pros-list"> <h4>Pros</h4> <ul> {pros.map((pro, index) => <li key={index}>{pro}</li>)} </ul> </div> <div className="cons-list"> <h4>Cons</h4> <ul> {cons.map((con, index) => <li key={index}>{con}</li>)} </ul> </div> </div> );
const BrokerDetailSidebar = ({ review }) => ( <div className="broker-detail-sidebar"> <div className="rating-summary-box"> <h4>PK Team Rating</h4> <div className="overall-score">{review.score.toFixed(1)}<span>/5.0</span></div> <StarRating score={review.score} /> <button className="visit-broker-btn">Visit Broker</button> </div> <div className="at-a-glance-box"> <h4>At a Glance</h4> <ul> {Object.entries(review.glanceInfo).map(([key, value]) => ( <li key={key}> <strong>{key}:</strong> {value} </li> ))} </ul> </div> </div> );
const DetailedAnalysis = ({ analysis }) => ( <div className="detailed-analysis"> <p>{analysis.introduction}</p> <h4>{analysis.detailedIntro}</h4> {analysis.sections.map(section => ( <div key={section.title} className="analysis-section"> <h5>{section.title}</h5> {section.content.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</p>)} <p><strong>PK Team Rating:</strong> <span className="pk-team-rating">{section.rating}</span></p> </div> ))} <h4>Conclusion & Recommendation</h4> {analysis.conclusion.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)} {analysis.recommendation.split('\n\n').map((paragraph, index) => <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />)} </div> );
const PersonalInformationPage = ({ onBack, user }) => { return ( <div className="personal-info-page"> <div className="personal-info-header"> <button onClick={onBack} className="back-button"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon"> <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /> </svg> </button> <h1>Personal Information</h1> </div> <div className="personal-info-body"> <div className="personal-info-avatar"> <span>{user.avatarInitials}</span> </div> <h2 className="user-name">{user.name}</h2> <p className="user-username">{user.username}</p> <div className="personal-info-details"> <div className="info-row"> <span className="info-label">Email</span> <span className="info-value">{user.email}</span> </div> <div className="info-row"> <span className="info-label">Wallet Address</span> <span className="info-value">{user.walletAddress}</span> </div> <div className="info-row"> <span className="info-label">VIP Level</span> <span className="info-value vip-level">{user.vipLevel}</span> </div> <div className="info-row"> <span className="info-label">Affiliate Link</span> <button className="copy-link-btn">Copy Link</button> </div> <div className="info-row"> <span className="info-label">Verified</span> <span className={`info-value ${user.isVerified ? 'verified-yes' : 'verified-no'}`}> {user.isVerified ? 'Yes' : 'No'} </span> </div> <div className="info-row"> <span className="info-label">Join Date</span> <span className="info-value">{user.joinDate}</span> </div> </div> </div> </div> ); };

const SidebarTabs = ({ activeTab, onTabClick }) => (
    <div className="sidebar-tabs">
      <button 
        className={`sidebar-tab-btn ${activeTab === 'instruments' ? 'active' : ''}`}
        onClick={() => onTabClick('instruments')}
      >
        Matching
      </button>
      <button 
        className={`sidebar-tab-btn ${activeTab === 'discussion' ? 'active' : ''}`}
        onClick={() => onTabClick('discussion')}
      >
        Discussion
      </button>
    </div>
);

const InstrumentSidebar = ({ selectedInstrument, onSelect, onClose, activeTab, onTabClick }) => (
    <aside className="instrument-sidebar">
        <div className="sidebar-header">
            <button onClick={onClose} className="sidebar-back-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            <h3>ProTrade</h3>
        </div>
        <div className="instrument-search">
            <input type="text" placeholder="🔍 Search..." />
        </div>
        
        <SidebarTabs activeTab={activeTab} onTabClick={onTabClick} />

        <div className="sidebar-content">
            {activeTab === 'instruments' ? (
                <div className="instrument-list">
                    <div className="instrument-list-header">
                        <span>Pair</span>
                        <span>Price</span>
                        <span>Change</span>
                    </div>
                    {instrumentList.map(item => (
                        <div 
                            key={item.name} 
                            className={`instrument-row ${selectedInstrument === item.name.replace('/', '') ? 'active' : ''}`}
                            onClick={() => onSelect(item.name.replace('/', ''))}
                        >
                            <span>{item.name}</span>
                            <span>{item.price}</span>
                            <span style={{ color: item.change >= 0 ? '#22c55e' : '#ef4444' }}>
                                {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="discussion-panel">
                    {mockComments.map((comment, index) => (
                        <div key={index} className="comment">
                            <div className="comment-header">
                                <span className="comment-user">{comment.user}</span>
                                <span className="comment-time">{comment.time}</span>
                            </div>
                            <p className="comment-body">{comment.text}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </aside>
);

const TradingHeader = ({ match, countdown }) => (
    <header className="trading-header">
        <div className="trading-team-info">
            <div className="team-avatar team-1">{match.team1.short}</div>
            <div>
                <span>{match.team1.name}</span>
                <span className="score">Score: {match.team1.score}</span>
            </div>
        </div>
        <div className="trading-center-display">
            <span className="trading-countdown">{countdown}</span>
            <div className="volume-bar">
                <div className="volume-value">0.00</div>
                <div className="volume-track">
                    <div className="volume-progress" style={{width: '50%'}}></div>
                    <span>VOLUME</span>
                </div>
                <div className="volume-value">0.07</div>
            </div>
        </div>
        <div className="trading-team-info right">
            <div>
                <span>{match.team2.name}</span>
                <span className="score">Score: {match.team2.score}</span>
            </div>
            <div className="team-avatar team-2">{match.team2.short}</div>
        </div>
    </header>
);

const TopChartControls = ({ 
    activeInterval, onIntervalChange, 
    selectedInstrument, 
    chartType, onChartTypeChange,
    isChartTypeDropdownOpen, setChartTypeDropdownOpen, 
    isTimeDropdownOpen, setTimeDropdownOpen,
    chartTypeRef, timeRef
}) => {
    
    const chartTypes = [
        { key: 'bars', name: 'Bars', icon: <BarsIcon /> }, { key: 'candles', name: 'Candles', icon: <CandlesIcon /> },
        { key: 'hollow_candles', name: 'Hollow Candles', icon: <HollowCandlesIcon /> }, { key: 'heikin_ashi', name: 'Heikin Ashi', icon: <HeikinAshiIcon /> },
        { separator: true }, { key: 'line', name: 'Line', icon: <LineIcon /> },
        { key: 'line_with_markers', name: 'Line with Markers', icon: <LineWithMarkersIcon /> }, { key: 'step_line', name: 'Step Line', icon: <StepLineIcon /> },
        { separator: true }, { key: 'area', name: 'Area', icon: <AreaIcon /> }, { key: 'hlc_area', name: 'HLC Area', icon: <HlcAreaIcon /> },
    ];
    
    const getDropdownActiveItem = () => chartTypes.find(c => c.key === chartType && c.key !== 'bars' && c.key !== 'candles') || chartTypes[2];
    
    const dropdownTimeframes = ['4h', '1D', '1W', '1M'];

    return(
        <div className="top-chart-controls">
            <div className="unified-chart-controls">
                <span className="instrument-name-display">{selectedInstrument}</span>
                <div className="control-separator"></div>
                <div className="segmented-control" ref={chartTypeRef}> 
                    <button title="Bars" className={`control-button ${chartType === 'bars' ? 'active' : ''}`} onClick={() => onChartTypeChange('bars')}><BarsIcon /></button>
                    <button title="Candles" className={`control-button ${chartType === 'candles' ? 'active' : ''}`} onClick={() => onChartTypeChange('candles')}><CandlesIcon /></button>
                    <div className="chart-type-selector-wrapper"> 
                        <button 
                            title={getDropdownActiveItem().name} 
                            className={`control-button ${(chartType !== 'bars' && chartType !== 'candles') ? 'active' : ''}`} 
                            onClick={() => setChartTypeDropdownOpen(!isChartTypeDropdownOpen)}
                        >
                            {getDropdownActiveItem().icon}
                            <DropdownArrowIcon />
                        </button>
                        {isChartTypeDropdownOpen && (
                            <div className="chart-type-dropdown">
                                {chartTypes.slice(2).map((type, index) => (
                                    type.separator ? <div key={`sep-${index}`} className="dropdown-separator"></div> : <button key={type.key} className="dropdown-item" title={type.name} onClick={() => { onChartTypeChange(type.key); setChartTypeDropdownOpen(false); }}>
                                        {type.icon}<span>{type.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="segmented-control" ref={timeRef}>
                    <button className={`control-button ${activeInterval === '1m' ? 'active' : ''}`} onClick={() => onIntervalChange('1m')}>1m</button>
                    <button className={`control-button ${activeInterval === '30m' ? 'active' : ''}`} onClick={() => onIntervalChange('30m')}>30m</button>
                    <button className={`control-button ${activeInterval === '1h' ? 'active' : ''}`} onClick={() => onIntervalChange('1h')}>1h</button>
                    <div className="time-interval-dropdown-wrapper">
                        <button 
                            className={`control-button timeframe-dropdown-btn ${dropdownTimeframes.includes(activeInterval) ? 'active' : ''}`} 
                            onClick={() => setTimeDropdownOpen(!isTimeDropdownOpen)}
                        >
                            {dropdownTimeframes.includes(activeInterval) ? (
                                <span className="timeframe-display">{activeInterval}</span>
                            ) : (
                                <TimeframeArrowIcon/>
                            )}
                        </button>
                        {isTimeDropdownOpen && (
                            <div className="chart-type-dropdown">
                                {dropdownTimeframes.map(t => (
                                    <button key={t} className="dropdown-item" onClick={() => { onIntervalChange(t); setTimeDropdownOpen(false); }}>
                                        <span>{t}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="segmented-control">
                    <button className="control-button indicator-btn"><IndicatorsIcon /><span>Indicators</span></button>
                </div>
                <div className="segmented-control">
                    <button className="control-button" title="Compare">📊</button>
                    <button className="control-button" title="Settings">⚙️</button>
                </div>
            </div>
        </div>
    );
};
const MatchDetailPage = ({ match, onClose }) => {
    const [chartInterval, setChartInterval] = useState('1m');
    const [selectedInstrument, setSelectedInstrument] = useState('BTCUSDT');
    const [sidebarTab, setSidebarTab] = useState('instruments');
    const [chartType, setChartType] = useState('candles');
    const [isChartTypeDropdownOpen, setChartTypeDropdownOpen] = useState(false);
    const [isTimeDropdownOpen, setTimeDropdownOpen] = useState(false);
    const chartTypeRef = useRef(null);
    const timeRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chartTypeRef.current && !chartTypeRef.current.contains(event.target)) {
                setChartTypeDropdownOpen(false);
            }
            if (timeRef.current && !timeRef.current.contains(event.target)) {
                setTimeDropdownOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const initialTime = match.countdown.split(':').reduce((acc, time) => (60 * acc) + +time, 0);
    const [countdown, setCountdown] = useState(initialTime);
    useEffect(() => { if (countdown <= 0) return; const timer = setInterval(() => { setCountdown(prev => prev > 0 ? prev - 1 : 0); }, 1000); return () => clearInterval(timer); }, [countdown]);
    const formatCountdown = (seconds) => { if (seconds <= 0) return "00:00:00"; const h = Math.floor(seconds / 3600); const m = Math.floor((seconds % 3600) / 60); const s = seconds % 60; return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':'); };
    
    const updatedMatchData = {
        ...match,
        team1: { ...match.team1, score: 0 }, 
        team2: { ...match.team2, score: 0 },
    };
  
    return (
      <div className="new-match-detail-page">
        <InstrumentSidebar 
            selectedInstrument={selectedInstrument} 
            onSelect={setSelectedInstrument}
            onClose={onClose}
            activeTab={sidebarTab}
            onTabClick={setSidebarTab}
        />
        
        <main className="trading-panel">
            <TradingHeader match={updatedMatchData} countdown={formatCountdown(countdown)} />
            <div className="trading-content">
                <TopChartControls 
                    activeInterval={chartInterval} 
                    onIntervalChange={setChartInterval}
                    selectedInstrument={selectedInstrument}
                    chartType={chartType}
                    onChartTypeChange={setChartType}
                    isChartTypeDropdownOpen={isChartTypeDropdownOpen}
                    setChartTypeDropdownOpen={setChartTypeDropdownOpen}
                    isTimeDropdownOpen={isTimeDropdownOpen}
                    setTimeDropdownOpen={setTimeDropdownOpen}
                    chartTypeRef={chartTypeRef}
                    timeRef={timeRef}
                />
                <div className="chart-container">
                    <TradingChart 
                        interval={chartInterval} 
                        symbol={selectedInstrument}
                    />
                </div>
            </div>
        </main>
      </div>
    );
};

const TournamentLeaderboardPage = () => {
    const [activeTab, setActiveTab] = useState('tournament');

    const getRankClass = (rank) => {
        if (rank === 1) return 'gold';
        if (rank === 2) return 'silver';
        if (rank === 3) return 'bronze';
        return '';
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
                    {activeTab === 'tournament' ? (
                        tournamentWinners.map((user) => (
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
                        ))
                    ) : (
                        <div className="placeholder-content small">
                            <p>Personal Winners data is not available yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
const WithdrawModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Wallet address updated.");
        onClose();
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="wallet-modal-content" onClick={e => e.stopPropagation()}>
                <div className="complaint-modal-header">
                    <h2>Bổ sung địa chỉ ví</h2>
                    <button onClick={onClose} className="modal-close-btn"><CloseIcon /></button>
                </div>
                <div className="wallet-modal-body">
                    <p>You need to update your USDT (TRC20) wallet address to proceed with withdrawals.</p>
                    <form onSubmit={handleSubmit} className="wallet-address-form">
                        <label htmlFor="wallet-address">USDT (TRC20) Wallet Address</label>
                        <input
                            id="wallet-address"
                            type="text"
                            placeholder="Enter your wallet address..."
                            required
                        />
                        <button type="submit" className="auth-button-primary">Update Wallet Address</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const AssetInformation = ({ walletData, onWithdrawClick }) => (
    <div className="asset-info-grid">
        <div className="asset-info-item">
            <span>Current Balance</span>
            <span className="text-balance">{walletData.balance.toFixed(2)} USDT</span>
        </div>
        <div className="asset-info-item">
            <span>Total Deposits</span>
            <span className="text-gain">{walletData.deposits.toFixed(2)} USDT</span>
        </div>
        <div className="asset-info-item">
            <span>Total Withdrawals</span>
            <span className="text-gain">{walletData.withdrawals.toFixed(2)} USDT</span>
        </div>
        <div className="asset-info-item">
            <span>Total Winnings</span>
            <span className="text-gain">{walletData.winnings.toFixed(2)} USDT</span>
        </div>
        <div className="asset-info-item">
            <span>Total Losses</span>
            <span className="text-loss">{walletData.losses.toFixed(2)} USDT</span>
        </div>
        <div className="asset-info-item">
            <span>Affiliate Commission</span>
            <span className="text-balance">{walletData.commission.toFixed(2)} USDT</span>
        </div>
        <button className="withdraw-btn" onClick={onWithdrawClick}>Withdraw</button>
    </div>
);

const TransactionHistory = ({ transactions }) => (
    <div className="transaction-history-table">
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map(tx => (
                    <tr key={tx.id}>
                        <td>{tx.date}</td>
                        <td>{tx.type}</td>
                        <td className={tx.type === 'Deposit' || tx.type === 'Winnings' ? 'text-gain' : 'text-loss'}>
                           {tx.amount.toFixed(2)} USDT
                        </td>
                        <td>
                            <span className={`status-badge-tx status-${tx.status.toLowerCase()}`}>
                                {tx.status}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const WalletPage = () => {
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    
    return (
        <div className="wallet-page">
            <WithdrawModal isOpen={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)} />

            <div className="wallet-section">
                <h2>Asset Information</h2>
                <AssetInformation walletData={walletData} onWithdrawClick={() => setIsWithdrawModalOpen(true)} />
            </div>

            <div className="wallet-section">
                <h2>Transaction History</h2>
                <TransactionHistory transactions={transactionData} />
            </div>
        </div>
    );
};

const App = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [activeTab, setActiveTab] = useState('Home');
    const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);
    const [countdownTimers, setCountdownTimers] = useState({});
    const [onlinePlayers, setOnlinePlayers] = useState(9998000);
    const [viewingTournament, setViewingTournament] = useState(null);
    const [viewingMatch, setViewingMatch] = useState(null);
    const [currentBanner, setCurrentBanner] = useState(0); 
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [showHeader, setShowHeader] = useState(true);
    const lastScrollY = useRef(window.scrollY);
    const [showScrollTopButton, setShowScrollTopButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setShowScrollTopButton(currentScrollY > 300);
            if (currentScrollY > 10) {
                if (currentScrollY > lastScrollY.current) {
                    setShowHeader(false);
                } else {
                    setShowHeader(true);
                }
            } else {
                setShowHeader(true);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    useEffect(() => {
        const calculateTimers = () => {
            const now = new Date();
            const newTimers = {};
            allTournaments.forEach(tournament => {
                const startTime = new Date(tournament.startTimeUTC);
                const endTime = new Date(tournament.endTimeUTC);
                let remainingSeconds;

                if (now < startTime) {
                    remainingSeconds = Math.floor((startTime - now) / 1000);
                } else {
                    remainingSeconds = Math.floor((endTime - now) / 1000);
                }
                newTimers[tournament.name] = Math.max(0, remainingSeconds);
            });
            setCountdownTimers(newTimers);
        };

        calculateTimers();
        const interval = setInterval(calculateTimers, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const autoScroll = setInterval(() => {
            setCurrentBanner(prev => (prev === bannerImages.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(autoScroll);
    }, []);

    useEffect(() => { const interval = setInterval(() => { setOnlinePlayers(prev => prev + Math.floor(Math.random() * 50) + 1); }, 3000); return () => clearInterval(interval); }, []);
    useEffect(() => { const handleOnline = () => setIsOnline(true); const handleOffline = () => setIsOnline(false); window.addEventListener('online', handleOnline); window.addEventListener('offline', handleOffline); return () => { window.removeEventListener('online', handleOnline); window.removeEventListener('offline', handleOffline); }; }, []);
    const formatTime = (seconds) => { const absSeconds = Math.max(0, seconds); const d = Math.floor(absSeconds / 86400); const h = Math.floor((absSeconds % 86400) / 3600); const m = Math.floor((absSeconds % 3600) / 60); const s = Math.floor(absSeconds % 60); if (d > 0) return `${d}d ${h.toString().padStart(2, '0')}h`; return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`; };
  
    const renderContent = () => {
        switch (activeTab) {
            case 'Home':
                return <Home 
                           allTournaments={allTournaments}
                           liveMatches={liveMatches}
                           onlinePlayers={onlinePlayers}
                           countdownTimers={countdownTimers}
                           formatTime={formatTime}
                           setViewingTournament={setViewingTournament}
                       />;
            case 'Review':
                return <ReviewPage onReviewClick={setSelectedReview} />;
            case 'Arena':
                return <ArenaPage 
                        onViewDetails={setViewingTournament} 
                        countdownTimers={countdownTimers}
                        formatTime={formatTime}
                        showHeader={showHeader}
                    />;
            case 'Leaderboard':
                return <TournamentLeaderboardPage />;
            case 'Wallet':
                return <WalletPage />;
            case 'Personal Information':
                 return <PersonalInformationPage onBack={() => setActiveTab('Home')} user={userProfile} />;    
            default:
                return ( <div className="placeholder-content"> <h1>{activeTab}</h1> <p>Content for {activeTab} will be shown here.</p> </div> );
        }
    };
  
    const menuItems = [ { name: 'Home', icon: <HomeIcon /> }, { name: 'Review', icon: <ReviewIcon /> }, { name: 'Arena', icon: <ArenaIcon /> }, { name: 'Leaderboard', icon: <LeaderboardIcon /> }, { name: 'Wallet', icon: <WalletIcon /> }, ];
    
    return (
        <div className="app-container">
            {viewingMatch ? (
                 <MatchDetailPage 
                    match={viewingMatch} 
                    onClose={() => setViewingMatch(null)} 
                 />
            ) : viewingTournament ? (
                <TournamentDetailPage 
                    tournament={viewingTournament} 
                    onClose={() => setViewingTournament(null)} 
                    onMatchClick={setViewingMatch}
                />
            ) : (
                <div className="main-wrapper">
                    <header className={`app-header ${!showHeader && 'hidden'}`}>
                        <div className="header-left">
                            <button onClick={() => setIsLeftMenuOpen(true)}>
                                <img src={logoImage} alt="App Logo" className="app-logo" />
                            </button>
                        </div>
                        <div className="header-center">
                            {menuItems.map((item) => (
                                <button key={item.name} onClick={() => setActiveTab(item.name)} className={`header-nav-btn ${activeTab === item.name ? 'active' : ''}`}>
                                    {item.icon}
                                    <span>{item.name}</span>
                                </button>
                            ))}
                        </div>
                        <div className="header-right">
                            <button className="login-btn" onClick={() => setIsLoginModalOpen(true)}>
                                LOGIN
                            </button>
                        </div>
                    </header>
    
                    {activeTab === 'Home' && (
                        <div className="banner-container">
                            <img src={bannerImages[currentBanner]} alt="Banner" className="banner-image" />
                        </div>
                    )}
    
                    <LeftMenu 
                        isOpen={isLeftMenuOpen} 
                        onClose={() => setIsLeftMenuOpen(false)}
                        user={userProfile}
                    />
    
                    <main className={`main-content ${['Arena', 'Wallet'].includes(activeTab) ? 'full-width' : ''}`}>
                        {renderContent()}
                    </main>
                    
                    <nav className="mobile-nav">
                        {menuItems.map(item => (
                            <button key={item.name} onClick={() => setActiveTab(item.name)} className={`mobile-nav-btn ${activeTab === item.name ? 'active' : ''}`}>
                                {item.icon}
                                <span>{item.name}</span>
                            </button>
                        ))}
                    </nav>
                    <Footer />
                </div>
            )}
            
            {selectedReview && <ReviewDetailPage review={selectedReview} onClose={() => setSelectedReview(null)} />}
            {isLoginModalOpen && <AuthModal onClose={() => setIsLoginModalOpen(false)} />}
            {!isOnline && <OfflineOverlay />}
            <Chatbot currentUser={currentUser}/>
            <button className={`scroll-top-btn ${showScrollTopButton ? 'visible' : ''}`} onClick={scrollToTop} aria-label="Scroll to top" >
                <ArrowUpIcon />
            </button>
        </div>
    );
};

export default App;

