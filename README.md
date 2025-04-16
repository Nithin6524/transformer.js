# Transformer.js - NLP in Your Browser

<p align="center">
  <img src="public/icons/icon.png" alt="Transformer.js Logo" width="120" height="120">
</p>

A cutting-edge browser extension that leverages the power of Hugging Face's Transformers.js library to run state-of-the-art Natural Language Processing (NLP) models directly in your browser. This extension demonstrates the capabilities of running transformer-based machine learning models client-side without requiring server infrastructure.

## 🚀 Features

- **Client-Side ML Processing**: Runs transformer models entirely in the browser using WebAssembly (WASM) and WebGL acceleration
- **Real-Time Text Classification**: Analyzes text sentiment as you type with debounced processing
- **Context Menu Integration**: Right-click on any selected text on a webpage to analyze it
- **Responsive UI**: Modern interface with smooth transitions and proper spacing
- **Dark/Light Theme**: Toggle between themes with persistent user preferences
- **Optimized Performance**: Singleton pattern for model instantiation to minimize memory usage

## 🧠 Technical Architecture

The extension follows Chrome's Extension Manifest V3 architecture with three main components:

1. **Service Worker** (`background.js`):
   - Implements a singleton pattern for efficient model loading
   - Handles context menu creation and event processing
   - Manages asynchronous message passing with the UI
   - Initializes default settings and preferences

2. **Content Script** (`content.js`):
   - Injected into web pages to enable direct DOM interaction
   - Facilitates communication between web page context and extension background
   - Enables context menu functionality for text selection

3. **Popup UI** (`popup.html`, `popup.css`, `popup.js`):
   - Implements CSS variables for theming with data attributes
   - Uses event delegation for efficient DOM event handling
   - Implements debouncing to prevent excessive API calls
   - Manages theme persistence using Chrome Storage API

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Build System**: Webpack 5 with custom configuration
- **ML Framework**: Hugging Face Transformers.js
- **Model**: DistilBERT (fine-tuned for sentiment analysis)
- **Storage**: Chrome Storage API for persistence
- **Acceleration**: WebAssembly and SIMD optimizations

## 📋 Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Chrome browser (v92 or higher)

## 🚀 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/transformer.js.git
   cd transformer.js
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the extension**:
   ```bash
   npm run build
   ```

4. **Load the extension in Chrome**:
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode" using the toggle in the top-right corner
   - Click "Load unpacked"
   - Select the `build` directory from the project

5. **Pin the extension** (optional):
   - Click the puzzle piece icon in Chrome's toolbar
   - Find the Transformer.js extension and click the pin icon

## 🧩 Usage

### Popup Interface

1. Click the extension icon in your browser toolbar
2. Type or paste text in the input field
3. View real-time sentiment analysis results
4. Toggle between dark and light themes using the icon in the top-right corner

### Context Menu

1. Select any text on a webpage
2. Right-click to open the context menu
3. Select "Classify [selected text]"
4. View the analysis results in the console (check Developer Tools)

## 🔧 Development

For active development, use the watch mode to automatically rebuild on changes:

```bash
npm run dev
```

### Project Structure

```
transformer.js/
├── build/                # Compiled extension files
├── public/               # Static assets
│   ├── icons/            # Extension icons
│   └── manifest.json     # Extension manifest
├── src/                  # Source code
│   ├── background.js     # Service worker script
│   ├── content.js        # Content script
│   ├── popup.html        # Popup HTML
│   ├── popup.css         # Popup styles
│   └── popup.js          # Popup logic
├── webpack.config.js     # Webpack configuration
└── package.json          # Project dependencies
```

### Key Components

- **PipelineSingleton**: Implements the singleton pattern to ensure only one instance of the ML model is loaded
- **Theme Management**: Uses CSS variables and data attributes for theme switching
- **Debounced Processing**: Prevents excessive model calls during rapid typing
- **Chrome Storage API**: Persists user preferences across browser sessions

## 🔄 Extension Workflow

1. **Initialization**:
   - Service worker registers context menus and initializes default settings
   - Popup UI loads saved preferences and sets up event listeners

2. **Text Classification**:
   - User inputs text or selects text on a webpage
   - Text is sent to the service worker via message passing
   - Service worker loads the model (if not already loaded) and processes the text
   - Results are returned to the UI or injected into the webpage

3. **Theme Toggling**:
   - User clicks the theme toggle button
   - Current theme is determined and toggled
   - New theme is saved to Chrome Storage
   - CSS variables are updated via data attributes

## 📝 Notes for Extension Development

- After modifying `background.js` or `content.js`, reload the extension from `chrome://extensions/`
- For popup development, open it in a separate tab using `chrome-extension://<ext_id>/popup.html`
- Use Chrome DevTools to debug by right-clicking the extension icon and selecting "Inspect Popup"

## 📚 Resources

- [Transformers.js Documentation](https://huggingface.co/docs/transformers.js/index)
- [Chrome Extension Development Guide](https://developer.chrome.com/docs/extensions/mv3/getstarted/)
- [WebAssembly Documentation](https://webassembly.org/docs/)

