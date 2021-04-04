import React from 'react'
import ContactCart from './ContactCart';

function ContactList(props) {


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

    return (
        <div className="ui celled list">
            {renderContactList}
        </div>
    )
}

export default ContactList
