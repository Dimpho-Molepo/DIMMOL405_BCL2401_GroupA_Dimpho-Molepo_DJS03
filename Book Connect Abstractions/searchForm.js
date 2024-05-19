import { elementsFromDOM } from "./elements.js";

/** Creates options in the the search form.
 *
 * @param {object} authorOrGenreArray
 * @param {HTMLElement} elementDOM
 * @param {string} optionString
 * @returns {void} This function does not return a value.
*/
export function createOptions(authorOrGenreArray, optionString, elementDOM) {
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

/** Filters an array of books based on the provided title, genre and author.
 *
 * @param {array} books - The array of books to be filtered.
 * @param {object} filters - The filter criteria for books.
 * @param {string} filters.genre - The genre to filter by.
 * @param {string} filters.title - The title to filter by.
 * @param {string} filters.author - The author to filter by.
 * @returns {array} An array of filtered books.
*/
export function filterBooks(books, filters) {
  const result = [];

  for (const book of books) {
    let genreMatch = filters.genre === "any";

    for (const singleGenre of book.genres) {
      if (genreMatch) break;
      if (singleGenre === filters.genre) {
        genreMatch = true;
      }
    }

    if (
      (filters.title.trim() === "" ||
        book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.author === "any" || book.author === filters.author) &&
      genreMatch
    ) {
      result.push(book);
    }
  }

  return result;
}

/**
 * Checks the length of the result and updates the data list message accordingly.
 *
 * @param {array} result - The array of filtered books.
 * @returns {void} This function does not return a value.
*/
export function checkResultLength(result) {
  if (result.length < 1) {
    elementsFromDOM.dataListMessage.classList.add('list__message_show');
  } else {
    elementsFromDOM.dataListMessage.classList.remove('list__message_show');
  }
}