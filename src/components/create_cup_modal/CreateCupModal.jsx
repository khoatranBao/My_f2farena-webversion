// import React, { useState } from 'react';
// import './CreateCupModal.css';
// import { CloseIcon } from '../../icons/Icons';

// // --- COMPONENT STEPPER (THANH TRẠNG THÁI) ---
// const Stepper = ({ currentStep }) => {
//     const steps = ['Details', 'Rounds', 'Prizes'];
//     return (
//         <div className="stepper-container">
//             {steps.map((step, index) => (
//                 <React.Fragment key={step}>
//                     <div className={`step-item ${index + 1 <= currentStep ? 'active' : ''} ${index + 1 === currentStep ? 'current' : ''}`}>
//                         <div className="step-circle">{index + 1}</div>
//                         <span>{step}</span>
//                     </div>
//                     {index < steps.length - 1 && <div className={`step-line ${index + 1 < currentStep ? 'active' : ''}`}></div>}
//                 </React.Fragment>
//             ))}
//         </div>
//     );
// };

// // --- COMPONENT CHO BƯỚC 1: DETAILS ---
// const Step1Details = ({ formData, setFormData, onNext }) => (
//     <form className="create-cup-form" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
//         <div className="form-group">
//             <label htmlFor="title">Title</label>
//             <input type="text" id="title" name="title" value={formData.title} onChange={setFormData} required />
//         </div>
//         <div className="form-group">
//             <label htmlFor="description">Description</label>
//             <textarea id="description" name="description" value={formData.description} onChange={setFormData} rows="3"></textarea>
//         </div>
//         <div className="form-row">
//             <div className="form-group"><label htmlFor="broker">Broker</label><select id="broker" name="broker" value={formData.broker} onChange={setFormData}><option value="GOMarkets">GOMarkets</option></select></div>
//             <div className="form-group"><label htmlFor="symbol">Symbol</label><select id="symbol" name="symbol" value={formData.symbol} onChange={setFormData}><option value="BTC/USDT">BTC/USDT</option></select></div>
//         </div>
//         <div className="form-row">
//             <div className="form-group"><label htmlFor="maxParticipants">Max Participants</label><input type="number" id="maxParticipants" name="maxParticipants" value={formData.maxParticipants} onChange={setFormData} required /></div>
//             <div className="form-group"><label htmlFor="minimumBalance">Minimum Balance (USDT)</label><input type="number" id="minimumBalance" name="minimumBalance" value={formData.minimumBalance} onChange={setFormData} required /></div>
//         </div>
//         <div className="form-row">
//             <div className="form-group"><label htmlFor="startTime">Start Time</label><input type="datetime-local" id="startTime" name="startTime" value={formData.startTime} onChange={setFormData} required /></div>
//             <div className="form-group"><label htmlFor="endTime">End Time</label><input type="datetime-local" id="endTime" name="endTime" value={formData.endTime} onChange={setFormData} required /></div>
//         </div>
//         <div className="form-nav single-btn">
//             <button type="submit" className="nav-btn next-btn">Next</button>
//         </div>
//     </form>
// );

