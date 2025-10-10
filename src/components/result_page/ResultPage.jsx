import React from 'react';
import './ResultPage.css'; // Import CSS
import { winners } from '../../data/mockData'; // Điều chỉnh đường dẫn nếu cần
import WinnerCard from './WinnerCard.jsx';
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