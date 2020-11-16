let myLibrary = [];
let newBook = document.querySelector('.new-book');
let form = document.querySelector('.form-for-book');
let title = document.querySelector('input[type=text]');
let pages = document.querySelector('input[type=number]');
let read = document.querySelector('input[type=checkbox]');

newBook.addEventListener('click', () => {
  form.classList.toggle('hide');
})

function Book(author, title, pageNumber) {
  this.author = author
  this.title = title
  this.pageNumber = pageNumber
  this.read = false
}

Book.prototype.readStatus = function () {
  this.read = !this.read
}

let book = new Book('J.R.R. Tolkien', 'The Hobbit', 295);

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

addBookToLibrary(book);