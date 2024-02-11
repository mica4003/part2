import { useState , useEffect} from 'react'
import axios from "axios"
import personsService from "./services/persons"
import Form from "./components/Form"
import Filter from './components/Filter'
import Persons from "./components/Persons"
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  })
  const [message, setMessage] = useState(null)

  useEffect(()=>{
      personsService
        .getAll()
        .then(initialData=>setPersons(initialData))
  },[])

  const handleInputChange = event =>{
      event.preventDefault()
      const {name,value} = event.target;
      setNewPerson(prev=>({
        ...prev,
        [name] : value
      }))
  }

  const addPerson = () =>{
    personsService
      .create(newPerson)
        .then(createdPerson=>{
          setPersons(prev=>[...prev,createdPerson])
          setMessage(`Added ${createdPerson.name}`)
          setTimeout(()=>{
            setMessage(null)
          },5000)
        })
  }
 
  const deletePerson = (id)=>{
    if(window.confirm(`delete ${persons.find(person=>person.id===id).name}`)){
      personsService
        .deleteElement(id)
          .then(deletedPerson=>{
            setPersons(prev=>prev.filter(item=>item.id!==deletedPerson.id))
        }
      ) 
    }
  }

  const updatePerson = id => {
    const person = persons.find(person => person.id === id);
    const changedPerson = { ...person, number: newPerson.number };
  
    personsService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id === id ? returnedPerson : person));
        setMessage(`Contact information successfully updated`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch(error => {
        setMessage(`Information of ${person.name} has already been removed from server`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };
  
  const submitData = (event) => {
    event.preventDefault();
    const isNameExist = persons.some((person) => person.name === newPerson.name);
    
    if (isNameExist) {
      const existingPerson = persons.find((person) => person.name === newPerson.name);
      if (window.confirm(`${newPerson.name} is already added to the phonebook.Replace the old number with a new one?`)) {
        // Update the phone number
        updatePerson(existingPerson.id);
        setNewPerson({ name: "", number: "" });
        return;
      }
    }
    // If the person doesn't exist, add them
    addPerson();
    setNewPerson({ name: "", number: "" });
  };
  

  const filterName = (event) => {
    const filter = event.target.value.toLowerCase();
    if (filter === "") {
      // If the filter is empty, display all contacts
      personsService
        .getAll()
        .then(allData => setPersons(allData));
    } else {
      // If the filter is not empty, filter the contacts based on the input value
      const filteredList = persons.filter(person => person.name.toLowerCase().includes(filter));
      setPersons(filteredList);
    }
  };
  
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filterName={filterName}/>

      <h2>Add New</h2>
      <Form 
        newPerson={newPerson}
        submitData = {submitData}
        handleInputChange={handleInputChange}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App