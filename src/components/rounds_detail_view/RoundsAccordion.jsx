import React, { useState } from 'react';
import './RoundsAccordion.css'; // Import file CSS riêng

const RoundsAccordion = () => {
    const [openRound, setOpenRound] = useState('Final');
    const rounds = ['Final', 'Semi-finals', 'Quarter-finals', 'Round of 50', 'Round of 100'];

    return (
        <div className="rounds-container">
            {rounds.map(round => (
                <div key={round} className="round-item">
                    <button
                        className={`round-header ${openRound === round ? 'open' : ''}`}
                        onClick={() => setOpenRound(openRound === round ? null : round)}
                    >
                        <h3>{round}</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="arrow-icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                    <div className={`round-content ${openRound === round ? 'open' : ''}`}>
                        <p>Details and matches for the {round} will be displayed here.</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RoundsAccordion;