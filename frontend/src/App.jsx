import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((initialPersons) => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);

  if (persons === null) {
    return null;
  }

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const showNotificationMessage = (message) => {
    setNotificationMessage(message, "notification");
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };

    if (
      persons.some(
        (person) => person.name === newName && person.number === newNumber,
      )
    ) {
      showErrorMessage(
        `${newName} with number ${newNumber} is already added to phonebook`,
      );
      setNewName("");
      setNewNumber("");
    } else if (persons.some((person) => person.name === newName)) {
      const person = persons.find((p) => p.name === newName);
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook. Replace the old number with the new one?`,
      );

      if (confirmUpdate) {
        const updatedPerson = { ...person, number: newNumber };

        personService
          .update(person.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : returnedPerson)),
            );
            showNotificationMessage(`Updated ${returnedPerson.name}'s number`);
            setNewName("");
            setNewNumber("");
          })
          .catch(() => {
            showErrorMessage(
              `Information of ${person.name} has already been removed from server`,
            );
            setPersons(persons.filter((p) => p.id !== person.id));
          });
      }
    } else {
      personService
        .create(personObject)
        .then((returnedPersons) => {
          setPersons(persons.concat(returnedPersons));
          showNotificationMessage(`Added ${personObject.name}`);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.log("ERROR:", error.response.data);
          showErrorMessage(error.response.data.error);
        });
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    if (event.target.value !== "") {
      setShowAll(false);
    } else {
      setShowAll(true);
    }
    console.log(event.target.value);
    setNewFilter(event.target.value);
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    const confirmDelete = window.confirm(`Delete ${person.name} ?`);
    if (confirmDelete) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
        showNotificationMessage(`Deleted ${person.name}`);
      });
    }
  };

  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase()),
      );

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} styling="error" />
      <Notification message={notificationMessage} styling="notification" />
      <Filter filter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
