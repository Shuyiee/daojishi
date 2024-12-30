// 获取DOM元素
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

let countdownInterval;

// 中秋节日期数据（未来几年的中秋节日期）
const midAutumnDates = {
    2024: '2024-09-17',
    2025: '2025-10-06',
    2026: '2026-09-25',
    2027: '2027-09-15',
    2028: '2028-10-03',
    2029: '2029-09-22'
};

// 获取下一个中秋节的时间
function getNextMidAutumn() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // 遍历未来的中秋节日期，找到最近的一个
    for (let year = currentYear; year <= currentYear + 5; year++) {
        if (midAutumnDates[year]) {
            const midAutumn = new Date(midAutumnDates[year]);
            if (now < midAutumn) {
                return midAutumn;
            }
        }
    }
    
    // 如果没有找到，返回已知的最后一个中秋节日期
    const lastYear = Math.max(...Object.keys(midAutumnDates));
    return new Date(midAutumnDates[lastYear]);
}

// 开始倒计时
function startCountdown() {
    const targetDate = getNextMidAutumn().getTime();
    
    function updateCountdown() {
        const currentTime = new Date().getTime();
        const timeLeft = targetDate - currentTime;
        
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            location.reload();
            return;
        }
        
        // 计算天、时、分、秒
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // 更新显示
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

// 页面加载时启动倒计时
startCountdown(); 