document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get("highlights", (data) => {
        let highlights = data.highlights || [];
        let list = document.getElementById("highlights");
        list.innerHTML = "";
        
        highlights.forEach((highlight) => {
            let item = document.createElement("li");
            let link = document.createElement("a");
            link.href = highlight.url;
            link.textContent = highlight.text;
            link.target = "_blank";
            item.appendChild(link);
            list.appendChild(item);
        });
    });
});

