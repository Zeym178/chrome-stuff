(() => {
    let youtubeLeftControls, youtubePlayer;
    let ContentVideo = "";
    let ContentVideoBookmarks = [];

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;

        if (type === "NEW") {
            ContentVideo = videoId;
            newVideoLoaded();
        }
    });

    const newVideoLoaded = async () => {
        const thebuttonexist = document.getElementsByClassName("bookmark-btn")[0];
        ContentVideoBookmarks = await fetchBookmarks();

        if (!thebuttonexist) {
            const bookmarkBtn = document.createElement("img");

            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
            bookmarkBtn.className = "bookmark-btn";
            bookmarkBtn.title = "Click to bookmark the current timestamp";

            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-stream")[0];

            youtubeLeftControls.appendChild(bookmarkBtn);
            bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
        }
    }

    const fetchBookmarks = () => {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get([ContentVideo], (obj) => {
                resolve(obj[ContentVideo] ? JSON.parse(obj[ContentVideo]) : []);
            });
        });
    }

    const addNewBookmarkEventHandler = async () => {
        const currentTime = youtubePlayer.currentTime;
        const newBookmark = {
            time: currentTime,
            desc: "Bookmark at " + getTime(currentTime)
        }

        ContentVideoBookmarks = await fetchBookmarks();

        console.log(newBookmark);
        console.log(ContentVideoBookmarks);
        console.log("saving in : " + ContentVideo);

        chrome.storage.sync.set({
            [ContentVideo]: JSON.stringify([...ContentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
        });

    }

    const getTime = t => {
        var date = new Date(0);
        date.setSeconds(t);

        return date.toISOString().substr(11, 8);
    }

    newVideoLoaded();
})();