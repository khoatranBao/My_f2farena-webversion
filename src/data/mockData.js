// src/data/mockData.js

// Import các hình ảnh cần thiết cho mock data
import bannerImage1 from '../assets/banner1.jpg';
import bannerImage2 from '../assets/banner2.jpg';
import bannerImage3 from '../assets/banner3.jpeg';
import goMarketsImage from '../assets/tournament_go_markets.jpg';
import eliteBattleImage from '../assets/tournament_elite_battle.jpg';
import cryptoClashImage from '../assets/tournament_crypto_clash.jpg';
import forexMastersImage from '../assets/tournament_forex_masters.jpg';
import digitalAssetImage from '../assets/tournament_digital_asset.jpg';
import globalTradingImage from '../assets/tournament_global_trading.jpg';
import cryptoCupImage from '../assets/tournament_crypto_cup.jpg';
import fxBattleImage from '../assets/tournament_fx_battle.jpg';
import stockRallyImage from '../assets/tournament_stock_rally.jpg';
import tokenTitanImage from '../assets/tournament_token_titan.jpg';
import quantumFuturesImage from '../assets/tournament_quantum_futures.jpg';
import asiaPacificImage from '../assets/tournament_asia_pacific.jpg';
import decentralizedDeFiImage from '../assets/tournament_decentralized_defi.jpg';
import goMarketsReviewImage from '../assets/go_markets_review.jpg';
import goMarketsDetailHeader from '../assets/go_markets_review1.jpg';

// Helper function to create future UTC date strings
const getFutureUTCTime = (hours) => new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();

export const allTournaments = [
    // Live Tournaments (Start time is in the past, end time is in the future)
    { name: "Go Markets Trading Challenge", prize: "$1,000,000 USDT", participants: 1250, image: goMarketsImage, startTimeUTC: getFutureUTCTime(-1), endTimeUTC: getFutureUTCTime(1) },
    { name: "Elite Battle Royale", prize: "$500,000 USD", participants: 980, image: eliteBattleImage, startTimeUTC: getFutureUTCTime(-2), endTimeUTC: getFutureUTCTime(2) },
    { name: "Crypto Clash", prize: "$250,000 BTC", participants: 2100, image: cryptoClashImage, startTimeUTC: getFutureUTCTime(-0.5), endTimeUTC: getFutureUTCTime(0.5) },

    // Upcoming Tournaments (Start and end times are in the future)
    { name: "Forex Masters Championship", prize: "$1,500,000 USD", participants: 1500, image: forexMastersImage, startTimeUTC: getFutureUTCTime(24), endTimeUTC: getFutureUTCTime(27) },
    { name: "Digital Asset Sprint", prize: "$750,000 ETH", participants: 1800, image: digitalAssetImage, startTimeUTC: getFutureUTCTime(12), endTimeUTC: getFutureUTCTime(13.5) },
    { name: "Global Trading Challenge", prize: "$2,000,000 USDT", participants: 3000, image: globalTradingImage, startTimeUTC: getFutureUTCTime(48), endTimeUTC: getFutureUTCTime(49) },
    { name: "Crypto Cup 2025", prize: "$1,200,000 USD", participants: 2500, image: cryptoCupImage, startTimeUTC: getFutureUTCTime(36), endTimeUTC: getFutureUTCTime(38) },
    { name: "FX Battle Arena", prize: "$800,000 BTC", participants: 1900, image: fxBattleImage, startTimeUTC: getFutureUTCTime(4), endTimeUTC: getFutureUTCTime(4.5) },
    { name: "Stock Market Rally", prize: "$900,000 USD", participants: 2200, image: stockRallyImage, startTimeUTC: getFutureUTCTime(8), endTimeUTC: getFutureUTCTime(11) },
    { name: "Token Titan Tournament", prize: "$1,100,000 ETH", participants: 2700, image: tokenTitanImage, startTimeUTC: getFutureUTCTime(14), endTimeUTC: getFutureUTCTime(15.5) },
    { name: "Quantum Futures Derby", prize: "500 BTC", participants: 5000, image: quantumFuturesImage, startTimeUTC: getFutureUTCTime(72), endTimeUTC: getFutureUTCTime(78) },
    { name: "Asia Pacific Index Rally", prize: "$3,000,000 USD", participants: 4500, image: asiaPacificImage, startTimeUTC: getFutureUTCTime(5), endTimeUTC: getFutureUTCTime(9) },
    { name: "Decentralized DeFi Duel", prize: "1,000,000 DAI", participants: 3300, image: decentralizedDeFiImage, startTimeUTC: getFutureUTCTime(60), endTimeUTC: getFutureUTCTime(84) },
];

