// import React, { useState, useEffect } from 'react';
// import './CreateCupModal.css';
// import { CloseIcon } from '../../icons/Icons';

// // --- CÁC COMPONENT GIAO DIỆN (Giữ nguyên) ---
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
// const Step1Details = ({ formData, setFormData, onNext }) => (
//     <form className="create-cup-form" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
//         <div className="form-group"><label htmlFor="title">Title</label><input type="text" id="title" name="title" value={formData.title} onChange={setFormData} required /></div>
//         <div className="form-group"><label htmlFor="description">Description</label><textarea id="description" name="description" value={formData.description} onChange={setFormData} rows="3"></textarea></div>
//         <div className="form-row"><div className="form-group"><label htmlFor="broker">Broker</label><select id="broker" name="broker" value={formData.broker} onChange={setFormData}><option value="GOMarkets">GOMarkets</option></select></div><div className="form-group"><label htmlFor="symbol">Symbol</label><select id="symbol" name="symbol" value={formData.symbol} onChange={setFormData}><option value="XAUUSD">XAUUSD</option><option value="BTCUSD">BTCUSD</option></select></div></div>
//         <div className="form-row"><div className="form-group"><label htmlFor="maxParticipants">Max Participants</label><input type="number" id="maxParticipants" name="maxParticipants" value={formData.maxParticipants} onChange={setFormData} required /></div><div className="form-group"><label htmlFor="minimumBalance">Minimum Balance (USDT)</label><input type="number" id="minimumBalance" name="minimumBalance" value={formData.minimumBalance} onChange={setFormData} required /></div></div>
//         <div className="form-row"><div className="form-group"><label htmlFor="startTime">Start Time</label><input type="datetime-local" id="startTime" name="startTime" value={formData.startTime} onChange={setFormData} required /></div><div className="form-group"><label htmlFor="endTime">End Time</label><input type="datetime-local" id="endTime" name="endTime" value={formData.endTime} onChange={setFormData} required /></div></div>
//         <div className="form-nav single-btn"><button type="submit" className="nav-btn next-btn">Next</button></div>
//     </form>
// );
// const Step2Rounds = ({ rounds, onAddRound, onDeleteRound, onUpdateRound, onBack, onNext }) => (
//     <div className="create-cup-form">
//         <div className="rounds-config-list">{rounds.map((round, index) => (<div key={index} className="round-form"><div className="round-form-header"><input type="text" className="round-name-input" placeholder="e.g., Round 1, Quarter-Finals" value={round.name} onChange={(e) => onUpdateRound(index, 'name', e.target.value)} />{rounds.length > 1 && <button type="button" className="delete-round-btn" onClick={() => onDeleteRound(index)}><CloseIcon /></button>}</div><div className="form-row"><div className="form-group"><label>Format</label><select value={round.format} onChange={(e) => onUpdateRound(index, 'format', e.target.value)}><option>Points</option><option>Profit</option></select></div><div className="form-group"><label>Match Duration (min)</label><input type="number" value={round.matchDuration} onChange={(e) => onUpdateRound(index, 'matchDuration', e.target.value)} /></div></div><div className="form-row"><div className="form-group"><label>Matches / Player</label><input type="number" value={round.matchesPerPlayer} onChange={(e) => onUpdateRound(index, 'matchesPerPlayer', e.target.value)} /></div><div className="form-group"><label>Match Interval (min)</label><input type="number" value={round.matchInterval} onChange={(e) => onUpdateRound(index, 'matchInterval', e.target.value)} /></div></div><div className="form-row"><div className="form-group"><label>Players Advance</label><input type="number" placeholder="e.g., 16" value={round.playersAdvance} onChange={(e) => onUpdateRound(index, 'playersAdvance', e.target.value)} /></div><div className="form-group"><label>Total Round Duration (hour)</label><input type="number" placeholder="e.g., 24" value={round.totalRoundDuration} onChange={(e) => onUpdateRound(index, 'totalRoundDuration', e.target.value)} /></div></div><div className="form-group"><label>Volume Rule</label><input type="text" placeholder="e.g., Minimum 1.0 lot" value={round.volumeRule} onChange={(e) => onUpdateRound(index, 'volumeRule', e.target.value)} /></div></div>))}</div><button type="button" className="add-round-btn" onClick={onAddRound}>+ Add Round</button><div className="form-nav"><button type="button" className="nav-btn back-btn" onClick={onBack}>Back</button><button type="button" className="nav-btn next-btn" onClick={onNext}>Next</button></div>
//     </div>
// );
// const Step3Prizes = ({ prizes, onAddPrize, onDeletePrize, onUpdatePrize, onBack, onSubmit }) => (
//     <div className="create-cup-form">
//         <div className="prizes-list">{prizes.map((prize, index) => (<div key={index} className="round-form"><div className="round-form-header"><h4>Prize {index + 1}</h4>{prizes.length > 1 && <button type="button" className="delete-round-btn" onClick={() => onDeletePrize(index)}><CloseIcon /></button>}</div><div className="form-row"><div className="form-group"><label>Type</label><select value={prize.type} onChange={(e) => onUpdatePrize(index, 'type', e.target.value)}><option>Top</option><option>Random</option></select></div><div className="form-group"><label>Rank</label><input type="number" value={prize.rank} onChange={(e) => onUpdatePrize(index, 'rank', e.target.value)} /></div></div><div className="form-group"><label>Name</label><input type="text" placeholder="e.g., First Place" value={prize.name} onChange={(e) => onUpdatePrize(index, 'name', e.target.value)} /></div><div className="form-row"><div className="form-group"><label>Prize</label><input type="text" placeholder="e.g., 100 USDT" value={prize.prize} onChange={(e) => onUpdatePrize(index, 'prize', e.target.value)} /></div><div className="form-group"><label>Quantity</label><input type="number" value={prize.quantity} onChange={(e) => onUpdatePrize(index, 'quantity', e.target.value)} /></div></div></div>))}</div><button type="button" className="add-round-btn" onClick={onAddPrize}>+ Add Prize</button><div className="form-nav"><button type="button" className="nav-btn back-btn" onClick={onBack}>Back</button><button type="button" className="nav-btn create-btn" onClick={onSubmit}>Create Tournament</button></div>
//     </div>
// );
// const PaymentModal = ({ paymentInfo, onClose }) => {
//     const [timeRemaining, setTimeRemaining] = useState(paymentInfo.expiresInSeconds); useEffect(() => { if (timeRemaining <= 0) return; const timer = setInterval(() => { setTimeRemaining(prev => prev - 1); }, 1000); return () => clearInterval(timer); }, [timeRemaining]); const formatTime = (seconds) => { const m = Math.floor(seconds / 60).toString().padStart(2, '0'); const s = (seconds % 60).toString().padStart(2, '0'); return `${m}:${s}`; }; const handleCopyAddress = () => { navigator.clipboard.writeText(paymentInfo.address).then(() => alert("Address copied to clipboard!")).catch(err => console.error('Failed to copy text: ', err)); }; return (<div className="modal-backdrop" onClick={onClose}><div className="payment-modal-content" onClick={e => e.stopPropagation()}><div className="payment-modal-header"><h3>Scan QR to Deposit</h3><button onClick={onClose} className="modal-close-btn"><CloseIcon /></button></div><div className="payment-modal-body"><p>Deposit at least <strong>{paymentInfo.amount}</strong> with memo:</p><p className="payment-memo">{paymentInfo.memo}</p><img src={paymentInfo.qrCodeUrl} alt="QR Code" className="payment-qr-code" /><div className="payment-address-box"><span>{paymentInfo.address}</span><button onClick={handleCopyAddress} title="Copy Address"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V16.5a1.5 1.5 0 01-1.5 1.5h-7A1.5 1.5 0 017 16.5v-13z" /><path d="M5 6.5A1.5 1.5 0 016.5 5h3a.5.5 0 000-1h-3A2.5 2.5 0 004 6.5v10A2.5 2.5 0 006.5 19h7a2.5 2.5 0 002.5-2.5v-3a.5.5 0 00-1 0v3A1.5 1.5 0 0113.5 18h-7A1.5 1.5 0 015 16.5v-10z" /></svg></button></div><div className="payment-timer"><span>Time Remaining</span><p>{formatTime(timeRemaining)}</p></div></div></div></div>);
// };

