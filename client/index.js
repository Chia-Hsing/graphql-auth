import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { hashHistory, Router, Route, IndexRoute } from 'react-router'
import App from './components/App'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Dashboard from './components/Dashboard'
import requiredAuth from './components/requiredAuth'

const netWorkInterface = createNetworkInterface({
    uri: '/graphql',
    opts: {
        credentials: 'same-origin',
    },
})
const client = new ApolloClient({
    dataIdFromObject: (o) => o.id,
    netWorkInterface,
})

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <Route path="/login" component={LoginForm}></Route>
                    <Route path="/signup" component={SignupForm}></Route>
                    <Route path="/dashboard" component={requiredAuth(Dashboard)}></Route>
                </Route>
            </Router>
        </ApolloProvider>
    )
}

ReactDOM.render(<Root />, document.querySelector('#root'))
