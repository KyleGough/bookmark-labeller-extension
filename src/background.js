const markers = [
  '✅', // Green check
  '⭐', // Star
  '👀', // Eyes
  '💬', // Speech bubble
  '❤️', // Red heart
  '❓', // Question
  '🕗', // Time
  '⚠️', // Warning
  '❌', // Cross
];

const addPrefix = (title, prefix) => [prefix, title].join(' ');
const removePrefix = (title, prefix) => title.replace(prefix + ' ', '').trim();
const hasPrefix = (title, prefix) => title.indexOf(prefix) > -1;

const getBookmarkTitle = (id) => {
  return browser.bookmarks.get(id).then((bookmark) => bookmark[0].title);
};

const togglePrefix = async (bookmark, emoji) => {
  const title = await getBookmarkTitle(bookmark.bookmarkId);
  browser.bookmarks.update(bookmark.bookmarkId, {
    title: hasPrefix(title, emoji)
      ? removePrefix(title, emoji)
      : addPrefix(title, emoji),
  });
};

for (let i = 0; i < markers.length; i++) {
  const emoji = markers[i];
  browser.menus.create({
    id: `prefix-bookmark-${i}`,
    title: emoji,
    contexts: ['bookmark'],
    onclick: (bookmark) => togglePrefix(bookmark, emoji),
  });
}
