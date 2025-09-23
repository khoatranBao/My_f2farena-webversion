import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, onSnapshot, collection, query, addDoc } from 'firebase/firestore';
import { setLogLevel } from 'firebase/app';
import TradingChart from './components/TradingChart.jsx';
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
const brokerReviews = [
    {
      id: 1,
      image: goMarketsReviewImage,
      headerImage: goMarketsDetailHeader,
      logo: goMarketsImage, // Thêm logo riêng
      name: 'GO Markets',
      score: 4.7,
      country: 'AU',
      years: 20,
      description: 'GO Markets, a leading online trading broker, offers access to over 1,000 assets...', // Mô tả ngắn cho thẻ
      pros: [
        "Regulated by top-tier ASIC",
        "Competitive spreads on GO Plus+ account",
        "Excellent third-party tools (Trading Central, Autochartist)",
        "No deposit or withdrawal fees"
      ],
      cons: [
        "Lack of investor compensation fund",
        "Limited product range for international clients",
        "Standard account spreads are high",
        "No proprietary mobile app"
      ],
      glanceInfo: {
        "Regulation": "ASIC, CySEC, FSC",
        "Minimum Deposit": "$200",
        "Trading Platforms": "MT4, MT5",
        "Account Types": "Standard, GO Plus+"
      },
      rankDetails: {
        total: 4.7,
        criteria: [
          { name: 'License & Regulation', score: 5 },
          { name: 'Fund Security', score: 2.5 },
          { name: 'Localization & Support', score: 4 },
          { name: 'Commissions & Fees', score: 4 },
          { name: 'Platform Stability & Tools', score: 4.5 },
          { name: 'Onboarding & Ease of Use', score: 4.5 },
        ]
      },
      analysis: {
        introduction: "This report provides an objective, expert assessment of the online trading broker GO Markets. Our evaluation is based on a proprietary scoring system that weighs nine critical criteria, reflecting what matters most to traders, from regulatory security to trading costs.",
        detailedIntro: "Here is a breakdown of GO Markets' performance across PK Team's key evaluation metrics:",
        sections: [
          { title: "1. Regulation & Licensing (Weight: 25%)", content: "GO Markets operates under a multi-jurisdictional regulatory framework, which is a significant strength. The broker holds licenses from several reputable authorities:\n\n- **ASIC (Australia):** Authorized under AFSL 254963, ASIC is considered a top-tier regulator globally, ensuring high standards of compliance and transparency.\n\n- **CySEC (Cyprus):** This license allows GO Markets to serve the European Union market under the MiFID II framework.\n\n- **Other Jurisdictions:** The broker is also regulated by the FSA (Seychelles) and FSC (Mauritius), providing a regulated environment for its international clientele.\n\n**Conclusion:** The presence of multiple licenses, especially from top-tier agencies like ASIC, provides a strong layer of regulatory trust.", rating: "Excellent" },
          { title: "2. Investor Protection & Fund Security (Weight: 10%)", content: "A significant drawback is the apparent lack of an investor compensation scheme or deposit insurance. While ASIC mandates segregated client funds, GO Markets does not appear to participate in any publicly disclosed compensation fund (like the ICF in Cyprus for its CySEC entity) for retail traders under its other entities. This poses a potential risk to client capital in the event of broker insolvency.", rating: "Very Poor / Non-existent" },
        ],
        conclusion: "GO Markets presents a mixed but generally positive profile. Its primary strength is its robust regulatory framework, anchored by the top-tier ASIC license, which inspires a high degree of confidence. Trading conditions, particularly on its ECN account, are competitive, and the provision of advanced tools like Trading Central and Autochartist adds significant value.\n\nHowever, the most glaring weakness is the lack of an investor compensation fund, a critical safety net that traders expect from top brokers. This, combined with a somewhat limited product range for international clients (no physical stocks or ETFs) and a standard mobile offering, tempers our overall enthusiasm.",
        recommendation: "**YES, for experienced traders** who prioritize strong regulation and low-cost ECN trading conditions. If you are comfortable with the MetaTrader suite and your strategy does not rely on asset classes like ETFs or physical international stocks, GO Markets is a solid choice.\n\n**CONSIDER ALTERNATIVES,** if you are a beginner who may face higher spreads on the Standard account, or if you require the absolute highest level of capital security offered by an investor protection fund. Traders seeking a broader range of real assets or more flexible withdrawal times (including weekends) may also find better-suited brokers elsewhere."
      }
    },
];
const instrumentList = [
    { name: 'BTC/USDT', price: '68,450.5', change: 2.45 },
    { name: 'ETH/USDT', price: '3,560.1', change: -1.12 },
    { name: 'SOL/USDT', price: '150.78', change: 5.68 },
];
const mockComments = [
    { user: 'TraderX', time: '1 min ago', text: 'BTC looking bullish, potential breakout soon.' },
    { user: 'CryptoQueen', time: '3 min ago', text: 'I agree, volume is picking up. Watching closely.' },
    { user: 'WhaleWatcher', time: '5 min ago', text: 'Big buy order just filled on Binance. Something is coming.' },
    { user: 'Hodler123', time: '12 min ago', text: 'Is it too late to get in?' },
];

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
const ReviewDetailPage = ({ review, onClose }) => { useEffect(() => { const pageElement = document.querySelector('.review-detail-page'); if (pageElement) pageElement.scrollTo(0, 0); }, [review]); return ( <div className="review-detail-page"> <div className="review-detail-header-bar"> <button onClick={onClose} className="back-button-detail"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg> <span>All Reviews</span> </button> </div> <div className="broker-detail-layout"> <main className="broker-detail-main"> <header className="broker-header"> <img src={review.logo} alt={`${review.name} Logo`} className="broker-logo"/> <div> <h1>{review.name} Review</h1> <p>An in-depth look at fees, platforms, and trust.</p> </div> </header> <ProsCons pros={review.pros} cons={review.cons} /> <DetailedAnalysis analysis={review.analysis} /> </main> <aside> <BrokerDetailSidebar review={review} /> </aside> </div> </div> ); };
const BrokerReviewCard = ({ review, onCardClick }) => { return ( <div className="broker-card" onClick={() => onCardClick(review)}> <img src={review.image} alt={`${review.name} review`} className="broker-card-img" /> <div className="broker-card-body"> <div className="broker-card-header"> <div className="broker-card-title"> <h2>{review.name}</h2> <p><span>🇦🇺</span> AU • {review.years} years</p> </div> <div className="broker-card-score"> <span>{review.score.toFixed(1)}</span> <p>SCORE</p> </div> </div> <p className="broker-card-description">{review.description}</p> </div> </div> ); };
const ReviewPage = ({ onReviewClick }) => { const [activeSubTab, setActiveSubTab] = useState('broker'); return ( <div className="review-page"> <div className="review-nav"> <button className={`review-nav-btn ${activeSubTab === 'broker' ? 'active' : ''}`} onClick={() => setActiveSubTab('broker')} > Broker Review </button> <button className={`review-nav-btn ${activeSubTab === 'complaint' ? 'active' : ''}`} onClick={() => setActiveSubTab('complaint')} > Complaint </button> </div> <div className="review-content"> {activeSubTab === 'broker' ? ( <div className="review-grid"> {brokerReviews.map(review => ( <BrokerReviewCard key={review.id} review={review} onCardClick={onReviewClick} /> ))} </div> ) : ( <div className="placeholder-content"> <h1>Complaints</h1> <p>Content for complaints will be shown here.</p> </div> )} </div> </div> ); };
const TournamentNav = () => { const navItems = ['Matches', 'Rounds', 'Discussion', 'Leaderboard', 'Result']; const [activeItem, setActiveItem] = useState('Matches'); return ( <nav className="tournament-detail-nav"> {navItems.map(item => ( <button key={item} className={`tournament-nav-item ${activeItem === item ? 'active' : ''}`} onClick={() => setActiveItem(item)} > {item} </button> ))} </nav> ); };
const ProsCons = ({ pros, cons }) => ( <div className="pros-cons-container"> <div className="pros-list"> <h4>Pros</h4> <ul> {pros.map((pro, index) => <li key={index}>{pro}</li>)} </ul> </div> <div className="cons-list"> <h4>Cons</h4> <ul> {cons.map((con, index) => <li key={index}>{con}</li>)} </ul> </div> </div> );
const BrokerDetailSidebar = ({ review }) => ( <div className="broker-detail-sidebar"> <div className="rating-summary-box"> <h4>PK Team Rating</h4> <div className="overall-score">{review.score.toFixed(1)}<span>/5.0</span></div> <StarRating score={review.score} /> <button className="visit-broker-btn">Visit Broker</button> </div> <div className="at-a-glance-box"> <h4>At a Glance</h4> <ul> {Object.entries(review.glanceInfo).map(([key, value]) => ( <li key={key}> <strong>{key}:</strong> {value} </li> ))} </ul> </div> </div> );
const DetailedAnalysis = ({ analysis }) => ( <div className="detailed-analysis"> <p>{analysis.introduction}</p> <h4>{analysis.detailedIntro}</h4> {analysis.sections.map(section => ( <div key={section.title} className="analysis-section"> <h5>{section.title}</h5> {section.content.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</p>)} <p><strong>PK Team Rating:</strong> <span className="pk-team-rating">{section.rating}</span></p> </div> ))} <h4>Conclusion & Recommendation</h4> {analysis.conclusion.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)} {analysis.recommendation.split('\n\n').map((paragraph, index) => <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />)} </div> );
const LiveMatchCard = ({ match }) => ( <div className="live-match-detail-card"> <div className="team-info"> <div className="team-avatar">{match.team1.short}</div> <span className="team-name">{match.team1.name}</span> <span className="team-points">{match.team1.score.toFixed(2)} pts</span> </div> <div className="match-center-info"> <span className="match-status">LIVE</span> <span className="match-vs">VS</span> <span className="match-countdown">{match.countdown}</span> </div> <div className="team-info"> <div className="team-avatar">{match.team2.short}</div> <span className="team-name">{match.team2.name}</span> <span className="team-points">{match.team2.score.toFixed(2)} pts</span> </div> </div> );
const TournamentDetailPage = ({ tournament, onClose, onMatchClick }) => { const liveMatchData = { team1: { name: 'Bộ phận tester', short: 'BPT', score: 1102.99 }, team2: { name: 'Võ Tố Quyên', short: 'VTQ', score: 763.61 }, countdown: '03:23:27' }; return ( <div className="tournament-detail-page"> <div className="tournament-detail-header" style={{ backgroundImage: `url(${tournament.image})` }}> <div className="header-overlay"> <button onClick={onClose} className="back-button"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon"> <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /> </svg> </button> <div className="header-content"> <h1>{tournament.name}</h1> <div className="status-badge finished"> <ClockIcon /> <span>Finished</span> </div> </div> </div> </div> <div className="tournament-detail-body"> <TournamentNav /> <div className="live-matches-section"> <div className="section-title"> <span className="title-dot"></span> <h3>Live Matches</h3> </div> <div onClick={() => onMatchClick(liveMatchData)}> <LiveMatchCard match={liveMatchData} /> </div> </div> </div> </div> ); };
const PersonalInformationPage = ({ onBack, user }) => { return ( <div className="personal-info-page"> <div className="personal-info-header"> <button onClick={onBack} className="back-button"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon"> <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /> </svg> </button> <h1>Personal Information</h1> </div> <div className="personal-info-body"> <div className="personal-info-avatar"> <span>{user.avatarInitials}</span> </div> <h2 className="user-name">{user.name}</h2> <p className="user-username">{user.username}</p> <div className="personal-info-details"> <div className="info-row"> <span className="info-label">Email</span> <span className="info-value">{user.email}</span> </div> <div className="info-row"> <span className="info-label">Wallet Address</span> <span className="info-value">{user.walletAddress}</span> </div> <div className="info-row"> <span className="info-label">VIP Level</span> <span className="info-value vip-level">{user.vipLevel}</span> </div> <div className="info-row"> <span className="info-label">Affiliate Link</span> <button className="copy-link-btn">Copy Link</button> </div> <div className="info-row"> <span className="info-label">Verified</span> <span className={`info-value ${user.isVerified ? 'verified-yes' : 'verified-no'}`}> {user.isVerified ? 'Yes' : 'No'} </span> </div> <div className="info-row"> <span className="info-label">Join Date</span> <span className="info-value">{user.joinDate}</span> </div> </div> </div> </div> ); };

// =======================================================
// NEW/UPDATED COMPONENTS FOR TRADING VIEW
// =======================================================

// --- Icons for the new Chart Controls ---
const BarsIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M4 4h2v16H4V4zm4 8h2v8H8v-8zm4-5h2v13h-2V7zm4 5h2v8h-2v-8zm4-3h2v11h-2V9z"></path></svg>);
const CandlesIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M8 4h2v2H8V4zm0 3h2v10H8V7zm-3 2h2v3H5V9zm12 0h2v3h-2V9zm-6 1h2v2h-2v-1zm0 3h2v5h-2v-5zm-3 1h2v3H8v-3zm6 0h2v3h-2v-3z"></path></svg>);
const HollowCandlesIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M8 4h2v2H8V4zm0 3h2v2H8V7zm0 3h2v4H8v-4zm0 5h2v2H8v-2zm-3-5h2v2H5v-2zm0 3h2v2H5v-2zm12-5h2v2h-2v-2zm0 3h2v2h-2v-2z"></path></svg>);
const LineIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3.5 18.5l6-6.5 4 4 8-9.5-1.5-1.5-6.5 8-4-4-7.5 8L3.5 18.5z"></path></svg>);
const LineWithMarkersIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3.5 18.5l6-6.5 4 4 8-9.5-1.5-1.5-6.5 8-4-4-7.5 8L3.5 18.5zm-1-1.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm6-6.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm4 4a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm8-9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>);
const StepLineIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M4 18h2v-3h3v-2h2v4h3v-3h2v-2h3v4h3v-2h-2v-2h-3v2h-2v-3h-3v2h-2v-4H8v2H5v3H4v2z"></path></svg>);
const AreaIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M21 18.5l-8-9.5-4 4-6-6.5L1.5 8l7.5 8 4-4 6.5 7.5H21v-1.5z"></path></svg>);
const HlcAreaIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none"><path strokeWidth="1.5" d="M4 18l4-4 4 4 8-8m-3-1h3v3M4 10l4 4 4-4 8-8"/></svg>);
const HeikinAshiIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M8 4h2v3H8V4zm0 4h2v10H8V8zm-3 2h2v4H5v-4zm12 0h2v4h-2v-4zm-6 1h2v2h-2v-1z"></path></svg>);
const IndicatorsIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3 18h2v-2H3v2zm4 0h2v-5H7v5zm4 0h2v-8h-2v8zm4-11v11h2V7h-2zm4 3v8h2v-8h-2z"></path></svg>);
const DropdownArrowIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24"><path fill="currentColor" d="M7 10l5 5 5-5z"></path></svg>);
const TimeframeArrowIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M7 10l5 5 5-5H7z"></path></svg>);


// --- New Component for Sidebar Tabs ---
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
    const updatedMatchData = { ...match, team1: { name: 'Bộ phận tester', short: 'BPT', score: 0 }, team2: { name: 'Võ Tố Quyên', short: 'VTQ', score: 0 }, };
  
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
  
    // ✅ =============================================================
    // ✅ LOGIC XỬ LÝ CUỘN CHUỘT (PHIÊN BẢN SỬA LỖI)
    // ✅ =============================================================
    const [showHeader, setShowHeader] = useState(true);
    const lastScrollY = useRef(window.scrollY);

    useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY.current) { 
        setShowHeader(true);
      } 
      else if (currentScrollY > lastScrollY.current && currentScrollY > 10) { 
        setShowHeader(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    // Effects
    useEffect(() => { const timers = allTournaments.reduce((acc, curr) => { const isUpcoming = curr.startTime > 0; return { ...acc, [curr.name]: isUpcoming ? curr.startTime : curr.duration }; }, {}); setCountdownTimers(timers); const interval = setInterval(() => { setCountdownTimers(prevTimers => { const newTimers = { ...prevTimers }; for (const key in newTimers) { if (newTimers[key] > 0) newTimers[key] -= 1; } return newTimers; }); }, 1000); return () => clearInterval(interval); }, []);
    useEffect(() => { const autoScroll = setInterval(() => { setCurrentBanner(prev => (prev === bannerImages.length - 1 ? 0 : prev + 1)); }, 5000); return () => clearInterval(autoScroll); }, []);
    useEffect(() => { const interval = setInterval(() => { setOnlinePlayers(prev => prev + Math.floor(Math.random() * 50) + 1); }, 3000); return () => clearInterval(interval); }, []);
    useEffect(() => { const handleAuth = async (user) => { if (user) { setUserId(user.uid); } else { try { const cred = await signInAnonymously(auth); setUserId(cred.user.uid); } catch (error) { console.error("Anonymous sign-in failed:", error); } } setIsAuthReady(true); }; const unsubscribe = onAuthStateChanged(auth, handleAuth); return () => unsubscribe(); }, []);
    useEffect(() => { if (isAuthReady && userId) { const q = query(collection(db, `artifacts/${typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'}/public/data/chat_messages`)); const unsubscribe = onSnapshot(q, (snapshot) => { const fetchedMessages = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })).sort((a, b) => a.timestamp - b.timestamp); setMessages(fetchedMessages); }, (error) => { console.error("Error with Firestore listener:", error); }); return () => unsubscribe(); } }, [isAuthReady, userId]);
    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
    useEffect(() => { const handleOnline = () => setIsOnline(true); const handleOffline = () => setIsOnline(false); window.addEventListener('online', handleOnline); window.addEventListener('offline', handleOffline); return () => { window.removeEventListener('online', handleOnline); window.removeEventListener('offline', handleOffline); }; }, []);
    
    const handleMouseDown = (e) => { const target = e.target.closest('button'); if (!target) return; setIsDragging(true); const rect = target.getBoundingClientRect(); setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top, }); };
    const handleMouseMove = (e) => { if (!isDragging) return; let newX = e.clientX - offset.x; let newY = e.clientY - offset.y; const buttonWidth = 64; const buttonHeight = 64; newX = Math.max(0, Math.min(newX, window.innerWidth - buttonWidth)); newY = Math.max(0, Math.min(newY, window.innerHeight - buttonHeight)); setDragPosition({ x: newX, y: newY }); };
    const handleMouseUp = () => setIsDragging(false);
    useEffect(() => { window.addEventListener('mousemove', handleMouseMove); window.addEventListener('mouseup', handleMouseUp); return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('mouseup', handleMouseUp); }; }, [isDragging, offset]);
    const sendMessage = async () => { if (newMessage.trim() === '' || !userId) return; try { await addDoc(collection(db, `artifacts/${typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'}/public/data/chat_messages`), { text: newMessage, timestamp: Date.now(), userId: userId, }); setNewMessage(''); } catch (e) { console.error("Error adding document: ", e); } };
    const formatTime = (seconds) => { const absSeconds = Math.max(0, seconds); const d = Math.floor(absSeconds / 86400); const h = Math.floor((absSeconds % 86400) / 3600); const m = Math.floor((absSeconds % 3600) / 60); const s = Math.floor(absSeconds % 60); if (d > 0) return `${d}d ${h.toString().padStart(2, '0')}h`; return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`; };
  
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