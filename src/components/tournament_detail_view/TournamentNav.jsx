import React from 'react';
import { NewMatchesIcon, NewRoundsIcon, NewDiscussionIcon, NewLeaderboardIcon, NewResultIcon } from '../../icons/Icons';
import './TournamentNav.css';

const TournamentNav = ({ activeItem, onClick }) => {
    const navItems = [
        { name: 'Matches', icon: <NewMatchesIcon /> },
        { name: 'Rounds', icon: <NewRoundsIcon /> },
        { name: 'Discussion', icon: <NewDiscussionIcon /> },
        { name: 'Leaderboard', icon: <NewLeaderboardIcon /> },
        { name: 'Result', icon: <NewResultIcon /> }
    ];

    return (
        <nav className="new-tournament-nav">
            {navItems.map(item => (
                <button
                    key={item.name}
                    className={`new-nav-item ${activeItem === item.name ? 'active' : ''}`}
                    onClick={() => onClick(item.name)}
                >
                    {item.icon}
                    <span>{item.name}</span>
                </button>
            ))}
        </nav>
    );
};

export default TournamentNav;
