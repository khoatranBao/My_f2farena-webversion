// import React, { useState, useEffect, useRef } from 'react';

// // Layout & Common Components
// import Footer from './components/footer/Footer.jsx';
// import LeftMenu from './components/layout/RightMenu.jsx';
// import Chatbot from './components/chatbot/Chatbot.jsx';
// import { OfflineOverlay } from './components/Utils/Utils.jsx';
// import AuthModal from './components/auth/AuthModal.jsx';

// // Page Components
// import Home from './components/Home/home.jsx';
// import ArenaPage from './components/arena_page/ArenaPage.jsx';
// import ReviewPage from './components/review_page/ReviewPage.jsx';
// import WalletPage from './components/wallet_page/WalletPage.jsx';
// import TournamentLeaderboardPage from './components/TournamentLeaderboardPage/TournamentLeaderboardPage.jsx';

// // Detail View / Fullscreen Modal Components
// import TournamentDetailPage from './components/tournament_detail_view/TournamentDetailPage.jsx';
// import LiveTournamentDetailPage from './components/tournament_detail_view/LiveTournamentDetailPage.jsx';
// import MatchDetailPage from './components/MatchDetailPage/MatchDetailPage.jsx';
// import ReviewDetailPage from './components/ReviewDetailPage/ReviewDetailPage.jsx';

// // Icons
// import {
//     HomeIcon, ReviewIcon, ArenaIcon, LeaderboardIcon, WalletIcon, ArrowUpIcon, MenuIcon
// } from './icons/Icons.jsx';
// import logoImage from './assets/logo.png';

// // Mock Data (Được sử dụng trong code ban đầu)
// import { allTournaments as initialTournaments } from './data/mockData.js';


// // --- COMPONENT EVENTBANNER ---
// const EventBanner = ({ items }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);

//     useEffect(() => {
//         if (!items || items.length <= 1) return;
//         const interval = setInterval(() => {
//             setCurrentIndex(prevIndex => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
//         }, 5000);
//         return () => clearInterval(interval);
//     }, [items]);

//     if (!items || items.length === 0) {
//         return <div className="banner-container placeholder"></div>;
//     }

//     return (
//         <div className="banner-container">
//             <div className="banner-slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
//                 {items.map((item) => (
//                     <div className="banner-slide" key={item.id} style={{ cursor: 'pointer' }}>
//                         <img src={item.thumbnail} alt={item.title} className="banner-image" />
//                     </div>
//                 ))}
//             </div>
//             {items.length > 1 && (
//                 <div className="banner-dots">
//                     {items.map((_, slideIndex) => (
//                         <div key={slideIndex} className={`banner-dot ${currentIndex === slideIndex ? 'active' : ''}`} onClick={() => setCurrentIndex(slideIndex)}></div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };


// const App = () => {
//     const [currentUser, setCurrentUser] = useState(null);
//     const [isLoggingIn, setIsLoggingIn] = useState(false);
//     const [activeTab, setActiveTab] = useState('Home');
//     const [isOnline, setIsOnline] = useState(navigator.onLine);
//     const [showHeader, setShowHeader] = useState(true);
//     const [showScrollTopButton, setShowScrollTopButton] = useState(false);
//     const lastScrollY = useRef(window.scrollY);
//     const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);
//     const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

//     const [viewingTournament, setViewingTournament] = useState(null);
//     const [viewingLiveTournament, setViewingLiveTournament] = useState(null);

//     const [viewingMatch, setViewingMatch] = useState(null);
//     const [selectedReview, setSelectedReview] = useState(null);
//     const [countdownTimers, setCountdownTimers] = useState({});
//     const [onlinePlayers, setOnlinePlayers] = useState(9998000);
//     const [bannerItems, setBannerItems] = useState([]);
//     const [leaderboardActiveTab, setLeaderboardActiveTab] = useState('tournament');
    
//     // THÊM STATE MỚI: Quản lý tab con nào sẽ được mở trong trang Arena
//     const [arenaSubTab, setArenaSubTab] = useState('tournament');

