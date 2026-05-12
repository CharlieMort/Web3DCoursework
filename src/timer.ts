let timer = document.getElementById("timer")
let video = document.getElementById("video")
if (video instanceof HTMLVideoElement) {
    video.playbackRate = 2.0;
}

function convertTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return [
        hrs.toString().padStart(2, "0"),
        mins.toString().padStart(2, "0"),
        secs.toString().padStart(2, "0")
    ].join(":");
}

const updateTimer = (v, t) => {
    if (v instanceof HTMLVideoElement) {
        currentTime = v.currentTime * 20
    }
    t.innerText = `Time Taken - ${convertTime(currentTime)}`
}

// let currentTime = 0;
// setInterval(updateTimer.bind(null, video, timer), 50)
// not used anymore as moved to iframe :(