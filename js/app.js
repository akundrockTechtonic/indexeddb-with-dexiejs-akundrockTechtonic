function onDatabaseReady() {
    //populateTableUI() // DO NOT TOUCH THIS LINE until step #4
    updateTableUI();

    //console.log(db);
    // DexieJS docs: https://dexie.org/
}

function _setupListeners(){
  document.querySelector("#submitFormButton").addEventListener("click",function(e){
    e.preventDefault();
  });
  document.querySelector("#submitFormButtonModal").addEventListener("click",function(e){
    e.preventDefault();
  });

}
function deleteBook(book) {
  //console.log(book.title);

  var deletedBook = db.books.delete(book.title)
  .catch(function(rejected) {
    console.log("OH DEAR!",book,rejected);
  });
  return deletedBook;
}

function _readFormBook(bool){
    var isModal=bool?'Modal':'';
    //console.log("is modal!?",bool,isModal);
   return {
     title:document.querySelector("#inputTitle"+isModal).value,
     author:document.querySelector("#inputAuthor"+isModal).value,
     numberOfPages:document.querySelector("#inputPages"+isModal).value,
     cover:document.querySelector("#inputCover"+isModal).value,
     synopsis:document.querySelector("#inputSynopsis"+isModal).value,
     publishDate:document.querySelector("#inputDate"+isModal).value,
     rating:document.querySelector("#inputRating"+isModal).value
   }
}
function addBook() {
    // Hint: Once you've added the book to your database, call populateTableUI with the added book's title
    // Check out the Table.put() method and what it returns at: https://dexie.org/docs/Table/Table.put()
    let bookObj=_readFormBook(false);
    //console.log('Adding a book!',bookObj);
      var addedBook = db.books.put(bookObj).catch(function (error) {
          // Finally don't forget to catch any error
          // that could have happened anywhere in the code blocks above.
             console.error(`Ooops: ${inBook}, ${error}`);
      });
      updateTableUI();
      return addedBook;

}


function editBook() {
  let bookObj=_readFormBook(true);
  //console.log('editBook called',bookObj);
  //_
  var updatedBook = db.books.update(bookObj.title, bookObj)
  //console.log("Updated,",updatedBook);
  updatedBook.then(function(resolved) {
     //console.log(resolved)
  }).catch(function(rejected) {
    console.log(rejected);
   })
  updateTableUI();

}
async function _editButtonEventHandler(book){
  //console.log("Edit book!")
  createModal(book);
  //console.log("Edit is done, now we need to read the submit button");
  //let bookObj=_updateFormBook(book);
}
function saveEdit(){
  //console.log("Inside save edit!");
  editBook();
  //Close the modal
  var modal = document.getElementById('myModal');
  modal.style.display = "none";

}

// ************ 4. (BONUS) Comment out line 67 in ../index.HTML and write your own 'populateTableUI' function in app.js ************

 function _deleteButtonEventHandler(book){
  //console.log('Delete button received this book:',book);
  deleteBook(book);
  updateTableUI();
}


function _updateFormBook(book){
  //console.log("UpdateForm!",book);
  //Writes form to update book
  document.querySelector("#inputTitleModal").value=book.title;
  document.querySelector("#inputAuthorModal").value=book.author;
  document.querySelector("#inputPagesModal").value=book.numberOfPages;
  //document.querySelector("#inputCover").value=book.cover;
  document.querySelector("#inputSynopsisModal").value=book.synopsis;
  document.querySelector("#inputDateModal").value=book.publishDate;
  document.querySelector("#inputRatingModal").value=book.rating;
  //Add event listener where

  //Cover not working right Now


}
function createModal(book){
  //console.log("Popping modal!");
  //Update our modal contents before opening!
  _updateFormBook(book);
      // Get the modal
    var modal = document.getElementById('myModal');
    // Get the button that opens the modal
    //Insert the form data here!
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on the button, open the modal
      modal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

}
async function updateTableUI(){
  _setupListeners();
  let allBooks = await db.books.where('numberOfPages').aboveOrEqual(0).toArray()
  const tBody = document.querySelector('tbody');
  tBody.rows=0;
  tBody.innerHTML='';
  //tBody.innerText='';
  const columns = ['cover', 'title', 'author', 'numberOfPages', 'synopsis', 'publishDate', 'rating','buttons'];
  for (let i = allBooks.length - 1; i >= 0; i--) {
    const row = document.createElement('tr');

    for (let j = 0; j < columns.length; j++) {
      var td = document.createElement('td');
      var value = allBooks[i][columns[j]]
      td.innerText = value ? value : null;
      row.append(td);
    }
    ////////// Creates the edit button

    ////////
    var td1 = document.createElement('td');
    const editBtn = document.createElement('button');
    editBtn.innerText = 'Edit book';
    td.append(editBtn);
    // deleteBtn.handleEvent=_deleteButtonEventHandler;
    row.append(td);

    editBtn.addEventListener("click",function (){

      _editButtonEventHandler(allBooks[i]);
    });
    /////////
    // creates a delete button with no functionality
    var td2 = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'delete book';
    // deleteBtn.handleEvent=_deleteButtonEventHandler;
    deleteBtn.addEventListener("click",function (){
      _deleteButtonEventHandler(allBooks[i]);
    });
    td2.append(deleteBtn)
    row.append(td2)
    //////////
    tBody.append(row);

  }
}
