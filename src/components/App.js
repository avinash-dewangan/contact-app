import './App.css';
import React, { useState, useEffect } from "react";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { uuid } from 'uuidv4';
function App() {

  const LOCAL_STORAGE_KEY = "contact";
  const [contacts, setContacts] = useState([]);


  useEffect(() => {
    const getContact = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (getContact) setContacts(getContact);
  }, [])



  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts])





  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: uuid(), contact }]);
  };


  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  }





  return (
    <div className="ui container">
      <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} getContactId={removeContactHandler} />
    </div>
  );
}

export default App;
