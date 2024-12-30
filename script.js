// 获取DOM元素
const targetDateTimeInput = document.getElementById('targetDateTime');
const startButton = document.getElementById('startButton');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

let countdownInterval;

// 开始倒计时
function startCountdown() {
    // 获取目标时间
    const targetDate = new Date(targetDateTimeInput.value).getTime();
    
    // 清除之前的倒计时
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    // 更新倒计时
    function updateCountdown() {
        const currentTime = new Date().getTime();
        const timeLeft = targetDate - currentTime;
        
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
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
    
    // 立即执行一次
    updateCountdown();
    // 设置定时器，每秒更新一次
    countdownInterval = setInterval(updateCountdown, 1000);
}

// 绑定点击事件
startButton.addEventListener('click', startCountdown);

// 设置默认时间为明天
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
targetDateTimeInput.value = tomorrow.toISOString().slice(0, 16); 