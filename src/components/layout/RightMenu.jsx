import React from 'react';
import { CloseIcon } from '../../icons/Icons';
import './RightMenu.css';

const LeftMenu = ({ isOpen, onClose, user, onLogout }) => {
    if (!isOpen) return null;

    // Hàm xử lý khi nhấn nút copy (hiện chỉ thông báo)
    const handleCopyLink = () => {
        if (user && user.affiliateLink) {
            navigator.clipboard.writeText(user.affiliateLink);
            alert("Affiliate link copied to clipboard!");
        }
    };

    return (
        <div className="left-menu-container">
            <div className="left-menu-overlay" onClick={onClose}></div>
            <div className="left-menu">
                <div className="left-menu-body">
                    <div className="left-menu-header">
                        {/* Nút Back - bạn có thể thêm logic cho nó sau */}
                        <button onClick={onClose} className="back-button">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="icon"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                        </button>
                        <h2>Personal Information</h2>
                        {/* Nút Close X */}
                        <button onClick={onClose} className="close-button-alt"><CloseIcon /></button>
                    </div>

                    {user && (
                        <>
                            <div className="left-menu-profile">
                                {/* Dùng ảnh thật nếu có (từ Telegram), nếu không thì dùng chữ cái đầu */}
                                {user.photo_url ? (
                                    <img src={user.photo_url} alt="Avatar" className="left-menu-avatar-img" />
                                ) : (
                                    <div className="left-menu-avatar">
                                        <span>{user.avatarInitials || 'A'}</span>
                                    </div>
                                )}
                                <h3 className="left-menu-user-name">{user.name || user.displayName}</h3>
                                <p className="left-menu-username">{user.username}</p>
                            </div>
                            
                            <div className="left-menu-details-list">
                                <div className="left-menu-info-row">
                                    <span className="info-label">Wallet Address</span>
                                    <span className="info-value">{user.walletAddress}</span>
                                </div>
                                <div className="left-menu-info-row">
                                    <span className="info-label">VIP Level</span>
                                    <span className="info-value vip-level diamond">{user.vipLevel}</span>
                                </div>
                                <div className="left-menu-info-row">
                                    <span className="info-label">Affiliate Link</span>
                                    <button className="copy-link-btn" onClick={handleCopyLink}>Copy Link</button>
                                </div>
                                <div className="left-menu-info-row">
                                    <span className="info-label">Trust Points</span>
                                    <span className="info-value">{user.trustPoints}</span>
                                </div>
                                <div className="left-menu-info-row">
                                    <span className="info-label">Verified</span>
                                    <span className={`info-value ${user.isVerified ? 'verified-yes' : 'verified-no'}`}>
                                        {user.isVerified ? 'Yes' : 'No'}
                                    </span>
                                </div>
                                <div className="left-menu-info-row">
                                    <span className="info-label">Join Date</span>
                                    <span className="info-value">{user.joinDate}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="left-menu-footer">
                    <button className="logout-btn" onClick={onLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LeftMenu;