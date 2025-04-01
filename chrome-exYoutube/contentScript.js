(() => {
    let youtubeLeftControls, youtubePlayer;
    let ContentVideo = "";

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;

        if (type === "NEW") {
            ContentVideo = videoId;
            newVideoLoaded();
        }
    });

    const newVideoLoaded = () => {
        const thebuttonexist = document.getElementsByClassName("bookmark-btn")[0];

        if (!thebuttonexist) {
            const bookmarkBtn = document.createElement("img");

            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
            bookmarkBtn.className = "bookmark-btn";
            bookmarkBtn.title = "Click to bookmark the current timestamp";

            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-stream")[0];

            youtubeLeftControls.appendChild(bookmarkBtn);
        }
    }

    newVideoLoaded();
})();