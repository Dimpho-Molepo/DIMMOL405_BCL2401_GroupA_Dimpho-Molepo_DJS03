import { books, authors,BOOKS_PER_PAGE } from "./data.js";
import { elementsFromDOM } from "./elements.js";

/** Creates a preview button element for a book.
 *
 * @param {Object} books - The books object containing the author, id, image, and title properties.
 * @param {string} books.author - Author of the book.
 * @param {string} books.id - Unique iID for the author.
 * @param {string} books.image -The URL of the image to the book.
 * @param {string} books.title - The title of the book.
 * @returns {HTMLButtonElement} returns the button element
*/
export function createPreviewButton({ author, id, image, title }) {
    const element = document.createElement("button");
    element.classList = "preview";
    element.setAttribute("data-preview", id);

    element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
                
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;
    return element;
}

/** Render books on the page with book image, title and author name.
 *
 * @returns {void} This function does not return a value.
 */
export function renderBooks() {
    const starting = document.createDocumentFragment();
  
    for (const { id, image, title, author } of books.slice(0,+ BOOKS_PER_PAGE)) {
      const element = createPreviewButton({ id, image, title, author });
      starting.appendChild(element);
    }
  
    elementsFromDOM.dataListItems.appendChild(starting);
}

/**
 * Returns the active book object based on the event target.
 *
 * @param {Event} event - The event object.
 * @returns {Object|null} The active book object or null if no active book is found.
*/
export function getActiveBook(event) {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
        if (active) break;

        if (node?.dataset?.preview) {
            let result = null;

            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook;
            } 

            active = result;
        }
    }

    return active;
}

/** Updates the data list with the details of the active book.
 *
 * @param {object} active - The active book object.
 * @returns {void} This function does not return a value.
*/
export function updateDataList(active) {
    elementsFromDOM.dataListActive.open = true;
    elementsFromDOM.dataListBlur.src = active.image;
    elementsFromDOM.dataListImage.src = active.image;
    elementsFromDOM.dataListTitle.innerText = active.title;
    elementsFromDOM.dataListSubtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
    elementsFromDOM.dataListDescricption.innerText = active.description;
}