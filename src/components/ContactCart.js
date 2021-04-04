import React from 'react'
import userImage from "../images/address-book-user-512.webp";
function ContactCart(props) {
    const { name, email } = props.contact.contact;
    console.log(props);

    return (
        <div className="item" >
            <img className="ui avatar image" src={userImage} alt={userImage} />
            <div className="content">
                <div className="header">{name}</div>
                <div>{email}</div>

            </div>
            <i className="trash alternate outline icon" style={{ color: "red", marginTop: "7px", float: "right" }}
                onClick={() => props.clickHandler(props.contact.id)}></i>
        </div >
    )
}

export default ContactCart;
