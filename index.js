const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// Serve static index.html file
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname + "/public" });
});

// Books array
let books = [];

// Route to get all books
app.get("/books", (req, res) => {
  res.json(books);
});

// Route to add a new book
app.post("/books", (req, res) => {
  const { title, author, publishedDate } = req.body;
  if (!title)
    return res.status(400).json({
      message: "Title is required!",
    });
  if (!author)
    return res.status(400).json({
      message: "Author is required!",
    });

  const id = Date.now().toString();
  const book = { id, title, author, publishedDate };
  books.push(book);
  res.status(200).json(book);
});

// Route to delete a book
app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  const index = books.findIndex((book) => book.id === id);
  if (index >= 0) {
    books.splice(index, 1);
    res.json({ message: "Book successfully deleted" });
  } else {
    res.json({ message: "Book not found" });
  }
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
