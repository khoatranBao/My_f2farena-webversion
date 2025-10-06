import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../firebaseConfig';
import './Chatbot.css';

// Import các hàm cần thiết của Firestore
import { collection, query, onSnapshot, addDoc, orderBy, serverTimestamp } from 'firebase/firestore';

// Import Icon
import { CloseIcon, SendIcon } from '../../icons/Icons';

const Chatbot = ({ currentUser }) => {
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    
    // State và các hàm cho việc kéo thả
    const [isDragging, setIsDragging] = useState(false);
    const [dragPosition, setDragPosition] = useState({ x: null, y: null });
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    
    const chatEndRef = useRef(null);

    // Logic isLoggedIn và userId giờ sẽ dựa hoàn toàn vào prop 'currentUser'
    const isLoggedIn = !!currentUser;
    // Lấy ID, có thể từ user Telegram (id) hoặc user ẩn danh (uid)
    const userId = currentUser ? (currentUser.id || currentUser.uid) : null; 

    // Effect lắng nghe tin nhắn từ Firestore
    useEffect(() => {
        // Sử dụng một collection khác, ví dụ "global_chat"
        const q = query(collection(db, "global_chat"), orderBy("timestamp", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedMessages = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setMessages(fetchedMessages);
        }, (error) => {
            console.error("Error with Firestore listener:", error);
        });
        return () => unsubscribe();
    }, []);

    // Effect tự cuộn xuống tin nhắn cuối
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Các hàm xử lý kéo thả
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

    // Hàm gửi tin nhắn
    const sendMessage = async () => {
        if (newMessage.trim() === '' || !isLoggedIn) return;
        
        try {
            await addDoc(collection(db, "global_chat"), {
                text: newMessage,
                timestamp: serverTimestamp(),
                userId: userId,
                // Gửi thêm thông tin người dùng để hiển thị
                userName: currentUser.first_name || 'Anonymous', 
                userPhoto: currentUser.photo_url || null,
            });
            setNewMessage('');
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <>
            <button
                className={`chat-btn-draggable ${isDragging ? 'dragging' : ''}`}
                style={dragPosition.y !== null ? { top: dragPosition.y, left: dragPosition.x, bottom: 'auto', right: 'auto' } : {}}
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
                                    {/* Hiển thị tên người gửi nếu không phải là mình */}
                                    {msg.userId !== userId && <p className="chat-user-name">{msg.userName || `User ${String(msg.userId).substring(0, 6)}`}</p>}
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
                            disabled={!isLoggedIn}
                        />
                        <button onClick={sendMessage} className="chat-send-btn" disabled={!isLoggedIn}>
                            <SendIcon />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;