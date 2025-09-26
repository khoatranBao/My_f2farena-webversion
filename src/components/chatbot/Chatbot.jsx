import { db, auth } from '../../firebaseConfig';
import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css'; // Import CSS riêng

// Import các hàm của Firebase
import { getFirestore, onSnapshot, collection, query, addDoc } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

// Import Icon
import { CloseIcon } from '../../icons/Icons'; // Điều chỉnh đường dẫn nếu cần


const Chatbot = ({ currentUser }) => {
    // --- STATE: Toàn bộ state của chatbot được chuyển vào đây ---
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    
    // State cho việc kéo thả
    const [isDragging, setIsDragging] = useState(false);
    const [dragPosition, setDragPosition] = useState({ x: window.innerWidth - 75, y: window.innerHeight - 150 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    
    const chatEndRef = useRef(null);

    // --- EFFECTS: Các useEffect của chatbot cũng được chuyển vào đây ---
    const isLoggedIn = !!currentUser;
    // Effect xác thực người dùng (giữ nguyên logic cũ)
    useEffect(() => {
        const handleAuth = async (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                try {
                    const cred = await signInAnonymously(auth);
                    setUserId(cred.user.uid);
                } catch (error) {
                    console.error("Anonymous sign-in failed:", error);
                }
            }
            setIsAuthReady(true);
        };
        const unsubscribe = onAuthStateChanged(auth, handleAuth);
        return () => unsubscribe();
    }, []);

    // Effect lắng nghe tin nhắn từ Firestore
    useEffect(() => {
        if (isAuthReady && userId) {
            const q = query(collection(db, `artifacts/default-app-id/public/data/chat_messages`));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const fetchedMessages = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })).sort((a, b) => a.timestamp - b.timestamp);
                setMessages(fetchedMessages);
            }, (error) => {
                console.error("Error with Firestore listener:", error);
            });
            return () => unsubscribe();
        }
    }, [isAuthReady, userId]);

    // Effect tự cuộn xuống tin nhắn cuối
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Effect xử lý kéo thả
    const handleMouseDown = (e) => {
        const target = e.target.closest('button');
        if (!target) return;
        setIsDragging(true);
        const rect = target.getBoundingClientRect();
        setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        let newX = e.clientX - offset.x;
        let newY = e.clientY - offset.y;
        const buttonWidth = 64;
        const buttonHeight = 64;
        newX = Math.max(0, Math.min(newX, window.innerWidth - buttonWidth));
        newY = Math.max(0, Math.min(newY, window.innerHeight - buttonHeight));
        setDragPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, offset]);

    // --- LOGIC: Hàm gửi tin nhắn ---
    const sendMessage = async () => {
        if (newMessage.trim() === '' || !userId) return;
        try {
            await addDoc(collection(db, `artifacts/default-app-id/public/data/chat_messages`), {
                text: newMessage,
                timestamp: Date.now(),
                userId: userId,
            });
            setNewMessage('');
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    // --- JSX: Giao diện của chatbot ---
    return (
        <>
            <button
                className={`chat-btn-draggable ${isDragging ? 'dragging' : ''}`}
                style={{ top: dragPosition.y, left: dragPosition.x }}
                onMouseDown={handleMouseDown}
                onClick={() => !isDragging && setChatOpen(!chatOpen)}
            >
                <div className="chat-btn-inner">
                    <div className="chat-btn-ping"></div>
                    <img src="https://placehold.co/100x100/171f65/FFFFFF?text=Chat" alt="Chatbot Icon" className="chat-btn-icon" />
                    <div className="chat-btn-dot"></div>
                </div>
            </button>

            {chatOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <h3>Global Chat</h3>
                        <button onClick={() => setChatOpen(false)}><CloseIcon /></button>
                    </div>
                    <div className="chat-messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`chat-message-container ${msg.userId === userId ? 'sent' : 'received'}`}>
                                <div className={`chat-bubble ${msg.userId === userId ? 'sent' : 'received'}`}>
                                    <p>User: {msg.userId.substring(0, 6)}</p>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                        <div className="chat-input-area">
                            <input 
                                type="text" 
                                value={newMessage} 
                                onChange={(e) => setNewMessage(e.target.value)} 
                                onKeyPress={(e) => e.key === 'Enter' && isLoggedIn && sendMessage()} 
                                placeholder={isLoggedIn ? "Type a message..." : "Please login to chat"}
                                disabled={!isLoggedIn} // Vô hiệu hóa nếu chưa đăng nhập
                            />
                            <button 
                                onClick={sendMessage} 
                                className="chat-send-btn"
                                disabled={!isLoggedIn} // Vô hiệu hóa nếu chưa đăng nhập
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
                            </button>
                        </div>
                    </div>
            )}
        </>
    );
};

export default Chatbot;