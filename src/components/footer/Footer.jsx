// import React from 'react';
// import './Footer.css'; // Import CSS riêng của Footer

// // Import các Icon cần thiết (điều chỉnh đường dẫn nếu cần)
// import { 
//     FacebookIcon, 
//     InstagramIcon, 
//     TelegramIcon, 
//     XIcon 
// } from '../../icons/Icons';
// import logoImage from '../../assets/logo.png'; // Điều chỉnh đường dẫn đến logo

// // Nhận prop `setActiveTab` từ App.jsx
// const Footer = ({ setActiveTab }) => {
//     // Hàm xử lý chung để điều hướng và cuộn lên đầu trang
//     const handleNavigation = (tabName) => {
//         if (setActiveTab) {
//             setActiveTab(tabName);
//             window.scrollTo({ top: 0, behavior: 'smooth' }); // Tự động cuộn lên đầu trang
//         } else {
//             console.error("Lỗi: Hàm setActiveTab chưa được truyền xuống cho Footer component.");
//         }
//     };

//     return (
//         <footer className="app-footer">
//             <div className="footer-container">
//                 {/* Cột 1: Logo và Giới thiệu */}
//                 <div className="footer-column">
//                     <img src={logoImage} alt="Logo" style={{ width: '50px', marginBottom: '1rem' }} />
//                     <p>
//                         A professional trading platform for competitive tournaments and challenges.
//                     </p>
//                 </div>

//                 {/* Cột 2: Product - ĐÃ SỬA */}
//                 <div className="footer-column">
//                     <h3>Product</h3>
//                     <ul>
//                         <li><button onClick={() => handleNavigation('Arena')}>Tournaments</button></li>
//                         <li><button onClick={() => handleNavigation('Arena')}>1v1 Matches</button></li>
//                         <li><button onClick={() => handleNavigation('Leaderboard')}>Leaderboard</button></li>
//                     </ul>
//                 </div>

//                 {/* Cột 3: Support */}
//                 <div className="footer-column">
//                     <h3>Support</h3>
//                     <ul>
//                         <li><a href="#">Help Center</a></li>
//                         <li><a href="#">Contact Us</a></li>
//                         <li><a href="#">Complaints</a></li>
//                     </ul>
//                 </div>

//                 {/* Cột 4: Legal */}
//                 <div className="footer-column">
//                     <h3>Legal</h3>
//                     <ul>
//                         <li><a href="#">Privacy Policy</a></li>
//                         <li><a href="#">Terms of Service</a></li>
//                     </ul>
//                 </div>

//                 {/* Cột 5: Social Media & Language */}
//                 <div className="footer-column">
//                     <h3>Follow Us</h3>
//                     <div className="social-links">
//                         <a href="#" aria-label="Facebook"><FacebookIcon /></a>
//                         <a href="#" aria-label="Instagram"><InstagramIcon /></a>
//                         <a href="#" aria-label="Telegram"><TelegramIcon /></a>
//                         <a href="#" aria-label="X"><XIcon /></a>
//                     </div>
//                     <select className="language-selector" aria-label="Select language" style={{marginTop: '1rem'}}>
//                         <option value="en">English</option>
//                         <option value="vi">Tiếng Việt</option>
//                     </select>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;

import React from 'react';
import './Footer.css';

import { 
    FacebookIcon, 
    InstagramIcon, 
    TelegramIcon, 
    XIcon 
} from '../../icons/Icons';
import logoImage from '../../assets/logo.png';

// NHẬN PROP `onNavigate` TỪ App.jsx
const Footer = ({ onNavigate }) => {

    // Hàm xử lý chung để tránh lặp code
    const handleNavigationClick = (mainTab, subTab = null) => {
        if (onNavigate) {
            onNavigate(mainTab, subTab);
        } else {
            console.error("Lỗi: Hàm onNavigate chưa được truyền xuống cho Footer component.");
        }
    };

    return (
        <footer className="app-footer">
            <div className="footer-container">
                <div className="footer-column">
                    <img src={logoImage} alt="Logo" style={{ width: '50px', marginBottom: '1rem' }} />
                    <p>
                        A professional trading platform for competitive tournaments and challenges.
                    </p>
                </div>

                {/* SỬA CÁC SỰ KIỆN onClick */}
                <div className="footer-column">
                    <h3>Product</h3>
                    <ul>
                        <li><button onClick={() => handleNavigationClick('Arena', 'tournament')}>Tournaments</button></li>
                        <li><button onClick={() => handleNavigationClick('Arena', '1v1_match')}>1v1 Matches</button></li>
                        <li><button onClick={() => handleNavigationClick('Leaderboard')}>Leaderboard</button></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Support</h3>
                    <ul>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Complaints</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Legal</h3>
                    <ul>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Follow Us</h3>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook"><FacebookIcon /></a>
                        <a href="#" aria-label="Instagram"><InstagramIcon /></a>
                        <a href="#" aria-label="Telegram"><TelegramIcon /></a>
                        <a href="#" aria-label="X"><XIcon /></a>
                    </div>
                    <select className="language-selector" aria-label="Select language" style={{marginTop: '1rem'}}>
                        <option value="en">English</option>
                        <option value="vi">Tiếng Việt</option>
                    </select>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

