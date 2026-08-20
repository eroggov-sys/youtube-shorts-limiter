# YouTube Shorts Limiter

> [!WARNING]
> This project is currently under development and may contain bugs.

YouTube Shorts Limiter is a Chrome extension that helps users control how many YouTube Shorts they watch per day.

The extension counts watched Shorts and blocks the Shorts feed when the configured daily limit is reached.

## Features

- Counts watched YouTube Shorts
- Allows users to configure a daily limit
- Prevents duplicate counting of the same video
- Automatically resets the counter every day
- Blocks YouTube Shorts when the daily limit is reached
- Stores settings and statistics locally in the browser
- Does not collect or send personal data

## Installation

The extension is not currently available in the Chrome Web Store. You can install it manually.

1. Download this repository by clicking **Code → Download ZIP**.
2. Extract the downloaded ZIP file.
3. Open Google Chrome.
4. Go to `chrome://extensions`.
5. Enable **Developer mode** in the upper-right corner.
6. Click **Load unpacked**.
7. Select the extracted project folder.

The extension should now appear in the list of installed Chrome extensions.

## Usage

1. Click the YouTube Shorts Limiter icon in the Chrome toolbar.
2. Enter the maximum number of Shorts you want to watch per day.
3. Click **Save**.
4. Open YouTube Shorts and start watching.

A Short is counted after it has been watched for at least 3 seconds. When the daily limit is reached, the extension pauses the video and displays a blocking screen. The counter automatically resets on the next day.

## Project structure

```text
youtube-shorts-limiter/
├── manifest.json
├── content.js
├── popup.html
├── popup.js
├── popup.css
└── README.md
```

## How it works

The extension uses a content script that runs only on YouTube. It detects Shorts pages with URLs in the following format:

```text
https://www.youtube.com/shorts/VIDEO_ID
```

The content script monitors the active video. When the video has been playing for at least 3 seconds, its ID is registered as watched.

The extension stores the current date, daily limit, number of watched Shorts and IDs of Shorts that have already been counted. All information is stored locally using the Chrome Storage API. The same Short is not counted more than once during the same day.

## Permissions

### Storage

The `storage` permission saves the daily limit, viewing count, current date and IDs of previously watched Shorts.

### YouTube access

Access to `https://www.youtube.com/*` is required to detect YouTube Shorts, monitor video playback, count watched Shorts and display the blocking screen. The extension does not request access to other websites.

## Privacy

YouTube Shorts Limiter does not collect personal information. The extension does not:

- Send viewing history to external servers
- Track activity on other websites
- Display advertisements
- Use analytics
- Sell or share user data

All settings and statistics remain in the user's browser.

## Development

After changing any project file:

1. Open `chrome://extensions`.
2. Find **YouTube Shorts Limiter**.
3. Click the reload button on the extension card.
4. Reload the YouTube tab.

To test the blocking functionality, set the daily limit to `1` and watch a new Short for at least 3 seconds.

## Roadmap

- [ ] Improve active Shorts detection
- [ ] Add a manual reset button
- [ ] Add daily and weekly statistics
- [ ] Hide Shorts sections on the YouTube homepage
- [ ] Add a strict blocking mode
- [ ] Add PIN protection for settings
- [ ] Add Firefox support
- [ ] Add synchronization between devices
- [ ] Investigate Android support
- [ ] Investigate Safari and iOS support

## Known limitations

- The extension currently works only in Chromium-based desktop browsers.
- Users can manually disable or remove the extension.
- YouTube interface changes may affect Shorts detection.
- The extension does not currently support the YouTube mobile application.
- Browser data is not synchronized between different devices.
- Previously counted Shorts are not counted again on the same day.

## Contributing

Suggestions, bug reports and pull requests are welcome.

When opening an issue, please include what happened, what you expected, your browser version and the steps required to reproduce the problem.

## Author

Created as a personal project for reducing time spent watching YouTube Shorts.

## License

No license has been selected yet.
