function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  let borrowedBooks = books.filter((book) => !book.borrows[0].returned);
  let returnedBooks = books.filter((book) => book.borrows[0].returned);
  
  return [borrowedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  let count = 0;
  let borrowers = [];
  
  for (let i = 0; i < book.borrows.length; i++) {
    if (count >= 10) {
      return borrowers;
    }
    
    const borrowerObj = accounts.find((account) => book.borrows[i].id === account.id)
    borrowerObj.returned = book.borrows[i].returned;
    borrowers.push(borrowerObj);
    count++;
  }
  
  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
