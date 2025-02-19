document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get('highlights', (data) => {
    let highlightsMap = data.highlights || []
    let container = document.getElementById('highlights')
    container.innerHTML = ''

    for (let url in highlightsMap) {
      let listOfHighlights = highlightsMap[url]
      let section = document.createElement('div')
      let pageTitle = document.createElement('h3')
      let pageLink = document.createElement('a')

      pageLink.href = url
      pageLink.textContent = url
      pageLink.target = '_blank'

      pageTitle.appendChild(pageLink)
      section.appendChild(pageTitle)

      let list = document.createElement('ul')

      // Create a list item for each highlight
      listOfHighlights.forEach((h, index) => {
        let listItem = document.createElement('li')
        let textSpan = document.createElement('span')
        textSpan.textContent = `- "${h.text}"`

        //listItem.textContent = `- "${h.text}"`

        let strippedUrl = url.replace(/[^a-zA-Z0-9]/g, '')
        listItem.id = `${strippedUrl}-${index}`

        let deleteButton = document.createElement('button')
        deleteButton.textContent = 'Remove'
        deleteButton.style.marginLeft = '10px'
        deleteButton.onclick = function() {
          removeHighlight(url, index)
        }

        listItem.appendChild(textSpan)
        listItem.appendChild(deleteButton)
        list.appendChild(listItem)
      })

      section.appendChild(list)
      container.appendChild(section)
    }
  })
})

// Function to remove a highlight
function removeHighlight(url, index) {
  chrome.storage.sync.get('highlights', (result) => {
    let highlights = result.highlights
    let urlHighlights = highlights[url] || []

    if (index >= 0 && index < urlHighlights.length) {
      urlHighlights.splice(index, 1)
      highlights[url] = urlHighlights

      // If the URL has no highlights remove it from map
      if (urlHighlights.length == 0) {
        delete highlights[url]
      }

      // Save updated highlights back to storage and dynamically remove element without reloading
      chrome.storage.sync.set({ highlights }, () => {
        location.reload()
      })
    }
  })
}

document.getElementById("exportCSV").addEventListener("click", () => {
  chrome.storage.sync.get("highlights", (data) => {
    let highlights = data.highlights || {};
    let csvContent = "data:text/csv;charset=utf-8,URL,Highlight,Timestamp\n";

    for (let url in highlights) {
      highlights[url].forEach(h => {
        let timestamp = new Date(h.timestamp).toISOString();
        csvContent += `"${url}","${h.text}","${timestamp}"\n`;
      });
    }

    // Create a downloadable link
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "highlights.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});

document.getElementById("clearAll").addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all highlights?")) {
    chrome.storage.sync.set({ highlights: {} }, () => {
      document.getElementById("highlights").innerHTML = "<p>No highlights saved.</p>";
    });
  }
});
