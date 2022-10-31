// Get the bookmark object of the currently active tab
const getActiveTabBookmark = (callback) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || !tabs.length) return callback(false);
    const url = tabs[0].url;
    chrome.bookmarks.search({ url: url }, (bookmarks) => {
      if (!bookmarks || !bookmarks.length) return callback(false);
      callback(bookmarks[0]);
    });
  });
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

// Updates all button's selected class if the provided emoji is toggled
const updateButtonSelected = (emoji, isAddEmoji) => {
  for (let i = 0; i < 9; i++) {
    const btn = document.getElementById(`btn-${i}`);
    if (btn.innerHTML === emoji) {
      if (isAddEmoji) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    }
  }
};

// Prefix utility functions
const addPrefix = (title, prefix) => [prefix, title].join(' ');
const removePrefix = (title, prefix) => title.replace(prefix + ' ', '').trim();
const hasPrefix = (title, prefix) => title.indexOf(prefix + ' ') > -1;

// Toggles the active tab's bookmark with the selected emoji
const updateBookmark = (event) => {
  const emoji = event.target.innerHTML;

  getActiveTabBookmark((bookmark) => {
    if (!bookmark) return;
    chrome.bookmarks.update(
      bookmark.id,
      {
        title: hasPrefix(bookmark.title, emoji)
          ? removePrefix(bookmark.title, emoji)
          : addPrefix(bookmark.title, emoji),
      },
      (bookmark) =>
        updateButtonSelected(emoji, hasPrefix(bookmark.title, emoji))
    );
  });
};

// Update buttons to reflect storage and current bookmark
const updateButtonGroup = () => {
  getActiveTabBookmark((bookmark) => {
    chrome.storage.local.get('emojis', (storage) => {
      const emojis = storage.emojis;
      // Create button elements for popup.
      for (let i = 0; i < emojis.length; i++) {
        const emoji = emojis[i];
        const key = `btn-${i}`;
        const btn = updateButtonNode(
          key,
          emoji,
          !bookmark,
          bookmark && hasPrefix(bookmark.title, emoji)
        );
        btn.addEventListener('click', updateBookmark);
      }
      switchMode('NORMAL');
    });
  });
};

// Switches mode visually to and from NORMAL and EDIT mode
const switchMode = (mode) => {
  const switchEdit = mode === 'EDIT';
  document.getElementById('button-group').style.display = switchEdit
    ? 'none'
    : 'grid';
  document.getElementById('input-group').style.display = switchEdit
    ? 'grid'
    : 'none';
  document.getElementById('edit-button').hidden = switchEdit;
  document.getElementById('save-button').hidden = !switchEdit;
};

// Populate input element values from local storage
const fillInputs = () => {
  chrome.storage.local.get('emojis', (storage) => {
    const emojis = storage.emojis;
    for (let i = 0; i < emojis.length; i++) {
      document.getElementById(`input-${i}`).value = emojis[i];
    }
    switchMode('EDIT');
  });
};

// Save emoji selection to local storage
const saveChanges = () => {
  let emojis = [];
  for (let i = 0; i < 9; i++) {
    const value = document.getElementById(`input-${i}`).value;
    emojis.push(value || '');
  }
  chrome.storage.local.set({ emojis: emojis }, () => {
    updateButtonGroup();
  });
};

// On DOM loaded event add action button event handlers and update buttons
document.addEventListener('DOMContentLoaded', () => {
  updateButtonGroup();
  document.getElementById('edit-button').addEventListener('click', fillInputs);
  document.getElementById('save-button').addEventListener('click', saveChanges);
});
