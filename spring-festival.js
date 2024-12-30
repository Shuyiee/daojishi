// 获取DOM元素
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

let countdownInterval;

// 春节日期数据（未来几年的春节日期）
const springFestivalDates = {
    2024: '2024-02-10',
    2025: '2025-01-29',
    2026: '2026-02-17',
    2027: '2027-02-06',
    2028: '2028-01-26',
    2029: '2029-02-13'
};

// 获取下一个春节的时间
function getNextSpringFestival() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // 遍历未来的春节日期，找到最近的一个
    for (let year = currentYear; year <= currentYear + 5; year++) {
        if (springFestivalDates[year]) {
            const springFestival = new Date(springFestivalDates[year]);
            if (now < springFestival) {
                return springFestival;
            }
        }
    }
    
    // 如果没有找到，返回已知的最后一个春节日期
    const lastYear = Math.max(...Object.keys(springFestivalDates));
    return new Date(springFestivalDates[lastYear]);
}

// 开始倒计时
function startCountdown() {
    const targetDate = getNextSpringFestival().getTime();
    
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