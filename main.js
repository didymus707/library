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

let book = new Book('J.R.R. Tolkien', 'The Hobbit', 295);

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function showBook() {
  myLibrary.forEach(book => {
    
  });
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
}

addBookToLibrary(book);