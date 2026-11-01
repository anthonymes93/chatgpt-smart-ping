# ChatGPT Smart Ping

A Manifest V3 Chrome/Vivaldi extension that plays a notification when a ChatGPT response completes **only** if you switched away during generation or the response exceeded your configured threshold.

## Install
1. Download the repository as ZIP and extract it.
2. Open `chrome://extensions` (or `vivaldi://extensions`).
3. Enable **Developer mode** and click **Load unpacked**.
4. Select the extracted folder containing `manifest.json`.
5. Pin the extension and click its icon to configure notifications and test sounds.

## Features
- Auto-saving settings synced through Chrome storage
- Background-tab/window completion notifications
- Long-response threshold (10–300 seconds)
- Three synthesized alert sounds and volume control
- Optional desktop notification
- No API keys, no external servers, no tracking

## Notes
ChatGPT's HTML may change. The detector currently watches known stop-button attributes and waits 450 ms to avoid transient DOM updates. It does not ping on already-completed conversations. A response that never exposes a recognizable stop button won't trigger an alert. Background audio uses the Chrome offscreen document API. The extension needs a one-time user interaction in some browser configurations to allow audio. This extension is unofficial and is not affiliated with OpenAI.
