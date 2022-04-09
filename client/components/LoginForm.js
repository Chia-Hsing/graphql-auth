import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { hashHistory } from 'react-router'

import AuthForm from './AuthForm'
import mutation from '../mutations/Login'
import query from '../queries/CurrentUser'

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: [],
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.data.user && !this.props.data.user) {
            hashHistory.push('/dashboard')
        }
    }

    onSubmit({ email, password }) {
        this.props
            .mutate({
                variables: { email, password },
                refetchQueries: [{ query }],
            })
            .catch((res) => {
                // 所有的錯誤都會返回在 graphQLErrors 陣列中。包含遇到的各種錯誤的物件。
                // 我們只需要取用 message，所以整理成 messages array。
                const errors = res.graphQLErrors.map((error) => error.message)
                this.setState({ errors })
            })
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
            </div>
        )
    }
}

export default graphql(query)(graphql(mutation)(LoginForm))
