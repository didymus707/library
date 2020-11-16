let myLibrary = [];
let newBook = document.querySelector('.new-book');
let form = document.querySelector('.form-for-book');
let title = document.querySelector('.title');
let author = document.querySelector('.author');
let pages = document.querySelector('input[type=number]');
let read = document.querySelector('input[type=checkbox]');

function Book(title, author, pageNumber) {
  this.title = title
  this.author = author
  this.pageNumber = pageNumber
  this.read = false
}

Book.prototype.readStatus = function () {
  this.read = !this.read
}

newBook.addEventListener('click', () => {
  form.classList.toggle('hide');
})

form.addEventListener('change', (e) => {
  let title, author, pages, status;
  if (e.target.id === 'title') {
    title = e.target.value;
  } else if (e.target.id === 'author') {
    author = e.target.value;
  } else if (e.target.id === 'number') {
    pages = e.target.value;
  } else {
    status = e.target.checked;
  }
})

let book = new Book(author, title, pages);

function addBookToLibrary(book) {
  myLibrary.push(book);
  return myLibrary;
}

function showBook() {
  myLibrary.forEach(book => {
    
  });
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
}

console.log(addBookToLibrary(book));