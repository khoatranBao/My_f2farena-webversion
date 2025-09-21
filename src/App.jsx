import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, onSnapshot, collection, query, addDoc } from 'firebase/firestore';
import { setLogLevel } from 'firebase/app';

// IMAGES
import logoImage from './assets/logo.png'; 
import bannerImage1 from './assets/banner1.jpg';
import bannerImage2 from './assets/banner2.jpg';
import bannerImage3 from './assets/banner3.jpeg';
import goMarketsImage from './assets/tournament_go_markets.jpg';
import eliteBattleImage from './assets/tournament_elite_battle.jpg';
import cryptoClashImage from './assets/tournament_crypto_clash.jpg';
import forexMastersImage from './assets/tournament_forex_masters.jpg';
import digitalAssetImage from './assets/tournament_digital_asset.jpg';
import globalTradingImage from './assets/tournament_global_trading.jpg';
import cryptoCupImage from './assets/tournament_crypto_cup.jpg';
import fxBattleImage from './assets/tournament_fx_battle.jpg';
import stockRallyImage from './assets/tournament_stock_rally.jpg';
import tokenTitanImage from './assets/tournament_token_titan.jpg';
import quantumFuturesImage from './assets/tournament_quantum_futures.jpg';
import asiaPacificImage from './assets/tournament_asia_pacific.jpg';
import decentralizedDeFiImage from './assets/tournament_decentralized_defi.jpg';
import goMarketsReviewImage from './assets/go_markets_review.jpg';
import goMarketsDetailHeader from './assets/go_markets_review1.jpg';

// Firebase configuration
const firebaseConfig = { apiKey: "AIzaSyDc8zPSD6_7w_pewLhPntpujap_FLin-Sg", authDomain: "matches-tournaments.firebaseapp.com", projectId: "matches-tournaments", storageBucket: "matches-tournaments.firebasestorage.app", messagingSenderId: "1096742595417", appId: "1:1096742595417:web:7d49585751c694cb603a48", measurementId: "G-LBTR842BNM" };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
setLogLevel('error');

// SVG Icons
const HomeIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> );
const ReviewIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg> );
const ArenaIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M19 2H5C3.9 2 3 2.9 3 4v12c0 1.1.9 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 13.5L9.5 13H7v-2h2.5L12 8.5V11h5v2h-5v2.5z"/></svg> );
const LeaderboardIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11V3H8v8H2v10h20V11h-6zM4 13h4v6H4v-6zm6 0h4v6h-4v-6zm10 6h-4v-6h4v6zM14 9V5h-4v4H4V5h16v4h-6z"/></svg> );
const WalletIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg> );
const ClockIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon-sm icon-gray-light"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> );
const CloseIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg> );
const UpcomingTournamentIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon icon-blue"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" /></svg> );
const LiveIconNew = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-red animate-pulse" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M12 1.5a10.5 10.5 0 100 21 10.5 10.5 0 000-21zM10.23 15.795a.75.75 0 001.06 0l4.5-4.5a.75.75 0 00-1.06-1.06L11.25 13.19l-1.97-1.97a.75.75 0 00-1.06 1.06l2.5 2.5z" clipRule="evenodd" /></svg> );
const LiveMatchIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon icon-red"><path d="M4.5 9.75a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM12 9.75a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM19.5 9.75a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM4.5 16.5a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM12 16.5a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5zM19.5 16.5a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1.5z" /></svg> );
const FacebookIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="social-icon"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg> );
const InstagramIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="social-icon"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.148-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg> );
const TelegramIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="social-icon"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 8.243l-2.435 11.272c-.173.803-.642 1.013-1.282.628l-3.83-2.825-1.839 1.764c-.202.193-.376.368-.753.368l.26-3.923 7.025-6.342c.296-.264-.055-.422-.448-.153l-8.708 5.488-3.821-1.188c-.797-.245-.815-.964.148-1.42l11.432-4.435c.677-.263 1.256.143 1.015.989z"/></svg> );
const XIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="social-icon"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> );

