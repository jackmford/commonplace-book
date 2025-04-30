chrome.runtime.onInstalled.addListener(() => {
  // Create a custom context menu item for selected text
  chrome.contextMenus.create({
    id: 'saveHighlight',
    title: 'Save to Commonplace Book',
    contexts: ['selection'], // Only show when text is selected
  })
})

// Handle context menu item click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'saveHighlight') {
    const selectedText = info.selectionText

    // Send the selected text and URL to the background for saving
    chrome.storage.local.get('highlights', (data) => {
      let highlights = data.highlights || {}

      // mapKey is a two item array stringified to use as a key
      // so it can be parsed in popup.js to retrieve both the tab.title and tab.url
      // for the set of highlights
      const mapKey = JSON.stringify([tab.title, tab.url])
      let highlightMap = highlights[mapKey] || []

      highlightMap.push({ text: selectedText, timestamp: Date.now() })

      highlights[mapKey] = highlightMap

      chrome.storage.local.set({ highlights }, () => {
        console.log('Highlight saved:', selectedText)
      })
    })
  }
})