// // --- COMPONENT CHO BƯỚC 2: ROUNDS ---
// const Step2Rounds = ({ rounds, onAddRound, onDeleteRound, onUpdateRound, onBack, onNext }) => {
//     return (
//         <div className="create-cup-form">
//             <div className="rounds-config-list">
//                 {rounds.map((round, index) => (
//                      <div key={index} className="round-form">
//                         <div className="round-form-header">
//                             <input type="text" className="round-name-input" value={round.name} onChange={(e) => onUpdateRound(index, 'name', e.target.value)} />
//                             {rounds.length > 1 && <button type="button" className="delete-round-btn" onClick={() => onDeleteRound(index)}><CloseIcon /></button>}
//                         </div>
//                         <div className="form-row">
//                              <div className="form-group"><label>Format</label><select value={round.format} onChange={(e) => onUpdateRound(index, 'format', e.target.value)}><option>Points</option><option>Profit</option></select></div>
//                              <div className="form-group"><label>Match Duration (min)</label><input type="number" value={round.matchDuration} onChange={(e) => onUpdateRound(index, 'matchDuration', e.target.value)} /></div>
//                         </div>
//                         <div className="form-row">
//                             <div className="form-group"><label>Matches / Player</label><input type="number" value={round.matchesPerPlayer} onChange={(e) => onUpdateRound(index, 'matchesPerPlayer', e.target.value)} /></div>
//                             <div className="form-group"><label>Match Interval (min)</label><input type="number" value={round.matchInterval} onChange={(e) => onUpdateRound(index, 'matchInterval', e.target.value)} /></div>
//                         </div>
//                      </div>
//                 ))}
//             </div>
//             <button type="button" className="add-round-btn" onClick={onAddRound}>+ Add Round</button>
//             <div className="form-nav">
//                 <button type="button" className="nav-btn back-btn" onClick={onBack}>Back</button>
//                 <button type="button" className="nav-btn next-btn" onClick={onNext}>Next</button>
//             </div>
//         </div>
//     );
// };

// // --- COMPONENT CHO BƯỚC 3: PRIZES ---
// const Step3Prizes = ({ prizes, onAddPrize, onDeletePrize, onUpdatePrize, onBack, onSubmit }) => {
//     return (
//         <div className="create-cup-form">
//             <div className="prize-calculation-fields">
//                 <div className="form-group"><label>Estimated Revenue</label><input type="text" readOnly value="2.40 USDT" /></div>
//                 <div className="form-group"><label>Recommended Prize Fund</label><input type="text" readOnly value="1.80 USDT" /></div>
//                 <div className="form-group has-warning"><label>Total Prize Pool</label><input type="text" readOnly value="25.00 USDT" /><span className="warning-text">Warning: Exceeds recommended fund.</span></div>
//                 <div className="form-group"><label>Retained Profit</label><input type="text" readOnly value="-23.20 USDT" /></div>
//             </div>
//             <div className="prizes-list">
//                  {prizes.map((prize, index) => (
//                     <div key={index} className="round-form">
//                         <div className="round-form-header">
//                             <h4>Prize {index + 1}</h4>
//                             {prizes.length > 1 && <button type="button" className="delete-round-btn" onClick={() => onDeletePrize(index)}><CloseIcon /></button>}
//                         </div>
//                         <div className="form-row">
//                             <div className="form-group"><label>Type</label><select value={prize.type} onChange={(e) => onUpdatePrize(index, 'type', e.target.value)}><option>Top</option><option>Random</option></select></div>
//                             <div className="form-group"><label>Rank</label><input type="number" value={prize.rank} onChange={(e) => onUpdatePrize(index, 'rank', e.target.value)} /></div>
//                         </div>
//                         <div className="form-group"><label>Name</label><input type="text" value={prize.name} onChange={(e) => onUpdatePrize(index, 'name', e.target.value)} /></div>
//                         <div className="form-row">
//                             <div className="form-group"><label>Prize</label><input type="text" value={prize.prize} onChange={(e) => onUpdatePrize(index, 'prize', e.target.value)} /></div>
//                             <div className="form-group"><label>Quantity</label><input type="number" value={prize.quantity} onChange={(e) => onUpdatePrize(index, 'quantity', e.target.value)} /></div>
//                         </div>
//                     </div>
//                  ))}
//             </div>
//             <button type="button" className="add-round-btn" onClick={onAddPrize}>+ Add Prize</button>
//             <div className="form-nav">
//                 <button type="button" className="nav-btn back-btn" onClick={onBack}>Back</button>
//                 <button type="button" className="nav-btn create-btn" onClick={onSubmit}>Create Tournament</button>
//             </div>
//         </div>
//     );
// };


