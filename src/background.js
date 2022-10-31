const defaultEmojis = [
  '✅', // Green check
  '🔥', // Fire
  '👀', // Eyes
  '👍', // Thumbs up
  '👎', // Thumbs down
  '❤️', // Heart
  '😀', // Smile
  '😍', // Heart eyes
  '😂', // Tears of joy
];

// Prefix utility functions
const addPrefix = (title, prefix) => [prefix, title].join(' ');
const removePrefix = (title, prefix) => title.replace(prefix + ' ', '').trim();
const hasPrefix = (title, prefix) => title.indexOf(prefix + ' ') > -1;

// Updates bookmark title with toggled prefix
const togglePrefix = (id, emoji) => {
  // Get title of bookmark given bookmark id
  chrome.bookmarks.get(id, (bookmark) => {
    const title = bookmark[0].title;
    chrome.bookmarks.update(id, {
      title: hasPrefix(title, emoji)
        ? removePrefix(title, emoji)
        : addPrefix(title, emoji),
    });
  });
};

// Updates context menu items when local storage changes
chrome.storage.local.onChanged.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    chrome.storage.local.get('emojis', (storage) => {
      const emojis = storage.emojis;
      for (let i = 0; i < emojis.length; i++) {
        const emoji = emojis[i];
        chrome.contextMenus.create({
          id: `prefix-bookmark-${i}`,
          title: emoji,
          contexts: ['bookmark'],
          onclick: (bookmark) => togglePrefix(bookmark.bookmarkId, emoji),
        });
      }
    });
  });
});

// Initialize default emojis if not already set
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get('initialised', (storage) => {
    if (storage && storage.initialized) return;
    chrome.storage.local.set({
      emojis: defaultEmojis,
      initialized: true,
    });
  });
});