export const brokerReviews = [ { id: 1, image: goMarketsReviewImage, headerImage: goMarketsDetailHeader, logo: goMarketsImage, name: 'GO Markets', score: 4.7, country: 'AU', years: 20, description: 'GO Markets, a leading online trading broker, offers access to over 1,000 assets...', pros: ["Regulated by top-tier ASIC", "Competitive spreads on GO Plus+", "Excellent third-party tools (Trading Central, Autochartist)", "No deposit or withdrawal fees"], cons: ["Lack of investor compensation fund", "Limited product range for international clients", "Standard account spreads are high", "No proprietary mobile app"], glanceInfo: { "Regulation": "ASIC, CySEC, FSC", "Minimum Deposit": "$200", "Trading Platforms": "MT4, MT5", "Account Types": "Standard, GO Plus+"}, rankDetails: { total: 4.7, criteria: [ { name: 'License & Regulation', score: 5 }, { name: 'Fund Security', score: 2.5 }, { name: 'Localization & Support', score: 4 }, { name: 'Commissions & Fees', score: 4 }, { name: 'Platform Stability & Tools', score: 4.5 }, { name: 'Onboarding & Ease of Use', score: 4.5 }, ] }, analysis: { introduction: "This report provides an objective, expert assessment of the online trading broker GO Markets. Our evaluation is based on a proprietary scoring system that weighs nine critical criteria, reflecting what matters most to traders, from regulatory security to trading costs.", detailedIntro: "Here is a breakdown of GO Markets' performance across PK Team's key evaluation metrics:", sections: [ { title: "1. Regulation & Licensing (Weight: 25%)", content: "GO Markets operates under a multi-jurisdictional regulatory framework, which is a significant strength. The broker holds licenses from several reputable authorities:\n\n- **ASIC (Australia):** Authorized under AFSL 254963, ASIC is considered a top-tier regulator globally, ensuring high standards of compliance and transparency.\n\n- **CySEC (Cyprus):** This license allows GO Markets to serve the European Union market under the MiFID II framework.\n\n- **Other Jurisdictions:** The broker is also regulated by the FSA (Seychelles) and FSC (Mauritius), providing a regulated environment for its international clientele.\n\n**Conclusion:** The presence of multiple licenses, especially from top-tier agencies like ASIC, provides a strong layer of regulatory trust.", rating: "Excellent" }, { title: "2. Investor Protection & Fund Security (Weight: 10%)", content: "A significant drawback is the apparent lack of an investor compensation scheme or deposit insurance. While ASIC mandates segregated client funds, GO Markets does not appear to participate in any publicly disclosed compensation fund (like the ICF in Cyprus for its CySEC entity) for retail traders under its other entities. This poses a potential risk to client capital in the event of broker insolvency.", rating: "Very Poor / Non-existent" }, ], conclusion: "GO Markets presents a mixed but generally positive profile. Its primary strength is its robust regulatory framework, anchored by the top-tier ASIC license, which inspires a high degree of confidence. Trading conditions, particularly on its ECN account, are competitive, and the provision of advanced tools like Trading Central and Autochartist adds significant value.\n\nHowever, the most glaring weakness is the lack of an investor compensation fund, a critical safety net that traders expect from top brokers. This, combined with a somewhat limited product range for international clients (no physical stocks or ETFs) and a standard mobile offering, tempers our overall enthusiasm.", recommendation: "**YES, for experienced traders** who prioritize strong regulation and low-cost ECN trading conditions. If you are comfortable with the MetaTrader suite and your strategy does not rely on asset classes like ETFs or physical international stocks, GO Markets is a solid choice.\n\n**CONSIDER ALTERNATIVES,** if you are a beginner who may face higher spreads on the Standard account, or if you require the absolute highest level of capital security offered by an investor protection fund. Traders seeking a broader range of real assets or more flexible withdrawal times (including weekends) may also find better-suited brokers elsewhere." } }, { id: 2, image: eliteBattleImage, headerImage: eliteBattleImage, logo: eliteBattleImage, name: 'VertexFX Prime', score: 4.5, country: 'GB', years: 12, description: 'VertexFX Prime is known for its powerful proprietary platform and deep liquidity...', pros: ["FCA regulated (UK)", "Advanced proprietary trading platform", "Very low spreads on major pairs", "Strong research and analytics"], cons: ["High minimum deposit ($1000)", "Platform can be complex for beginners", "Limited educational resources"], glanceInfo: { "Regulation": "FCA, DFSA", "Minimum Deposit": "$1000", "Trading Platforms": "VertexFX Trader", "Account Types": "Pro, Institutional"}, rankDetails: { total: 4.5, criteria: [ { name: 'License & Regulation', score: 5 }, { name: 'Fund Security', score: 4 }, { name: 'Localization & Support', score: 4 }, { name: 'Commissions & Fees', score: 4.5 }, { name: 'Platform Stability & Tools', score: 5 }, { name: 'Onboarding & Ease of Use', score: 3.5 }, ] }, analysis: { introduction: "VertexFX Prime stands out as a top choice for professional and institutional traders...", detailedIntro: "Below is the performance analysis of VertexFX Prime:", sections: [ { title: "1. Regulation & Licensing (Weight: 25%)", content: "Regulated by the FCA in the United Kingdom, VertexFX Prime adheres to the highest standards...", rating: "Excellent" }, { title: "2. Investor Protection & Fund Security (Weight: 10%)", content: "Clients are covered by the FSCS up to £85,000, offering a strong safety net.", rating: "Good" }, ], conclusion: "VertexFX Prime is a powerhouse for serious traders...", recommendation: "**YES, for professional traders**... \n\n**AVOID,** if you are a beginner..." } }, { id: 3, image: quantumFuturesImage, headerImage: quantumFuturesImage, logo: quantumFuturesImage, name: 'Quantum Markets', score: 4.2, country: 'SG', years: 5, description: 'A fast-growing broker in the APAC region, focusing on crypto and futures trading.', pros: ["MAS regulated (Singapore)", "Wide range of cryptocurrency pairs", "User-friendly mobile app", "Low deposit and withdrawal fees"], cons: ["Spreads can widen during volatility", "Customer support can be slow", "Not available in Europe or North America"], glanceInfo: { "Regulation": "MAS", "Minimum Deposit": "$50", "Trading Platforms": "Web Trader, Mobile App", "Account Types": "Standard, Crypto Pro"}, rankDetails: { total: 4.2, criteria: [ { name: 'License & Regulation', score: 4.5 }, { name: 'Fund Security', score: 4 }, { name: 'Localization & Support', score: 3 }, { name: 'Commissions & Fees', score: 4.5 }, { name: 'Platform Stability & Tools', score: 4 }, { name: 'Onboarding & Ease of Use', score: 5 }, ] }, analysis: { introduction: "Quantum Markets has carved a niche for itself in the Asian market...", detailedIntro: "Here is the evaluation of Quantum Markets:", sections: [ { title: "1. Regulation & Licensing (Weight: 25%)", content: "Holding a license from the Monetary Authority of Singapore (MAS) is a strong point...", rating: "Good" }, { title: "2. Investor Protection & Fund Security (Weight: 10%)", content: "Client funds are segregated in top Singaporean banks, providing a good level of security.", rating: "Good" }, ], conclusion: "Quantum Markets is an excellent entry point for crypto-focused traders...", recommendation: "**YES, for mobile-first and crypto traders**... \n\n**CONSIDER ALTERNATIVES,** if you need forex or dedicated desktop platforms..." } }, ];

