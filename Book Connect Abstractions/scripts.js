import {
  createPreviewButton,
  getActiveBook,
  updateDataList,
} from "./renderBooksLists.js";
import { elementsFromDOM } from "./elements.js";
import { filterBooks, checkResultLength, createOptions } from "./searchForm.js";
import { toggleTheme, handleSettingsFormSubmit } from "./settingsFormSubmit.js";
import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
import { showMoreBooksButton } from "./showMoreBooks.js";

let matches = books;
let page = 1;

toggleTheme();
showMoreBooksButton(page, matches);
renderBooks();
createOptions(authors, "All Authors", elementsFromDOM.dataSearchAuthors);
createOptions(genres, "All Genres", elementsFromDOM.dataSearchGenres);

/** Render books on the page with book image, title and author name.
 *
 * @returns {void} This function does not return a value.
 */
function renderBooks() {
  const starting = document.createDocumentFragment();

  for (const { id, image, title, author } of matches.slice(0, BOOKS_PER_PAGE)) {
    const element = createPreviewButton({ id, image, title, author });
    starting.appendChild(element);
  }

  elementsFromDOM.dataListItems.appendChild(starting);
}

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
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);

  const result = filterBooks(books, filters);
  page = 1;
  matches = result;

  checkResultLength(result);
  elementsFromDOM.dataListItems.innerHTML = ''
  renderBooks();

  showMoreBooksButton(page, matches);
  window.scrollTo({ top: 0, behavior: "smooth" });
  elementsFromDOM.dataSearchOverlay.open = false;
});

elementsFromDOM.dataListButton.addEventListener("click", () => {
  const fragment = document.createDocumentFragment();

  for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE,(page + 1) * BOOKS_PER_PAGE)) {
    const element = createPreviewButton({ author, id, image, title });
    fragment.appendChild(element);
  }
  elementsFromDOM.dataListItems.appendChild(fragment);
  page += 1;
  showMoreBooksButton(page, matches);
});

elementsFromDOM.dataListItems.addEventListener("click", (event) => {
  const active = getActiveBook(event);

  if (active) {
    updateDataList(active);
  }
});