//     useEffect(() => {
//         const cachedUser = localStorage.getItem('currentUser');
//         if (cachedUser) {
//             try {
//                 setCurrentUser(JSON.parse(cachedUser));
//                 console.log("Restored user session from localStorage.");
//             } catch (e) {
//                 console.error("Failed to parse cached user, clearing cache.", e);
//                 localStorage.removeItem('currentUser');
//             }
//         }
//     }, []);

//     useEffect(() => {
//         const fetchBanner = async () => {
//             console.log("📝 [INFO] App.jsx: Bắt đầu lấy dữ liệu banner...");
//             try {
//                 const response = await fetch('https://f2farena.com/api/events/banner');
//                 if (!response.ok) throw new Error('API request for banners failed');
//                 const data = await response.json();
//                 if (Array.isArray(data)) {
//                     setBannerItems(data);
//                     console.log(`✅ [SUCCESS] App.jsx: Cập nhật banner thành công với ${data.length} ảnh.`);
//                 }
//             } catch (error) {
//                 console.error("❌ [ERROR] App.jsx: Lỗi khi lấy dữ liệu banner:", error);
//             }
//         };
//         fetchBanner();
//     }, []);

//     useEffect(() => {
//         const handleOnline = () => setIsOnline(true);
//         const handleOffline = () => setIsOnline(false);
//         window.addEventListener('online', handleOnline);
//         window.addEventListener('offline', handleOffline);
//         return () => {
//             window.removeEventListener('online', handleOnline);
//             window.removeEventListener('offline', handleOffline);
//         };
//     }, []);

