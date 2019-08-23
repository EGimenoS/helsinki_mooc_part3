const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

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
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(`<div>PhoneBook has info for ${persons.length} people</div>`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.filter(person => person.id !== id);
  res.status(204).end();
});

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 0;
  return maxId + 1;
};
app.post("api/persons", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing"
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person);
  
  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
