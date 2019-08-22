const express = require("express");
const app = express();

let persons = [
  {
    name: "David Heinemeier Hansson",
    number: "15-876544",
    id: 7
  },
  {
    name: "Evan Yu",
    number: "87-986666",
    id: 8
  },
  {
    name: "Martin Fowler",
    number: "5555-78999",
    id: 10
  },
  {
    name: "Sandi Metz",
    number: "555-877666",
    id: 11
  },
  {
    name: "Dan Abramov",
    number: "34-77635353",
    id: 12
  }
];

app.get("/api/persons", (req, res) => {
  res.send(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
