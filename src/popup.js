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

// Returns an updated button element
const updateButtonNode = (key, emoji, disabled, selected) => {
  const btn = document.getElementById(key);
  while (btn.hasChildNodes()) {
    btn.childNodes[0].remove();
  }
  btn.appendChild(document.createTextNode(emoji));
  let className = [];
  if (disabled) className += 'disabled';
  if (selected) className += 'selected';
  btn.className = className;
  return btn;
};

const updateBookmark = async (event) => {
  const prefix = event.target.innerHTML;
  const key = event.target.id;
  let activeUrl;
  let bookmark;

  try {
    activeUrl = await getActiveTabUrl();
    bookmark = await searchBookmarks(activeUrl);
  } catch (e) {
    return;
  }

  browser.bookmarks.update(bookmark.id, {
    title: hasPrefix(bookmark.title, prefix)
      ? removePrefix(bookmark.title, prefix)
      : addPrefix(bookmark.title, prefix),
  });

  document.getElementById(key).classList.toggle('selected');
};

const updateButtonGroup = async () => {
  let activeUrl;
  let bookmark;

  try {
    activeUrl = await getActiveTabUrl();
    bookmark = await searchBookmarks(activeUrl);
  } catch (e) {
    bookmark = false;
  }

  const storage = await browser.storage.local.get('emojis');

  // Create button elements for popup.
  for (let i = 0; i < storage.emojis.length; i++) {
    const emoji = storage.emojis[i];
    const key = `btn-${i}`;
    const btn = updateButtonNode(
      key,
      emoji,
      !bookmark,
      bookmark && hasPrefix(bookmark.title, emoji)
    );
    if (bookmark) btn.addEventListener('click', updateBookmark);
  }
};

// Prefix utility functions
const addPrefix = (title, prefix) => [prefix, title].join(' ');
const removePrefix = (title, prefix) => title.replace(prefix + ' ', '').trim();
const hasPrefix = (title, prefix) => title.indexOf(prefix) > -1;

document.addEventListener('DOMContentLoaded', async () => {
  await updateButtonGroup();

  // Defaults
  const editButton = document.getElementById('edit-button');
  const saveButton = document.getElementById('save-button');
  saveButton.hidden = true;

  // Edit button listener
  editButton.addEventListener('click', async () => {
    await populateInputValues();
    document.getElementById('button-group').style.display = 'none';
    document.getElementById('input-group').style.display = 'grid';
    editButton.hidden = true;
    saveButton.hidden = false;
  });

  // Save button listener
  saveButton.addEventListener('click', async () => {
    await saveChanges();
    await updateButtonGroup();
    document.getElementById('button-group').style.display = 'grid';
    document.getElementById('input-group').style.display = 'none';
    editButton.hidden = false;
    saveButton.hidden = true;
  });
});

// Retrieve and populate input values from local storage
const populateInputValues = async () => {
  // Populate input default values
  const storage = await browser.storage.local.get('emojis');
  const emojis = storage.emojis;
  for (let i = 0; i < emojis.length; i++) {
    document.getElementById(`input-${i}`).value = emojis[i];
  }
};

// Save emoji selection to local storage
const saveChanges = async () => {
  let emojis = [];
  for (let i = 0; i < 9; i++) {
    const value = document.getElementById(`input-${i}`).value;
    emojis.push(value || '');
  }
  await browser.storage.local.set({ emojis: emojis });
};
