var readBooks = require('./callback.js')
 
var books = [
    {name: 'LOTR', timeSpent: 3000}, 
    {name: 'Fidas', timeSpent: 2000}, 
    {name: 'Kalkulus', timeSpent: 4000},
    {name: 'komik', timeSpent: 1000}
]

function show(){
    let time = 10000
    readBooks(time, books[0], ()=>{
        time = time - books[0].timeSpent
        readBooks(time, books[1], ()=>{
            time = time - books[1].timeSpent
            readBooks(time, books[2], ()=>{
                time = time - books[2].timeSpent
                readBooks(time, books[3], ()=>{
                    time = time - books[3].timeSpent
                    readBooks(time, books[0], ()=>{
                    })
                })
            })  
        })
    });
};

show();