//     useEffect(() => {
//         const handleScroll = () => {
//             const currentScrollY = window.scrollY;
//             setShowScrollTopButton(currentScrollY > 300);
//             if (currentScrollY > 10) {
//                 setShowHeader(currentScrollY < lastScrollY.current);
//             } else {
//                 setShowHeader(true);
//             }
//             lastScrollY.current = currentScrollY;
//         };
//         window.addEventListener('scroll', handleScroll, { passive: true });
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     useEffect(() => {
//         const calculateTimers = () => {
//             const now = new Date();
//             const newTimers = {};
//             initialTournaments.forEach(tournament => {
//                 const startTime = new Date(tournament.startTimeUTC);
//                 const endTime = new Date(tournament.endTimeUTC);
//                 let remainingSeconds = now < startTime
//                     ? Math.floor((startTime - now) / 1000)
//                     : Math.floor((endTime - now) / 1000);
//                 newTimers[tournament.name] = Math.max(0, remainingSeconds);
//             });
//             setCountdownTimers(newTimers);
//         };
//         calculateTimers();
//         const interval = setInterval(calculateTimers, 1000);
//         return () => clearInterval(interval);
//     }, []);

//     useEffect(() => {
//         const playersInterval = setInterval(() => {
//             setOnlinePlayers(prev => prev + Math.floor(Math.random() * 50) + 1);
//         }, 3000);
//         return () => {
//             clearInterval(playersInterval);
//         };
//     }, []);

//     const handleLogin = async (userId) => {
//         console.log(`📝 [INFO] Bắt đầu quá trình đăng nhập cho User ID: ${userId}`);
//         setIsLoggingIn(true);
//         try {
//             const response = await fetch(`https://f2farena.com/api/users/${userId}`);
//             if (!response.ok) {
//                 console.warn(`⚠️ [WARN] API trả về lỗi! Status: ${response.status} cho User ID: ${userId}`);
//                 alert(`Đăng nhập thất bại: Không tìm thấy người dùng với ID ${userId}.`);
//                 throw new Error(`User not found`);
//             }
//             const apiUserData = await response.json();
//             const formattedUser = {
//                 uid: apiUserData.telegram_id,
//                 displayName: apiUserData.fullname,
//                 name: apiUserData.fullname,
//                 ...apiUserData
//             };
//             setCurrentUser(formattedUser);
//             localStorage.setItem('currentUser', JSON.stringify(formattedUser));
//             setIsLoginModalOpen(false);
//             console.log(`✅ [SUCCESS] Đăng nhập thành công! Dữ liệu của user "${formattedUser.displayName}" đã được cập nhật.`);
//         } catch (error) {
//             console.error(`❌ [ERROR] Xảy ra lỗi nghiêm trọng trong quá trình đăng nhập cho User ID: ${userId}`, error);
//         } finally {
//             setIsLoggingIn(false);
//         }
//     };

//     const handleLogout = () => {
//         setCurrentUser(null);
//         localStorage.removeItem('currentUser');
//         setIsLeftMenuOpen(false);
//         console.log("User logged out and session cleared.");
//     };
    
//     const handleViewTournamentDetails = (tournament) => {
//         if (!tournament) {
//             console.error("[ERROR] handleViewTournamentDetails được gọi với tournament không hợp lệ.");
//             return;
//         }
//         const status = tournament.status ? tournament.status.toLowerCase() : 'upcoming';
//         if (status === 'live' || status === 'ongoing') {
//             setViewingLiveTournament(tournament);
//             setViewingTournament(null);
//         } else {
//             setViewingTournament(tournament);
//             setViewingLiveTournament(null);
//         }
//     };

//     // THÊM HÀM MỚI: Xử lý điều hướng từ Footer
//     const handleFooterNavigation = (mainTab, subTab = null) => {
//         setActiveTab(mainTab);
//         if (mainTab === 'Arena' && subTab) {
//             setArenaSubTab(subTab); // Cập nhật tab con cho Arena
//         }
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };
    
//     const menuItems = [
//         { name: 'Home', icon: <HomeIcon /> }, { name: 'Review', icon: <ReviewIcon /> },
//         { name: 'Arena', icon: <ArenaIcon /> }, { name: 'Leaderboard', icon: <LeaderboardIcon /> },
//         { name: 'Wallet', icon: <WalletIcon /> },
//     ];

//     const formatTime = (seconds) => {
//         const d = Math.floor(seconds / 86400);
//         const h = Math.floor((seconds % 86400) / 3600);
//         const m = Math.floor((seconds % 3600) / 60);
//         const s = Math.floor(seconds % 60);
//         if (d > 0) return `${d}d ${h.toString().padStart(2, '0')}h`;
//         return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
//     };

//     const scrollToTop = () => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };

//     const renderContent = () => {
//         switch (activeTab) {
//             case 'Home': 
//                 return <Home 
//                     onlinePlayers={onlinePlayers} 
//                     countdownTimers={countdownTimers} 
//                     formatTime={formatTime} 
//                     onViewDetails={handleViewTournamentDetails} 
//                 />;
//             case 'Arena': 
//                 return <ArenaPage 
//                     onViewDetails={handleViewTournamentDetails} 
//                     countdownTimers={countdownTimers} 
//                     formatTime={formatTime} 
//                     user={currentUser}
//                     // TRUYỀN PROP MỚI: Truyền tab con mong muốn xuống
//                     initialTab={arenaSubTab} 
//                 />;
//             case 'Review': 
//                 return <ReviewPage onReviewClick={setSelectedReview} user={currentUser}/>;
            
//             case 'Leaderboard': 
//                 return (
//                     <TournamentLeaderboardPage 
//                         activeTab={leaderboardActiveTab}
//                         setActiveTab={setLeaderboardActiveTab}
//                     />
//                 );

//             case 'Wallet': 
//                 return <WalletPage />;
//             default: 
//                 return <div className="placeholder-content"><h1>{activeTab}</h1><p>Content for {activeTab} will be shown here.</p></div>;
//         }
//     };
    
//     if (viewingLiveTournament) {
//         return <LiveTournamentDetailPage 
//                     tournament={viewingLiveTournament}
//                     user={currentUser} 
//                     onClose={() => setViewingLiveTournament(null)} 
//                 />;
//     }
//     if (viewingTournament) {
//         return <TournamentDetailPage 
//                     tournament={viewingTournament} 
//                     onClose={() => setViewingTournament(null)} 
//                     onMatchClick={setViewingMatch} 
//                 />;
//     }
//     if (viewingMatch) {
//         return <MatchDetailPage match={viewingMatch} onClose={() => setViewingMatch(null)} />;
//     }

//     return (
//         <div className="app-container">
//             <div className="main-wrapper">
//                 <header className={`app-header ${!showHeader ? 'hidden' : ''}`}>
//                     <div className="header-left">
//                         <button><img src={logoImage} alt="App Logo" className="app-logo" /></button>
//                     </div>
//                     <div className="header-center">
//                         {menuItems.map((item) => (
//                             <button key={item.name} onClick={() => setActiveTab(item.name)} className={`menu-btn ${activeTab === item.name ? 'active' : ''}`}>
//                                 {item.icon}
//                                 <span>{item.name}</span>
//                             </button>
//                         ))}
//                     </div>
//                     <div className="header-right">
//                         {currentUser ? (
//                             <button className="hamburger-btn" onClick={() => setIsLeftMenuOpen(true)}><MenuIcon /></button>
//                         ) : (
//                             <button className="login-btn" onClick={() => setIsLoginModalOpen(true)}>LOGIN</button>
//                         )}
//                     </div>
//                 </header>

//                 {activeTab === 'Home' && <EventBanner items={bannerItems} />}

//                 <LeftMenu 
//                     isOpen={isLeftMenuOpen} 
//                     onClose={() => setIsLeftMenuOpen(false)} 
//                     user={currentUser} 
//                     onLogout={handleLogout}
//                 />
                
//                 <main className={`main-content ${['Arena', 'Wallet'].includes(activeTab) ? 'full-width' : ''}`}>{renderContent()}</main>
                
//                 {/* SỬA PROP: Truyền hàm điều hướng mới xuống */}
//                 <Footer onNavigate={handleFooterNavigation} />
//             </div>
            
//             {selectedReview && <ReviewDetailPage review={selectedReview} onClose={() => setSelectedReview(null)} />}
            
//             {isLoginModalOpen && (
//                 <AuthModal 
//                     onClose={() => setIsLoginModalOpen(false)} 
//                     onLogin={handleLogin}
//                     isLoggingIn={isLoggingIn}
//                 />
//             )}
            
//             {!isOnline && <OfflineOverlay />}
//             <Chatbot currentUser={currentUser}/>
//             <button className={`scroll-top-btn ${showScrollTopButton ? 'visible' : ''}`} onClick={scrollToTop} aria-label="Scroll to top" ><ArrowUpIcon /></button>
//         </div>
//     );
// };

// export default App;
import React, { useState, useEffect, useRef } from 'react';

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
import LiveTournamentDetailPage from './components/tournament_detail_view/LiveTournamentDetailPage.jsx';
import MatchDetailPage from './components/MatchDetailPage/MatchDetailPage.jsx';
import ReviewDetailPage from './components/ReviewDetailPage/ReviewDetailPage.jsx';

// Icons
import {
    HomeIcon, ReviewIcon, ArenaIcon, LeaderboardIcon, WalletIcon, ArrowUpIcon, MenuIcon
} from './icons/Icons.jsx';
import logoImage from './assets/logo.png';

const EventBanner = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!items || items.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [items]);

    if (!items || items.length === 0) {
        return <div className="banner-container placeholder"></div>;
    }

    return (
        <div className="banner-container">
            <div className="banner-slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {items.map((item) => (
                    <div className="banner-slide" key={item.id} style={{ cursor: 'pointer' }}>
                        <img src={item.thumbnail} alt={item.title} className="banner-image" />
                    </div>
                ))}
            </div>
            {items.length > 1 && (
                <div className="banner-dots">
                    {items.map((_, slideIndex) => (
                        <div key={slideIndex} className={`banner-dot ${currentIndex === slideIndex ? 'active' : ''}`} onClick={() => setCurrentIndex(slideIndex)}></div>
                    ))}
                </div>
            )}
        </div>
    );
};


