async function showalert() {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            alert("Hello from my extention!");
        }
    });
}

document.getElementById("showAlertButton").addEventListener("click", showalert);