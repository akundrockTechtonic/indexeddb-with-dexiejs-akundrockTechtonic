document.addEventListener('DOMContentLoaded', async function () {
    // Preset Book Data
    var getBooks = await fetch("./books.JSON").then(req => req.json()).then(data => data);
    // Define your database
    window.db = new Dexie("library_database");

    db.version(1).stores({
        books: 'title,author,numberOfPages,cover,synopsis,publishDate,rating'
    });
    // Put some data into it
    db.books.bulkPut(getBooks).then(function () {
        // Then when data is stored, read from it
        return db.books.each(book => {
               console.log(book);
        });
    }).catch(function (error) {
        // Finally don't forget to catch any error
        // that could have happened anywhere in the code blocks above.
           console.error(`Ooops: ${error}`);
    });
    onDatabaseReady()
});
