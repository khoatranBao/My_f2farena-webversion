import React from 'react';
import './ClashDisplay.css';

const ClashDisplay = ({ match, team1Color, team2Color, onClick }) => {
    const score1 = match.team1.score;
    const score2 = match.team2.score;
    const totalScore = score1 + score2;
    const score1Percentage = totalScore > 0 ? (score1 / totalScore) * 100 : 50;
    
    return (
        <div className="clash-container" onClick={onClick}>
            {/* Player 1 Panel */}
            <div className="player-panel left">
                <div className="clash-avatar" style={{ borderColor: team1Color }}>{match.team1.short}</div>
                <h2 className="clash-player-name">{match.team1.name}</h2>
                <p className="clash-team-name">Team Alpha</p>
                <div className="clash-score" style={{ color: team1Color }}>{match.team1.score.toFixed(2)}</div>
                <p className="clash-pts-label">pts</p>
                <div className="clash-progress-bar-track"><div className="clash-progress-bar-fill" style={{ width: `${score1Percentage}%`, backgroundColor: team1Color }}></div></div>
            </div>

            {/* Center Info */}
            <div className="clash-center-info">
                <div className="clash-live-badge">LIVE</div>
                <div className="clash-timer">{match.countdown}</div>
                <div className="clash-vs">VS</div>
            </div>

            {/* Player 2 Panel */}
            <div className="player-panel right">
                <div className="clash-avatar" style={{ borderColor: team2Color }}>{match.team2.short}</div>
                <h2 className="clash-player-name">{match.team2.name}</h2>
                <p className="clash-team-name">Team Omega</p>
                <div className="clash-score" style={{ color: team2Color }}>{match.team2.score.toFixed(2)}</div>
                <p className="clash-pts-label">pts</p>
                <div className="clash-progress-bar-track"><div className="clash-progress-bar-fill" style={{ width: `${100 - score1Percentage}%`, backgroundColor: team2Color, marginLeft: `${score1Percentage}%` }}></div></div>
            </div>
        </div>
    );
};

export default ClashDisplay;