export const userProfile = {
    avatarInitials: 'TK',
    name: 'Tran Khoa',
    username: '@6077723854',
    walletAddress: 'Null',
    vipLevel: 'diamond',
    affiliateLink: 'https://f2farena.com/ref/6077723854',
    trustPoints: 100,
    isVerified: false,
    joinDate: '15/9/2025'
};
export const bannerImages = [ bannerImage1, bannerImage2, bannerImage3 ];

export const liveMatches = [ { team1: "Team Alpha", team2: "Team Omega", score1: 2, score2: 1, game: "Valorant" }, { team1: "Giants", team2: "Titans", score1: 0, score2: 0, game: "League of Legends" }, { team1: "Phoenix", team2: "Dragon", score1: 3, score2: 2, game: "CS:GO" }, { team1: "Wolves", team2: "Bears", score1: 1, score2: 1, game: "Dota 2" }, { team1: "Shadows", team2: "Ninjas", score1: 5, score2: 4, game: "Overwatch" }, { team1: "Vipers", team2: "Cobras", score1: 2, score2: 0, game: "Valorant" }, ];
export const instrumentList = [ { name: 'BTC/USDT', price: '68,450.5', change: 2.45 }, { name: 'ETH/USDT', price: '3,560.1', change: -1.12 }, { name: 'SOL/USDT', price: '150.78', change: 5.68 }, ];

