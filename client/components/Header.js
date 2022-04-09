import React from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'

import query from '../queries/CurrentUser'
import mutation from '../mutations/Logout'

const Header = (props) => {
    const onLogoutClick = () => {
        props.mutate({ refetchQueries: [{ query }] })
    }

    const renderButtons = () => {
        const { loading, user } = props.data

        if (loading) return <li></li>

        if (user)
            return (
                <li>
                    <a onClick={onLogoutClick}>logout</a>
                </li>
            )
        else {
            return (
                <div>
                    <li>
                        <Link to="signup">signup</Link>
                    </li>
                    <li>
                        <Link to="login">login</Link>
                    </li>
                </div>
            )
        }
    }
    return (
        <nav className="nav-wrapper">
            <Link to="/" className="brand-logo left">
                Home
            </Link>
            <ul className="right">
                <div>{renderButtons()}</div>
            </ul>
        </nav>
    )
}

export default graphql(mutation)(graphql(query)(Header))
