function Library() {
  const myLibrary = [];

  const getLibrary = () => myLibrary;

  class Book {
    constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }
    changeReadStatus = () => {
      if (this.read === "read") {
        this.read = "not read";
      } else {
        this.read = "read";
      }
    };
  }

  function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
  }

  return { getLibrary, addBookToLibrary };
}

(function DisplayController() {
  const library = Library();
  const myLibrary = library.getLibrary();

  const openform = document.querySelector("#openform");
  const dialog = document.querySelector("#dialog");
  const submit = document.querySelector("#submit");
  const container = document.querySelector(".container");

  openform.addEventListener("click", () => {
    dialog.showModal();
  });

  submit.addEventListener("click", (event) => {
    event.preventDefault();
    if (read.checked) {
      read.value = "read";
    } else {
      read.value = "not read";
    }
    library.addBookToLibrary(
      title.value,
      author.value,
      pages.value,
      read.value
    );
    displayBooks();
    dialog.close();
  });

  function displayBooks() {
    container.textContent = "";
    let count = 0;
    const infos = ["title", "author", "pages", "read"];
    myLibrary.forEach((book) => {
      const bookdiv = document.createElement("div");
      bookdiv.setAttribute("class", "book");
      bookdiv.setAttribute("id", count);
      for (info in book) {
        if (infos.includes(info)) {
          const book_info = document.createElement("div");
          if (info === "title") {
            book_info.setAttribute("class", "title");
          } else if (info === "author") {
            book_info.setAttribute("class", "author");
          } else if (info === "pages") {
            book_info.setAttribute("class", "pages");
          } else if (info == "read") {
            book_info.setAttribute("class", "read");
          }
          book_info.textContent = book[info];
          bookdiv.append(book_info);
        }
      }
      const cancel_button = document.createElement("button");
      cancel_button.setAttribute("class", "cancel");
      cancel_button.textContent = "Remove";
      cancel_button.addEventListener("click", () => {
        myLibrary.splice(bookdiv.id, 1);
        displayBooks();
      });

      const read_status = document.createElement("button");
      read_status.setAttribute("class", "read-status");
      read_status.textContent = "Change Read Status";
      read_status.addEventListener("click", () => {
        myLibrary[bookdiv.id].changeReadStatus();
        displayBooks();
      });

      bookdiv.append(cancel_button);
      bookdiv.append(read_status);
      container.append(bookdiv);
      count++;
    });
  }
})();