const App = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [activeTab, setActiveTab] = useState('Home');
    const [arenaSubTab, setArenaSubTab] = useState('tournament');
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [showHeader, setShowHeader] = useState(true);
    const [showScrollTopButton, setShowScrollTopButton] = useState(false);
    const lastScrollY = useRef(window.scrollY);
    const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [viewingTournament, setViewingTournament] = useState(null);
    const [viewingLiveTournament, setViewingLiveTournament] = useState(null);
    const [viewingMatch, setViewingMatch] = useState(null);
    const [selectedReview, setSelectedReview] = useState(null);
    const [onlinePlayers, setOnlinePlayers] = useState(9998000);
    const [bannerItems, setBannerItems] = useState([]);
    const [leaderboardActiveTab, setLeaderboardActiveTab] = useState('tournament');
    const [tournaments, setTournaments] = useState([]);
    const [countdownTimers, setCountdownTimers] = useState({});

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const response = await fetch('https://f2farena.com/api/tournaments/?type=official');
                if (!response.ok) throw new Error('API request for tournaments failed');
                const apiData = await response.json();
                
                const formattedData = apiData.map(item => ({
                    id: item.id,
                    name: item.title,
                    image: item.thumbnail,
                    prize: `${(item.prize_pool || 0).toLocaleString()} USDT`,
                    participants: item.participants,
                    startTimeUTC: item.event_time,
                    endTimeUTC: item.end_time,
                    status: item.status,
                }));
                setTournaments(formattedData);
            } catch (error) {
                console.error("❌ [ERROR] App.jsx: Lỗi khi lấy dữ liệu giải đấu:", error);
            }
        };
        fetchTournaments();
    }, []);

    useEffect(() => {
        const timerInterval = setInterval(() => {
            const now = new Date();
            const newTimers = {};
            
            tournaments.forEach(tournament => {
                const startTime = new Date(tournament.startTimeUTC + 'Z');
                const endTime = new Date(tournament.endTimeUTC + 'Z');
                let remainingSeconds;
                const status = tournament.status ? tournament.status.toLowerCase() : 'upcoming';

                if (status === 'ongoing' || status === 'live') {
                    remainingSeconds = Math.floor((endTime - now) / 1000);
                } else {
                    remainingSeconds = Math.floor((startTime - now) / 1000);
                }
                
                newTimers[tournament.id] = Math.max(0, remainingSeconds);
            });
            
            setCountdownTimers(newTimers);
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [tournaments]);
    
    // ✅ SỬA LỖI: Cập nhật hàm formatTime để luôn hiển thị Giờ:Phút:Giây
    const formatTime = (seconds) => {
        if (isNaN(seconds) || seconds < 0) return '00:00:00';
        
        const d = Math.floor(seconds / 86400);
        const h = Math.floor((seconds % 86400) / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);

        const hStr = h.toString().padStart(2, '0');
        const mStr = m.toString().padStart(2, '0');
        const sStr = s.toString().padStart(2, '0');

        if (d > 0) {
            // Nếu còn hơn 1 ngày, hiển thị dạng "2d 14:30:55"
            return `${d}d ${hStr}:${mStr}:${sStr}`;
        }
        // Nếu ít hơn 1 ngày, hiển thị dạng "14:30:55"
        return `${hStr}:${mStr}:${sStr}`;
    };
    
    useEffect(() => {
        const cachedUser = localStorage.getItem('currentUser');
        if (cachedUser) {
            try { setCurrentUser(JSON.parse(cachedUser)); } catch (e) { localStorage.removeItem('currentUser'); }
        }
    }, []);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await fetch('https://f2farena.com/api/events/banner');
                if (!response.ok) throw new Error('API request for banners failed');
                const data = await response.json();
                if (Array.isArray(data)) setBannerItems(data);
            } catch (error) { console.error("❌ [ERROR] App.jsx: Lỗi khi lấy dữ liệu banner:", error); }
        };
        fetchBanner();
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
            setShowHeader(currentScrollY > 10 ? currentScrollY < lastScrollY.current : true);
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const playersInterval = setInterval(() => {
            setOnlinePlayers(prev => prev + Math.floor(Math.random() * 50) + 1);
        }, 3000);
        return () => clearInterval(playersInterval);
    }, []);

    const handleLogin = async (userId) => {
        setIsLoggingIn(true);
        try {
            const response = await fetch(`https://f2farena.com/api/users/${userId}`);
            if (!response.ok) {
                alert(`Login failed: User with ID ${userId} not found.`);
                throw new Error(`User not found`);
            }
            const apiUserData = await response.json();
            const formattedUser = { uid: apiUserData.telegram_id, displayName: apiUserData.fullname, name: apiUserData.fullname, ...apiUserData };
            setCurrentUser(formattedUser);
            localStorage.setItem('currentUser', JSON.stringify(formattedUser));
            setIsLoginModalOpen(false);
        } catch (error) {
            console.error(`❌ [ERROR] Login error for User ID: ${userId}`, error);
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
        setIsLeftMenuOpen(false);
    };
    
    const handleFooterLinkClick = (tab, subTab = null) => {
        setActiveTab(tab);
        if (subTab) setArenaSubTab(subTab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleViewTournamentDetails = (tournament) => {
        const status = tournament.status ? tournament.status.toLowerCase() : 'upcoming';
        if (status === 'live' || status === 'ongoing') {
            setViewingLiveTournament(tournament);
        } else {
            setViewingTournament(tournament);
        }
    };
    
    const menuItems = [ { name: 'Home', icon: <HomeIcon /> }, { name: 'Review', icon: <ReviewIcon /> }, { name: 'Arena', icon: <ArenaIcon /> }, { name: 'Leaderboard', icon: <LeaderboardIcon /> }, { name: 'Wallet', icon: <WalletIcon /> } ];
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const renderContent = () => {
        switch (activeTab) {
            case 'Home':
                return <Home onlinePlayers={onlinePlayers} tournaments={tournaments} countdownTimers={countdownTimers} formatTime={formatTime} onViewDetails={handleViewTournamentDetails} />;
            case 'Arena':
                return <ArenaPage tournaments={tournaments} countdownTimers={countdownTimers} formatTime={formatTime} onViewDetails={handleViewTournamentDetails} user={currentUser} initialSubTab={arenaSubTab} setInitialSubTab={setArenaSubTab} />;
            case 'Review':
                return <ReviewPage onReviewClick={setSelectedReview} user={currentUser}/>;
            case 'Leaderboard':
                return <TournamentLeaderboardPage activeTab={leaderboardActiveTab} setActiveTab={setLeaderboardActiveTab} />;
            case 'Wallet':
                return <WalletPage />;
            default:
                return <div>Content for {activeTab}</div>;
        }
    };
    
    if (viewingLiveTournament) return <LiveTournamentDetailPage tournament={viewingLiveTournament} user={currentUser} onClose={() => setViewingLiveTournament(null)} />;
    if (viewingTournament) return <TournamentDetailPage tournament={viewingTournament} onClose={() => setViewingTournament(null)} onMatchClick={setViewingMatch} />;
    if (viewingMatch) return <MatchDetailPage match={viewingMatch} onClose={() => setViewingMatch(null)} />;
    if (selectedReview) return <ReviewDetailPage review={selectedReview} onClose={() => setSelectedReview(null)} />;

    return (
        <div className="app-container">
            <div className="main-wrapper">
                <header className={`app-header ${!showHeader ? 'hidden' : ''}`}>
                    <div className="header-left"><button><img src={logoImage} alt="App Logo" className="app-logo" /></button></div>
                    <div className="header-center">{menuItems.map((item) => (<button key={item.name} onClick={() => setActiveTab(item.name)} className={`menu-btn ${activeTab === item.name ? 'active' : ''}`}>{item.icon}<span>{item.name}</span></button>))}</div>
                    <div className="header-right">{currentUser ? (<button className="hamburger-btn" onClick={() => setIsLeftMenuOpen(true)}><MenuIcon /></button>) : (<button className="login-btn" onClick={() => setIsLoginModalOpen(true)}>LOGIN</button>)}</div>
                </header>
                {activeTab === 'Home' && <EventBanner items={bannerItems} />}
                <LeftMenu isOpen={isLeftMenuOpen} onClose={() => setIsLeftMenuOpen(false)} user={currentUser} onLogout={handleLogout} />
                <main className={`main-content ${['Arena', 'Wallet'].includes(activeTab) ? 'full-width' : ''}`}>{renderContent()}</main>
                <Footer onFooterLinkClick={handleFooterLinkClick} />
            </div>
            {isLoginModalOpen && (<AuthModal onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin} isLoggingIn={isLoggingIn} />)}
            {!isOnline && <OfflineOverlay />}
            <Chatbot currentUser={currentUser}/>
            <button className={`scroll-top-btn ${showScrollTopButton ? 'visible' : ''}`} onClick={scrollToTop} aria-label="Scroll to top" ><ArrowUpIcon /></button>
        </div>
    );
};

export default App;

