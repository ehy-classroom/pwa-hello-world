const apiUrl = "https://api.mymemory.translated.net/get";
const phrase = "Hello World!";

// Highlight the last clicked button
function highlightButton(button) {
  document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}

// Fetch translation from languages.json
async function translateText(langCode, button) {
  highlightButton(button);
  try {
    const response = await fetch('languages.json');
    const data = await response.json();
    const translation = data.languages.find(lang => lang.code === langCode)?.translation;
    if (translation) {
      document.getElementById("title").innerText = translation;
    } else {
      console.error("Translation not found for language code:", langCode);
    }
  } catch (error) {
    console.error("Translation error:", error);
  }
}

// Translate "Hello World!" into a random language excluding specific languages
async function translateRandom(button) {
  highlightButton(button);
  try {
    const response = await fetch('languages.json');
    const data = await response.json();
    const excludedCodes = ['fr', 'de', 'it', 'zh-CN'];
    const filteredLanguages = data.languages.filter(lang => !excludedCodes.includes(lang.code));
    if (filteredLanguages.length > 0) {
      const randomLang = filteredLanguages[Math.floor(Math.random() * filteredLanguages.length)];
      document.getElementById("title").innerText = randomLang.translation;
    } else {
      console.error("No languages available for random selection.");
    }
  } catch (error) {
    console.error("Translation error:", error);
  }
}

// Reset translation to English
function resetText(button) {
  highlightButton(button);
  document.getElementById("title").innerText = "Hello World!";
}
