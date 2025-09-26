import React from 'react';
import './ResultPage.css'; // Import CSS
import { winners } from '../../data/mockData'; // Điều chỉnh đường dẫn nếu cần

const TrophyIcon = ({ colorClass }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`trophy-icon ${colorClass}`} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 11.586l1.707-1.707-1.414-1.414L12 9.758l-1.293-1.293-1.414 1.414L11 11.586V16h2v-4.414z"></path></svg>
);

const WinnerCard = ({ rank, name, prize }) => {
    let rankClass = '';
    if (rank === 1) rankClass = 'rank-1 gold';
    if (rank === 2) rankClass = 'rank-2 silver';
    if (rank === 3) rankClass = 'rank-3 bronze';
    return (
        <div className={`winner-card ${rankClass}`}><TrophyIcon colorClass={rankClass} /><div className="winner-avatar"></div><span className="winner-name">{name}</span><span className="winner-prize">{prize}</span></div>
    );
};

const ResultPage = () => {
    const winnerRank2 = winners.find(w => w.rank === 2);
    const winnerRank1 = winners.find(w => w.rank === 1);
    const winnerRank3 = winners.find(w => w.rank === 3);
    return (
        <div className="result-page-container">
            <div className="podium-container">
                {winnerRank2 && <WinnerCard {...winnerRank2} />}
                {winnerRank1 && <WinnerCard {...winnerRank1} />}
                {winnerRank3 && <WinnerCard {...winnerRank3} />}
            </div>
            <div className="consolation-card"><h3>Consolation Prizes</h3><p>Not yet available.</p></div>
        </div>
    );
};

export default ResultPage;