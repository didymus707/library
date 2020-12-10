let myLibrary = [];
const books = document.querySelector('.books');
const newBook = document.querySelector('.new-book');
const formCon = document.querySelector('.form-for-book');
const form = document.querySelector('.form');
let title = document.querySelector('.title');
let author = document.querySelector('.author');
let pages = document.querySelector('input[type=number]');
let read = document.querySelector('input[type=checkbox]');
const btn = document.querySelector('button[type=submit]');
const getStatus = () => document.querySelector('.status');
const removeBook = () => document.querySelector('.remove');

const Book = (title, author, pages, read) => {
  const readStatus = () => !read;
  return { title, author, pages, read, readStatus };
}

const addToLocalStorage = (bookStore) => {
  if (!localStorage.books) {
    localStorage.setItem('books', JSON.stringify(bookStore));
  } else {
    let retrievedLib = retriFromLocalStorage();
    retrievedLib.push(bookStore.pop());
    localStorage.setItem('books', JSON.stringify(retrievedLib));
  }
}

const retriFromLocalStorage = () => JSON.parse(localStorage.books);

const setPrototype = () => {
  if (!localStorage.books) return;
  let library = retriFromLocalStorage();
  let retrievedLib = [];
  library.forEach(book => {
    retrievedLib.push(Object.assign(Book(), book));
  });
  return retrievedLib;
};

const addBookToLibrary = book => {
  myLibrary.push(book);
  addToLocalStorage(myLibrary);
  return myLibrary;
}

newBook.addEventListener('click', (e) => {
  e.target.textContent === 'Add a new book' ? e.target.textContent = 'Close' : e.target.textContent = 'Add a new book'
  formCon.classList.toggle('hide');
});

const closeWithSubmit = () => {
  newBook.textContent = 'Add a new book';
  formCon.classList.toggle('hide');
}

const getInputValues = (book) => {
  book.title = title.value;
  book.author = author.value;
  book.pages = pages.value;
  book.read = read.checked;
}

btn.addEventListener('click', (e) => {
  const book = Book();
  getInputValues(book);
  addBookToLibrary(book);
  form.reset();
  showBook();
  closeWithSubmit();
});

const showBookOnLoad = () => {
  const lib = setPrototype();
  if (!lib) return;
  lib.forEach((book, i) => {
    const bookDiv = document.createElement('div');
    bookDiv.setAttribute('class', `book${i} mb-3`);
    bookDiv.setAttribute('data-index', `${i}`);
    bookDiv.innerHTML = `
      <div class="card" style="width: 18rem;">
        <div class="card-header">
          <h5 class="card-title">${book.title}</h5>
        </div>
        <div class="card-body">
          <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
          <p class="card-text">${book.pages}</p>
          <a href="#" class="status btn btn-primary text-center">${book.read}</a>
          <a href="#" class="remove btn btn-danger text-center">Remove Book</a>
        </div>
      </div>
    `;
    books.appendChild(bookDiv);
  });
}

const showBook = () => {
  const lib = setPrototype();
  if (!lib) return;
  const len = lib.length;
  const bookDiv = document.createElement('div');
  bookDiv.setAttribute('class', `book${len - 1} mb-3`);
  bookDiv.setAttribute('data-index', `${len - 1}`);
  bookDiv.innerHTML = `
    <div class="card" style="width: 18rem;">
      <div class="card-header">
        <h5 class="card-title">${lib[len - 1].title}</h5>
      </div>
      <div class="card-body">
        <h6 class="card-subtitle mb-2 text-muted">${lib[len - 1].author}</h6>
        <p class="card-text">${lib[len - 1].pages}</p>
        <a href="#" class="status btn btn-primary text-center">${lib[len - 1].read}</a>
        <a href="#" class="remove btn btn-danger text-center">Remove Book</a>
      </div>
    </div>
  `;
  lib.forEach((book, i) => {
    books.appendChild(bookDiv); 
  });
}

const removeBookFromLibrary = index => {
  const lib = setPrototype();
  const ele = document.querySelector(`.book${index}`);
  lib.splice(index, 1);
  addToLocalStorage(lib);
  ele.remove();
}

const readNotRead = (index, e) => {
  const lib = setPrototype();
  const check = lib[index].read;
  console.log(check)
  if (check) {
    lib[index].readStatus();
    e.target.textContent = 'False';
    addToLocalStorage(lib);
  } else {
    console.log(lib[index].readStatus());
    e.target.textContent = 'True';
    addToLocalStorage(lib);
  }
}

books.addEventListener('click', e => {
  const parent = e.target.offsetParent.parentElement;
  const index = parent.dataset.index;
  console.log(index);
  const target = e.target.textContent;
  if (target === 'Remove Book') {
    removeBookFromLibrary(index);
  } else {
    // readNotRead(index, e);
    console.log('changing');
  }
});