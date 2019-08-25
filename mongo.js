const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@fullstack-mooc-egs-7agwf.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number
});

const Person = mongoose.model("Person", personSchema);

const getAll = () => {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
};

const createPerson = () => {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  });

  person.save().then(response => {
    console.log("person saved!");
    mongoose.connection.close();
  });
};

const numberOfArgs = process.argv.length;

if (numberOfArgs < 3) {
  console.log("give password as argument");
  process.exit(1);
} else if (numberOfArgs === 3) {
  getAll();
} else {
  createPerson();
}
