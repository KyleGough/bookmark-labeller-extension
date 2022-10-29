document.addEventListener('DOMContentLoaded', async () => {
  // Populate input default values
  const storage = await browser.storage.local.get('emojis');
  const emojis = storage.emojis;
  for (let i = 0; i < emojis.length; i++) {
    document.getElementById(`input-${i + 1}`).value = emojis[i];
  }

  document.getElementById('save-button').addEventListener('click', () => {
    let emojis = [];

    for (let i = 1; i <= 9; i++) {
      const value = document.getElementById(`input-${i}`).value;
      emojis.push(value || '');
    }

    browser.storage.local.set({ emojis: emojis });
  });
});
