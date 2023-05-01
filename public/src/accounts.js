function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id)
}
//what exactly does the comparison function do? I got it right excapt put wrong comparison operator
function sortAccountsByLastName(accounts) {
  return accounts.sort((acctA, acctB) => acctA.name.last.toLowerCase() > acctB.name.last.toLowerCase() ? 1 : -1)
}

function getTotalNumberOfBorrows(account, books) {
  const id = account.id; //gets id key from account obj
  let numberOfBorrows = 0; //accumulator
  
  for (let i = 0; i < books.length; i++) { //loop through array of books
    let book = books[i]; 
    
    for (let j = 0; j < book.borrows.length; j++) { //nested loop through `borrows` array key in book obj
      let borrows = book.borrows[j];
      
      if (borrows.id === id) {
        numberOfBorrows++;
      }
    }
  }
  
  return numberOfBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  const id = account.id;
  let booksPossessedByAccount = []; //accumulator
  
  for (let i = 0; i < books.length; i++) { //loop through books array
    const book = books[i];
    const borrows = book.borrows;

    for (let j = 0; j < borrows.length; j++) { //loop through `borrows` array of current book
      const borrowedBook = borrows[j]; //current book obj in `borrows` array
      
      if (borrowedBook.id === id && !borrowedBook.returned) {
        book.author = authors.find((author) => author.id === book.authorId);
        booksPossessedByAccount.push(book);
      }
    }
  }
  
  return booksPossessedByAccount;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
