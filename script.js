const myLibrary = [];

const openform = document.querySelector("#openform");
const dialog = document.querySelector("#dialog");
const submit = document.querySelector("#submit");

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
    dialog.close();

})

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
}