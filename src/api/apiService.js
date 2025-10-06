// src/api/apiService.js

const API_BASE_URL = 'https://f2farena.com/api';

/**
 * Hàm trợ giúp chung để thực hiện các yêu cầu fetch.
 * Tự động xử lý JSON và báo lỗi chi tiết.
 * @param {string} endpoint - Đường dẫn API (ví dụ: '/users/123')
 * @param {object} options - Các tùy chọn của Fetch (method, headers, body)
 * @returns {Promise<any>} Dữ liệu JSON từ phản hồi
 */
async function request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
    };

    try {
        const response = await fetch(url, config);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ detail: response.statusText }));
            throw new Error(errorData.detail || 'An unknown API error occurred');
        }
        // Trả về null nếu response không có nội dung (HTTP 204)
        return response.status === 204 ? null : response.json();
    } catch (error) {
        console.error(`API Error on ${endpoint}: ${error.message}`);
        // Ném lỗi ra ngoài để component có thể bắt và xử lý
        throw error;
    }
}

// ===================================================================
// CÁC HÀM API ĐƯỢC CHUẨN HÓA
// ===================================================================

// --- User & Wallet API ---
export const getUser = (userId) => request(`/users/${userId}`);
export const updateUser = (userId, data) => request(`/users/${userId}`, { method: 'PUT', body: JSON.stringify(data) });
export const getTransactionHistory = (userId) => request(`/users/${userId}/history-transactions`);

// --- Home, Arena, Match API ---
export const getBanners = () => request('/events/banner');
export const getActiveMatches = () => request('/matches/active');
export const getMatchHistory = (userId) => request(`/matches/history/${userId}`);
export const getSupportedSymbols = () => request('/matches/supported-symbols');
export const createMatch = (matchData) => request('/matches/', { method: 'POST', body: JSON.stringify(matchData) });
export const joinMatch = (matchId, joinData) => request(`/matches/${matchId}`, { method: 'PATCH', body: JSON.stringify(joinData) });
export const creatorConfirmMatch = (matchId) => request(`/matches/${matchId}/creator-confirm`, { method: 'POST' });
export const cancelMatch = (matchId, reason = "Creator rejected challenge") => request(`/matches/${matchId}/cancel`, { method: 'POST', body: JSON.stringify({ reason }) });

// --- Tournament API ---
export const getTournaments = (type = 'official', limit = 10, offset = 0) => request(`/tournaments/?type=${type}&limit=${limit}&offset=${offset}`);
export const getTournamentDetails = (id) => request(`/tournaments/${id}`);
export const getMyUpcomingTournamentMatches = (userId) => request(`/tournaments/my-upcoming-matches/${userId}`);
export const confirmTournamentMatchEntry = (matchId, userId) => request(`/tournaments/matches/${matchId}/confirm-entry`, { method: 'POST', body: JSON.stringify({ user_id: userId }) });
export const declineTournamentMatchEntry = (matchId, userId) => request(`/tournaments/matches/${matchId}/decline-entry`, { method: 'POST', body: JSON.stringify({ user_id: userId }) });

// --- Leaderboard API ---
export const getLeaderboard = (type) => request(`/leaderboard/${type}`); // type can be 'tournament' or 'personal'

// --- Review & Complaint API ---
export const getBrokers = () => request('/brokers/list');
export const getComplaints = () => request('/complaints/');
export const createComplaint = (complaintData) => request('/complaints/', { method: 'POST', body: JSON.stringify(complaintData) });
export const resolveComplaint = (complaintId) => request(`/complaints/${complaintId}/resolve`, { method: 'PATCH' });

// --- Chatbot API ---
export const getChatHistory = (userId) => request(`/chatbot/history/${userId}`);
export const askChatbot = (userId, question, history) => request('/chatbot/ask', { method: 'POST', body: JSON.stringify({ user_id: userId, question, history }) });

// --- Notification API (từ file telegramService.js của project 1) ---
export const notifyAdminOfDeposit = (userId, amount, memo) => {
    const payload = { user_id: userId, amount: parseFloat(amount), memo };
    return request('/notify-deposit-request', { 
        method: 'POST', 
        body: JSON.stringify(payload) 
    });
};

export const requestWithdrawal = (userId, amount, walletAddress) => {
    const payload = { user_id: userId, amount: parseFloat(amount), wallet_address: walletAddress };
    return request('/notify-withdrawal-request', { 
        method: 'POST', 
        body: JSON.stringify(payload) 
    });
};