export const mockComments = [ { user: 'TraderX', time: '1 min ago', text: 'BTC looking bullish, potential breakout soon.' }, { user: 'CryptoQueen', time: '3 min ago', text: 'I agree, volume is picking up. Watching closely.' }, { user: 'WhaleWatcher', time: '5 min ago', text: 'Big buy order just filled on Binance. Something is coming.' }, { user: 'Hodler123', time: '12 min ago', text: 'Is it too late to get in?' }, ];

export const mockComplaints = [ { id: 1, title: 'Withdrawal delayed for over 72 hours', broker: 'GO Markets', user: 'User123', date: '20 Sep 2025', status: 'Open' }, { id: 2, title: 'Incorrect spread applied on EUR/USD', broker: 'VertexFX Prime', user: 'ProTrader', date: '18 Sep 2025', status: 'Resolved' }, { id: 3, title: 'Platform froze during NFP announcement', broker: 'Quantum Markets', user: 'NewbieTrader', date: '15 Sep 2025', status: 'Open' }, ];

export const mockPrivateCups = [ { id: 1, creatorName: 'Bộ phận tester', cupName: 'Pro Traders Cup', prize: '5,000 USDT', participants: 48, symbol: 'BTCUSD', timer: '01:15:30', avatar: goMarketsImage }, { id: 2, creatorName: 'CryptoWhale', cupName: 'Altcoin Challenge', prize: '10 ETH', participants: 120, symbol: 'ETHUSD', timer: '23:45:10', avatar: goMarketsImage }, { id: 3, creatorName: 'GoldenCross', cupName: 'Gold Rush Weekly', prize: '1,000 USDT', participants: 25, symbol: 'XAUUSD', timer: '00:30:00', avatar: goMarketsImage }, { id: 4, creatorName: 'The Strategist', cupName: 'FX Major League', prize: '2,500 USD', participants: 75, symbol: 'EURUSD', timer: '15:00:00', avatar: goMarketsImage }, ];

export const mockOneVsOneMatches = [
    { id: 1, name: 'Thanh', duration: '5 min', symbol: 'BTC/USDT', bet: 12 },
    { id: 2, name: 'CryptoKing', duration: '15 min', symbol: 'ETH/USDT', bet: 50 },
    { id: 3, name: 'ProTraderX', duration: '3 min', symbol: 'SOL/USDT', bet: 25 },
    { id: 4, name: 'MarketWhiz', duration: '30 min', symbol: 'XAU/USD', bet: 100 },
    { id: 5, name: 'BearSlayer', duration: '10 min', symbol: 'BTC/USDT', bet: 75 },
];

export const mockActivities = [
    { type: 'BUY', player: 'BPT', quantity: 0.5, symbol: 'BTC', price: '68,113.45', time: 1 },
    { type: 'SELL', player: 'VTQ', quantity: 1.2, symbol: 'ETH', price: '3,550.10', time: 3 },
    { type: 'CLOSE', player: 'BPT', quantity: 0.2, symbol: 'BTC', price: '68,345.00', time: 5 },
    { type: 'BUY', player: 'VTQ', quantity: 15.0, symbol: 'SOL', price: '150.88', time: 8 },
];


// =======================================================
// === DỮ LIỆU MỚI ĐƯỢC CHUYỂN SANG TỪ CÁC COMPONENT CON ===
// =======================================================

// Dữ liệu cho TournamentDetailPage
export const liveMatchData = { team1: { name: 'Bộ phận tester', short: 'BPT', score: 1102.99 }, team2: { name: 'Võ Tố Quyên', short: 'VTQ', score: 763.61 }, countdown: '03:23:27' };
export const matchInfoData = { prizePool: '500,000 USDT', symbol: 'BTC/USDT', format: '1v1 Score Attack' };