// // --- COMPONENT MODAL CHÍNH ---
// const CreateCupModal = ({ isOpen, onClose, onCupCreated, user }) => {
//     const [step, setStep] = useState(1);
//     const [formData, setFormDataState] = useState({ title: '', description: '', broker: 'GOMarkets', symbol: 'XAUUSD', maxParticipants: 128, startTime: '', endTime: '', minimumBalance: 100 });
//     const [paymentInfo, setPaymentInfo] = useState(null);
//     const [isProcessing, setIsProcessing] = useState(false);

//     const initialRound = { name: 'Round 1', format: 'Points', matchDuration: 15, matchesPerPlayer: 4, matchInterval: 60, playersAdvance: 16, totalRoundDuration: 24, volumeRule: 'Minimum 1.0 lot' };
//     const [rounds, setRounds] = useState([initialRound]);
//     const [prizes, setPrizes] = useState([ { type: 'Top', rank: 1, name: 'First Place', prize: '100 USDT', quantity: 1 } ]);

//     if (!isOpen) return null;

//     const handleInputChange = (e) => setFormDataState(prev => ({ ...prev, [e.target.name]: e.target.value }));
//     const addRound = () => setRounds(prev => [...prev, { ...initialRound, name: `Round ${prev.length + 1}` }]);
//     const deleteRound = (index) => setRounds(prev => prev.filter((_, i) => i !== index));
//     const updateRound = (index, field, value) => { const newRounds = [...rounds]; newRounds[index][field] = value; setRounds(newRounds); };
//     const addPrize = () => setPrizes(prev => [...prev, { type: 'Top', rank: prev.length + 1, name: '', prize: '', quantity: 1 }]);
//     const deletePrize = (index) => setPrizes(prev => prev.filter((_, i) => i !== index));
//     const updatePrize = (index, field, value) => { const newPrizes = [...prizes]; newPrizes[index][field] = value; setPrizes(newPrizes); };

