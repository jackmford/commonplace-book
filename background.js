chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SAVE_HIGHLIGHT") {
        chrome.storage.sync.get("highlights", (data) => {
            let highlights = data.highlights || [];
            highlights.push({ text: message.text, url: message.url, timestamp: Date.now() });

            chrome.storage.sync.set({ highlights }, () => {
                console.log("Highlight saved:", message.text);
            });
        });
    }
});

