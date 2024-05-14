import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';
import { elementsFromDOM } from './elements.js';

let page = 1;
let matches = books;

function renderBooks() {
  const starting = document.createDocumentFragment();

  for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);

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

    starting.appendChild(element);
  }

  elementsFromDOM.dataListItems.appendChild(starting);
}

function showGenre() {
  const genreHtml = document.createDocumentFragment();
  const firstGenreElement = document.createElement('option');
  firstGenreElement.value = 'any';
  firstGenreElement.innerText = 'All Genres';
  genreHtml.appendChild(firstGenreElement);

  for (const [id, name] of Object.entries(genres)) {
    const element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    genreHtml.appendChild(element);
  }

  elementsFromDOM.dataSearchGenres.appendChild(genreHtml);
}

function showAuthors() {
  const authorsHtml = document.createDocumentFragment();
  const firstAuthorElement = document.createElement('option');
  firstAuthorElement.value = 'any';
  firstAuthorElement.innerText = 'All Authors';
  authorsHtml.appendChild(firstAuthorElement);

  for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    authorsHtml.appendChild(element);
  }

  elementsFromDOM.dataSearchAuthors.appendChild(authorsHtml);
}

function toggleTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    elementsFromDOM.dataSettingsTheme.value = 'night';
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
  } else {
    elementsFromDOM.dataSettingsTheme.value = 'day';
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
  }
}

function setupEventListeners() {
    elementsFromDOM.dataSearchCancel.addEventListener('click', () => {
        elementsFromDOM.dataSearchOverlay.open = false
    })

    elementsFromDOM.dataSettingsCancel.addEventListener('click', () => {
        elementsFromDOM.dataSettingsOverlay.open = false
    })

    elementsFromDOM.dataHeaderSearch.addEventListener('click', () => {
        elementsFromDOM.dataSearchOverlay.open = true 
        elementsFromDOM.dataSearchTitle.focus()
    })

    elementsFromDOM.dataHeaderSettings.addEventListener('click', () => {
        elementsFromDOM.dataSettingsOverlay.open = true 
    })

    elementsFromDOM.dataListClose.addEventListener('click', () => {
        elementsFromDOM.dataListActive.open = false
    })
}

function handleSearchFormSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []

    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }

    page = 1;
    matches = result

    if (result.length < 1) {
        elementsFromDOM.dataListMessage.classList.add('list__message_show')
    } else {
        elementsFromDOM.dataListMessage.classList.remove('list__message_show')
    }

    elementsFromDOM.dataListItems.innerHTML = ''
    const newItems = document.createDocumentFragment()

    for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `

        newItems.appendChild(element)
    }

    elementsFromDOM.dataListItems.appendChild(newItems)
    elementsFromDOM.dataListButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1

    elementsFromDOM.dataListButton.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `

    window.scrollTo({top: 0, behavior: 'smooth'});
    elementsFromDOM.dataSearchOverlay.open = false
}

function handleListButtonClick() {
    const fragment = document.createDocumentFragment()
    
    for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `

        fragment.appendChild(element)
    }

    elementsFromDOM.dataListItems.appendChild(fragment)
    page += 1
}

function handleListItemsClick(event) {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null

    for (const node of pathArray) {
        if (active) break

        if (node?.dataset?.preview) {
            let result = null
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            } 
        
            active = result 
        }
    }
    
    if (active) {
        elementsFromDOM.dataListActive.open = true
        elementsFromDOM.dataListBlur.src = active.image
        elementsFromDOM.dataListImage.src = active.image
        elementsFromDOM.dataListTitle.innerText = active.title
        elementsFromDOM.dataListSubtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        elementsFromDOM.dataListDescricption.innerText = active.description
    }
}

function handleSettingsFormSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)
    
    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }

    elementsFromDOM.dataSettingsOverlay.open = false
}