//     const handleSubmit = async () => {
//         setIsProcessing(true);

//         // API cần telegram_id, được lưu trong user.uid
//         if (!user || !user.uid) {
//             alert("Please log in to create a private cup.");
//             setIsProcessing(false);
//             return;
//         }

//         const CREATION_FEE = 12.00; 
//         // ✅ SỬA LỖI: Sử dụng đúng endpoint và đúng user ID (telegram_id)
//         const USER_INFO_ENDPOINT = `https://f2farena.com/api/users/${user.uid}`;
//         const CREATE_CUP_ENDPOINT = 'https://f2farena.com/api/tournaments/private/';
//         const DEPOSIT_REQUEST_ENDPOINT = 'https://f2farena.com/api/deposit/request';

//         try {
//             // 3. Kiểm tra số dư
//             console.log(`📝 [INFO] Checking balance for user ${user.uid} at ${USER_INFO_ENDPOINT}`);
//             const userResponse = await fetch(USER_INFO_ENDPOINT);
//             if (!userResponse.ok) throw new Error("Could not fetch user data to check balance.");
            
//             const userData = await userResponse.json();
//             // ✅ SỬA LỖI: Đọc số dư từ key `bet_wallet`
//             const userBalance = userData.bet_wallet || 0;
//             console.log(`✅ [SUCCESS] User balance is: ${userBalance} USDT`);

//             // 4. So sánh số dư và xử lý
//             if (userBalance < CREATION_FEE) {
//                 // 5. Nếu không đủ, hiện QR Code
//                 console.warn(`⚠️ [WARN] Insufficient balance. User has ${userBalance}, requires ${CREATION_FEE}. Requesting deposit...`);
                
//                 const depositResponse = await fetch(DEPOSIT_REQUEST_ENDPOINT, {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     // Gửi đi telegram_id
//                     body: JSON.stringify({ user_id: user.uid, amount: CREATION_FEE })
//                 });
//                 if (!depositResponse.ok) throw new Error("Could not create a deposit request.");
                
//                 const paymentData = await depositResponse.json();
//                 console.log("✅ [SUCCESS] Deposit request created. Showing payment modal.", paymentData);
//                 setPaymentInfo(paymentData);

//             } else {
//                 // 6. Nếu đủ, tạo giải đấu
//                 console.log("✅ [SUCCESS] Balance is sufficient. Proceeding to create tournament...");
//                 // Gửi đi telegram_id
//                 const finalCupData = { details: formData, rounds, prizes, creator_id: user.uid };
                
//                 const createCupResponse = await fetch(CREATE_CUP_ENDPOINT, {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(finalCupData)
//                 });

//                 if (!createCupResponse.ok) {
//                     const errorData = await createCupResponse.json();
//                     throw new Error(errorData.detail || "Failed to create tournament.");
//                 }

