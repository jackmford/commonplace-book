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
        listItem.textContent = `- "${h.text}"`
        let strippedUrl = url.replace(/[^a-zA-Z0-9]/g, '')
        listItem.id = `${strippedUrl}-${index}`

        let deleteButton = document.createElement('button')
        deleteButton.textContent = 'Remove'
        deleteButton.style.marginLeft = '10px'
        deleteButton.onclick = function() {
          removeHighlight(url, index)
        }

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
        let strippedUrl = url.replace(/[^a-zA-Z0-9]/g, '')
        document.querySelector(`#${strippedUrl}-${index}`).remove()
      })
    }
  })
}
