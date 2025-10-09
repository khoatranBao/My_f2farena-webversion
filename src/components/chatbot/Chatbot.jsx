// import React, { useState, useEffect, useRef } from 'react';
// import './Chatbot.css';

// // Import Icon
// import { CloseIcon, SendIcon } from '../../icons/Icons';

// const Chatbot = ({ currentUser }) => {
//     const [chatOpen, setChatOpen] = useState(false);
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
    
//     // State và các hàm cho việc kéo thả
//     const [isDragging, setIsDragging] = useState(false);
//     const [dragPosition, setDragPosition] = useState({ x: null, y: null });
//     const [offset, setOffset] = useState({ x: 0, y: 0 });
    
//     const chatEndRef = useRef(null);

//     const isLoggedIn = !!currentUser;
//     // Lấy telegram_id từ user.uid
//     const userId = currentUser ? currentUser.uid : null; 

//     // Effect để tải lịch sử chat khi mở cửa sổ
//     useEffect(() => {
//         // Chỉ chạy khi cửa sổ chat được mở và có user ID
//         if (chatOpen && userId) {
//             const fetchChatHistory = async () => {
//                 const endpoint = `https://f2farena.com/api/chatbot/history/${userId}`;
//                 console.log(`📝 [INFO] Chatbot: Bắt đầu lấy lịch sử chat cho user ID: ${userId} từ endpoint: ${endpoint}`);
//                 setIsLoading(true);
//                 setMessages([]); // Xóa tin nhắn cũ trước khi tải

//                 try {
//                     const response = await fetch(endpoint);
//                     if (!response.ok) {
//                         const errorData = await response.text();
//                         console.warn(`⚠️ [WARN] Chatbot: API trả về lỗi! Status: ${response.status}`, errorData);
//                         throw new Error(errorData || 'Failed to fetch chat history');
//                     }

//                     const data = await response.json();
//                     console.log("✅ [SUCCESS] Chatbot: Tải lịch sử chat thành công!", data);

//                     // Giả sử API trả về một mảng các đối tượng tin nhắn
//                     if (Array.isArray(data)) {
//                         // ✅ SỬA ĐỔI: Chuyển đổi cấu trúc dữ liệu để khớp với giao diện
//                         const formattedMessages = data.map(msg => ({
//                             role: msg.role,
//                             // Lấy nội dung tin nhắn từ bên trong mảng 'parts'
//                             content: msg.parts && msg.parts[0] ? msg.parts[0] : ''
//                         }));
//                         setMessages(formattedMessages);
//                     } else {
//                         console.warn("⚠️ [WARN] Chatbot: Dữ liệu trả về không phải là một mảng.");
//                         setMessages([]);
//                     }

//                 } catch (error) {
//                     console.error("❌ [ERROR] Chatbot: Lỗi khi tải lịch sử chat:", error);
//                     // Hiển thị một tin nhắn lỗi cho người dùng
//                     setMessages([{ role: 'model', content: 'Sorry, I was unable to load the chat history.' }]);
//                 } finally {
//                     setIsLoading(false);
//                     console.log(" M [INFO] Chatbot: Quá trình tải dữ liệu kết thúc.");
//                 }
//             };

//             fetchChatHistory();
//         }
//     }, [chatOpen, userId]); // Chạy lại khi chatOpen hoặc userId thay đổi

//     // Effect tự cuộn xuống tin nhắn cuối
//     useEffect(() => {
//         chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages, isLoading]);

//     // Các hàm xử lý kéo thả (giữ nguyên)
//     const handleMouseDown = (e) => {
//         if (chatOpen) return; // Không cho kéo thả khi cửa sổ chat đang mở
//         const target = e.target.closest('button');
//         if (!target) return;
//         setIsDragging(true);
//         const rect = target.getBoundingClientRect();
//         setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
//     };

//     const handleMouseMove = (e) => {
//         if (!isDragging) return;
//         let newX = e.clientX - offset.x;
//         let newY = e.clientY - offset.y;
//         const buttonWidth = 64;
//         const buttonHeight = 64;
//         newX = Math.max(0, Math.min(newX, window.innerWidth - buttonWidth));
//         newY = Math.max(0, Math.min(newY, window.innerHeight - buttonHeight));
//         setDragPosition({ x: newX, y: newY });
//     };

