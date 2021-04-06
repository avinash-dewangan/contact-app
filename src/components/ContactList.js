import React, { useRef } from 'react'
import ContactCart from './ContactCart';
import { Link } from 'react-router-dom'
function ContactList(props) {

    const inputEl = useRef("");
    //console.log(props)
    const deleteContactHandler = (id) => {
        props.getContactId(id)
    }



    let renderContactList = "No Contacts";
    if (props !== "undefined"
        && props.contacts.length >= 1) {
        renderContactList = props.contacts.map((contact) => {
            // console.log(contact.id)
            return (
                <ContactCart contact={contact} clickHandler={deleteContactHandler} key={contact.id} />
            );
        });
        //console.log(renderContactList);
    }
    const getSearchTerm = () => {
        props.searchKeyWord(inputEl.current.value)
    }


    return (
        <div className="main" style={{ marginTop: "56px" }}>
            <h2>Contact List
            <Link to="/add">
                    <button className="ui button blue right" style={{ float: "right" }}>Add Contact</button>
                </Link>

            </h2>
            <div className="ui search">
                <div className="ui icon input">
                    <input ref={inputEl} type="text" placeholder="Search Contacts" className="prompt" value={props.searchTerm} onChange={getSearchTerm} />
                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list">
                {renderContactList}
            </div>
        </div>

    )
}

export default ContactList
