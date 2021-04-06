import React from 'react'
import userImage from "../images/address-book-user-512.webp";
import { Link } from 'react-router-dom'
function ContactCart(props) {
    const { id, name, email } = props.contact;
    console.log(props)

    return (
        <div className="item" >
            <img className="ui avatar image" src={userImage} alt={userImage} />
            <div className="content">
                <Link to={{ pathname: `/contact/${id}`, state: { contact: props.contact } }}>
                    <div className="header">{name}</div>
                    <div>{email}</div>
                </Link>
            </div>
            <i className="trash alternate outline icon" style={{ color: "red", marginTop: "7px", marginLeft: "10px", float: "right" }}
                onClick={() => props.clickHandler(id)}></i>
            <Link to={{ pathname: `/edit`, state: { contact: props.contact } }}>
                <i className="edit alternate outline icon" style={{ color: "blue", marginTop: "7px", float: "right" }}
                ></i>
            </Link>

        </div >
    )
}

export default ContactCart;
