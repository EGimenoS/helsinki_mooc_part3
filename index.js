const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const config = require("./config");

app.use(express.static("build"));
app.use(cors());
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

const url = `mongodb+srv://fullstack:${config.password}@fullstack-mooc-egs-7agwf.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number
});

const Person = mongoose.model("Person", personSchema);

app.get("/api/persons", (req, res) => {
  Person.find({}).then(persons => res.json(persons));
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

const checkDuplicated = name => {
  return persons.some(person => person.name === name);
};

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
