const defaultEmojis = [
  '✅', // Green check
  '⭐', // Star
  '👀', // Eyes
  '💬', // Speech bubble
  '❤️', // Red heart
  '❓', // Question mark
  '🕗', // Time
  '🚩', // Red flag
  '❌', // Cross
];

// Prefix utility functions
const addPrefix = (title, prefix) => [prefix, title].join(' ');
const removePrefix = (title, prefix) => title.replace(prefix + ' ', '').trim();
const hasPrefix = (title, prefix) => title.indexOf(prefix) > -1;

// Get title of bookmark given bookmark id
const getBookmarkTitle = (id) => {
  return browser.bookmarks.get(id).then((bookmark) => bookmark[0].title);
};

// Updates bookmark title with toggled prefix
const togglePrefix = async (bookmark, emoji) => {
  const title = await getBookmarkTitle(bookmark.bookmarkId);
  browser.bookmarks.update(bookmark.bookmarkId, {
    title: hasPrefix(title, emoji)
      ? removePrefix(title, emoji)
      : addPrefix(title, emoji),
  });
};

// Updates context menu items when local storage changes
browser.storage.local.onChanged.addListener(async () => {
  await browser.menus.removeAll();

  const storage = await browser.storage.local.get('emojis');
  const emojis = storage.emojis;

  for (let i = 0; i < emojis.length; i++) {
    const emoji = emojis[i];
    browser.menus.create({
      id: `prefix-bookmark-${i}`,
      title: emoji,
      contexts: ['bookmark'],
      onclick: (bookmark) => togglePrefix(bookmark, emoji),
    });
  }
});

// Initialize default emojis
browser.runtime.onInstalled.addListener(async () => {
  const storage = await browser.storage.local.get('initialized');

  // If already initialised do not reset defaults.
  if (storage.initialized) return;

  browser.storage.local.set({
    emojis: defaultEmojis,
    initialized: true,
  });
});
