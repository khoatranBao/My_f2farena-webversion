import React from 'react';
import './LiveMatchCard.css';

const LiveMatchCard = ({ match }) => {
    const { team1, team2, game, score1, score2 } = match;

    const getScoreClass = (s1, s2) => {
        if (s1 > s2) return 'score-winner';
        if (s1 < s2) return 'score-loser';
        return 'score-tie';
    };

    return (
        <div className="live-match-card-new">
            <div>
                <p className="match-teams">{team1} vs {team2}</p>
                <p className="match-game">{game}</p>
            </div>
            <div className="match-score">
                <span className={getScoreClass(score1, score2)}>{score1}</span>
                <span>-</span>
                <span className={getScoreClass(score2, score1)}>{score2}</span>
            </div>
        </div>
    );
};

export default LiveMatchCard;
