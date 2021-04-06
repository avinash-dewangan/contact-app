import React from 'react'

function Header() {
    return (
        <div className="ui fixed menu">
            <div className="ui container center">
                <h1>Contact Manager</h1>
                {process.env.NODE_ENV}
            </div>

        </div>
    )
}

export default Header;
