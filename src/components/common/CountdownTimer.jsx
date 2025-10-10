import React, { useState, useEffect } from 'react';

// Hàm helper để định dạng tổng số giây thành chuỗi thời gian
const formatTime = (totalSeconds) => {
    if (totalSeconds <= 0) {
        return "00:00:00";
    }

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    let result = '';
    if (days > 0) {
        result += `${days}d `;
    }
    result += `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    return result;
};

const CountdownTimer = ({ initialSeconds }) => {
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

    useEffect(() => {
        // Chỉ chạy interval khi thời gian còn lại > 0
        if (secondsLeft <= 0) {
            return;
        }

        const intervalId = setInterval(() => {
            setSecondsLeft(prevSeconds => prevSeconds - 1);
        }, 1000);

        // Dọn dẹp interval khi component unmount hoặc khi thời gian thay đổi
        return () => clearInterval(intervalId);
    }, [secondsLeft]);

    return <span>{formatTime(secondsLeft)}</span>;
};

export default CountdownTimer;