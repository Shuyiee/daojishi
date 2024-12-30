// 获取DOM元素
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

let countdownInterval;

// 获取下一个新年的时间
function getNextNewYear() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextNewYear = new Date(currentYear + 1, 0, 1);
    
    if (now > nextNewYear) {
        return new Date(currentYear + 2, 0, 1);
    }
    return nextNewYear;
}

// 开始倒计时
function startCountdown() {
    const targetDate = getNextNewYear().getTime();
    
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