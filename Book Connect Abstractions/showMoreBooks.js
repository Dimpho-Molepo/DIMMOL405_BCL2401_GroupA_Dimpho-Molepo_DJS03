import { books, BOOKS_PER_PAGE } from "./data.js";
import { elementsFromDOM } from "./elements.js";

let page = 1;
let matches = books;

/** This function display the remaining books on list button
 *
 * @param {number} page - The current page number.
 * @param {Array<Object>} matches - The array of books that match the current filters.
 * @returns {void} This function does not return a value.
*/
export function showMoreBooksButton(page, matches) {
    elementsFromDOM.dataListButton.innerText = `Show more (${ matches.length - page * BOOKS_PER_PAGE})`;
    elementsFromDOM.dataListButton.disabled = matches.length - page * BOOKS_PER_PAGE <= 0;

    elementsFromDOM.dataListButton.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${
        matches.length - page * BOOKS_PER_PAGE > 0
            ? matches.length - page * BOOKS_PER_PAGE
            : 0
        })</span>
    `;
}
showMoreBooksButton(page, matches);