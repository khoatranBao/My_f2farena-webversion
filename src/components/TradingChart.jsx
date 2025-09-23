// src/components/TradingChart.jsx - PHIÊN BẢN API THỜI GIAN THỰC
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const TradingChart = ({ interval }) => {
    const [series, setSeries] = useState([{ data: [] }]);
    const [options, setOptions] = useState({
        chart: {
            type: 'candlestick',
            height: 500,
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

    // Hàm để lấy dữ liệu lịch sử từ API Binance
    const fetchHistoricalData = async (symbol, interval) => {
        try {
            // Lấy 100 cây nến gần nhất
            const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=${interval}&limit=100`);
            const data = await response.json();

            // Định dạng lại dữ liệu cho ApexCharts
            const formattedData = data.map(candle => ({
                x: new Date(candle[0]),
                y: [
                    parseFloat(candle[1]), // Open
                    parseFloat(candle[2]), // High
                    parseFloat(candle[3]), // Low
                    parseFloat(candle[4])  // Close
                ]
            }));
            setSeries([{ data: formattedData }]);
        } catch (error) {
            console.error("Failed to fetch historical data:", error);
        }
    };

    // useEffect này sẽ chạy lại mỗi khi `interval` thay đổi
    useEffect(() => {
        // Luôn lấy dữ liệu lịch sử khi đổi khung thời gian
        fetchHistoricalData('BTCUSDT', interval);

        // Chỉ kết nối WebSocket để cập nhật real-time cho khung 1 phút
        if (interval !== '1m') {
            return; // Không làm gì nếu không phải khung 1m
        }

        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/btcusdt@kline_${interval}`);

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
                } else {
                    newData.push(newCandle);
                }
                if (newData.length > 100) {
                    newData.shift();
                }
                return [{ data: newData }];
            });
        };

        // Hàm dọn dẹp để đóng kết nối khi component bị hủy hoặc đổi khung thời gian
        return () => {
            ws.close();
        };
    }, [interval]); // Chạy lại effect khi `interval` thay đổi

    return (
        <div id="chart">
            <Chart options={options} series={series} type="candlestick" height={500} />
        </div>
    );
};

export default TradingChart;