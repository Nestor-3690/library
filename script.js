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

  const form = document.querySelector("form");
  const openform = document.querySelector("#openform");
  const dialog = document.querySelector("#dialog");
  const submit = document.querySelector("#submit");
  const container = document.querySelector(".container");

  const titleInput = document.querySelector("#title");
  const authorInput = document.querySelector("#author");
  const pagesInput = document.querySelector("#pages");
  const titleError = document.querySelector("#title + span.error");
  const authorError = document.querySelector("#author + span.error");
  const pagesError = document.querySelector("#pages + span.error");

  openform.addEventListener("click", () => {
    dialog.showModal();
    titleError.textContent = "";
    authorError.textContent = "";
    pagesError.textContent = "";
  });

  titleInput.addEventListener("input", () => {
    if (!titleInput.validity.valid) {
      titleError.textContent = "A Title is required";
    } else {
      titleError.textContent = "";
    }
  });

  authorInput.addEventListener("input", () => {
    if (!authorInput.validity.valid) {
      authorError.textContent = "An Author is required";
    } else {
      authorError.textContent = "";
    }
  });

  pagesInput.addEventListener("input", () => {
    if (!pagesInput.validity.valid) {
      if (pages.validity.valueMissing) {
        pagesError.textContent = "A number of Pages is required";
      } else if (pages.validity.rangeUnderflow) {
        pagesError.textContent = `The book can't have ${pages.value} pages!`;
      }
    } else {
      pagesError.textContent = "";
    }
  });

  submit.addEventListener("click", (event) => {
    event.preventDefault();
    if (form.checkValidity() === false) {
      if (title.validity.valueMissing) {
        titleError.textContent = "A Title is required";
      }
      if (author.validity.valueMissing) {
        authorError.textContent = "An Author is required";
      }
      if (pages.validity.valueMissing) {
        pagesError.textContent = "Number of Pages is required";
      }
      return;
    }
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
