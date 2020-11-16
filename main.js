let myLibrary = [];

function Book(author, title, pageNumber) {
  this.author = author
  this.title = title
  this.pageNumber = pageNumber
  this.read = false
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function bookForm() {
  document
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
}