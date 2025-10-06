import React, { useState } from 'react';
import './CreateCupModal.css';
import { CloseIcon } from '../../icons/Icons';

// --- COMPONENT STEPPER (THANH TRẠNG THÁI) ---
const Stepper = ({ currentStep }) => {
    const steps = ['Details', 'Rounds', 'Prizes'];
    return (
        <div className="stepper-container">
            {steps.map((step, index) => (
                <React.Fragment key={step}>
                    <div className={`step-item ${index + 1 <= currentStep ? 'active' : ''} ${index + 1 === currentStep ? 'current' : ''}`}>
                        <div className="step-circle">{index + 1}</div>
                        <span>{step}</span>
                    </div>
                    {index < steps.length - 1 && <div className={`step-line ${index + 1 < currentStep ? 'active' : ''}`}></div>}
                </React.Fragment>
            ))}
        </div>
    );
};

// --- COMPONENT CHO BƯỚC 1: DETAILS ---
const Step1Details = ({ formData, setFormData, onNext }) => (
    <form className="create-cup-form" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
        <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={setFormData} required />
        </div>
        <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={setFormData} rows="3"></textarea>
        </div>
        <div className="form-row">
            <div className="form-group"><label htmlFor="broker">Broker</label><select id="broker" name="broker" value={formData.broker} onChange={setFormData}><option value="GOMarkets">GOMarkets</option></select></div>
            <div className="form-group"><label htmlFor="symbol">Symbol</label><select id="symbol" name="symbol" value={formData.symbol} onChange={setFormData}><option value="BTC/USDT">BTC/USDT</option></select></div>
        </div>
        <div className="form-row">
            <div className="form-group"><label htmlFor="maxParticipants">Max Participants</label><input type="number" id="maxParticipants" name="maxParticipants" value={formData.maxParticipants} onChange={setFormData} required /></div>
            <div className="form-group"><label htmlFor="minimumBalance">Minimum Balance (USDT)</label><input type="number" id="minimumBalance" name="minimumBalance" value={formData.minimumBalance} onChange={setFormData} required /></div>
        </div>
        <div className="form-row">
            <div className="form-group"><label htmlFor="startTime">Start Time</label><input type="datetime-local" id="startTime" name="startTime" value={formData.startTime} onChange={setFormData} required /></div>
            <div className="form-group"><label htmlFor="endTime">End Time</label><input type="datetime-local" id="endTime" name="endTime" value={formData.endTime} onChange={setFormData} required /></div>
        </div>
        <div className="form-nav single-btn">
            <button type="submit" className="nav-btn next-btn">Next</button>
        </div>
    </form>
);

// --- COMPONENT CHO BƯỚC 2: ROUNDS ---
const Step2Rounds = ({ rounds, onAddRound, onDeleteRound, onUpdateRound, onBack, onNext }) => {
    return (
        <div className="create-cup-form">
            <div className="rounds-config-list">
                {rounds.map((round, index) => (
                     <div key={index} className="round-form">
                        <div className="round-form-header">
                            <input type="text" className="round-name-input" value={round.name} onChange={(e) => onUpdateRound(index, 'name', e.target.value)} />
                            {rounds.length > 1 && <button type="button" className="delete-round-btn" onClick={() => onDeleteRound(index)}><CloseIcon /></button>}
                        </div>
                        <div className="form-row">
                             <div className="form-group"><label>Format</label><select value={round.format} onChange={(e) => onUpdateRound(index, 'format', e.target.value)}><option>Points</option><option>Profit</option></select></div>
                             <div className="form-group"><label>Match Duration (min)</label><input type="number" value={round.matchDuration} onChange={(e) => onUpdateRound(index, 'matchDuration', e.target.value)} /></div>
                        </div>
                        <div className="form-row">
                            <div className="form-group"><label>Matches / Player</label><input type="number" value={round.matchesPerPlayer} onChange={(e) => onUpdateRound(index, 'matchesPerPlayer', e.target.value)} /></div>
                            <div className="form-group"><label>Match Interval (min)</label><input type="number" value={round.matchInterval} onChange={(e) => onUpdateRound(index, 'matchInterval', e.target.value)} /></div>
                        </div>
                     </div>
                ))}
            </div>
            <button type="button" className="add-round-btn" onClick={onAddRound}>+ Add Round</button>
            <div className="form-nav">
                <button type="button" className="nav-btn back-btn" onClick={onBack}>Back</button>
                <button type="button" className="nav-btn next-btn" onClick={onNext}>Next</button>
            </div>
        </div>
    );
};

