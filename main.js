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

function Book(title, author, pages) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = false
}

const addBookToLibrary = book => {
  myLibrary.push(book);
  return myLibrary;
}

Book.prototype.readStatus = function () {
  this.read = !this.read
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
  e.preventDefault();
  const book = new Book(title, author, pages, read);
  getInputValues(book);
  console.log(addBookToLibrary(book));
  form.reset();
  showBook();
  closeWithSubmit();
});

const showBook = () => {
  const bookDiv = document.createElement('div');
  myLibrary.forEach((book, i) => {
    bookDiv.setAttribute('class', `book${i}`);
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
  });
  books.append(bookDiv);
}

const removeBookFromLibrary = index => {
  myLibrary.splice(index, 1); 
  const ele = document.querySelector(`.book${index}`);
  console.log(ele);
  ele.remove();
}

const changeStatus = (index, e) => {
  const check = myLibrary[index].read;
  if (check) {
    myLibrary[index].readStatus();
    e.target.textContent = 'False'
  } else {
    myLibrary[index].readStatus();
    e.target.textContent = 'True';
  }
}

books.addEventListener('click', (e) => {
  const dataIndex = e.path[3].dataset.index;
  const parentChildren = e.path[4].children
  const parent = e.target.offsetParent.parentElement;
  const index = [...parentChildren].indexOf(parent);
  const target = e.target.textContent;
  if (target === 'Remove Book') {
    removeBookFromLibrary(dataIndex);
  } else {
    changeStatus(index, e);
  }
})