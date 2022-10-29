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

const getActiveTabUrl = () => {
  return browser.tabs
    .query({ active: true, currentWindow: true })
    .then((tabs) => tabs[0].url);
};

const searchBookmarks = (url) => {
  return browser.bookmarks
    .search({ url: url })
    .then((bookmarks) => bookmarks[0]);
};

const createButtonNode = (key, emoji, disabled, selected) => {
  const btn = document.createElement('button');
  const txt = document.createTextNode(emoji);
  btn.appendChild(txt);
  let className = [];
  if (disabled) className += 'disabled';
  if (selected) className += 'selected';
  btn.className = className;
  btn.id = key;
  return btn;
};

const addPrefix = (title, prefix) => [prefix, title].join(' ');
const removePrefix = (title, prefix) => title.replace(prefix + ' ', '').trim();
const hasPrefix = (title, prefix) => title.indexOf(prefix) > -1;

document.addEventListener('DOMContentLoaded', async () => {
  const buttonGroup = document.getElementById('button-group');
  let activeUrl;
  let bookmark;

  try {
    activeUrl = await getActiveTabUrl();
    bookmark = await searchBookmarks(activeUrl);
  } catch (e) {
    bookmark = false;
  }

  const updateBookmark = async (key, prefix) => {
    let bookmark;
    try {
      bookmark = await searchBookmarks(activeUrl);
    } catch (e) {
      console.warn(e);
    }
    bookmark &&
      browser.bookmarks.update(bookmark.id, {
        title: hasPrefix(bookmark.title, prefix)
          ? removePrefix(bookmark.title, prefix)
          : addPrefix(bookmark.title, prefix),
      });
    document.getElementById(key).classList.toggle('selected');
  };

  for (let i = 0; i < markers.length; i++) {
    const emoji = markers[i];
    const key = `btn_${i}`;
    const btn = createButtonNode(
      key,
      emoji,
      !bookmark,
      bookmark && hasPrefix(bookmark.title, emoji)
    );
    bookmark && btn.addEventListener('click', () => updateBookmark(key, emoji));
    buttonGroup.appendChild(btn);
  }
});
