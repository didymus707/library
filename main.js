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

if (!localStorage.books) {
  localStorage.setItem('books', JSON.stringify(myLibrary));
} else {
  myLibrary = JSON.parse(localStorage.books);
}

const Book = (title, author, pages, read) => {
  const readStatus = () => read = !read;
  return { title, author, pages, read, readStatus };
}

const addToLocalStorage = () => {
  localStorage.setItem('books', JSON.stringify(myLibrary));
}

const setPrototype = () => {
  let retrievedLib = [];
  myLibrary.forEach(book => {
    retrievedLib.push(Object.assign(Book(), book));
  });
  return retrievedLib;
};

const addBookToLibrary = book => {
  myLibrary.push(book);
  addToLocalStorage();
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
      <div class="card" style="width: 25rem;">
        <div class="card-header">
          <h5 class="card-title">Title: ${book.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Author: ${book.author}</h6>
        </div>
        <div class="card-body">
          <p class="card-text">Number of pages: ${book.pages}</p>
          <div class="d-flex justify-content-between align-items-center mb-3">
            <span>Are you done reading?:</span>
            <span class="ans">${book.read ? 'Yes' : 'No'}</span>
            <a href="#" class="status btn btn-primary text-center">Change Answer</a>
          </div>
          <a href="#" class="remove btn btn-danger text-center">Remove Book</a>
        </div>
      </div>
    `;
    books.appendChild(bookDiv);
  });
}

const showBook = () => {
  const lib = setPrototype();
  const len = lib.length;
  const bookDiv = document.createElement('div');
  bookDiv.setAttribute('class', `book${len - 1} mb-3`);
  bookDiv.setAttribute('data-index', `${len - 1}`);
  bookDiv.innerHTML = `
    <div class="card" style="width: 25rem;">
      <div class="card-header">
        <h5 class="card-title">Title: ${lib[len - 1].title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Author: ${lib[len - 1].author}</h6>
      </div>
      <div class="card-body">
        <p class="card-text">Number of Pages: ${lib[len - 1].pages}</p>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span>Are you done reading?:</span>
          <span class="ans">${lib[len - 1].read ? 'Yes' : 'No'}</span>
          <a href="#" class="status btn btn-primary text-center">Change Answer</a>
        </div>
        <a href="#" class="remove btn btn-danger text-center">Remove Book</a>
      </div>
    </div>
  `;
  lib.forEach((book, i) => {
    books.appendChild(bookDiv); 
  });
}

const removeBookFromLibrary = index => {
  myLibrary = setPrototype();
  const ele = document.querySelector(`.book${index}`);
  myLibrary.splice(index, 1);
  addToLocalStorage();
  ele.remove();
}

const changeStatus = (index, e) => {
  myLibrary = setPrototype();
  const check = myLibrary[index].read;
  if (check) {
    console.log(myLibrary[index].read);
    myLibrary[index].readStatus();
    console.log(myLibrary[index].read);
    e.target.previousElementSibling.textContent = 'No';
    localStorage.setItem('books', JSON.stringify(myLibrary));
  } else {
    console.log(myLibrary[index].read);
    myLibrary[index].readStatus();
    console.log(myLibrary[index].read);
    e.target.previousElementSibling.textContent = 'Yes';
    localStorage.setItem('books', JSON.stringify(myLibrary));
  }
}

books.addEventListener('click', e => {
  const parent = e.target.offsetParent.parentElement;
  const index = parent.dataset.index;
  const remove = e.target.classList.contains('remove');
  const status = e.target.classList.contains('status');
  if (remove) {
    removeBookFromLibrary(index);
  } else if (status) {
    changeStatus(index, e);
  }
});