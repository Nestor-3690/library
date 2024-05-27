const myLibrary = [];

const openform = document.querySelector("#openform");
const dialog = document.querySelector("#dialog");
const submit = document.querySelector("#submit");

const container = document.querySelector(".container");

openform.addEventListener("click", () => {
    dialog.showModal();
})

submit.addEventListener("click", (event) => {
    event.preventDefault();
    if (read.checked) {
        read.value = "read";
    } else {
        read.value = "not read";
    }
    addBookToLibrary(title.value, author.value, pages.value, read.value);
    displayBooks();
    dialog.close();

})

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks() {
    container.textContent = '';
    myLibrary.forEach((book) => {
        const bookdiv = document.createElement("div");
        bookdiv.setAttribute("class", book.title);
        for (info in book) {
            const book_info = document.createElement("div");
            book_info.textContent = book[info];
            bookdiv.append(book_info);
        }
        container.append(bookdiv);
    })
}