// --- COMPONENT CHO BƯỚC 3: PRIZES ---
const Step3Prizes = ({ prizes, onAddPrize, onDeletePrize, onUpdatePrize, onBack, onSubmit }) => {
    return (
        <div className="create-cup-form">
            <div className="prize-calculation-fields">
                <div className="form-group"><label>Estimated Revenue</label><input type="text" readOnly value="2.40 USDT" /></div>
                <div className="form-group"><label>Recommended Prize Fund</label><input type="text" readOnly value="1.80 USDT" /></div>
                <div className="form-group has-warning"><label>Total Prize Pool</label><input type="text" readOnly value="25.00 USDT" /><span className="warning-text">Warning: Exceeds recommended fund.</span></div>
                <div className="form-group"><label>Retained Profit</label><input type="text" readOnly value="-23.20 USDT" /></div>
            </div>
            <div className="prizes-list">
                 {prizes.map((prize, index) => (
                    <div key={index} className="round-form">
                        <div className="round-form-header">
                            <h4>Prize {index + 1}</h4>
                            {prizes.length > 1 && <button type="button" className="delete-round-btn" onClick={() => onDeletePrize(index)}><CloseIcon /></button>}
                        </div>
                        <div className="form-row">
                            <div className="form-group"><label>Type</label><select value={prize.type} onChange={(e) => onUpdatePrize(index, 'type', e.target.value)}><option>Top</option><option>Random</option></select></div>
                            <div className="form-group"><label>Rank</label><input type="number" value={prize.rank} onChange={(e) => onUpdatePrize(index, 'rank', e.target.value)} /></div>
                        </div>
                        <div className="form-group"><label>Name</label><input type="text" value={prize.name} onChange={(e) => onUpdatePrize(index, 'name', e.target.value)} /></div>
                        <div className="form-row">
                            <div className="form-group"><label>Prize</label><input type="text" value={prize.prize} onChange={(e) => onUpdatePrize(index, 'prize', e.target.value)} /></div>
                            <div className="form-group"><label>Quantity</label><input type="number" value={prize.quantity} onChange={(e) => onUpdatePrize(index, 'quantity', e.target.value)} /></div>
                        </div>
                    </div>
                 ))}
            </div>
            <button type="button" className="add-round-btn" onClick={onAddPrize}>+ Add Prize</button>
            <div className="form-nav">
                <button type="button" className="nav-btn back-btn" onClick={onBack}>Back</button>
                <button type="button" className="nav-btn create-btn" onClick={onSubmit}>Create Tournament</button>
            </div>
        </div>
    );
};


// --- COMPONENT MODAL CHÍNH ---
const CreateCupModal = ({ isOpen, onClose, onCreateCup }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormDataState] = useState({ title: '', description: '', broker: 'GOMarkets', symbol: 'BTC/USDT', maxParticipants: 128, startTime: '', endTime: '', minimumBalance: 100 });
    
    // State cho Rounds
    const [rounds, setRounds] = useState([
        { name: 'Round 1', format: 'Points', matchDuration: 15, matchesPerPlayer: 4, matchInterval: 60 }
    ]);
    
    // State cho Prizes
    const [prizes, setPrizes] = useState([
        { type: 'Top', rank: 1, name: 'First Place', prize: '100 USDT', quantity: 1 }
    ]);

    if (!isOpen) return null;

    // --- CÁC HÀM XỬ LÝ ---
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormDataState(prev => ({ ...prev, [name]: value }));
    };

    // Hàm thêm Round mới
    const addRound = () => {
        setRounds(prev => [...prev, { name: `Round ${prev.length + 1}`, format: 'Points', matchDuration: 15, matchesPerPlayer: 4, matchInterval: 60 }]);
    };
    // Hàm xóa Round
    const deleteRound = (index) => {
        setRounds(prev => prev.filter((_, i) => i !== index));
    };
    // Hàm cập nhật thông tin Round
    const updateRound = (index, field, value) => {
        const newRounds = [...rounds];
        newRounds[index][field] = value;
        setRounds(newRounds);
    };

    // Hàm thêm Prize mới
    const addPrize = () => {
        setPrizes(prev => [...prev, { type: 'Top', rank: prev.length + 1, name: '', prize: '', quantity: 1 }]);
    };
    // Hàm xóa Prize
    const deletePrize = (index) => {
        setPrizes(prev => prev.filter((_, i) => i !== index));
    };
    // Hàm cập nhật Prize
    const updatePrize = (index, field, value) => {
        const newPrizes = [...prizes];
        newPrizes[index][field] = value;
        setPrizes(newPrizes);
    };

    const handleSubmit = () => {
        const finalCupData = {
            details: formData,
            rounds: rounds,
            prizes: prizes
        };
        onCreateCup(finalCupData); 
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1Details formData={formData} setFormData={handleInputChange} onNext={() => setStep(2)} />;
            case 2:
                return <Step2Rounds 
                            rounds={rounds} 
                            onAddRound={addRound} 
                            onDeleteRound={deleteRound} 
                            onUpdateRound={updateRound} 
                            onBack={() => setStep(1)} 
                            onNext={() => setStep(3)} 
                        />;
            case 3:
                return <Step3Prizes 
                            prizes={prizes} 
                            onAddPrize={addPrize} 
                            onDeletePrize={deletePrize} 
                            onUpdatePrize={updatePrize} 
                            onBack={() => setStep(2)} 
                            onSubmit={handleSubmit} 
                        />;
            default:
                return null;
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="create-cup-modal-content" onClick={e => e.stopPropagation()}>
                <div className="create-cup-header">
                    <h2>Create Private Cup</h2>
                    <button onClick={onClose} className="modal-close-btn"><CloseIcon /></button>
                </div>
                <div className="create-cup-body">
                    <Stepper currentStep={step} />
                    {renderStep()}
                </div>
            </div>
        </div>
    );
};

export default CreateCupModal;