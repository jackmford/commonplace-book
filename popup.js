document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get('highlights', (data) => {
    let highlights = data.highlights || []
    let container = document.getElementById('highlights')
    container.innerHTML = ''

    for (let url in highlights) {
      let highlight = highlights[url]
      let section = document.createElement('div')
      let pageTitle = document.createElement('h3')
      let pageLink = document.createElement('a')

      pageLink.href = url
      pageLink.textContent = url
      pageLink.target = '_blank'

      pageTitle.appendChild(pageLink)
      section.appendChild(pageTitle)

      let list = document.createElement('ul')

      highlight.forEach((h) => {
        let listItem = document.createElement('li')
        listItem.textContent = `- "${h.text}"`
        list.appendChild(listItem)
      })

      section.appendChild(list)
      container.appendChild(section)
    }
  })
})