// Mock Data
const allTournaments = [ { name: "Go Markets Trading Challenge", prize: "$1,000,000 USDT", participants: 1250, symbol: "GO", image: goMarketsImage, startTime: 0, duration: 3600, rules: "Highest P/L wins. Minimum 10 trades.", prizeDistribution: { "1st": "50%", "2nd": "25%", "3rd": "10%" } }, { name: "Elite Battle Royale", prize: "$500,000 USD", participants: 980, symbol: "EBR", image: eliteBattleImage, startTime: 0, duration: 7200, rules: "Most trades executed wins.", prizeDistribution: { "1st": "50%", "2nd": "25%", "3rd": "10%" } }, { name: "Crypto Clash", prize: "$250,000 BTC", participants: 2100, symbol: "CC", image: cryptoClashImage, startTime: 0, duration: 1800, rules: "Best win rate with over 20 trades.", prizeDistribution: { "1st": "50%", "2nd": "25%", "3rd": "10%" } }, { name: "Forex Masters Championship", prize: "$1,500,000 USD", participants: 1500, symbol: "FMC", image: forexMastersImage, startTime: 86400, duration: 10800, rules: "Best win rate with over 20 trades.", prizeDistribution: { "1st": "50%", "2nd": "25%", "3rd": "10%"} }, { name: "Digital Asset Sprint", prize: "$750,000 ETH", participants: 1800, symbol: "DAS", image: digitalAssetImage, startTime: 43200, duration: 5400, rules: "Best win rate with over 20 trades.", prizeDistribution: { "1st": "50%", "2nd": "25%", "3rd": "10%"} }, { name: "Global Trading Challenge", prize: "$2,000,000 USDT", participants: 3000, symbol: "GTC", image: globalTradingImage, startTime: 100000, duration: 3600, rules: "Best win rate with over 20 trades.", prizeDistribution: { "1st": "50%", "2nd": "25%", "3rd": "10%"} }, { name: "Crypto Cup 2025", prize: "$1,200,000 USD", participants: 2500, symbol: "CC25", image: cryptoCupImage, startTime: 75000, duration: 7200, rules: "Best win rate with over 20 trades.", prizeDistribution: { "1st": "50%", "2nd": "25%", "3rd": "10%"} }, { name: "FX Battle Arena", prize: "$800,000 BTC", participants: 1900, symbol: "FBA", image: fxBattleImage, startTime: 15000, duration: 1800, rules: "Best win rate with over 20 trades.", prizeDistribution: { "1st": "50%", "2nd": "25%", "3rd": "10%"} }, { name: "Stock Market Rally", prize: "$900,000 USD", participants: 2200, symbol: "SMR", image: stockRallyImage, startTime: 30000, duration: 10800, rules: "Best win rate with over 20 trades.", prizeDistribution: { "1st": "50%", "2nd": "25%", "3rd": "10%"} }, { name: "Token Titan Tournament", prize: "$1,100,000 ETH", participants: 2700, symbol: "TTT", image: tokenTitanImage, startTime: 50000, duration: 5400, rules: "Best win rate with over 20 trades.", prizeDistribution: { "1st": "50%", "2nd": "25%", "3rd": "10%"} }, { name: "Quantum Futures Derby", prize: "500 BTC", participants: 5000, symbol: "QFD", image: quantumFuturesImage, startTime: 259200, duration: 21600, rules: "Best win rate with over 20 trades.", prizeDistribution: { "1st": "50%", "2nd": "25%", "3rd": "10%"} }, { name: "Asia Pacific Index Rally", prize: "$3,000,000 USD", participants: 4500, symbol: "APIR", image: asiaPacificImage, startTime: 18000, duration: 14400, rules: "Best win rate with over 20 trades.", prizeDistribution: { "1st": "50%", "2nd": "25%", "3rd": "10%"} }, { name: "Decentralized DeFi Duel", prize: "1,000,000 DAI", participants: 3300, symbol: "DDD", image: decentralizedDeFiImage, startTime: 129600, duration: 86400, rules: "Best win rate with over 20 trades.", prizeDistribution: { "1st": "50%", "2nd": "25%", "3rd": "10%"} }, ];
const userProfile = { avatarInitials: 'TK', name: 'Tran Khoa', username: '@6077723854', email: 'Not set', walletAddress: 'Null', vipLevel: 'Silver', affiliateLink: 'https://example.com/ref/6077723854', isVerified: false, joinDate: '15/9/2025' };
const bannerImages = [ bannerImage1, bannerImage2, bannerImage3 ];
const liveMatches = [ { team1: "Team Alpha", team2: "Team Omega", score1: 2, score2: 1, game: "Valorant" }, { team1: "Giants", team2: "Titans", score1: 0, score2: 0, game: "League of Legends" }, { team1: "Phoenix", team2: "Dragon", score1: 3, score2: 2, game: "CS:GO" }, { team1: "Wolves", team2: "Bears", score1: 1, score2: 1, game: "Dota 2" }, { team1: "Shadows", team2: "Ninjas", score1: 5, score2: 4, game: "Overwatch" }, { team1: "Vipers", team2: "Cobras", score1: 2, score2: 0, game: "Valorant" }, ];
const brokerReviews = [ { id: 1, image: goMarketsReviewImage, headerImage: goMarketsDetailHeader, name: 'GO Markets', score: 4.7, country: 'AU', years: 20, description: 'GO Markets, a leading online trading broker, offers access to over 1,000 assets...', rankDetails: { total: 4.7, criteria: [ { name: 'License & Regulation', score: 5 }, { name: 'Fund Security', score: 4.5 }, { name: 'Localization & Support', score: 5 }, { name: 'Commissions & Fees', score: 5 }, { name: 'Platform Stability & Tools', score: 4.5 }, { name: 'Onboarding & Ease of Use', score: 5 }, ] }, analysis: { introduction: "This report provides an objective, expert assessment of the online trading broker GO Markets. Our evaluation is based on a proprietary scoring system that weighs nine critical criteria, reflecting what matters most to traders, from regulatory security to trading costs.", sections: [ { title: "1. Regulation & Licensing (Weight: 25%)", content: "GO Markets operates under a multi-jurisdictional regulatory framework... ASIC (Australia)... CySEC (Cyprus)... Other Jurisdictions... Conclusion: The presence of multiple licenses, especially from top-tier agencies like ASIC, provides a strong layer of regulatory trust.", rating: "Excellent" }, { title: "2. Investor Protection & Fund Security (Weight: 10%)", content: "A significant drawback is the apparent lack of an investor compensation scheme or deposit insurance... This poses a potential risk to client capital in the event of broker insolvency.", rating: "Very Poor / Non-existent" } ], conclusion: "GO Markets presents a mixed but generally positive profile... Is GO Markets Recommended by PK Team? YES, for experienced traders... CONSIDER ALTERNATIVES, if you are a beginner..." } }, { id: 2, image: 'https://placehold.co/600x300/1e40af/FFFFFF?text=Another+Broker', headerImage: 'https://placehold.co/800x400/1e40af/FFFFFF?text=Another+Broker', name: 'Sample Broker', score: 4.5, country: 'UK', years: 15, description: 'This is a sample description for another leading online trading broker...', rankDetails: { total: 4.5, criteria: []}, analysis: { introduction: "", sections: [], conclusion: "" } }, { id: 3, image: 'https://placehold.co/600x300/166534/FFFFFF?text=Third+Broker', headerImage: 'https://placehold.co/800x400/166534/FFFFFF?text=Third+Broker', name: 'Trading Pro', score: 4.9, country: 'US', years: 12, description: 'Trading Pro provides advanced tools and features for professional traders...', rankDetails: { total: 4.9, criteria: []}, analysis: { introduction: "", sections: [], conclusion: "" } } ];

