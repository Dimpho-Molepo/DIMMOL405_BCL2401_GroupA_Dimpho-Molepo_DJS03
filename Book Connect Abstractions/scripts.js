import {
  renderBooks,
  showGenre,
  showAuthors,
  toggleTheme,
  setupEventListeners,
  handleSearchFormSubmit,
  handleListButtonClick,
  handleListItemsClick,
  handleSettingsFormSubmit,
} from "./renderBooksLIsts.js";
import { books, BOOKS_PER_PAGE } from './data.js'
import { elementsFromDOM } from './elements.js';

renderBooks();
showGenre();
showAuthors();
toggleTheme();
setupEventListeners();
let page = 1;
let matches = books;

elementsFromDOM.dataListButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
elementsFromDOM.dataListButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0

elementsFromDOM.dataListButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`

elementsFromDOM.dataSettingsForm.addEventListener('submit', (event) => {
  handleSettingsFormSubmit(event)
})

elementsFromDOM.dataSearchForm.addEventListener('submit', (event) => {
  handleSearchFormSubmit(event)
})

elementsFromDOM.dataListButton.addEventListener('click', () => {
    handleListButtonClick()
})

elementsFromDOM.dataListItems.addEventListener('click', (event) => {
    handleListItemsClick(event)
})