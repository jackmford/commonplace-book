document.addEventListener('mouseup', () => {
  let selection = window.getSelection().toString().trim()
  if (selection) {
    console.log(selection, window.location.href)
    chrome.runtime.sendMessage({
      type: 'SAVE_HIGHLIGHT',
      text: selection,
      url: window.location.href,
    })
  }
})
