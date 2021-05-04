var readBooksPromise = require('./promise.js')
 
var books = [
    {name: 'LOTR', timeSpent: 3000}, 
    {name: 'Fidas', timeSpent: 2000}, 
    {name: 'Kalkulus', timeSpent: 4000}
]

function shiw(){
    let time = 10000
    readBooksPromise(time, books[0])
        .then(() => readBooksPromise(time- books[0].timeSpent, books[1]))
            .then(() => readBooksPromise(time- books[0].timeSpent - books[1].timeSpent, books[2]))
                .then(() => readBooksPromise(time- books[0].timeSpent - books[1].timeSpent - books[2].timeSpent, books[0]))
                    .catch(err => console.log('error', err));
}
  
shiw()