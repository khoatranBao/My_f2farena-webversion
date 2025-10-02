import React, { useState, useEffect, useRef } from 'react';

// Firebase & Config
import { db, auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

// Layout & Common Components
import Footer from './components/footer/Footer.jsx';
import LeftMenu from './components/layout/RightMenu.jsx';
import Chatbot from './components/chatbot/Chatbot.jsx';
import { OfflineOverlay } from './components/Utils/Utils.jsx';
import AuthModal from './components/auth/AuthModal.jsx';

// Page Components
import Home from './components/Home/home.jsx';
import ArenaPage from './components/arena_page/ArenaPage.jsx';
import ReviewPage from './components/review_page/ReviewPage.jsx';
import WalletPage from './components/wallet_page/WalletPage.jsx';
import TournamentLeaderboardPage from './components/TournamentLeaderboardPage/TournamentLeaderboardPage.jsx';

// Detail View / Fullscreen Modal Components
import TournamentDetailPage from './components/tournament_detail_view/TournamentDetailPage.jsx';
import MatchDetailPage from './components/MatchDetailPage/MatchDetailPage.jsx';
import ReviewDetailPage from './components/ReviewDetailPage/ReviewDetailPage.jsx';

// Icons
import {
    HomeIcon, ReviewIcon, ArenaIcon, LeaderboardIcon, WalletIcon, ArrowUpIcon, MenuIcon
} from './icons/Icons.jsx';
import logoImage from './assets/logo.png';

// Mock Data
import { allTournaments as initialTournaments, userProfile, bannerImages, liveMatches } from './data/mockData.js';


const App = () => {
    // --- STATE MANAGEMENT ---
    const [currentUser, setCurrentUser] = useState(null);
    const [activeTab, setActiveTab] = useState('Home');
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [showHeader, setShowHeader] = useState(true);
    const [showScrollTopButton, setShowScrollTopButton] = useState(false);
    const lastScrollY = useRef(window.scrollY);
    const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [viewingTournament, setViewingTournament] = useState(null);
    const [viewingMatch, setViewingMatch] = useState(null);
    const [selectedReview, setSelectedReview] = useState(null);
    const [countdownTimers, setCountdownTimers] = useState({});
    const [onlinePlayers, setOnlinePlayers] = useState(9998000);
    const [currentBanner, setCurrentBanner] = useState(0);

    // --- EFFECTS ---
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setShowScrollTopButton(currentScrollY > 300);
            if (currentScrollY > 10) {
                setShowHeader(currentScrollY < lastScrollY.current);
            } else {
                setShowHeader(true);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    useEffect(() => {
        const calculateTimers = () => {
            const now = new Date();
            const newTimers = {};
            initialTournaments.forEach(tournament => {
                const startTime = new Date(tournament.startTimeUTC);
                const endTime = new Date(tournament.endTimeUTC);
                let remainingSeconds = now < startTime
                    ? Math.floor((startTime - now) / 1000)
                    : Math.floor((endTime - now) / 1000);
                newTimers[tournament.name] = Math.max(0, remainingSeconds);
            });
            setCountdownTimers(newTimers);
        };
        calculateTimers();
        const interval = setInterval(calculateTimers, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const bannerInterval = setInterval(() => {
            setCurrentBanner(prev => (prev === bannerImages.length - 1 ? 0 : prev + 1));
        }, 5000);
        const playersInterval = setInterval(() => {
            setOnlinePlayers(prev => prev + Math.floor(Math.random() * 50) + 1);
        }, 3000);
        return () => {
            clearInterval(bannerInterval);
            clearInterval(playersInterval);
        };
    }, []);

    // --- DATA & HELPERS ---
    const menuItems = [
        { name: 'Home', icon: <HomeIcon /> }, { name: 'Review', icon: <ReviewIcon /> },
        { name: 'Arena', icon: <ArenaIcon /> }, { name: 'Leaderboard', icon: <LeaderboardIcon /> },
        { name: 'Wallet', icon: <WalletIcon /> },
    ];

    const formatTime = (seconds) => {
        const d = Math.floor(seconds / 86400);
        const h = Math.floor((seconds % 86400) / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        if (d > 0) return `${d}d ${h.toString().padStart(2, '0')}h`;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- RENDER LOGIC ---
    const renderContent = () => {
        switch (activeTab) {
            case 'Home':        return <Home onlinePlayers={onlinePlayers} countdownTimers={countdownTimers} formatTime={formatTime} setViewingTournament={setViewingTournament} />;
            case 'Arena':       return <ArenaPage onViewDetails={setViewingTournament} countdownTimers={countdownTimers} formatTime={formatTime} />;
            case 'Review':      return <ReviewPage onReviewClick={setSelectedReview} />;
            case 'Leaderboard': return <TournamentLeaderboardPage />;
            case 'Wallet':      return <WalletPage />;
            default:            return <div className="placeholder-content"><h1>{activeTab}</h1><p>Content for {activeTab} will be shown here.</p></div>;
        }
    };

    if (viewingMatch) return <MatchDetailPage match={viewingMatch} onClose={() => setViewingMatch(null)} />;
    if (viewingTournament) return <TournamentDetailPage tournament={viewingTournament} onClose={() => setViewingTournament(null)} onMatchClick={setViewingMatch} />;

    return (
        <div className="app-container">
            <div className="main-wrapper">
                <header className={`app-header ${!showHeader ? 'hidden' : ''}`}>
                    <div className="header-left">
                        <button><img src={logoImage} alt="App Logo" className="app-logo" /></button>
                    </div>
                    <div className="header-center">
                        {menuItems.map((item) => (
                            <button key={item.name} onClick={() => setActiveTab(item.name)} className={`menu-btn ${activeTab === item.name ? 'active' : ''}`}>
                                {item.icon}
                                <span>{item.name}</span>
                            </button>
                        ))}
                    </div>
                    <div className="header-right">
                        <button className="login-btn" onClick={() => setIsLoginModalOpen(true)}>LOGIN</button>
                        <button className="hamburger-btn" onClick={() => setIsLeftMenuOpen(true)}><MenuIcon /></button>
                    </div>
                </header>

                {activeTab === 'Home' && (<div className="banner-container"><img src={bannerImages[currentBanner]} alt="Banner" className="banner-image" /></div>)}

                <LeftMenu isOpen={isLeftMenuOpen} onClose={() => setIsLeftMenuOpen(false)} user={userProfile} />

                <main className={`main-content ${['Arena', 'Wallet'].includes(activeTab) ? 'full-width' : ''}`}>{renderContent()}</main>
                
                <Footer />
            </div>
            
            {selectedReview && <ReviewDetailPage review={selectedReview} onClose={() => setSelectedReview(null)} />}
            {isLoginModalOpen && <AuthModal onClose={() => setIsLoginModalOpen(false)} />}
            {!isOnline && <OfflineOverlay />}
            <Chatbot currentUser={currentUser}/>
            <button className={`scroll-top-btn ${showScrollTopButton ? 'visible' : ''}`} onClick={scrollToTop} aria-label="Scroll to top" ><ArrowUpIcon /></button>
        </div>
    );
};

export default App;