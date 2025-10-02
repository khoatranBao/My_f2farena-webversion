import React, { useState, useEffect } from 'react';
import { CloseIcon } from '../../icons/Icons';
import './RightMenu.css';

const LeftMenu = ({ isOpen, onClose, user }) => {
    const [view, setView] = useState('main');

    // Reset về menu chính mỗi khi mở lại
    useEffect(() => {
        if (isOpen) {
            setView('main');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // --- Giao diện cho Menu chính ---
    const MainView = () => (
        <>
            <div className="left-menu-header">
                <h2>Menu</h2>
                <button onClick={onClose} className="close-button"><CloseIcon /></button>
            </div>
            <ul className="left-menu-nav-list">
                <li onClick={() => setView('personal')}>Personal Information</li>
                <li>Language</li>
            </ul>
        </>
    );

    // --- Giao diện cho trang thông tin cá nhân ---
    const PersonalInfoView = () => (
        <>
            <div className="left-menu-header">
                <button onClick={() => setView('main')} className="back-button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <h2>Personal Information</h2>
                <button onClick={onClose} className="close-button"><CloseIcon /></button>
            </div>
            <div className="left-menu-profile">
                <div className="left-menu-avatar">
                    <span>{user.avatarInitials}</span>
                </div>
                <h3 className="left-menu-user-name">{user.name}</h3>
                <p className="left-menu-username">{user.username}</p>
            </div>
            <div className="left-menu-details-list">
                <div className="left-menu-info-row"><span className="info-label">Email</span><span className="info-value">{user.email}</span></div>
                <div className="left-menu-info-row"><span className="info-label">Wallet Address</span><span className="info-value">{user.walletAddress}</span></div>
                <div className="left-menu-info-row"><span className="info-label">VIP Level</span><span className="info-value vip-level">{user.vipLevel}</span></div>
                <div className="left-menu-info-row"><span className="info-label">Verified</span><span className={`info-value ${user.isVerified ? 'verified-yes' : 'verified-no'}`}>{user.isVerified ? 'Yes' : 'No'}</span></div>
                <div className="left-menu-info-row"><span className="info-label">Join Date</span><span className="info-value">{user.joinDate}</span></div>
            </div>
        </>
    );

    return (
        <div className="left-menu-container">
            <div className="left-menu-overlay" onClick={onClose}></div>
            <div className="left-menu">
                {view === 'main' ? <MainView /> : <PersonalInfoView />}
            </div>
        </div>
    );
};

export default LeftMenu;
