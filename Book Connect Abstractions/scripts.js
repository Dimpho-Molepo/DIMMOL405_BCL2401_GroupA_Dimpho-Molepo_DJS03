import {
  renderBooks,
  handleListButtonClick,
  handleListItemsClick,
  showMoreBooksButton,
} from "./renderBooksLIsts.js";
import { elementsFromDOM } from "./elements.js";
import { handleSearchFormSubmit } from "./searchForm.js";
import { toggleTheme, handleSettingsFormSubmit } from "./settingsFormSubmit.js";

renderBooks();
toggleTheme();
setupEventListeners();

/** Setup the several event listeners for elements in the DOM
 *
 * @returns {void} This function does not return a value.
 */
function setupEventListeners() {
  elementsFromDOM.dataSearchCancel.addEventListener("click", () => {
    elementsFromDOM.dataSearchOverlay.open = false;
  });

  elementsFromDOM.dataSettingsCancel.addEventListener("click", () => {
    elementsFromDOM.dataSettingsOverlay.open = false;
  });

  elementsFromDOM.dataHeaderSearch.addEventListener("click", () => {
    elementsFromDOM.dataSearchOverlay.open = true;
    elementsFromDOM.dataSearchTitle.focus();
  });

  elementsFromDOM.dataHeaderSettings.addEventListener("click", () => {
    elementsFromDOM.dataSettingsOverlay.open = true;
  });

  elementsFromDOM.dataListClose.addEventListener("click", () => {
    elementsFromDOM.dataListActive.open = false;
  });

  elementsFromDOM.dataSettingsForm.addEventListener("submit", (event) => {
    handleSettingsFormSubmit(event);
  });

  elementsFromDOM.dataSearchForm.addEventListener("submit", (event) => {
    handleSearchFormSubmit(event);
  });

  showMoreBooksButton();

  elementsFromDOM.dataListButton.addEventListener("click", () => {
    handleListButtonClick();
  });

  elementsFromDOM.dataListItems.addEventListener("click", (event) => {
    handleListItemsClick(event);
  });
}
