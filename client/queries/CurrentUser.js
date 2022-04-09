import gql from 'graphql-tag'

export default gql`
    query Query {
        user {
            id
            email
        }
    }
`
