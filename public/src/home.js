function getTotalBooksCount(books) {
  return books.reduce((accum, book) => {
    accum++;
    return accum;
  }, 0);
}

function getTotalAccountsCount(accounts) {
  return accounts.reduce((accum, account) => {
    accum++;
    return accum;
  }, 0);
}

function getBooksBorrowedCount(books) {
  return books.reduce((accum, book) => {
    if(!book.borrows[0].returned) { //book.borrows[0] is most recent borrow
      accum++;
    }    
    return accum;
  }, 0)
}

function getMostCommonGenres(books) {
  let existingGenres = [];
  let genreCount = [];
  
  for (let i = 0; i < books.length; i++) {
    let genre = {
      name: "",
      count: 0
    }
    
    if (!existingGenres.includes(books[i].genre)) {
      genre.name = books[i].genre;
      genre.count = 1;
      existingGenres.push(books[i].genre);
      genreCount.push(genre);
    } else {
      for (let j = 0; j < genreCount.length; j++) {
        if (genreCount[j].name === books[i].genre) {
          genreCount[j].count += 1;
        }
      }
    }
  }
  
  genreCount.sort((genreA, genreB) => genreA.count < genreB.count ? 1 : -1)
  
  for (let i = genreCount.length - 1; i > 4; i--) {
   genreCount.pop()
  }
  
  return genreCount;
}

function getMostPopularBooks(books) {
  const bookCounts = books.reduce((accum, book) => {
    let countObj = {
      name: "",
      count: 0
    }
    
    countObj.name = book.title;
    countObj.count = book.borrows.length;
    accum.push(countObj);
    
    return accum;
  }, [])
  
  bookCounts.sort((bookA, bookB) => bookA.count < bookB.count ? 1 : -1);
  
  for (let i = bookCounts.length - 1; i > 4; i--) {
    bookCounts.pop();
  }

  return bookCounts;
}

//**HELPER FUNCTION**
function getAuthorIdByName (authors, name) {   
  return authors.find((author) => name === `${author.name.first} ${author.name.last}`).id;
}

function getMostPopularAuthors(books, authors) {
  
  let authorBorrowedCount = [];
  let existingAuthors = [];
  
  for (let i = 0; i < authors.length; i++) {
    let author = {
      name: "",
      count: 0
    }
    
    let authorName = `${authors[i].name.first} ${authors[i].name.last}`;
    let authorId = getAuthorIdByName(authors, authorName);
    
    if (!existingAuthors.includes(authorName)) {
      let booksByAuthor = books.filter((book) => book.authorId === authorId);
      let count = 0;

      for (let j = 0; j < booksByAuthor.length; j++) {
        count += booksByAuthor[j].borrows.length;
      }

      author.name = authorName;
      author.count = count;
      existingAuthors.push(authors[i].id);
      authorBorrowedCount.push(author);
    }
    
  }
  
  authorBorrowedCount.sort((a, b) => (a.count < b.count ? 1 : -1));
  
  if (authorBorrowedCount.length > 4) {
    for (let i = authorBorrowedCount.length - 1; i > 4; i--) {
      authorBorrowedCount.pop();
    }
  }

  return authorBorrowedCount
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