// // --- COMPONENT MODAL CHÍNH ---
// const CreateCupModal = ({ isOpen, onClose, onCreateCup }) => {
//     const [step, setStep] = useState(1);
//     const [formData, setFormDataState] = useState({ title: '', description: '', broker: 'GOMarkets', symbol: 'BTC/USDT', maxParticipants: 128, startTime: '', endTime: '', minimumBalance: 100 });
    
//     // State cho Rounds
//     const [rounds, setRounds] = useState([
//         { name: 'Round 1', format: 'Points', matchDuration: 15, matchesPerPlayer: 4, matchInterval: 60 }
//     ]);
    
//     // State cho Prizes
//     const [prizes, setPrizes] = useState([
//         { type: 'Top', rank: 1, name: 'First Place', prize: '100 USDT', quantity: 1 }
//     ]);

//     if (!isOpen) return null;

//     // --- CÁC HÀM XỬ LÝ ---
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormDataState(prev => ({ ...prev, [name]: value }));
//     };

//     // Hàm thêm Round mới
//     const addRound = () => {
//         setRounds(prev => [...prev, { name: `Round ${prev.length + 1}`, format: 'Points', matchDuration: 15, matchesPerPlayer: 4, matchInterval: 60 }]);
//     };
//     // Hàm xóa Round
//     const deleteRound = (index) => {
//         setRounds(prev => prev.filter((_, i) => i !== index));
//     };
//     // Hàm cập nhật thông tin Round
//     const updateRound = (index, field, value) => {
//         const newRounds = [...rounds];
//         newRounds[index][field] = value;
//         setRounds(newRounds);
//     };

//     // Hàm thêm Prize mới
//     const addPrize = () => {
//         setPrizes(prev => [...prev, { type: 'Top', rank: prev.length + 1, name: '', prize: '', quantity: 1 }]);
//     };
//     // Hàm xóa Prize
//     const deletePrize = (index) => {
//         setPrizes(prev => prev.filter((_, i) => i !== index));
//     };
//     // Hàm cập nhật Prize
//     const updatePrize = (index, field, value) => {
//         const newPrizes = [...prizes];
//         newPrizes[index][field] = value;
//         setPrizes(newPrizes);
//     };

//     const handleSubmit = () => {
//         const finalCupData = {
//             details: formData,
//             rounds: rounds,
//             prizes: prizes
//         };
//         onCreateCup(finalCupData); 
//     };

//     const renderStep = () => {
//         switch (step) {
//             case 1:
//                 return <Step1Details formData={formData} setFormData={handleInputChange} onNext={() => setStep(2)} />;
//             case 2:
//                 return <Step2Rounds 
//                             rounds={rounds} 
//                             onAddRound={addRound} 
//                             onDeleteRound={deleteRound} 
//                             onUpdateRound={updateRound} 
//                             onBack={() => setStep(1)} 
//                             onNext={() => setStep(3)} 
//                         />;
//             case 3:
//                 return <Step3Prizes 
//                             prizes={prizes} 
//                             onAddPrize={addPrize} 
//                             onDeletePrize={deletePrize} 
//                             onUpdatePrize={updatePrize} 
//                             onBack={() => setStep(2)} 
//                             onSubmit={handleSubmit} 
//                         />;
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="modal-backdrop" onClick={onClose}>
//             <div className="create-cup-modal-content" onClick={e => e.stopPropagation()}>
//                 <div className="create-cup-header">
//                     <h2>Create Private Cup</h2>
//                     <button onClick={onClose} className="modal-close-btn"><CloseIcon /></button>
//                 </div>
//                 <div className="create-cup-body">
//                     <Stepper currentStep={step} />
//                     {renderStep()}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CreateCupModal;

import React, { useState, useEffect } from 'react';
import './CreateCupModal.css';
import { CloseIcon } from '../../icons/Icons';

// --- COMPONENT STEPPER (Thanh trạng thái) ---
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

