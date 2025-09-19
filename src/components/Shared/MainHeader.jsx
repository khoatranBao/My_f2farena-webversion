// src/components/Shared/MainHeader.jsx
import React from 'react';
import { HomeIcon, ReviewIcon, ArenaIcon, LeaderboardIcon, WalletIcon } from '../../icons/Icons';

const MainHeader = ({ showHeader, onMenuClick, activeTab, setActiveTab }) => {
    const menuItems = [
        { name: 'Home', icon: <HomeIcon />, tab: 'Home' },
        { name: 'Review', icon: <ReviewIcon />, tab: 'Review' },
        { name: 'Arena', icon: <ArenaIcon />, tab: 'Arena' },
        // ... các item khác
    ];

    return (
        <header className={`app-header ${!showHeader && 'hidden'}`}>
            <div className="header-left">
                <button onClick={onMenuClick}>
                    <img src="/src/assets/logo.jpg" alt="App Logo" className="app-logo" />
                </button>
            </div>
            <div className="header-center">
                {menuItems.map((item) => (
                    <button key={item.name} onClick={() => setActiveTab(item.tab)} className={`header-nav-btn ${activeTab === item.tab ? 'active' : ''}`}>
                        {item.icon}
                        <span>{item.name}</span>
                    </button>
                ))}
            </div>
            <div className="header-right">
                <button className="login-btn">ĐĂNG NHẬP</button>
            </div>
        </header>
    );
};
export default MainHeader;