//                 console.log("✅ [SUCCESS] Tournament created successfully!");
//                 onCupCreated(); // 7. Gọi hàm callback báo thành công
//             }

//         } catch (error) {
//             console.error("❌ [ERROR] An error occurred during cup creation process:", error);
//             alert(`Error: ${error.message}`);
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     const renderStep = () => {
//         switch (step) {
//             case 1: return <Step1Details formData={formData} setFormData={handleInputChange} onNext={() => setStep(2)} />;
//             case 2: return <Step2Rounds rounds={rounds} onAddRound={addRound} onDeleteRound={deleteRound} onUpdateRound={updateRound} onBack={() => setStep(1)} onNext={() => setStep(3)} />;
//             case 3: return <Step3Prizes prizes={prizes} onAddPrize={addPrize} onDeletePrize={deletePrize} onUpdatePrize={updatePrize} onBack={() => setStep(2)} onSubmit={handleSubmit} />;
//             default: return null;
//         }
//     };

//     return (
//         <div className="modal-backdrop" onClick={onClose}>
//             {paymentInfo ? (
//                 <PaymentModal paymentInfo={paymentInfo} onClose={() => {
//                     setPaymentInfo(null);
//                     onClose();
//                 }} />
//             ) : (
//                 <div className="create-cup-modal-content" onClick={e => e.stopPropagation()}>
//                     <div className="create-cup-header">
//                         <h2>Create Private Cup</h2>
//                         <button onClick={onClose} className="modal-close-btn"><CloseIcon /></button>
//                     </div>
//                     <div className="create-cup-body">
//                         <Stepper currentStep={step} />
//                         {isProcessing ? <div className="processing-overlay">Processing...</div> : renderStep()}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CreateCupModal;
import React, { useState, useEffect } from 'react';
import './CreateCupModal.css';
import { CloseIcon } from '../../icons/Icons';

// --- CÁC COMPONENT GIAO DIỆN (Giữ nguyên) ---
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
const Step1Details = ({ formData, setFormData, onNext }) => (
    <form className="create-cup-form" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
        <div className="form-group"><label htmlFor="title">Title</label><input type="text" id="title" name="title" value={formData.title} onChange={setFormData} required /></div>
        <div className="form-group"><label htmlFor="description">Description</label><textarea id="description" name="description" value={formData.description} onChange={setFormData} rows="3"></textarea></div>
        <div className="form-row"><div className="form-group"><label htmlFor="broker">Broker</label><select id="broker" name="broker" value={formData.broker} onChange={setFormData}><option value="1">GOMarkets</option></select></div><div className="form-group"><label htmlFor="symbol">Symbol</label><select id="symbol" name="symbol" value={formData.symbol} onChange={setFormData}><option value="XAUUSD">XAUUSD</option><option value="BTCUSD">BTCUSD</option></select></div></div>
        <div className="form-row"><div className="form-group"><label htmlFor="maxParticipants">Max Participants</label><input type="number" id="maxParticipants" name="maxParticipants" value={formData.maxParticipants} onChange={setFormData} required /></div><div className="form-group"><label htmlFor="minimumBalance">Minimum Balance (USDT)</label><input type="number" id="minimumBalance" name="minimumBalance" value={formData.minimumBalance} onChange={setFormData} required /></div></div>
        <div className="form-row"><div className="form-group"><label htmlFor="startTime">Start Time</label><input type="datetime-local" id="startTime" name="startTime" value={formData.startTime} onChange={setFormData} required /></div><div className="form-group"><label htmlFor="endTime">End Time</label><input type="datetime-local" id="endTime" name="endTime" value={formData.endTime} onChange={setFormData} required /></div></div>
        <div className="form-nav single-btn"><button type="submit" className="nav-btn next-btn">Next</button></div>
    </form>
);
const Step2Rounds = ({ rounds, onAddRound, onDeleteRound, onUpdateRound, onBack, onNext }) => (
    <div className="create-cup-form">
        <div className="rounds-config-list">{rounds.map((round, index) => (<div key={index} className="round-form"><div className="round-form-header"><input type="text" className="round-name-input" placeholder="e.g., Round 1, Quarter-Finals" value={round.name} onChange={(e) => onUpdateRound(index, 'name', e.target.value)} />{rounds.length > 1 && <button type="button" className="delete-round-btn" onClick={() => onDeleteRound(index)}><CloseIcon /></button>}</div><div className="form-row"><div className="form-group"><label>Format</label><select value={round.format} onChange={(e) => onUpdateRound(index, 'format', e.target.value)}><option value="points">Points</option><option value="profit">Profit</option></select></div><div className="form-group"><label>Match Duration (min)</label><input type="number" value={round.matchDuration} onChange={(e) => onUpdateRound(index, 'matchDuration', e.target.value)} /></div></div><div className="form-row"><div className="form-group"><label>Matches / Player</label><input type="number" value={round.matchesPerPlayer} onChange={(e) => onUpdateRound(index, 'matchesPerPlayer', e.target.value)} /></div><div className="form-group"><label>Match Interval (min)</label><input type="number" value={round.matchInterval} onChange={(e) => onUpdateRound(index, 'matchInterval', e.target.value)} /></div></div><div className="form-row"><div className="form-group"><label>Players Advance</label><input type="number" placeholder="e.g., 16" value={round.playersAdvance} onChange={(e) => onUpdateRound(index, 'playersAdvance', e.target.value)} /></div><div className="form-group"><label>Total Round Duration (hour)</label><input type="number" placeholder="e.g., 24" value={round.totalRoundDuration} onChange={(e) => onUpdateRound(index, 'totalRoundDuration', e.target.value)} /></div></div><div className="form-group"><label>Volume Rule (lots)</label><input type="number" placeholder="e.g., 0.1" value={round.volumeRule} onChange={(e) => onUpdateRound(index, 'volumeRule', e.target.value)} /></div></div>))}</div><button type="button" className="add-round-btn" onClick={onAddRound}>+ Add Round</button><div className="form-nav"><button type="button" className="nav-btn back-btn" onClick={onBack}>Back</button><button type="button" className="nav-btn next-btn" onClick={onNext}>Next</button></div>
    </div>
);
const Step3Prizes = ({ prizes, onAddPrize, onDeletePrize, onUpdatePrize, onBack, onSubmit }) => (
    <div className="create-cup-form">
        <div className="prizes-list">{prizes.map((prize, index) => (<div key={index} className="round-form"><div className="round-form-header"><h4>Prize {index + 1}</h4>{prizes.length > 1 && <button type="button" className="delete-round-btn" onClick={() => onDeletePrize(index)}><CloseIcon /></button>}</div><div className="form-row"><div className="form-group"><label>Type</label><select value={prize.type} onChange={(e) => onUpdatePrize(index, 'type', e.target.value)}><option value="top">Top</option><option value="random">Random</option></select></div><div className="form-group"><label>Rank</label><input type="number" value={prize.rank} onChange={(e) => onUpdatePrize(index, 'rank', e.target.value)} /></div></div><div className="form-group"><label>Name</label><input type="text" placeholder="e.g., First Place" value={prize.name} onChange={(e) => onUpdatePrize(index, 'name', e.target.value)} /></div><div className="form-row"><div className="form-group"><label>Prize</label><input type="text" placeholder="e.g., 100 USDT" value={prize.prize} onChange={(e) => onUpdatePrize(index, 'prize', e.target.value)} /></div><div className="form-group"><label>Quantity</label><input type="number" value={prize.quantity} onChange={(e) => onUpdatePrize(index, 'quantity', e.target.value)} /></div></div></div>))}</div><button type="button" className="add-round-btn" onClick={onAddPrize}>+ Add Prize</button><div className="form-nav"><button type="button" className="nav-btn back-btn" onClick={onBack}>Back</button><button type="button" className="nav-btn create-btn" onClick={onSubmit}>Create Tournament</button></div>
    </div>
);
const PaymentModal = ({ paymentInfo, onClose }) => {
    const [timeRemaining, setTimeRemaining] = useState(paymentInfo.expiresInSeconds); useEffect(() => { if (timeRemaining <= 0) return; const timer = setInterval(() => { setTimeRemaining(prev => prev - 1); }, 1000); return () => clearInterval(timer); }, [timeRemaining]); const formatTime = (seconds) => { const m = Math.floor(seconds / 60).toString().padStart(2, '0'); const s = (seconds % 60).toString().padStart(2, '0'); return `${m}:${s}`; }; const handleCopyAddress = () => { navigator.clipboard.writeText(paymentInfo.address).then(() => alert("Address copied to clipboard!")).catch(err => console.error('Failed to copy text: ', err)); }; return (<div className="modal-backdrop" onClick={onClose}><div className="payment-modal-content" onClick={e => e.stopPropagation()}><div className="payment-modal-header"><h3>Scan QR to Deposit</h3><button onClick={onClose} className="modal-close-btn"><CloseIcon /></button></div><div className="payment-modal-body"><p>Deposit at least <strong>{paymentInfo.amount}</strong> with memo:</p><p className="payment-memo">{paymentInfo.memo}</p><img src={paymentInfo.qrCodeUrl} alt="QR Code" className="payment-qr-code" /><div className="payment-address-box"><span>{paymentInfo.address}</span><button onClick={handleCopyAddress} title="Copy Address"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V16.5a1.5 1.5 0 01-1.5 1.5h-7A1.5 1.5 0 017 16.5v-13z" /><path d="M5 6.5A1.5 1.5 0 016.5 5h3a.5.5 0 000-1h-3A2.5 2.5 0 004 6.5v10A2.5 2.5 0 006.5 19h7a2.5 2.5 0 002.5-2.5v-3a.5.5 0 00-1 0v3A1.5 1.5 0 0113.5 18h-7A1.5 1.5 0 015 16.5v-10z" /></svg></button></div><div className="payment-timer"><span>Time Remaining</span><p>{formatTime(timeRemaining)}</p></div></div></div></div>);
};

// --- COMPONENT MODAL CHÍNH ---
const CreateCupModal = ({ isOpen, onClose, onCupCreated, user }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormDataState] = useState({ title: '', description: '', broker: '1', symbol: 'XAUUSD', maxParticipants: 16, startTime: '', endTime: '', minimumBalance: 0 });
    const [paymentInfo, setPaymentInfo] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const initialRound = { name: 'Round 1', format: 'points', matchDuration: 15, matchesPerPlayer: 4, matchInterval: 60, playersAdvance: 8, totalRoundDuration: 24, volumeRule: 0.1 };
    const [rounds, setRounds] = useState([initialRound]);
    const [prizes, setPrizes] = useState([ { type: 'top', rank: 1, name: 'First Place', prize: '100 USDT', quantity: 1 } ]);

    if (!isOpen) return null;

    const handleInputChange = (e) => setFormDataState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const addRound = () => setRounds(prev => [...prev, { ...initialRound, name: `Round ${prev.length + 1}` }]);
    const deleteRound = (index) => setRounds(prev => prev.filter((_, i) => i !== index));
    const updateRound = (index, field, value) => { const newRounds = [...rounds]; newRounds[index][field] = value; setRounds(newRounds); };
    const addPrize = () => setPrizes(prev => [...prev, { type: 'top', rank: prev.length + 1, name: '', prize: '', quantity: 1 }]);
    const deletePrize = (index) => setPrizes(prev => prev.filter((_, i) => i !== index));
    const updatePrize = (index, field, value) => { const newPrizes = [...prizes]; newPrizes[index][field] = value; setPrizes(newPrizes); };

    // ✅ THÊM MỚI: Hàm tính tổng số trận đấu
    const calculateTotalMatches = () => {
        let totalMatches = 0;
        let currentParticipants = parseInt(formData.maxParticipants, 10);
        if (isNaN(currentParticipants) || currentParticipants <= 1) return 0;

        for (const round of rounds) {
            if (currentParticipants <= 1) break;

            const matchesPerPlayer = parseInt(round.matchesPerPlayer, 10);
            if (isNaN(matchesPerPlayer)) continue;
            
            // Chỉ tính cho format 'points' theo logic cũ
            if (round.format === 'points') {
                totalMatches += Math.floor((currentParticipants * matchesPerPlayer) / 2);
            }
            
            currentParticipants = parseInt(round.playersAdvance, 10) || 0;
        }
        return totalMatches;
    };


    const handleSubmit = async () => {
        setIsProcessing(true);

        if (!user || !user.uid) {
            alert("Please log in to create a private cup.");
            setIsProcessing(false);
            return;
        }
        
        // ✅ CẬP NHẬT: Tính toán tổng giải thưởng từ state
        const totalPrizePool = prizes.reduce((total, prize) => {
            const prizeValue = parseFloat(prize.prize) || 0;
            const quantity = parseInt(prize.quantity, 10) || 1;
            return total + (prizeValue * quantity);
        }, 0);

        // Giả định chi phí tạo giải
        const CREATION_FEE = 12.00; 
        const USER_INFO_ENDPOINT = `https://f2farena.com/api/users/${user.uid}`;
        const CREATE_CUP_ENDPOINT = 'https://f2farena.com/api/tournaments/private';
        const DEPOSIT_REQUEST_ENDPOINT = 'https://f2farena.com/api/deposit/request';

        try {
            console.log(`📝 [INFO] Checking balance for user ${user.uid} at ${USER_INFO_ENDPOINT}`);
            const userResponse = await fetch(USER_INFO_ENDPOINT);
            if (!userResponse.ok) throw new Error("Could not fetch user data to check balance.");
            
            const userData = await userResponse.json();
            const userBalance = userData.bet_wallet || 0;
            console.log(`✅ [SUCCESS] User balance is: ${userBalance} USDT`);

            if (userBalance < CREATION_FEE) {
                console.warn(`⚠️ [WARN] Insufficient balance. User has ${userBalance}, requires ${CREATION_FEE}. Requesting deposit...`);
                
                const depositResponse = await fetch(DEPOSIT_REQUEST_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user_id: user.uid, amount: CREATION_FEE })
                });
                if (!depositResponse.ok) throw new Error("Could not create a deposit request.");
                
                const paymentData = await depositResponse.json();
                console.log("✅ [SUCCESS] Deposit request created. Showing payment modal.", paymentData);
                setPaymentInfo(paymentData);

            } else {
                console.log("✅ [SUCCESS] Balance is sufficient. Proceeding to create tournament...");

                // ✅ CẬP NHẬT: Xây dựng payload theo đúng cấu trúc từ curl
                const payload = {
                    title: formData.title,
                    description: formData.description,
                    broker_id: parseInt(formData.broker, 10),
                    symbol: formData.symbol,
                    max_participants: parseInt(formData.maxParticipants, 10),
                    event_time: new Date(formData.startTime).toISOString(),
                    end_time: new Date(formData.endTime).toISOString(),
                    registration_url: "", // Thêm trường còn thiếu
                    min_balance: parseFloat(formData.minimumBalance).toFixed(2),
                    creator_id: user.uid,
                    prize_pool: totalPrizePool,
                    total_matches: calculateTotalMatches(),
                    rounds: rounds.map((round, index) => ({
                        name: round.name,
                        duration_minutes: parseInt(round.matchDuration, 10),
                        competition_format: round.format,
                        advancement_count: parseInt(round.playersAdvance, 10),
                        matches_per_player: parseInt(round.matchesPerPlayer, 10),
                        volume_rule: parseFloat(round.volumeRule),
                        match_interval_minutes: parseInt(round.matchInterval, 10),
                        total_round_duration_minutes: parseInt(round.totalRoundDuration, 10) * 60,
                        round_number: index + 1,
                        scheduling_timeframes: null
                    })),
                    prize_structure: prizes.map(prize => ({
                        prize_type: prize.type,
                        rank: parseInt(prize.rank, 10),
                        name: prize.name,
                        prize: prize.prize,
                        quantity: parseInt(prize.quantity, 10)
                    }))
                };

                console.log("📝 [INFO] Sending payload to create tournament:", JSON.stringify(payload, null, 2));

                const createCupResponse = await fetch(CREATE_CUP_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!createCupResponse.ok) {
                    const errorData = await createCupResponse.json();
                    console.error("❌ [ERROR] API returned an error:", errorData);
                    throw new Error(errorData.detail || "Failed to create tournament.");
                }

                console.log("✅ [SUCCESS] Tournament created successfully!");
                onCupCreated();
            }

        } catch (error) {
            console.error("❌ [ERROR] An error occurred during cup creation process:", error);
            alert(`Error: ${error.message}`);
        } finally {
            setIsProcessing(false);
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
            {paymentInfo ? (
                <PaymentModal paymentInfo={paymentInfo} onClose={() => {
                    setPaymentInfo(null);
                    onClose();
                }} />
            ) : (
                <div className="create-cup-modal-content" onClick={e => e.stopPropagation()}>
                    <div className="create-cup-header">
                        <h2>Create Private Cup</h2>
                        <button onClick={onClose} className="modal-close-btn"><CloseIcon /></button>
                    </div>
                    <div className="create-cup-body">
                        <Stepper currentStep={step} />
                        {isProcessing ? <div className="processing-overlay">Processing...</div> : renderStep()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateCupModal;