// --- BƯỚC 1: DETAILS (Không thay đổi) ---
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
            <div className="form-group">
                <label htmlFor="broker">Broker</label>
                <select id="broker" name="broker" value={formData.broker} onChange={setFormData}><option value="GOMarkets">GOMarkets</option></select>
            </div>
            <div className="form-group">
                <label htmlFor="symbol">Symbol</label>
                <select id="symbol" name="symbol" value={formData.symbol} onChange={setFormData}><option value="XAUUSD">XAUUSD</option><option value="BTCUSD">BTCUSD</option></select>
            </div>
        </div>
        <div className="form-row">
            <div className="form-group">
                <label htmlFor="maxParticipants">Max Participants</label>
                <input type="number" id="maxParticipants" name="maxParticipants" value={formData.maxParticipants} onChange={setFormData} required />
            </div>
            <div className="form-group">
                <label htmlFor="minimumBalance">Minimum Balance (USDT)</label>
                <input type="number" id="minimumBalance" name="minimumBalance" value={formData.minimumBalance} onChange={setFormData} required />
            </div>
        </div>
        <div className="form-row">
            <div className="form-group">
                <label htmlFor="startTime">Start Time</label>
                <input type="datetime-local" id="startTime" name="startTime" value={formData.startTime} onChange={setFormData} required />
            </div>
            <div className="form-group">
                <label htmlFor="endTime">End Time</label>
                <input type="datetime-local" id="endTime" name="endTime" value={formData.endTime} onChange={setFormData} required />
            </div>
        </div>
        <div className="form-nav single-btn">
            <button type="submit" className="nav-btn next-btn">Next</button>
        </div>
    </form>
);

