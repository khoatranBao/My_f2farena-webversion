import React from 'react';

const TransactionHistory = ({ transactions }) => (
    <div className="transaction-history-table">
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map(tx => (
                    <tr key={tx.id}>
                        <td>{tx.date}</td>
                        <td>{tx.type}</td>
                        <td className={tx.type === 'Deposit' || tx.type === 'Winnings' ? 'text-gain' : 'text-loss'}>
                           {tx.amount.toFixed(2)} USDT
                        </td>
                        <td>
                            <span className={`status-badge-tx status-${tx.status.toLowerCase()}`}>
                                {tx.status}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default TransactionHistory;
