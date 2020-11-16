let myLibrary = [];

function Book(author, title, pageNumber) {
  this.author = author
  this.title = title
  this.pageNumber = pageNumber
  this.read = false
}

Book.prototype.readStatus = function () {
  this.read = !this.read
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
}