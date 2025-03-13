document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['highlights', 'collapsedSections'], (data) => {
    let highlightsMap = data.highlights || {}
    let collapsedSections = data.collapsedSections || {}
    let container = document.getElementById('highlights')
    container.innerHTML = ''

    console.log(highlightsMap.length)
    if (Object.keys(highlightsMap).length == 0) {
        document.getElementById("highlights").innerHTML = "<p>No highlights saved.</p>";
        return
    }

    for (let url in highlightsMap) {
      let listOfHighlights = highlightsMap[url]

      let section = document.createElement('div')
      let header = document.createElement('div')
      let pageTitle = document.createElement('h3')
      let pageLink = document.createElement('a')
      let toggleButton = document.createElement('button')

      let list = document.createElement('ul')
      list.style.display = collapsedSections[url] ? 'none' : 'block'


      // Create a list item for each highlight
      listOfHighlights.forEach((h, index) => {
        let listItem = document.createElement('li')
        let textSpan = document.createElement('span')
        textSpan.textContent = `- "${h.text}"`


        let strippedUrl = url.replace(/[^a-zA-Z0-9]/g, '')
        listItem.id = `${strippedUrl}-${index}`

        let deleteButton = document.createElement('button')
        deleteButton.classList.add('remove')
        deleteButton.textContent = 'Remove'
        deleteButton.onclick = function() {
          removeHighlight(url, index)
        }

        listItem.appendChild(textSpan)
        listItem.appendChild(deleteButton)
        list.appendChild(listItem)
      })

      pageLink.href = url
      pageLink.textContent = url.slice(0, 30)
      pageLink.target = '_blank'
      pageLink.title = url;

      toggleButton.textContent = collapsedSections[url] ? 'Expand' : 'Collapse'
      toggleButton.classList.add('toggle')
      toggleButton.addEventListener('click', () => {
        toggleSection(url, list, toggleButton)

      })

      header.classList.add('urlHeader')

      header.appendChild(pageTitle)
      header.appendChild(toggleButton)
      pageTitle.appendChild(pageLink)
      section.appendChild(header)

      section.appendChild(list)
      container.appendChild(section)
    }
  })
})

function toggleSection(url, list, buttonElement) {
  chrome.storage.local.get('collapsedSections', (data) => {
    let collapsedSections = data.collapsedSections || {}
    isCollapsed = collapsedSections[url]

    if (isCollapsed == true) {
      list.style.display = 'block'
      buttonElement.textContent = 'Collapse'
      collapsedSections[url] = false
    } else {
      list.style.display = 'none'
      buttonElement.textContent = 'Expand'
      collapsedSections[url] = true
    }

    chrome.storage.local.set({ collapsedSections }) // save

  })
}

// Function to remove a highlight
function removeHighlight(url, index) {
  chrome.storage.local.get('highlights', (result) => {
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
      chrome.storage.local.set({ highlights }, () => {
        location.reload()
      })
    }
  })
}

// Function to export highlights as CSV
document.getElementById("exportCSV").addEventListener("click", () => {
  chrome.storage.local.get("highlights", (data) => {
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

// Function to export highlights as Markdown
document.getElementById("exportMarkdown").addEventListener("click", () => {
  chrome.storage.local.get("highlights", (data) => {
    let highlights = data.highlights || {};
    let markdownContent = "# Commonplace Book Highlights\n\n";

    for (let url in highlights) {
      markdownContent += `## ${url}\n\n`;
      highlights[url].forEach(h => {
        let timestamp = new Date(h.timestamp).toLocaleString();
        markdownContent += `> ${h.text}\n\n`;
        markdownContent += `*Captured on: ${timestamp}*\n\n`;
      });
      markdownContent += "---\n\n";
    }

    // Create a downloadable link
    let blob = new Blob([markdownContent], { type: 'text/markdown' });
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "highlights.md");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
});

document.getElementById("clearAll").addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all highlights?")) {
    chrome.storage.local.set({ highlights: {} }, () => {
      document.getElementById("highlights").innerHTML = "<p>No highlights saved.</p>";
    });
  }
});
