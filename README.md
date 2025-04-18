# Commonplace Book Browser Extension

<p align="center">
    <img src="icons/icon128.png"/>
</p

"Commonplace books (or commonplaces) are a way to compile knowledge, usually by writing information
into books. They have been kept from antiquity, and were kept particularly during the Renaissance
and in the nineteenth century. Such books are similar to scrapbooks filled with items of many kinds:
notes, proverbs, adages, aphorisms, maxims, quotes, letters, poems, tables of weights and measures,
prayers, legal formulas, and recipes." -
[Wikipedia](https://en.wikipedia.org/wiki/Commonplace_book#:~:text=In%20this%20original%20sense%2C%20commonplace,ethics)

## Overview

The Commonplace Book browser extension is a tool designed to help users collect and organize
important highlights from web pages, inspired by the traditional practice of keeping a commonplace
book. It allows users to save highlighted text along with the source URL and manage their saved
highlights conveniently.

## Features

- **Highlight and Save Text**: Right-click on selected text to save it.
- **Organized by Page**: Highlights are grouped by the webpage they were saved from.
- **Delete Individual Highlights**: Remove specific highlights with a click.
- **Export to CSV**: Download all saved highlights as a CSV file.

## Technical Implementation

### Tech Stack

- **JavaScript (Vanilla JS)**: Used for content scripts, popup functionality, and background tasks.
- **Chrome Extension API**: Manages storage, context menus, and user interactions.
- **HTML/CSS**: Defines the popup layout and styling.

### Pieces

1. **Content Script (`content.js`)**:

   - Detects text selection but currently does not handle highlight saving directly.

2. **Background Script (`background.js`)**:

   - Listens for right-click events on selected text.
   - Stores highlights in Chrome Local storage.
   - Handles export logic.

3. **Popup (`popup.html`, `popup.js`)**:

   - Displays saved highlights grouped by URL.
   - Allows deletion of specific highlights.
   - Includes buttons for CSV export and clearing highlights.

4. **Storage**:
   - Uses `chrome.storage.local` to persist highlights, allowing access across Chrome sessions.

## Installation

### Load the Extension in Chrome

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/commonplace-book-extension.git
   cd commonplace-book-extension
   ```
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer Mode** (toggle in the top right).
4. Click **Load unpacked** and select the extension folder.
5. The extension should now appear in your toolbar.

## Contributions

Contributions are welcome! If you have ideas, feature requests, or bug reports, feel free to open an
issue or submit a pull request.

## License

This project is licensed under the MIT License.
