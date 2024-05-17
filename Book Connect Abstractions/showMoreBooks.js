import { books, BOOKS_PER_PAGE } from "./data.js";
import { elementsFromDOM } from "./elements.js";

/** This function display the remaining books in list button
 *
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

let page = 1;
let matches = books;
showMoreBooksButton(page, matches);