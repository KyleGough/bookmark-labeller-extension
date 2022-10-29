// Gets url of current active tab for current window
const getActiveTabUrl = () => {
  return browser.tabs
    .query({ active: true, currentWindow: true })
    .then((tabs) => tabs[0].url);
};

// Gets bookmark given a url
const searchBookmarks = (url) => {
  return browser.bookmarks
    .search({ url: url })
    .then((bookmarks) => bookmarks[0]);
};

// Creates custom button node
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

// Prefix utility functions
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
      return;
    }
    bookmark &&
      browser.bookmarks.update(bookmark.id, {
        title: hasPrefix(bookmark.title, prefix)
          ? removePrefix(bookmark.title, prefix)
          : addPrefix(bookmark.title, prefix),
      });
    document.getElementById(key).classList.toggle('selected');
  };

  const storage = await browser.storage.local.get('emojis');

  // Create button elements for popup.
  for (let i = 0; i < storage.emojis.length; i++) {
    const emoji = storage.emojis[i];
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

  // Edit button listener
  document.getElementById('edit-button').addEventListener('click', () => {
    browser.runtime.openOptionsPage();
  });
});
