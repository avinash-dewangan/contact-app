import './App.css';
import React, { useState, useEffect } from "react";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { v4 as uuid_v4 } from "uuid";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ContactDetail from './ContactDetail';
import api from '../api/contact'
import EditContact from './EditContact';

function App() {

  const LOCAL_STORAGE_KEY = "contact";
  const [contacts, setContacts] = useState([]);


  const [searchTerm, setSearchTerm] = useState("");

  const [searchResult, setsearchResult] = useState([])

  //Retrive Contacts

  const retriveContacts = async () => {
    const res = await api.get("/contacts");
    return res.data;
  }
  useEffect(() => {
    // const getContact = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (getContact) setContacts(getContact);
    const getAllContacts = async () => {
      const allContatcs = await retriveContacts();
      if (allContatcs) setContacts(allContatcs);
    }
    getAllContacts();
  }, [])



  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts])





  const addContactHandler = async (contact) => {

    const req = {
      id: uuid_v4(),
      ...contact
    }
    const res = await api.post("/contacts", req)
    setContacts([...contacts, res.data]);
  };

  const updateContactHandler = async (contact) => {
    const res = await api.put(`/contacts/${contact.id}`, contact)
    console.log(res.data)
    const { id, name, email } = res.data;
    setContacts(contacts.map(contact => {
      return contact.id === id ? { ...res.data } : contact;
    }))
  }


  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  }


  const searchHandler = (searchTerm) => {
    //console.log(searchTerm)
    setSearchTerm(searchTerm)
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        //console.log(Object.values(contact).join(" "))

      })
      setsearchResult(newContactList);

    }
    else {
      setsearchResult(contacts)
    }
  }


  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList {...props} contacts={searchTerm.length < 1 ? contacts : searchResult} getContactId={removeContactHandler}
                searchTerm={searchTerm}
                searchKeyWord={searchHandler}
              />
            )}
          />

          <Route
            path="/edit"
            exact
            render={(props) => (
              <EditContact {...props} updateContactHandler={updateContactHandler} />
            )}
          />

          <Route path="/add" component={() => (<AddContact addContactHandler={addContactHandler} />)} />



          <Route path="/detail" component={ContactDetail} />
          <Route path="/contact/:id" component={ContactDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
