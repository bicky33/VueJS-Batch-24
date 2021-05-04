var readBooks = require('./callback.js')
 
var books = [
    {name: 'LOTR', timeSpent: 3000}, 
    {name: 'Fidas', timeSpent: 2000}, 
    {name: 'Kalkulus', timeSpent: 4000},
    {name: 'komik', timeSpent: 1000}
]

function log(sisaWaktu) {
    return console.log(sisaWaktu);

}

console.log(books.forEach( book=> readBooks(10000, book, log) ));