// Dữ liệu cho OldLeaderboardPage
export const mockLeaderboardData = [
    { rank: 1, name: 'CryptoKing', score: 1540.77, volume: '2.5M', initials: 'CK' },
    { rank: 2, name: 'ProTraderX', score: 1490.12, volume: '2.2M', initials: 'PX' },
    { rank: 3, name: 'MarketWhiz', score: 1450.55, volume: '2.8M', initials: 'MW' },
    { rank: 4, name: 'FutureSight', score: 1380.91, volume: '1.9M', initials: 'FS' },
    { rank: 5, name: 'VelocityTrader', score: 1350.23, volume: '2.1M', initials: 'VT' },
    { rank: 6, name: 'QuantumLeap', score: 1322.88, volume: '1.7M', initials: 'QL' },
    { rank: 7, name: 'ApexPredator', score: 1298.45, volume: '2.4M', initials: 'AP' },
    { rank: 8, name: 'TheStrategist', score: 1275.00, volume: '1.5M', initials: 'TS' },
    { rank: 9, name: 'MomentumMaster', score: 1251.34, volume: '1.8M', initials: 'MM' },
    { rank: 10, name: 'GoldenCross', score: 1230.99, volume: '2.0M', initials: 'GC' },
    { rank: 11, name: 'ScalperPro', score: 1210.76, volume: '1.6M', initials: 'SP' },
    { rank: 12, name: 'WaveRider', score: 1195.43, volume: '1.4M', initials: 'WR' },
    { rank: 13, name: 'BullRun', score: 1180.11, volume: '1.9M', initials: 'BR' },
    { rank: 14, name: 'BearSlayer', score: 1165.67, volume: '2.3M', initials: 'BS' },
    { rank: 15, name: 'DigitalNomad', score: 1150.22, volume: '1.3M', initials: 'DN' },
    { rank: 16, name: 'TokenTitan', score: 1135.89, volume: '2.6M', initials: 'TT' },
    { rank: 17, name: 'RiskTaker', score: 1120.45, volume: '1.2M', initials: 'RT' },
    { rank: 18, name: 'DayTraderPro', score: 1105.12, volume: '1.7M', initials: 'DP' },
    { rank: 19, name: 'SwingKing', score: 1090.87, volume: '1.5M', initials: 'SK' },
    { rank: 20, name: 'AlphaSeeker', score: 1075.33, volume: '2.1M', initials: 'AS' },
];

// Dữ liệu cho ResultPage
export const winners = [
    { rank: 1, name: 'Anonymous', prize: '50000 USDT' },
    { rank: 2, name: 'Anonymous', prize: '25000 USDT' },
    { rank: 3, name: 'Anonymous', prize: '10000 USDT' },
];

// Dữ liệu cho TournamentLeaderboardPage
export const tournamentWinners = [
    { rank: 1, name: 'CryptoKing', wins: 152, profit: 75_980, initials: 'CK' },
    { rank: 2, name: 'MarketWhiz', wins: 145, profit: 68_450, initials: 'MW' },
    { rank: 3, name: 'ProTraderX', wins: 138, profit: 65_120, initials: 'PX' },
    { rank: 4, name: 'VelocityTrader', wins: 131, profit: 61_880, initials: 'VT' },
    { rank: 5, name: 'FutureSight', wins: 125, profit: 59_340, initials: 'FS' },
    { rank: 6, name: 'GoldenCross', wins: 119, profit: 56_210, initials: 'GC' },
    { rank: 7, name: 'TheStrategist', wins: 112, profit: 53_050, initials: 'TS' },
    { rank: 8, name: 'ApexPredator', wins: 108, profit: 51_110, initials: 'AP' },
];

// Dữ liệu cho WalletPage
export const walletData = {
    balance: 1250.75,
    deposits: 5000.00,
    withdrawals: 1500.00,
    winnings: 850.25,
    losses: 350.50,
    commission: 251.00,
};

export const transactionData = [
    { id: 1, date: '2025-09-24', type: 'Deposit', amount: 1000.00, status: 'Completed' },
    { id: 2, date: '2025-09-23', type: 'Winnings', amount: 50.25, status: 'Completed' },
    { id: 3, date: '2025-09-22', type: 'Withdrawal', amount: -200.00, status: 'Completed' },
    { id: 4, date: '2025-09-21', type: 'Loss', amount: -15.50, status: 'Completed' },
    { id: 5, date: '2025-09-20', type: 'Deposit', amount: 500.00, status: 'Pending' },
    { id: 6, date: '2025-09-19', type: 'Withdrawal', amount: -100.00, status: 'Failed' },
];

// --- DỮ LIỆU CHO BẢNG XẾP HẠNG CÁC VÒNG ĐẤU ---

