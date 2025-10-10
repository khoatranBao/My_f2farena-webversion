import React from 'react';

const AssetInformation = ({ walletData, onWithdrawClick }) => (
    <div className="asset-info-grid">
        <div className="asset-info-item">
            <span>Current Balance</span>
            <span className="text-balance">{walletData.balance.toFixed(2)} USDT</span>
        </div>
        <div className="asset-info-item">
            <span>Total Deposits</span>
            <span className="text-gain">{walletData.deposits.toFixed(2)} USDT</span>
        </div>
        <div className="asset-info-item">
            <span>Total Withdrawals</span>
            <span className="text-gain">{walletData.withdrawals.toFixed(2)} USDT</span>
        </div>
        <div className="asset-info-item">
            <span>Total Winnings</span>
            <span className="text-gain">{walletData.winnings.toFixed(2)} USDT</span>
        </div>
        <div className="asset-info-item">
            <span>Total Losses</span>
            <span className="text-loss">{walletData.losses.toFixed(2)} USDT</span>
        </div>
        <div className="asset-info-item">
            <span>Affiliate Commission</span>
            <span className="text-balance">{walletData.commission.toFixed(2)} USDT</span>
        </div>
        <button className="withdraw-btn" onClick={onWithdrawClick}>Withdraw</button>
    </div>
);

export default AssetInformation;
