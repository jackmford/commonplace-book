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
    chrome.storage.sync.get('highlights', (data) => {
      let highlights = data.highlights || {}
      let highlightMap = highlights[tab.url] || []

      highlightMap.push({ text: selectedText, timestamp: Date.now() })

      highlights[tab.url] = highlightMap

      chrome.storage.sync.set({ highlights }, () => {
        console.log('Highlight saved:', selectedText)
      })
    })
  }
})
