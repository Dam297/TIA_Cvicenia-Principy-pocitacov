function secondsRemaining(date, sec) {
    const now = Date.now();
    const targetPlusX = new Date(date).getTime() + sec * 1000;
    return Math.floor((targetPlusX - now) / 1000);
}

module.exports = {secondsRemaining};