//     const handleMouseUp = () => setIsDragging(false);

//     useEffect(() => {
//         window.addEventListener('mousemove', handleMouseMove);
//         window.addEventListener('mouseup', handleMouseUp);
//         return () => {
//             window.removeEventListener('mousemove', handleMouseMove);
//             window.removeEventListener('mouseup', handleMouseUp);
//         };
//     }, [isDragging, offset]);

//     // TODO: Hàm gửi tin nhắn sẽ cần kết nối với API gửi tin nhắn của bạn
//     const sendMessage = async () => {
//         if (newMessage.trim() === '' || !isLoggedIn) return;
//         // Tạm thời chỉ thêm tin nhắn của user vào state để demo
//         setMessages(prev => [...prev, { role: 'user', content: newMessage }]);
//         setNewMessage('');
//     };

//     return (
//         <>
//             <button
//                 className={`chat-btn-draggable ${isDragging ? 'dragging' : ''}`}
//                 style={dragPosition.y !== null ? { top: dragPosition.y, left: dragPosition.x, bottom: 'auto', right: 'auto' } : {}}
//                 onMouseDown={handleMouseDown}
//                 onClick={() => !isDragging && setChatOpen(!chatOpen)}
//             >
//                 <div className="chat-btn-inner">
//                     <div className="chat-btn-ping"></div>
//                     <img src="https://placehold.co/100x100/171f65/FFFFFF?text=Chat" alt="Chatbot Icon" className="chat-btn-icon" />
//                     <div className="chat-btn-dot"></div>
//                 </div>
//             </button>

//             {chatOpen && (
//                 <div className="chat-window">
//                     <div className="chat-header">
//                         <h3>F2F Support</h3>
//                         <button onClick={() => setChatOpen(false)}><CloseIcon /></button>
//                     </div>
//                     <div className="chat-messages">
//                         {isLoading ? (
//                             <p className="chat-loading-text">Loading history...</p>
//                         ) : (
//                             messages.map((msg, index) => (
//                                 <div key={index} className={`chat-message-container ${msg.role === 'user' ? 'sent' : 'received'}`}>
//                                     <div className={`chat-bubble ${msg.role === 'user' ? 'sent' : 'received'}`}>
//                                         {msg.content}
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                         <div ref={chatEndRef} />
//                     </div>
//                     <div className="chat-input-area">
//                         <input 
//                             type="text" 
//                             value={newMessage} 
//                             onChange={(e) => setNewMessage(e.target.value)} 
//                             onKeyPress={(e) => e.key === 'Enter' && isLoggedIn && sendMessage()} 
//                             placeholder={isLoggedIn ? "Type a message..." : "Please login to chat"}
//                             disabled={!isLoggedIn || isLoading}
//                         />
//                         <button onClick={sendMessage} className="chat-send-btn" disabled={!isLoggedIn || isLoading}>
//                             <SendIcon />
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Chatbot;
import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

// Import Icon
import { CloseIcon, SendIcon } from '../../icons/Icons';

