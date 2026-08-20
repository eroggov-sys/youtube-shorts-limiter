const watchRule = 3;

let currentVideoId = null;
let watchedSeconds = 0; 
let lastCheckedTime = Date.now();

function getToday() {
    return new Date().toLocaleDateString("en-CA");
}

function getShortId() {
    const match = location.pathname.match(/^\/shorts\/([^/?]+)/);
    return match ? match[1] : null;
}

async function registerView(videoId) {
    const today = getToday();

    const result = await chrome.storage.local.get(["date", "count", "limit", "watchedVideosIds"]);

    const limit = result.limit ?? 20;
    let count = result.count ?? 0;
    let watchedVideosIds = result.watchedVideosIds ?? [];
    
    if (result.date !== today) {
        count = 0;
        watchedVideosIds = [];
    }

    if (!watchedVideosIds.includes(videoId)){
        watchedVideosIds.push(videoId);
        count++;
        await chrome.storage.local.set( {date:today, count, limit, watchedVideosIds});
    }

    if (count >= limit) {
        showBlockScreen(count, limit)
        document.querySelectorAll("video").forEach((video) => {video.pause()});

    }
}

function showBlockScreen(count, limit) {
    document.querySelectorAll("video").forEach((video) => {video.pause()});

    if (document.getElementById("shorts-limiter-block")) {
        return;
    }
    

    const block = document.createElement("div");
    block.id = "shorts-limiter-block";

    block.innerHTML = `
    <div class = "shorts-limiter-message">
        <h1> Day limit reached</h1>
        <p> Viewed Shorts: ${count} из ${limit}</p>
        <a href= "https://www.youtube.com/">Return on YouTube</a>
    </div>
    `;

    block.style.position = "fixed",
    block.style.inset = "0";
    block.style.zIndex = "99999";
    block.style.background = "#101010";
    block.style.color= "#ffffff";
    block.style.display= "flex";
    block.style.alignItems= "center";
    block.style.justifyContent= "center";
    block.style.textAlign= "center";
    block.style.fontFamily= "Arial, sans-serif";

    document.body.appendChild(block);
}

async function checkLimit() {
    const result = await chrome.storage.local.get(["date", "count", "limit"])

    const count = result.date === getToday() ? (result.count ?? 0) : 0;
    const limit = result.limit ?? 20;

    if (count >= limit && getShortId()) showBlockScreen(count, limit);
}

let isRegistered = false;

setInterval(()=>{
    const videoId = getShortId();

    const video = [...document.querySelectorAll("video")].find((item) => {
        const rect = item.getBoundingClientRect();

        return (
            rect.width > 0 &&
            rect.height > 0 &&
            rect.top < window.innerHeight &&
            rect.bottom > 0 &&
            !item.paused
        );
    });

    const now = Date.now();

    if (videoId !== currentVideoId) {
        currentVideoId = videoId;
        watchedSeconds = 0;
        isRegistered = false;
        lastCheckedTime = now;
        checkLimit();
    }

    if (videoId && video && !video.paused) {
        watchedSeconds += (now - lastCheckedTime) / 1000;


        if (watchedSeconds >= watchRule && !isRegistered){
            registerView(videoId);
            isRegistered = true;
        }
    }
    lastCheckedTime = now;

},500)
