import React from 'react';
import './Footer.css'; // Import CSS riêng của Footer

// Import các Icon cần thiết (điều chỉnh đường dẫn nếu cần)
import { 
    FacebookIcon, 
    InstagramIcon, 
    TelegramIcon, 
    XIcon 
} from '../../icons/Icons';
import logoImage from '../../assets/logo.png'; // Điều chỉnh đường dẫn đến logo

const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="footer-container">
                {/* Cột 1: Logo và Giới thiệu */}
                <div className="footer-column">
                    <img src={logoImage} alt="Logo" style={{ width: '50px', marginBottom: '1rem' }} />
                    <p>
                        A professional trading platform for competitive tournaments and challenges.
                    </p>
                </div>

                {/* Cột 2: Product */}
                <div className="footer-column">
                    <h3>Product</h3>
                    <ul>
                        <li><a href="#">Tournaments</a></li>
                        <li><a href="#">1v1 Matches</a></li>
                        <li><a href="#">Leaderboard</a></li>
                    </ul>
                </div>

                {/* Cột 3: Support */}
                <div className="footer-column">
                    <h3>Support</h3>
                    <ul>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Complaints</a></li>
                    </ul>
                </div>

                {/* Cột 4: Legal */}
                <div className="footer-column">
                    <h3>Legal</h3>
                    <ul>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>

                {/* Cột 5: Social Media & Language */}
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