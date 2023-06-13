const addButton = document.querySelector('#add');
const formContainer = document.querySelector('.book-form-container');
const closeButton = document.querySelector("#close");
const bookForm = document.querySelector("#book-form");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const bookStatus = document.querySelector('input[name="status"]:checked');
const table = document.querySelector("table");
const tblBody = document.querySelector("tbody");



closeButton.addEventListener('click', ()=>{
    formContainer.classList.add("hidden")
})
addButton.addEventListener('click', ()=>{
    formContainer.classList.toggle("hidden");
    
})



let myLibrary = [];

const theHobbit = new Book("The Hobbit", "JRR Tolkien", 295, "unread", 1);
const TWOK = new Book("The Way of Kings", "Brandon Sanderson",1007,"read", 2);
myLibrary.push(theHobbit);
myLibrary.push(TWOK);


function Book(title, author, pages, status, id){
    //constructor
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
    this.id = id;
}

Book.prototype.changeStatus = function(newStatus){
    this.status = newStatus;
}







bookForm.addEventListener("submit",(e)=>{
   
    e.preventDefault()
    let title = bookTitle.value;
    let author = bookAuthor.value;
    let pages = bookPages.value;
    let status = bookStatus.value;
    let id = myLibrary.length + 1;
    let book = new Book(title, author, pages, status, id);
    console.log(book)
    myLibrary.push(book)
    createTableRow(book)
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
    formContainer.classList.toggle("hidden");


})


function populateLibrary(){
    for(let book of myLibrary){
        createTableRow(book)
    }
}

function createTableRow(book){
    const row = document.createElement("tr");
    for(const prop in book){
        const cell = document.createElement("td");
        if(prop === "id"){
            let btn = document.createElement("button");
            btn.classList.add("delete")
            btn.innerHTML = "Delete";
            btn.addEventListener("click", ()=>{
                deleteBook(book);
            })
            cell.appendChild(btn)
        }else if(prop === "status"){
            let statusBtn = document.createElement("button");
            statusBtn.innerHTML = `${book.status}`;
            statusBtn.addEventListener('click', ()=>{
                if(book.status === "read"){
                    book.changeStatus("unread");
                    
                }else{
                    book.changeStatus("read");
                }
                statusBtn.innerHTML = `${book.status}`; 
                statusBtn.classList.toggle("read");
            })
            cell.appendChild(statusBtn);
            statusBtn.classList.add("status")
            if(book.status === "read"){
                statusBtn.classList.toggle("read")
            }
        }else if(prop ==="changeStatus"){
            continue
        }else{
            const cellText = document.createTextNode(`${book[prop]}`);
            cell.appendChild(cellText);
        }
        row.appendChild(cell);
    }
    tblBody.appendChild(row);
}

function deleteBook(book){
    const index = myLibrary.indexOf(book);
    myLibrary.splice(index,1);
    table.deleteRow(book.id);
}

populateLibrary()