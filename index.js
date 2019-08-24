const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const bodyParser = require("body-parser");
const morgan = require("morgan");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
morgan.token("body_content", function(req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan({
    format: "POST body :body_content"
  })
);

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
  return Math.floor(Math.random() * (100000, 1)) + 1;
};

const checkDuplicated = (name) => {
  return persons.some(person => person.name === name)
}

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      error: "content missing"
    });
  }

  if (!body.name || !body.number) {
     return res.status(400).json({
       error: "name or number missing, both fields required"
     });
  }

  if (checkDuplicated(body.name)) {
    return res.status(400).json({
      error: "the name already exists"
    });
  }
  
  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  };

  persons = persons.concat(person);

  res.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