// Hàm helper để tạo dữ liệu giả
const generatePlayerData = (count) => {
    const players = [];
    const firstNames = ["Lê", "Nguyễn", "Trần", "Phạm", "Hoàng", "Huỳnh", "Võ", "Đặng", "Bùi", "Đỗ"];
    const lastNames = ["An", "Bình", "Cường", "Dũng", "Hải", "Huy", "Khang", "Linh", "Minh", "Nam", "Phúc", "Quân", "Sơn", "Thắng", "Việt"];
    for (let i = 1; i <= count; i++) {
        const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
        players.push({
            id: `user_${i}`,
            rank: i,
            name: name,
            score: parseFloat((10000 - i * 10 - Math.random() * 100).toFixed(2)),
            avatarInitial: name.split(' ').map(n => n[0]).join('').toUpperCase()
        });
    }
    return players;
};

export const mockTop400Players = generatePlayerData(400);
// Dữ liệu giả cho Trader Comments
export const mockTraderComments = {
    // Key "1" là ID của broker "GO Markets"
    "1": [ // ✅ Phải là một MẢNG, bắt đầu bằng [
      { id: 101, user: 'tester', date: '2025-09-24T08:03:00Z', text: 'Bình luận dành riêng cho GO Markets.' },
      { id: 102, user: 'armyphan', date: '2025-08-15T00:33:00Z', text: 'Nạp rút nhanh, uy tín.' },
    ], // ✅ Kết thúc bằng ]
  
    // Key "2" là ID của broker "VertexFX Prime"
    "2": [ // ✅ Phải là một MẢNG
      { id: 201, user: 'pro_trader', date: '2025-09-20T10:00:00Z', text: 'Bình luận của tôi về VertexFX Prime.' }
    ],
  
    // Key "3" là ID của broker "Quantum Markets"
    "3": [] // ✅ Một mảng rỗng
  };


// ✅ THÊM MỚI: Dữ liệu chi tiết cho giải đấu đang diễn ra
export const liveTournamentDetailData = {
    title: "GO Markets Championship - Season 2",
    creator: "Bộ phận tester",
    date: "10/10/2025",
    details: {
      "Prize Pool": "85000 USDT",
      "Participants": "0 / 100",
      "Symbol": "XAUUSD",
      "Event Time": "10/10/2025, 12:00:00 AM",
      "Broker": "GO Markets",
    },
    description: "Giải đấu giả lập mùa thứ hai của sàn GO Markets, bắt đầu từ ngày 29/9.",
    prizes: [
      { rank: "Giải nhất (Rank 1)", amount: "50000 USDT" },
      { rank: "Giải nhì (Rank 2)", amount: "25000 USDT" },
      { rank: "Giải ba (Rank 3)", amount: "10000 USDT" },
      { rank: "Giải khuyến khích", amount: "1000 USDT" },
    ],
    rounds: [
      {
        name: "Round of 100",
        rules: {
          "Format": "points",
          "Match Duration": "15 min",
          "Players Advance": 50,
          "Matches / Player": 4,
          "Round Duration": "24 hours",
          "Match Interval": "10 min",
          "Scheduling Timeframes (UTC)": "00:00 - 23:59",
        }
      },
      {
        name: "Round of 50",
        rules: {
          "Format": "points",
          "Match Duration": "15 min",
          "Players Advance": 8,
          "Matches / Player": 4,
          "Round Duration": "24 hours",
          "Match Interval": "10 min",
          "Scheduling Timeframes (UTC)": "00:00 - 23:59",
        }
      },
      {
        name: "Quarter-finals",
        rules: {
          "Format": "knockout",
          "Match Duration": "15 min",
          "Players Advance": 4,
          "Round Duration": "24 hours",
          "Match Interval": "10 min",
          "Scheduling Timeframes (UTC)": "00:00 - 23:59",
        }
      },
      {
        name: "Semi-finals",
        rules: {
          "Format": "knockout",
          "Match Duration": "15 min",
          "Players Advance": 2,
          "Round Duration": "24 hours",
          "Match Interval": "10 min",
          "Scheduling Timeframes (UTC)": "00:00 - 23:59",
        }
      },
      {
        name: "Final",
        rules: {
          "Format": "knockout",
          "Match Duration": "15 min",
          "Players Advance": 1,
          "Round Duration": "24 hours",
          "Match Interval": "10 min",
          "Scheduling Timeframes (UTC)": "00:00 - 23:59",
        }
      },
    ]
  };