// =======================================================
// HELPER COMPONENTS
// =======================================================
const TournamentCard = ({ tournament, countdownTimers, formatTime, onViewDetails }) => { const isLive = tournament.startTime === 0; const timeValue = countdownTimers[tournament.name] || 0; return ( <div className="tournament-card"> <img src={tournament.image} alt={tournament.name} className="tournament-card-img" /> <div className="tournament-card-timer"> <ClockIcon /> <span> {isLive ? `Ends in: ${formatTime(timeValue)}` : `Starts in: ${formatTime(timeValue)}`} </span> </div> {isLive && <div className="tournament-card-live">LIVE</div>} <div className="tournament-card-body"> <h3>{tournament.name}</h3> <div className="tournament-card-info"> <span>Prize: <span className="font-bold text-yellow">{tournament.prize}</span></span> <span>Players: <span className="font-bold">{tournament.participants}</span></span> </div> <button onClick={() => onViewDetails(tournament)} className="tournament-card-btn"> View Details </button> </div> </div> ); };
const LeftMenu = ({ isOpen, onClose, user }) => { const [view, setView] = useState('main'); useEffect(() => { if (isOpen) { setView('main'); } }, [isOpen]); if (!isOpen) return null; return ( <div className="left-menu-container"> <div className="left-menu-overlay" onClick={onClose}></div> <div className="left-menu"> {view === 'main' ? ( <> <div className="left-menu-header"> <h2>Menu</h2> <button onClick={onClose} className="close-button"><CloseIcon /></button> </div> <ul className="left-menu-nav-list"> <li onClick={() => setView('personal')}>Personal Information</li> <li>Language</li> </ul> </> ) : ( <> <div className="left-menu-header"> <button onClick={() => setView('main')} className="back-button"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon"> <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /> </svg> </button> <h2>Personal Information</h2> <button onClick={onClose} className="close-button"><CloseIcon /></button> </div> <div className="left-menu-profile"> <div className="left-menu-avatar"> <span>{user.avatarInitials}</span> </div> <h3 className="left-menu-user-name">{user.name}</h3> <p className="left-menu-username">{user.username}</p> </div> <div className="left-menu-details-list"> <div className="left-menu-info-row"> <span className="info-label">Email</span> <span className="info-value">{user.email}</span> </div> <div className="left-menu-info-row"> <span className="info-label">Wallet Address</span> <span className="info-value">{user.walletAddress}</span> </div> <div className="left-menu-info-row"> <span className="info-label">VIP Level</span> <span className="info-value vip-level">{user.vipLevel}</span> </div> <div className="left-menu-info-row"> <span className="info-label">Verified</span> <span className={`info-value ${user.isVerified ? 'verified-yes' : 'verified-no'}`}> {user.isVerified ? 'Yes' : 'No'} </span> </div> <div className="left-menu-info-row"> <span className="info-label">Join Date</span> <span className="info-value">{user.joinDate}</span> </div> </div> </> )} </div> </div> ); };
const OfflineOverlay = () => ( <div className="offline-overlay"> <p>No Internet Connection</p> </div> );
const LoginForm = ({ onSwitchToRegister }) => { return ( <form className="auth-form" onSubmit={(e) => e.preventDefault()}> <h2>Login</h2> <input className="auth-input" type="text" placeholder="Username" /> <input className="auth-input" type="password" placeholder="Password" /> <input className="auth-input" type="text" placeholder="Verification Code" /> <button className="auth-button-primary">Login</button> <div className="auth-forgot-password"> <a href="#">Forgot password?</a> </div> <div className="auth-switch-section"> <span>Don't have an account? </span> <button type="button" className="auth-switch-button" onClick={onSwitchToRegister}> Register </button> </div> </form> ); };
const RegisterForm = ({ onSwitchToLogin }) => { return ( <form className="auth-form" onSubmit={(e) => e.preventDefault()}> <h2>Register</h2> <input className="auth-input" type="text" placeholder="Username" /> <input className="auth-input" type="password" placeholder="Password" /> <input className="auth-input" type="password" placeholder="Confirm Password" /> <input className="auth-input" type="tel" placeholder="Phone Number" /> <input className="auth-input" type="text" placeholder="Enter verification code" /> <button className="auth-button-primary">Register</button> <div className="auth-switch-section"> <span>Already have an account? </span> <button type="button" className="auth-switch-button" onClick={onSwitchToLogin}> Login </button> </div> </form> ); };
const AuthModal = ({ onClose }) => { const [formType, setFormType] = useState('login'); return ( <div className="modal-backdrop" onClick={onClose}> <div className="auth-modal-content" onClick={e => e.stopPropagation()}> <button onClick={onClose} className="modal-close-btn"><CloseIcon /></button> <div className="auth-modal-body"> {formType === 'login' ? ( <LoginForm onSwitchToRegister={() => setFormType('register')} /> ) : ( <RegisterForm onSwitchToLogin={() => setFormType('login')} /> )} </div> </div> </div> ); };
const StarRating = ({ score, max = 5 }) => { const fullStars = Math.floor(score); const halfStar = score % 1 !== 0; const emptyStars = max - fullStars - (halfStar ? 1 : 0); return ( <div className="star-rating"> {[...Array(fullStars)].map((_, i) => <span key={`full-${i}`}>⭐</span>)} {halfStar && <span className="half-star">⭐</span>} {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`} className="empty-star">⭐</span>)} </div> ); };
const TotalRank = ({ rankDetails }) => ( <div className="total-rank-container"> <div className="total-rank-header"> <h3>Total rank: {rankDetails.total.toFixed(1)} / 5.0</h3> <StarRating score={rankDetails.total} /> </div> <div className="rank-criteria-list"> {rankDetails.criteria.map(item => ( <div key={item.name} className="rank-criteria-row"> <span>{item.name}</span> <StarRating score={item.score} /> </div> ))} </div> </div> );
const DetailedAnalysis = ({ analysis }) => ( <div className="detailed-analysis"> <p>{analysis.introduction}</p> <h4>Detailed Scoring & Analysis</h4> <p>Here is a breakdown of GO Markets' performance across PK Team's key evaluation metrics:</p> {analysis.sections.map(section => ( <div key={section.title} className="analysis-section"> <h5>{section.title}</h5> <p>{section.content}</p> <p><strong>PK Team Rating:</strong> <span className="pk-team-rating">{section.rating}</span></p> </div> ))} <h4>Conclusion & Recommendation for Traders</h4> <p>{analysis.conclusion}</p> </div> );
const ReviewDetailPage = ({ review, onClose }) => { const [activeSubTab, setActiveSubTab] = useState('pk'); return ( <div className="review-detail-page"> <div className="review-detail-content"> <button onClick={onClose} className="review-detail-close-btn"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg> Back to Reviews </button> <img src={review.headerImage} alt={`${review.name} header`} className="review-detail-header-img" /> <div className="review-detail-body"> <div className="review-nav"> <button className={`review-nav-btn ${activeSubTab === 'pk' ? 'active' : ''}`} onClick={() => setActiveSubTab('pk')}>PK Team Review</button> <button className={`review-nav-btn ${activeSubTab === 'trader' ? 'active' : ''}`} onClick={() => setActiveSubTab('trader')}>Trader Reviews</button> </div> {activeSubTab === 'pk' ? ( <> <TotalRank rankDetails={review.rankDetails} /> <DetailedAnalysis analysis={review.analysis} /> </> ) : ( <div className="placeholder-content"> <h1>Trader Reviews</h1> <p>Content for trader reviews will be shown here.</p> </div> )} </div> </div> </div> ); };
const BrokerReviewCard = ({ review, onCardClick }) => { return ( <div className="broker-card" onClick={() => onCardClick(review)}> <img src={review.image} alt={`${review.name} review`} className="broker-card-img" /> <div className="broker-card-body"> <div className="broker-card-header"> <div className="broker-card-title"> <h2>{review.name}</h2> <p><span>🇦🇺</span> AU • {review.years} years</p> </div> <div className="broker-card-score"> <span>{review.score.toFixed(1)}</span> <p>SCORE</p> </div> </div> <p className="broker-card-description">{review.description}</p> </div> </div> ); };
const ReviewPage = ({ onReviewClick }) => { const [activeSubTab, setActiveSubTab] = useState('broker'); return ( <div className="review-page"> <div className="review-nav"> <button className={`review-nav-btn ${activeSubTab === 'broker' ? 'active' : ''}`} onClick={() => setActiveSubTab('broker')} > Broker Review </button> <button className={`review-nav-btn ${activeSubTab === 'complaint' ? 'active' : ''}`} onClick={() => setActiveSubTab('complaint')} > Complaint </button> </div> <div className="review-content"> {activeSubTab === 'broker' ? ( <div className="review-grid"> {brokerReviews.map(review => ( <BrokerReviewCard key={review.id} review={review} onCardClick={onReviewClick} /> ))} </div> ) : ( <div className="placeholder-content"> <h1>Complaints</h1> <p>Content for complaints will be shown here.</p> </div> )} </div> </div> ); };
const TournamentNav = () => { const navItems = ['Matches', 'Rounds', 'Discussion', 'Leaderboard', 'Result']; const [activeItem, setActiveItem] = useState('Matches'); return ( <nav className="tournament-detail-nav"> {navItems.map(item => ( <button key={item} className={`tournament-nav-item ${activeItem === item ? 'active' : ''}`} onClick={() => setActiveItem(item)} > {item} </button> ))} </nav> ); };
const LiveMatchCard = ({ match }) => (
  <div className="live-match-detail-card">
      <div className="team-info">
          <div className="team-avatar">{match.team1.short}</div>
          <span className="team-name">{match.team1.name}</span>
          {/* SỬA "points" THÀNH "score" VÀ THÊM .toFixed(2) */}
          <span className="team-points">{match.team1.score.toFixed(2)} pts</span>
      </div>
      <div className="match-center-info">
          <span className="match-status">LIVE</span>
          <span className="match-vs">VS</span>
          <span className="match-countdown">{match.countdown}</span>
      </div>
      <div className="team-info">
          <div className="team-avatar">{match.team2.short}</div>
          <span className="team-name">{match.team2.name}</span>
          {/* SỬA "points" THÀNH "score" VÀ THÊM .toFixed(2) */}
          <span className="team-points">{match.team2.score.toFixed(2)} pts</span>
      </div>
  </div>
);
const TournamentDetailPage = ({ tournament, onClose, onMatchClick }) => { const liveMatchData = {
  team1: { name: 'Bộ phận tester', short: 'BPT', score: 1102.99 },
  team2: { name: 'Võ Tố Quyên', short: 'VTQ', score: 763.61 },
  countdown: '03:23:27'
}; return ( <div className="tournament-detail-page"> <div className="tournament-detail-header" style={{ backgroundImage: `url(${tournament.image})` }}> <div className="header-overlay"> <button onClick={onClose} className="back-button"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon"> <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /> </svg> </button> <div className="header-content"> <h1>{tournament.name}</h1> <div className="status-badge finished"> <ClockIcon /> <span>Finished</span> </div> </div> </div> </div> <div className="tournament-detail-body"> <TournamentNav /> <div className="live-matches-section"> <div className="section-title"> <span className="title-dot"></span> <h3>Live Matches</h3> </div> <div onClick={() => onMatchClick(liveMatchData)}> <LiveMatchCard match={liveMatchData} /> </div> </div> </div> </div> ); };
const MatchDetailPage = ({ match, onClose }) => { return ( <div className="match-detail-page"> <MatchDetailHeader match={match} onClose={onClose} /> <div className="match-detail-body-new"> <ScoreBar match={match} /> <VolumeMeter /> <AssetInfoBar /> <MatchNav /> <ChartControls /> <ChartPlaceholder /> </div> </div> ); };
const PersonalInformationPage = ({ onBack, user }) => { return ( <div className="personal-info-page"> <div className="personal-info-header"> <button onClick={onBack} className="back-button"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon"> <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /> </svg> </button> <h1>Personal Information</h1> </div> <div className="personal-info-body"> <div className="personal-info-avatar"> <span>{user.avatarInitials}</span> </div> <h2 className="user-name">{user.name}</h2> <p className="user-username">{user.username}</p> <div className="personal-info-details"> <div className="info-row"> <span className="info-label">Email</span> <span className="info-value">{user.email}</span> </div> <div className="info-row"> <span className="info-label">Wallet Address</span> <span className="info-value">{user.walletAddress}</span> </div> <div className="info-row"> <span className="info-label">VIP Level</span> <span className="info-value vip-level">{user.vipLevel}</span> </div> <div className="info-row"> <span className="info-label">Affiliate Link</span> <button className="copy-link-btn">Copy Link</button> </div> <div className="info-row"> <span className="info-label">Verified</span> <span className={`info-value ${user.isVerified ? 'verified-yes' : 'verified-no'}`}> {user.isVerified ? 'Yes' : 'No'} </span> </div> <div className="info-row"> <span className="info-label">Join Date</span> <span className="info-value">{user.joinDate}</span> </div> </div> </div> </div> ); };
const MatchDetailHeader = ({ match, onClose }) => ( <header className="match-detail-header-new"> <button onClick={onClose} className="back-button"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon"> <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /> </svg> </button> <div className="team-display"> <div className="team-avatar">{match.team1.short}</div> <span className="team-name">{match.team1.name}</span> </div> <div className="match-timer-block"> <span>{match.countdown}</span> <span className="vs-text">VS</span> </div> <div className="team-display"> <div className="team-avatar">{match.team2.short}</div> <span className="team-name">{match.team2.name}</span> </div> </header> );
const ScoreBar = ({ match }) => { const totalScore = match.team1.score + match.team2.score; const team1Percentage = (match.team1.score / totalScore) * 100; return ( <div className="score-bar-container"> <div className="score-bar-labels"> <span>Score: {match.team1.score.toFixed(2)}</span> <span>Score: {match.team2.score.toFixed(2)}</span> </div> <div className="score-bar-track"> <div className="score-bar-progress" style={{ width: `${team1Percentage}%` }}></div> </div> </div> ); };
const VolumeMeter = () => ( <div className="volume-meter-container"> <div className="volume-side"> <span>0.38</span> <span>1.20</span> </div> <div className="volume-dial"> <div className="volume-glow"></div> <span>VOLUME</span> </div> <div className="volume-side right"> <span>1.20</span> <span>0.37</span> </div> </div> );
const AssetInfoBar = () => ( <div className="asset-info-bar"> <div> <span className="asset-name">BTCUSDT</span> <span className="asset-type">USDT</span> </div> <div className="asset-stats"> <span>👁 1</span> <span>+ 0.00 USDT</span> </div> </div> );
const MatchNav = () => { const [activeTab, setActiveTab] = useState('Matching'); return ( <div className="match-nav"> <button className={activeTab === 'Matching' ? 'active' : ''} onClick={() => setActiveTab('Matching')}>Matching</button> <button className={activeTab === 'Discussion' ? 'active' : ''} onClick={() => setActiveTab('Discussion')}>Discussion</button> </div> ); };
const ChartControls = () => ( <div className="chart-controls"> <div className="chart-search"> <span>🔍 BTCUSDT</span> <button>+</button> </div> <div className="chart-intervals"> <button>1m</button> <button>30m</button> <button className="active">1h</button> </div> <div className="chart-tools"> <button>📊</button> <button>⚙️</button> </div> </div> );
const ChartPlaceholder = () => ( <div className="chart-placeholder"> <p>Trading Chart Area</p> <button className="trade-fab"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon"> <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /> </svg> </button> </div> );

// =======================================================
// MAIN APP COMPONENT
// =======================================================
const App = () => {
  // State
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);
  const [countdownTimers, setCountdownTimers] = useState({});
  const [visibleLiveTournaments, setVisibleLiveTournaments] = useState(3);
  const [visibleUpcomingTournaments, setVisibleUpcomingTournaments] = useState(3);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [onlinePlayers, setOnlinePlayers] = useState(9998000);
  const [viewingTournament, setViewingTournament] = useState(null);
  const [viewingMatch, setViewingMatch] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: window.innerWidth - 75, y: window.innerHeight - 80 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const chatEndRef = useRef(null);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  // Effects
  useEffect(() => { const timers = allTournaments.reduce((acc, curr) => { const isUpcoming = curr.startTime > 0; return { ...acc, [curr.name]: isUpcoming ? curr.startTime : curr.duration }; }, {}); setCountdownTimers(timers); const interval = setInterval(() => { setCountdownTimers(prevTimers => { const newTimers = { ...prevTimers }; for (const key in newTimers) { if (newTimers[key] > 0) newTimers[key] -= 1; } return newTimers; }); }, 1000); return () => clearInterval(interval); }, []);
  useEffect(() => { const autoScroll = setInterval(() => { setCurrentBanner(prev => (prev === bannerImages.length - 1 ? 0 : prev + 1)); }, 5000); return () => clearInterval(autoScroll); }, []);
  useEffect(() => { const interval = setInterval(() => { setOnlinePlayers(prev => prev + Math.floor(Math.random() * 50) + 1); }, 3000); return () => clearInterval(interval); }, []);
  useEffect(() => { const handleAuth = async (user) => { if (user) { setUserId(user.uid); } else { try { const cred = await signInAnonymously(auth); setUserId(cred.user.uid); } catch (error) { console.error("Anonymous sign-in failed:", error); } } setIsAuthReady(true); }; const unsubscribe = onAuthStateChanged(auth, handleAuth); return () => unsubscribe(); }, []);
  useEffect(() => { if (isAuthReady && userId) { const q = query(collection(db, `artifacts/${typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'}/public/data/chat_messages`)); const unsubscribe = onSnapshot(q, (snapshot) => { const fetchedMessages = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })).sort((a, b) => a.timestamp - b.timestamp); setMessages(fetchedMessages); }, (error) => { console.error("Error with Firestore listener:", error); }); return () => unsubscribe(); } }, [isAuthReady, userId]);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => { const handleOnline = () => setIsOnline(true); const handleOffline = () => setIsOnline(false); window.addEventListener('online', handleOnline); window.addEventListener('offline', handleOffline); return () => { window.removeEventListener('online', handleOnline); window.removeEventListener('offline', handleOffline); }; }, []);
  const handleScroll = () => { const currentScrollY = window.scrollY; if (currentScrollY > 50) { setShowHeader(currentScrollY < lastScrollY); } else { setShowHeader(true); } setLastScrollY(currentScrollY); };
  useEffect(() => { window.addEventListener('scroll', handleScroll); return () => window.removeEventListener('scroll', handleScroll); }, [lastScrollY]);
  const handleMouseDown = (e) => { const target = e.target.closest('button'); if (!target) return; setIsDragging(true); const rect = target.getBoundingClientRect(); setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top, }); };
  const handleMouseMove = (e) => { if (!isDragging) return; let newX = e.clientX - offset.x; let newY = e.clientY - offset.y; const buttonWidth = 64; const buttonHeight = 64; newX = Math.max(0, Math.min(newX, window.innerWidth - buttonWidth)); newY = Math.max(0, Math.min(newY, window.innerHeight - buttonHeight)); setDragPosition({ x: newX, y: newY }); };
  const handleMouseUp = () => setIsDragging(false);
  useEffect(() => { window.addEventListener('mousemove', handleMouseMove); window.addEventListener('mouseup', handleMouseUp); return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('mouseup', handleMouseUp); }; }, [isDragging, offset]);
  const sendMessage = async () => { if (newMessage.trim() === '' || !userId) return; try { await addDoc(collection(db, `artifacts/${typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'}/public/data/chat_messages`), { text: newMessage, timestamp: Date.now(), userId: userId, }); setNewMessage(''); } catch (e) { console.error("Error adding document: ", e); } };
  const formatTime = (seconds) => { const absSeconds = Math.max(0, seconds); const d = Math.floor(absSeconds / 86400); const h = Math.floor((absSeconds % 86400) / 3600); const m = Math.floor((absSeconds % 3600) / 60); const s = Math.floor(absSeconds % 60); if (d > 0) return `${d}d ${h.toString().padStart(2, '0')}h`; return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`; };
  const handleMenuClick = (tab) => { setActiveTab(tab); setIsLeftMenuOpen(false); };

  const renderContent = () => {
      const liveTournaments = allTournaments.filter(t => t.startTime === 0);
      const upcomingTournaments = allTournaments.filter(t => t.startTime > 0);
      
      switch (activeTab) {
          case 'Home':
              return ( <div className="home-container"> <div> <div className="section-header"> <LiveIconNew /> <h2>Live Tournaments</h2> </div> <div className="grid-container"> {liveTournaments.slice(0, visibleLiveTournaments).map((t, i) => <TournamentCard key={i} tournament={t} countdownTimers={countdownTimers} formatTime={formatTime} onViewDetails={setViewingTournament} />)} </div> {liveTournaments.length > visibleLiveTournaments && ( <div className="view-more-container"> <button onClick={() => setVisibleLiveTournaments(liveTournaments.length)} className="view-more-btn"> View More </button> </div> )} </div> <div className="online-players-banner"> <div className="text-center"> <h3>PLAYERS ONLINE</h3> <p>{onlinePlayers.toLocaleString()}</p> </div> </div> <div> <div className="section-header"> <UpcomingTournamentIcon /> <h2>Upcoming Tournaments</h2> </div> <div className="grid-container"> {upcomingTournaments.slice(0, visibleUpcomingTournaments).map((t, i) => <TournamentCard key={i} tournament={t} countdownTimers={countdownTimers} formatTime={formatTime} onViewDetails={setViewingTournament} />)} </div> {upcomingTournaments.length > visibleUpcomingTournaments && ( <div className="view-more-container"> <button onClick={() => setVisibleUpcomingTournaments(upcomingTournaments.length)} className="view-more-btn"> View More </button> </div> )} </div> <div> <div className="section-header"> <LiveMatchIcon /> <h2>Live Matches</h2> </div> <div className="grid-container"> {liveMatches.map((match, index) => ( <div key={index} className="live-match-card-new"> <div> <p className="match-teams">{match.team1} vs {match.team2}</p> <p className="match-game">{match.game}</p> </div> <div className="match-score"> <span className={match.score1 > match.score2 ? 'score-winner' : match.score1 < match.score2 ? 'score-loser' : 'score-tie'}>{match.score1}</span> <span>-</span> <span className={match.score2 > match.score1 ? 'score-winner' : match.score2 < match.score1 ? 'score-loser' : 'score-tie'}>{match.score2}</span> </div> </div> ))} </div> </div> </div> );
          case 'Review':
              return <ReviewPage onReviewClick={setSelectedReview} />;
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
              <MatchDetailPage match={viewingMatch} onClose={() => setViewingMatch(null)} />
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

                  <div className="banner-container">
                      <img src={bannerImages[currentBanner]} alt="Banner" className="banner-image" />
                  </div>

                  <LeftMenu 
                      isOpen={isLeftMenuOpen} 
                      onClose={() => setIsLeftMenuOpen(false)}
                      user={userProfile}
                  />

                  <main className="main-content">
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

                  <button
                      className={`chat-btn-draggable ${isDragging ? 'dragging' : ''}`}
                      style={{ top: dragPosition.y, left: dragPosition.x }}
                      onMouseDown={handleMouseDown}
                      onClick={() => !isDragging && setChatOpen(!chatOpen)}
                  >
                      <div className="chat-btn-inner">
                          <div className="chat-btn-ping"></div>
                          <img src="https://placehold.co/100x100/171f65/FFFFFF?text=Chat" alt="Chatbot Icon" className="chat-btn-icon" />
                          <div className="chat-btn-dot"></div>
                      </div>
                  </button>

                  {chatOpen && (
                      <div className="chat-window">
                          <div className="chat-header">
                              <h3>Global Chat</h3>
                              <button onClick={() => setChatOpen(false)}><CloseIcon /></button>
                          </div>
                          <div className="chat-messages">
                              {messages.map((msg) => (
                                  <div key={msg.id} className={`chat-message-container ${msg.userId === userId ? 'sent' : 'received'}`}>
                                      <div className={`chat-bubble ${msg.userId === userId ? 'sent' : 'received'}`}>
                                          <p>User: {msg.userId.substring(0, 6)}</p>
                                          {msg.text}
                                      </div>
                                  </div>
                              ))}
                              <div ref={chatEndRef} />
                          </div>
                          <div className="chat-input-area">
                              <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." />
                              <button onClick={sendMessage} className="chat-send-btn">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
                              </button>
                          </div>
                      </div>
                  )}
                   <footer className="app-footer">
                        <div className="footer-container">
                            <div className="footer-column">
                                <h3>About Us</h3>
                                <p>© 2025 Game Company. All Rights Reserved.</p>
                                <a href="mailto:support@example.com">Email: support@example.com</a>
                                <a href="#">Contact Form</a>
                            </div>
                            <div className="footer-column">
                                <h3>Legal</h3>
                                <ul>
                                    <li><a href="#">Terms of Service</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Community Guidelines</a></li>
                                </ul>
                            </div>
                            <div className="footer-column">
                                <h3>Useful Links</h3>
                                <ul>
                                    <li><a href="#">Leaderboard</a></li>
                                    <li><a href="#">Tournaments</a></li>
                                    <li><a href="#">Support / FAQ</a></li>
                                    <li><a href="#">Download App</a></li>
                                </ul>
                            </div>
                            <div className="footer-column">
                                <h3>Community</h3>
                                <div className="social-links">
                                    <a href="#" aria-label="Facebook"><FacebookIcon /></a>
                                    <a href="#" aria-label="Instagram"><InstagramIcon /></a>
                                    <a href="#" aria-label="Telegram"><TelegramIcon /></a>
                                    <a href="#" aria-label="Twitter"><XIcon /></a>
                                </div>
                                <div style={{marginTop: '1rem'}}>
                                    <select className="language-selector">
                                        <option>Tiếng Việt</option>
                                        <option>English</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </footer>
              </div>
          )}
          
          {selectedReview && <ReviewDetailPage review={selectedReview} onClose={() => setSelectedReview(null)} />}
          {isLoginModalOpen && <AuthModal onClose={() => setIsLoginModalOpen(false)} />}
          {!isOnline && <OfflineOverlay />}
      </div>
  );
};

export default App;