let initialTable = true;

async function populateTableUI(newBookTitle) {
  const tBody = document.querySelector('tbody');
  const columns = ['cover', 'title', 'author', 'numberOfPages', 'synopsis', 'publishDate', 'rating'];

  if (initialTable) {
    let allBooks = await db.books.where('numberOfPages').aboveOrEqual(0).toArray()

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
      row.append(deleteBtn)

      tBody.append(row);
      deleteBtn.addEventListener("click",function (){
        _deleteButtonEventHandler(allBooks[i]);
      });
    }

  } else {
    let newBook = await db.books.where('title').equals(newBookTitle).toArray()
    const row = document.createElement('tr');

    for (let j = 0; j < columns.length; j++) {
      var td = document.createElement('td');
      var value = newBook[0][columns[j]]
      td.innerText = value ? value : null;
      row.append(td);
    }

    // creates a delete button with no functionality
    const deleteBtn = document.createElement('button');
    deleteBtn.addEventListener("click",function (){
      _deleteButtonEventHandler(allBooks[i]);
    });
    deleteBtn.innerText = 'delete book';
    row.append(deleteBtn)

    tBody.append(row);
  }
  initialTable = false;
}
