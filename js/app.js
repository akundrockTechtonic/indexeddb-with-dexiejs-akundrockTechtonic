function onDatabaseReady() {
    //populateTableUI() // DO NOT TOUCH THIS LINE until step #4
    updateTableUI();
    _setupListeners();
    //console.log(db);
    // DexieJS docs: https://dexie.org/
}

function _setupListeners(){
  document.querySelector("form").addEventListener("submit",function(e){
    e.preventDefault();
  });

}
function deleteBook(book) {
  console.log(book.title);

  var deletedBook = db.books.delete(book.title)
  .catch(function(rejected) {
    console.log("OH DEAR!",book,rejected);
  });
  return deletedBook;
}

function _readFormBook(){
   return {
     title:document.querySelector("#inputTitle").value,
     author:document.querySelector("#inputAuthor").value,
     numberOfPages:document.querySelector("#inputPages").value,
     cover:document.querySelector("#inputCover").value,
     synopsis:document.querySelector("#inputSynopsis").value,
     publishDate:document.querySelector("#inputDate").value,
     rating:document.querySelector("#inputRating").value
   }
}
function addBook() {
    // Hint: Once you've added the book to your database, call populateTableUI with the added book's title
    // Check out the Table.put() method and what it returns at: https://dexie.org/docs/Table/Table.put()
    let bookObj=_readFormBook();
    console.log('Adding a book!',bookObj);
      var addedBook = db.books.put(bookObj).catch(function (error) {
          // Finally don't forget to catch any error
          // that could have happened anywhere in the code blocks above.
             console.error(`Ooops: ${inBook}, ${error}`);
      });
      updateTableUI();
      return addedBook;

}


function editBook(book) {
  let bookObj=_readFormBook();
  console.log('editBook called',bookObj);
  //_
  var updatedBook = db.books.update(bookObj.title, bookObj)
  console.log("Updated,",updatedBook);
  updatedBook.then(function(resolved) {
     console.log(resolved)
  }).catch(function(rejected) {
    console.log(rejected);
   })
  updateTableUI();

}
async function _editButtonEventHandler(book){
  console.log("Edit book!")
  let bookObj=_updateFormBook(book);
}

// ************ 4. (BONUS) Comment out line 67 in ../index.HTML and write your own 'populateTableUI' function in app.js ************

async function _deleteButtonEventHandler(book){
  console.log('Delete button received this book:',book);
  await deleteBook(book);
  updateTableUI();

}


function _updateFormBook(book){
  //Writes form to update book
  document.querySelector("#inputTitle").value=book.title;
  document.querySelector("#inputAuthor").value=book.author;
  document.querySelector("#inputPages").value=book.numberOfPages;
  //document.querySelector("#inputCover").value=book.cover;
  document.querySelector("#inputSynopsis").value=book.synopsis;
  document.querySelector("#inputDate").value=book.publishDate;
  document.querySelector("#inputRating").value=book.rating;
  //Add event listener where

  //Cover not working right Now


}
async function updateTableUI(){
  let allBooks = await db.books.where('numberOfPages').aboveOrEqual(0).toArray()
  const tBody = document.querySelector('tbody');
  tBody.rows=0;
  tBody.innerHTML='';
  //tBody.innerText='';
  const columns = ['cover', 'title', 'author', 'numberOfPages', 'synopsis', 'publishDate', 'rating', 'Edit'];
  for (let i = allBooks.length - 1; i >= 0; i--) {
    const row = document.createElement('tr');

    for (let j = 0; j < columns.length; j++) {
      var td = document.createElement('td');
      var value = allBooks[i][columns[j]]
      td.innerText = value ? value : null;
      row.append(td);
    }

    // creates a delete button with no functionality
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'delete book';
    // deleteBtn.handleEvent=_deleteButtonEventHandler;
    deleteBtn.addEventListener("click",function (){
      _deleteButtonEventHandler(allBooks[i]);
    });
    row.append(deleteBtn)
    //////////
    const editBtn = document.createElement('button');
    editBtn.innerText = 'Edit book';
    // deleteBtn.handleEvent=_deleteButtonEventHandler;
    row.append(editBtn);
    /////////
    editBtn.addEventListener("click",function (){
      _editButtonEventHandler(allBooks[i]);
    });

    tBody.append(row);

  }
}
// Now that you’ve cloned your project lets start by testing our code. Let's start live
//server and open up our project in the browser. Open up your console and you should see
//some logs outputting book objects. These object are predefined in books.json and added to
//our database called library_database in indexedDB. We can also navigate to the
//application tab in the chrome console (storage in firefox) and take a look at the indexedDB
//storage We created this for you in indexedDB.js if you feel inclined to take a look.

// We've populated the table so the UI reflects what's currently in our local
// library_database in indexedDB.  We've logged the database above so you can see exactly
// what you're working with


// 1.) Now add functionality to remove a row  which will need remove the object from the books store in
//indexedDB database as well as the UI once the delete operation is complete. This will take some
//effort on the UI. Use the title as your UID (Unique identifier) which you can find in the application console
//in Chrome (storage in Firefox).

// 2.) From here we want to be able to add a book. Hook up the form below the table to add a
//book to the books store in indexedDB and auto-update the table without refreshing the page.
//Hint: This add operation is on the front page of DexieJS.  Both is and Table.put() can be
// used to add this book.

// 3.) Now make each table row editable and update the database when the edit is complete. This will
//take a lot of effort from the html to the js. Use the title as your UID (Unique identifier)
//which you can find in the application console
