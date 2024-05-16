import { elementsFromDOM } from './elements.js';

/** 
 * @type {object} Abstracted theme settings
 */
const themeSettings = {
  night: {
    dark: '255, 255, 255',
    light: '10, 10, 20',
  },
  day: {
    dark: '10, 10, 20',
    light: '255, 255, 255',
  },
};

/** Function to set the theme by updating CSS variables
 * 
 * @param {string} theme - Theme to be applied (either 'night' or 'day')
 * @returns {void} This function does not return a value.
 */
function setTheme(theme) {
  document.documentElement.style.setProperty('--color-dark', themeSettings[theme].dark);
  document.documentElement.style.setProperty('--color-light', themeSettings[theme].light);
}

/** Toggle between the dark and light theme for the page
 * 
 * @returns {void} This function does not return a value.
 */
export function toggleTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    elementsFromDOM.dataSettingsTheme.value = 'night';
    setTheme('night');
  } else {
    elementsFromDOM.dataSettingsTheme.value = 'day';
    setTheme('day');
  }
}

/** Handles the form submission for the settings form and updates the theme accordingly.
 *
 * @param {Event} event - The form submission event object.
 * @returns {void} This function does not return a value.
 */
export function handleSettingsFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);
  
  setTheme(theme);
  elementsFromDOM.dataSettingsOverlay.open = false;
}