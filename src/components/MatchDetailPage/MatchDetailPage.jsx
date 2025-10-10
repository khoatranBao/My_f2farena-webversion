import React, { useState, useEffect, useRef } from 'react';
import './MatchDetailPage.css';
import TradingChart from '../TradingChart.jsx';
import {
    BarsIcon, CandlesIcon, HollowCandlesIcon, LineIcon, LineWithMarkersIcon,
    StepLineIcon, AreaIcon, HlcAreaIcon, HeikinAshiIcon, IndicatorsIcon,
    DropdownArrowIcon, TimeframeArrowIcon
} from '../../icons/Icons';
import { instrumentList, mockComments } from '../../data/mockData';


// --- Các component con chỉ dùng cho trang này ---

const SidebarTabs = ({ activeTab, onTabClick }) => (
    <div className="sidebar-tabs">
        <button className={`sidebar-tab-btn ${activeTab === 'instruments' ? 'active' : ''}`} onClick={() => onTabClick('instruments')}>Matching</button>
        <button className={`sidebar-tab-btn ${activeTab === 'discussion' ? 'active' : ''}`} onClick={() => onTabClick('discussion')}>Discussion</button>
    </div>
);

const InstrumentSidebar = ({ selectedInstrument, onSelect, onClose, activeTab, onTabClick }) => (
    <aside className="instrument-sidebar">
        <div className="sidebar-header">
            <button onClick={onClose} className="sidebar-back-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="icon"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
            <h3>ProTrade</h3>
        </div>
        <div className="instrument-search"><input type="text" placeholder="🔍 Search..." /></div>
        <SidebarTabs activeTab={activeTab} onTabClick={onTabClick} />
        <div className="sidebar-content">
            {activeTab === 'instruments' ? (
                <div className="instrument-list">
                    <div className="instrument-list-header"><span>Pair</span><span>Price</span><span>Change</span></div>
                    {instrumentList.map(item => (
                        <div key={item.name} className={`instrument-row ${selectedInstrument === item.name.replace('/', '') ? 'active' : ''}`} onClick={() => onSelect(item.name.replace('/', ''))}>
                            <span>{item.name}</span>
                            <span>{item.price}</span>
                            <span style={{ color: item.change >= 0 ? '#22c55e' : '#ef4444' }}>{item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="discussion-panel">
                    {mockComments.map((comment, index) => (
                        <div key={index} className="comment">
                            <div className="comment-header"><span className="comment-user">{comment.user}</span><span className="comment-time">{comment.time}</span></div>
                            <p className="comment-body">{comment.text}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </aside>
);

const TradingHeader = ({ match, countdown }) => (
    <header className="trading-header">
        <div className="trading-team-info">
            <div className="team-avatar team-1">{match.team1.short}</div>
            <div><span>{match.team1.name}</span><span className="score">Score: {match.team1.score}</span></div>
        </div>
        <div className="trading-center-display">
            <span className="trading-countdown">{countdown}</span>
            <div className="volume-bar">
                <div className="volume-value">0.00</div>
                <div className="volume-track"><div className="volume-progress" style={{ width: '50%' }}></div><span>VOLUME</span></div>
                <div className="volume-value">0.07</div>
            </div>
        </div>
        <div className="trading-team-info right">
            <div><span>{match.team2.name}</span><span className="score">Score: {match.team2.score}</span></div>
            <div className="team-avatar team-2">{match.team2.short}</div>
        </div>
    </header>
);

const TopChartControls = ({ activeInterval, onIntervalChange, selectedInstrument, chartType, onChartTypeChange, isChartTypeDropdownOpen, setChartTypeDropdownOpen, isTimeDropdownOpen, setTimeDropdownOpen, chartTypeRef, timeRef }) => {
    const chartTypes = [
        { key: 'bars', name: 'Bars', icon: <BarsIcon /> }, { key: 'candles', name: 'Candles', icon: <CandlesIcon /> },
        { key: 'hollow_candles', name: 'Hollow Candles', icon: <HollowCandlesIcon /> }, { key: 'heikin_ashi', name: 'Heikin Ashi', icon: <HeikinAshiIcon /> },
        { separator: true }, { key: 'line', name: 'Line', icon: <LineIcon /> },
        { key: 'line_with_markers', name: 'Line with Markers', icon: <LineWithMarkersIcon /> }, { key: 'step_line', name: 'Step Line', icon: <StepLineIcon /> },
        { separator: true }, { key: 'area', name: 'Area', icon: <AreaIcon /> }, { key: 'hlc_area', name: 'HLC Area', icon: <HlcAreaIcon /> },
    ];
    const getDropdownActiveItem = () => chartTypes.find(c => c.key === chartType && c.key !== 'bars' && c.key !== 'candles') || chartTypes[2];
    const dropdownTimeframes = ['4h', '1D', '1W', '1M'];

    return (
        <div className="top-chart-controls">
            <div className="unified-chart-controls">
                <span className="instrument-name-display">{selectedInstrument}</span>
                <div className="control-separator"></div>
                <div className="segmented-control" ref={chartTypeRef}>
                    <button title="Bars" className={`control-button ${chartType === 'bars' ? 'active' : ''}`} onClick={() => onChartTypeChange('bars')}><BarsIcon /></button>
                    <button title="Candles" className={`control-button ${chartType === 'candles' ? 'active' : ''}`} onClick={() => onChartTypeChange('candles')}><CandlesIcon /></button>
                    <div className="chart-type-selector-wrapper">
                        <button title={getDropdownActiveItem().name} className={`control-button ${(chartType !== 'bars' && chartType !== 'candles') ? 'active' : ''}`} onClick={() => setChartTypeDropdownOpen(!isChartTypeDropdownOpen)}>{getDropdownActiveItem().icon}<DropdownArrowIcon /></button>
                        {isChartTypeDropdownOpen && (
                            <div className="chart-type-dropdown">
                                {chartTypes.slice(2).map((type, index) => (type.separator ? <div key={`sep-${index}`} className="dropdown-separator"></div> : <button key={type.key} className="dropdown-item" title={type.name} onClick={() => { onChartTypeChange(type.key); setChartTypeDropdownOpen(false); }}>{type.icon}<span>{type.name}</span></button>))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="segmented-control" ref={timeRef}>
                    <button className={`control-button ${activeInterval === '1m' ? 'active' : ''}`} onClick={() => onIntervalChange('1m')}>1m</button>
                    <button className={`control-button ${activeInterval === '30m' ? 'active' : ''}`} onClick={() => onIntervalChange('30m')}>30m</button>
                    <button className={`control-button ${activeInterval === '1h' ? 'active' : ''}`} onClick={() => onIntervalChange('1h')}>1h</button>
                    <div className="time-interval-dropdown-wrapper">
                        <button className={`control-button timeframe-dropdown-btn ${dropdownTimeframes.includes(activeInterval) ? 'active' : ''}`} onClick={() => setTimeDropdownOpen(!isTimeDropdownOpen)}>{dropdownTimeframes.includes(activeInterval) ? (<span className="timeframe-display">{activeInterval}</span>) : (<TimeframeArrowIcon />)}</button>
                        {isTimeDropdownOpen && (
                            <div className="chart-type-dropdown">
                                {dropdownTimeframes.map(t => (<button key={t} className="dropdown-item" onClick={() => { onIntervalChange(t); setTimeDropdownOpen(false); }}><span>{t}</span></button>))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="segmented-control"><button className="control-button indicator-btn"><IndicatorsIcon /><span>Indicators</span></button></div>
                <div className="segmented-control"><button className="control-button" title="Compare">📊</button><button className="control-button" title="Settings">⚙️</button></div>
            </div>
        </div>
    );
};

// --- Component chính ---

const MatchDetailPage = ({ match, onClose }) => {
    const [chartInterval, setChartInterval] = useState('1m');
    const [selectedInstrument, setSelectedInstrument] = useState('BTCUSDT');
    const [sidebarTab, setSidebarTab] = useState('instruments');
    const [chartType, setChartType] = useState('candles');
    const [isChartTypeDropdownOpen, setChartTypeDropdownOpen] = useState(false);
    const [isTimeDropdownOpen, setTimeDropdownOpen] = useState(false);
    const chartTypeRef = useRef(null);
    const timeRef = useRef(null);
    const initialTime = match.countdown.split(':').reduce((acc, time) => (60 * acc) + +time, 0);
    const [countdown, setCountdown] = useState(initialTime);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chartTypeRef.current && !chartTypeRef.current.contains(event.target)) setChartTypeDropdownOpen(false);
            if (timeRef.current && !timeRef.current.contains(event.target)) setTimeDropdownOpen(false);
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    useEffect(() => {
        if (countdown <= 0) return;
        const timer = setInterval(() => setCountdown(prev => prev > 0 ? prev - 1 : 0), 1000);
        return () => clearInterval(timer);
    }, [countdown]);

    const formatCountdown = (seconds) => {
        if (seconds <= 0) return "00:00:00";
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
    };

    const updatedMatchData = { ...match, team1: { ...match.team1, score: 0 }, team2: { ...match.team2, score: 0 }, };

    return (
        <div className="new-match-detail-page">
            <InstrumentSidebar selectedInstrument={selectedInstrument} onSelect={setSelectedInstrument} onClose={onClose} activeTab={sidebarTab} onTabClick={setSidebarTab} />
            <main className="trading-panel">
                <TradingHeader match={updatedMatchData} countdown={formatCountdown(countdown)} />
                <div className="trading-content">
                    <TopChartControls activeInterval={chartInterval} onIntervalChange={setChartInterval} selectedInstrument={selectedInstrument} chartType={chartType} onChartTypeChange={setChartType} isChartTypeDropdownOpen={isChartTypeDropdownOpen} setChartTypeDropdownOpen={setChartTypeDropdownOpen} isTimeDropdownOpen={isTimeDropdownOpen} setTimeDropdownOpen={setTimeDropdownOpen} chartTypeRef={chartTypeRef} timeRef={timeRef} />
                    <div className="chart-container">
                        <TradingChart interval={chartInterval} symbol={selectedInstrument} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MatchDetailPage;