// --- BƯỚC 2: ROUNDS (Đã cập nhật các trường mới) ---
const Step2Rounds = ({ rounds, onAddRound, onDeleteRound, onUpdateRound, onBack, onNext }) => (
    <div className="create-cup-form">
        <div className="rounds-config-list">
            {rounds.map((round, index) => (
                <div key={index} className="round-form">
                    <div className="round-form-header">
                        <input type="text" className="round-name-input" placeholder="e.g., Round 1, Quarter-Finals" value={round.name} onChange={(e) => onUpdateRound(index, 'name', e.target.value)} />
                        {rounds.length > 1 && <button type="button" className="delete-round-btn" onClick={() => onDeleteRound(index)}><CloseIcon /></button>}
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Format</label>
                            <select value={round.format} onChange={(e) => onUpdateRound(index, 'format', e.target.value)}><option>Points</option><option>Profit</option></select>
                        </div>
                        <div className="form-group">
                            <label>Match Duration (min)</label>
                            <input type="number" value={round.matchDuration} onChange={(e) => onUpdateRound(index, 'matchDuration', e.target.value)} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Matches / Player</label>
                            <input type="number" value={round.matchesPerPlayer} onChange={(e) => onUpdateRound(index, 'matchesPerPlayer', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Match Interval (min)</label>
                            <input type="number" value={round.matchInterval} onChange={(e) => onUpdateRound(index, 'matchInterval', e.target.value)} />
                        </div>
                    </div>
                     {/* TRƯỜNG MỚI */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Players Advance</label>
                            <input type="number" placeholder="e.g., 16" value={round.playersAdvance} onChange={(e) => onUpdateRound(index, 'playersAdvance', e.target.value)} />
                        </div>
                        <div className="form-group">
                             <label>Total Round Duration (hour)</label>
                            <input type="number" placeholder="e.g., 24" value={round.totalRoundDuration} onChange={(e) => onUpdateRound(index, 'totalRoundDuration', e.target.value)} />
                        </div>
                    </div>
                     {/* TRƯỜNG MỚI */}
                    <div className="form-group">
                        <label>Volume Rule</label>
                        <input type="text" placeholder="e.g., Minimum 1.0 lot" value={round.volumeRule} onChange={(e) => onUpdateRound(index, 'volumeRule', e.target.value)} />
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

// --- BƯỚC 3: PRIZES (Không thay đổi) ---
const Step3Prizes = ({ prizes, onAddPrize, onDeletePrize, onUpdatePrize, onBack, onSubmit }) => (
    <div className="create-cup-form">
        <div className="prizes-list">
            {prizes.map((prize, index) => (
                <div key={index} className="round-form">
                    <div className="round-form-header">
                        <h4>Prize {index + 1}</h4>
                        {prizes.length > 1 && <button type="button" className="delete-round-btn" onClick={() => onDeletePrize(index)}><CloseIcon /></button>}
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Type</label>
                            <select value={prize.type} onChange={(e) => onUpdatePrize(index, 'type', e.target.value)}><option>Top</option><option>Random</option></select>
                        </div>
                        <div className="form-group">
                            <label>Rank</label>
                            <input type="number" value={prize.rank} onChange={(e) => onUpdatePrize(index, 'rank', e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" placeholder="e.g., First Place" value={prize.name} onChange={(e) => onUpdatePrize(index, 'name', e.target.value)} />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Prize</label>
                            <input type="text" placeholder="e.g., 100 USDT" value={prize.prize} onChange={(e) => onUpdatePrize(index, 'prize', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Quantity</label>
                            <input type="number" value={prize.quantity} onChange={(e) => onUpdatePrize(index, 'quantity', e.target.value)} />
                        </div>
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

// --- COMPONENT MỚI: PAYMENT MODAL ---
const PaymentModal = ({ paymentInfo, onClose }) => {
    const [timeRemaining, setTimeRemaining] = useState(paymentInfo.expiresInSeconds);

    useEffect(() => {
        if (timeRemaining <= 0) return;
        const timer = setInterval(() => {
            setTimeRemaining(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeRemaining]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(paymentInfo.address)
            .then(() => alert("Address copied to clipboard!"))
            .catch(err => console.error('Failed to copy text: ', err));
    };

    return (
         <div className="modal-backdrop" onClick={onClose}>
            <div className="payment-modal-content" onClick={e => e.stopPropagation()}>
                <div className="payment-modal-header">
                    <h3>Scan QR to Deposit</h3>
                    <button onClick={onClose} className="modal-close-btn"><CloseIcon /></button>
                </div>
                <div className="payment-modal-body">
                    <p>Deposit at least <strong>{paymentInfo.amount}</strong> with memo:</p>
                    <p className="payment-memo">{paymentInfo.memo}</p>
                    
                    <img src={paymentInfo.qrCodeUrl} alt="QR Code" className="payment-qr-code" />

                    <div className="payment-address-box">
                        <span>{paymentInfo.address}</span>
                        <button onClick={handleCopyAddress} title="Copy Address">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V16.5a1.5 1.5 0 01-1.5 1.5h-7A1.5 1.5 0 017 16.5v-13z" /><path d="M5 6.5A1.5 1.5 0 016.5 5h3a.5.5 0 000-1h-3A2.5 2.5 0 004 6.5v10A2.5 2.5 0 006.5 19h7a2.5 2.5 0 002.5-2.5v-3a.5.5 0 00-1 0v3A1.5 1.5 0 0113.5 18h-7A1.5 1.5 0 015 16.5v-10z" /></svg>
                        </button>
                    </div>

                    <div className="payment-timer">
                        <span>Time Remaining</span>
                        <p>{formatTime(timeRemaining)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- COMPONENT MODAL CHÍNH ---
const CreateCupModal = ({ isOpen, onClose, onCreateCup }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormDataState] = useState({ title: '', description: '', broker: 'GOMarkets', symbol: 'XAUUSD', maxParticipants: 128, startTime: '', endTime: '', minimumBalance: 100 });
    const [paymentInfo, setPaymentInfo] = useState(null); // State để mở/đóng và chứa thông tin thanh toán

    const initialRound = { name: 'Round 1', format: 'Points', matchDuration: 15, matchesPerPlayer: 4, matchInterval: 60, playersAdvance: 16, totalRoundDuration: 24, volumeRule: 'Minimum 1.0 lot' };
    const [rounds, setRounds] = useState([initialRound]);
    
    const [prizes, setPrizes] = useState([ { type: 'Top', rank: 1, name: 'First Place', prize: '100 USDT', quantity: 1 } ]);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormDataState(prev => ({ ...prev, [name]: value }));
    };

    // --- Các hàm xử lý cho Rounds ---
    const addRound = () => setRounds(prev => [...prev, { ...initialRound, name: `Round ${prev.length + 1}` }]);
    const deleteRound = (index) => setRounds(prev => prev.filter((_, i) => i !== index));
    const updateRound = (index, field, value) => {
        const newRounds = [...rounds];
        newRounds[index][field] = value;
        setRounds(newRounds);
    };

    // --- Các hàm xử lý cho Prizes ---
    const addPrize = () => setPrizes(prev => [...prev, { type: 'Top', rank: prev.length + 1, name: '', prize: '', quantity: 1 }]);
    const deletePrize = (index) => setPrizes(prev => prev.filter((_, i) => i !== index));
    const updatePrize = (index, field, value) => {
        const newPrizes = [...prizes];
        newPrizes[index][field] = value;
        setPrizes(newPrizes);
    };

    const handleSubmit = async () => {
        const finalCupData = {
            details: formData,
            rounds: rounds,
            prizes: prizes
        };

        console.log("Dữ liệu sẽ được gửi lên API:", JSON.stringify(finalCupData, null, 2));
        
        try {
            // ----- BẠN SẼ THỰC HIỆN GỌI API THẬT TẠI ĐÂY -----
            // const response = await fetch('YOUR_API_ENDPOINT/create_cup', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(finalCupData)
            // });
            // if (!response.ok) throw new Error("Failed to create tournament");
            // const paymentDataFromServer = await response.json();
            // setPaymentInfo(paymentDataFromServer);

            // ----- DỮ LIỆU GIẢ ĐỂ TEST GIAO DIỆN -----
             alert("ĐANG MÔ PHỎNG GỌI API: Dữ liệu đã được log ra console. Giờ sẽ hiển thị modal thanh toán với dữ liệu giả.");
            const mockPaymentData = {
                amount: "12.00 USDT",
                memo: "c1a2b3d4e5f6",
                address: "TUYDJGWvzE54Wpq1AqFXWCUkjbyozrK1L2",
                qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TUYDJGWvzE54Wpq1AqFXWCUkjbyozrK1L2",
                expiresInSeconds: 600 // 10 minutes
            };
            setPaymentInfo(mockPaymentData);
            // ------------------------------------

        } catch (error) {
            console.error("Lỗi khi tạo giải đấu:", error);
            alert("Error creating tournament: " + error.message);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1: return <Step1Details formData={formData} setFormData={handleInputChange} onNext={() => setStep(2)} />;
            case 2: return <Step2Rounds rounds={rounds} onAddRound={addRound} onDeleteRound={deleteRound} onUpdateRound={updateRound} onBack={() => setStep(1)} onNext={() => setStep(3)} />;
            case 3: return <Step3Prizes prizes={prizes} onAddPrize={addPrize} onDeletePrize={deletePrize} onUpdatePrize={updatePrize} onBack={() => setStep(2)} onSubmit={handleSubmit} />;
            default: return null;
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            {/* Nếu có thông tin thanh toán, hiển thị modal thanh toán */}
            {paymentInfo ? (
                <PaymentModal paymentInfo={paymentInfo} onClose={() => {
                    setPaymentInfo(null); // Đóng modal thanh toán
                    onClose(); // Đóng cả modal tạo giải đấu
                }} />
            ) : (
                /* Ngược lại, hiển thị modal tạo giải đấu */
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
            )}
        </div>
    );
};

export default CreateCupModal;
