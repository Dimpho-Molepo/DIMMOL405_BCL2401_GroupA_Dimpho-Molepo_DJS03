import { books, authors, genres } from "./data.js";
import { elementsFromDOM } from "./elements.js";
import { showMoreBooksButton, renderBooks } from "./renderBooksLists.js";

let matches = books;

/** Creates options in the the search form.
 *
 * @param {object} authorOrGenreArray
 * @param {HTMLElement} elementDOM
 * @param {string} optionString
 * @returns {void} This function does not return a value.
 */
function createOptions(authorOrGenreArray, optionString, elementDOM) {
  const fragment = document.createDocumentFragment();
  const optionElement = document.createElement("option");
  optionElement.value = "any";
  optionElement.innerText = optionString;
  fragment.appendChild(optionElement);

  for (const [id, name] of Object.entries(authorOrGenreArray)) {
    const element = document.createElement("option");
    element.value = id;
    element.innerText = name;
    fragment.appendChild(element);
  }

  elementDOM.appendChild(fragment);
}

createOptions(authors, "All Authors", elementsFromDOM.dataSearchAuthors);
createOptions(genres, "All Genres", elementsFromDOM.dataSearchGenres);

function filterBooks(bookFilter) {
  const result = [];

  for (const book of books) {
    let genreMatch = bookFilter.genre === "any";

    for (const singleGenre of book.genres) {
      if (genreMatch) break;
      if (singleGenre === bookFilter.genre) {
        genreMatch = true;
      }
    }

    if ((bookFilter.title.trim() === "" || book.title.toLowerCase().includes(bookFilter.title.toLowerCase())) && 
        (bookFilter.author === "any" || book.author === bookFilter.author) &&genreMatch) {
      result.push(book);
    }
  }

  return result;
}

/** Handles the submission of the search form and gets the relevant searches displayed on the page
 *
 * @param {Event} event - The form submission event object.
 * @returns {void} This function does not return a value.
*/
export function handleSearchFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);

  matches = filterBooks(filters);

  if (matches.length < 1) {
    elementsFromDOM.dataListMessage.classList.add("list__message_show");
  } else {
    elementsFromDOM.dataListMessage.classList.remove("list__message_show");
  }

  elementsFromDOM.dataListItems.innerHTML = "";
  renderBooks();

  showMoreBooksButton(page, matches);
  window.scrollTo({ top: 0, behavior: "smooth" });
  elementsFromDOM.dataSearchOverlay.open = false;
}
