// src/components/TradingChart.jsx - PHIÊN BẢN 100% CHIỀU CAO

import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

// ✅ BƯỚC 1: Xóa width, height khỏi props
const TradingChart = ({ interval, symbol }) => {
    const [series, setSeries] = useState([{ data: [] }]);
    
    // ✅ BƯỚC 2: Xóa bỏ chiều cao trong options
    const [options, setOptions] = useState({
        chart: {
            type: 'candlestick',
            background: '#0d121c',
            foreColor: '#d1d5db',
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: { speed: 1000 }
            },
        },
        xaxis: { type: 'datetime' },
        yaxis: { tooltip: { enabled: true } },
        theme: { mode: 'dark' }
    });

    // ... (Toàn bộ logic fetch data và websocket giữ nguyên)
    const fetchHistoricalData = async (fetchSymbol, fetchInterval) => {
        try {
            const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${fetchSymbol.toUpperCase()}&interval=${fetchInterval}&limit=100`);
            const data = await response.json();
            const formattedData = data.map(candle => ({
                x: new Date(candle[0]),
                y: [ parseFloat(candle[1]), parseFloat(candle[2]), parseFloat(candle[3]), parseFloat(candle[4]) ]
            }));
            setSeries([{ data: formattedData }]);
        } catch (error) {
            console.error("Failed to fetch historical data:", error);
        }
    };

    useEffect(() => {
        fetchHistoricalData(symbol, interval);
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`);
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const candle = message.k;
            const newCandle = {
                x: new Date(candle.t),
                y: [ parseFloat(candle.o), parseFloat(candle.h), parseFloat(candle.l), parseFloat(candle.c) ]
            };
            setSeries(prevSeries => {
                let newData = [...prevSeries[0].data];
                if (newData.length > 0 && newData[newData.length - 1].x.getTime() === newCandle.x.getTime()) {
                    newData[newData.length - 1] = newCandle;
                } else { newData.push(newCandle); }
                if (newData.length > 100) { newData.shift(); }
                return [{ data: newData }];
            });
        };
        return () => { if (ws.readyState === WebSocket.OPEN) { ws.close(); } };
    }, [interval, symbol]);

    return (
        // ✅ BƯỚC 3: Đặt height="100%"
        <Chart 
            options={options} 
            series={series} 
            type="candlestick" 
            height="100%" 
        />
    );
};

export default TradingChart;