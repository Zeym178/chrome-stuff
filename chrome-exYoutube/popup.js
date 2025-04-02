import { getActiveTabURL } from "./utils.js";

const addNewBookmark = (bookmarksElement, newBookmark) => {
    const bookmarkTitle = document.createElement("div");
    const bookmarkContent = document.createElement("div");

    bookmarkTitle.textContent = newBookmark.desc;
    bookmarkTitle.className = "bookmark-title";

    bookmarkContent.id = "bookmark-" + newBookmark.time;
    bookmarkContent.className = "bookmark";
    bookmarkContent.setAttribute("timestamp", newBookmark.time);

    bookmarkContent.appendChild(bookmarkTitle);
    bookmarksElement.appendChild(bookmarkContent);
}

const viewBookmarks = async (currentVideoBookmarks) => {
    const bookmarksElement = document.getElementById("bookmarks");
    bookmarksElement.innerHTML = "";

    if (currentVideoBookmarks.length > 0) {
        for (let i = 0; i < currentVideoBookmarks.length; i++) {
            const newBokomark = currentVideoBookmarks[i];
            addNewBookmark(bookmarksElement, newBokomark);
        }
    } else {
        bookmarksElement.innerHTML = "<i> There's no bookmarks to show ! </i>";
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getActiveTabURL();
    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    const currentVideo = urlParameters.get("v");
    console.log(currentVideo);

    if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
        chrome.storage.sync.get([currentVideo], (data) => {
            const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : [];

            // show the bookmarks
            console.log(currentVideoBookmarks);

            viewBookmarks(currentVideoBookmarks);
        });
    } else {
        const firstDiv = document.getElementsByClassName("container")[0];
        // const newItalic = document.createElement("i");
        // newItalic.innerHTML("<i>There's no bookmarks in here lol </i>");
        firstDiv.innerHTML = "<div class='title'>This is not a youtube video page !</div>";
    }

});