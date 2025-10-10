import React from 'react';
import './WinnerCard.css';

// ✅ 1. Import các ảnh cúp từ thư mục assets
import cupVang from '../../assets/cupvang.png';
import cupBac from '../../assets/cupbac.png';
import cupDong from '../../assets/cupdong.png';

const WinnerCard = ({ rank, name, prize }) => {
    let rankClass = '';
    let cupImage = null;

    // ✅ 2. Logic để chọn đúng ảnh cúp và class CSS dựa trên rank
    if (rank === 1) {
        rankClass = 'rank-1 gold';
        cupImage = cupVang;
    } else if (rank === 2) {
        rankClass = 'rank-2 silver';
        cupImage = cupBac;
    } else if (rank === 3) {
        rankClass = 'rank-3 bronze';
        cupImage = cupDong;
    }

    return (
        <div className={`winner-card ${rankClass}`}>
            {/* ✅ 3. Thay thế icon SVG cũ bằng thẻ <img> mới */}
            {cupImage && <img src={cupImage} alt={`Rank ${rank} cup`} className="cup-image" />}
            
            <div className="winner-avatar"></div>
            <span className="winner-name">{name}</span>
            <span className="winner-prize">{prize}</span>
        </div>
    );
};

export default WinnerCard;