const Chatbot = ({ currentUser }) => {
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // State và các hàm cho việc kéo thả
    const [isDragging, setIsDragging] = useState(false);
    const [dragPosition, setDragPosition] = useState({ x: null, y: null });
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    
    const chatEndRef = useRef(null);

    const isLoggedIn = !!currentUser;
    // Lấy telegram_id từ user.uid
    const userId = currentUser ? currentUser.uid : null; 

    // Effect để tải lịch sử chat khi mở cửa sổ
    useEffect(() => {
        if (chatOpen && userId) {
            const fetchChatHistory = async () => {
                const endpoint = `https://f2farena.com/api/chatbot/history/${userId}`;
                console.log(`📝 [INFO] Chatbot: Bắt đầu lấy lịch sử chat cho user ID: ${userId} từ endpoint: ${endpoint}`);
                setIsLoading(true);
                setMessages([]);

                try {
                    const response = await fetch(endpoint);
                    if (!response.ok) {
                        const errorData = await response.text();
                        console.warn(`⚠️ [WARN] Chatbot: API trả về lỗi! Status: ${response.status}`, errorData);
                        throw new Error(errorData || 'Failed to fetch chat history');
                    }

                    const data = await response.json();
                    console.log("✅ [SUCCESS] Chatbot: Tải lịch sử chat thành công!", data);

                    if (Array.isArray(data)) {
                        const formattedMessages = data.map(msg => ({
                            role: msg.role,
                            content: msg.parts && msg.parts[0] ? msg.parts[0] : ''
                        }));
                        setMessages(formattedMessages);
                    } else {
                        console.warn("⚠️ [WARN] Chatbot: Dữ liệu trả về không phải là một mảng.");
                        setMessages([]);
                    }
                } catch (error) {
                    console.error("❌ [ERROR] Chatbot: Lỗi khi tải lịch sử chat:", error);
                    setMessages([{ role: 'model', content: 'Sorry, I was unable to load the chat history.' }]);
                } finally {
                    setIsLoading(false);
                    console.log(" M [INFO] Chatbot: Quá trình tải dữ liệu kết thúc.");
                }
            };
            fetchChatHistory();
        }
    }, [chatOpen, userId]);

    // Effect tự cuộn xuống tin nhắn cuối
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    // Các hàm xử lý kéo thả (giữ nguyên)
    const handleMouseDown = (e) => {
        if (chatOpen) return;
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

    // ✅ HÀM GỬI TIN NHẮN ĐÃ ĐƯỢC CẬP NHẬT
    const sendMessage = async () => {
        if (newMessage.trim() === '' || !isLoggedIn) return;

        const question = newMessage.trim();

        // Thêm tin nhắn của người dùng vào giao diện ngay lập tức
        setMessages(prev => [...prev, { role: 'user', content: question }]);
        setNewMessage('');
        setIsLoading(true); // Báo hiệu AI đang "suy nghĩ"

        const payload = {
            question: question,
            user_id: userId
        };

        console.log("📝 [INFO] Chatbot: Đang gửi câu hỏi tới API. Payload:", payload);

        try {
            const response = await fetch("https://f2farena.com/api/chatbot/ask", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const responseData = await response.json();

            if (!response.ok) {
                console.warn(`⚠️ [WARN] Chatbot: API trả về lỗi! Status: ${response.status}`, responseData);
                throw new Error(responseData.detail || 'Failed to get response from bot.');
            }

            console.log("✅ [SUCCESS] Chatbot: Nhận được câu trả lời từ bot!", responseData);
            
            // Định dạng lại câu trả lời của model
            const modelMessage = {
                role: 'model',
                content: responseData.parts && responseData.parts[0] ? responseData.parts[0] : 'No response content.'
            };
            
            // Thêm câu trả lời của model vào giao diện
            setMessages(prev => [...prev, modelMessage]);

        } catch (error) {
            console.error("❌ [ERROR] Chatbot: Lỗi khi gửi tin nhắn:", error);
            const errorMessage = {
                role: 'model',
                content: 'Sorry, an error occurred. Please try again later.'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false); // Hoàn tất, AI ngừng "suy nghĩ"
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
                        <h3>F2F Support</h3>
                        <button onClick={() => setChatOpen(false)}><CloseIcon /></button>
                    </div>
                    <div className="chat-messages">
                        {
                            messages.map((msg, index) => (
                                <div key={index} className={`chat-message-container ${msg.role === 'user' ? 'sent' : 'received'}`}>
                                    <div className={`chat-bubble ${msg.role === 'user' ? 'sent' : 'received'}`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))
                        }
                        {/* Hiển thị "..." khi đang chờ câu trả lời */}
                        {isLoading && (
                            <div className="chat-message-container received">
                                <div className="chat-bubble received">
                                    <span className="typing-indicator"></span>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                    <div className="chat-input-area">
                        <input 
                            type="text" 
                            value={newMessage} 
                            onChange={(e) => setNewMessage(e.target.value)} 
                            onKeyPress={(e) => e.key === 'Enter' && isLoggedIn && !isLoading && sendMessage()} 
                            placeholder={isLoggedIn ? "Type a message..." : "Please login to chat"}
                            disabled={!isLoggedIn || isLoading}
                        />
                        <button onClick={sendMessage} className="chat-send-btn" disabled={!isLoggedIn || isLoading}>
                            <SendIcon />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;


