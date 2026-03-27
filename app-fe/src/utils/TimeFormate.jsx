
function secondsToNormal(seconds, sign){
    let hours = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds - hours * 3600) / 60);
    let secondsLeft = seconds - hours * 3600 - mins * 60;

    var answer = (sign ? "" : "-");
    answer += (hours < 10 ? "0" + hours : hours);
    answer += ":" + (mins < 10 ? "0" + mins : mins);
    answer += ":" + (secondsLeft < 10 ? "0" + secondsLeft : secondsLeft);
    return answer;
}

export {secondsToNormal};