const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString } = graphql
const UserType = require('./types/user_type')
const AuthService = require('../services/auth')

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            // req 就是 express 送出的 req object
            resolve(parentValue, { email, password }, req) {
                return AuthService.signup({ email, password, req })
            },
        },
        logout: {
            type: UserType,
            resolve(parentValue, args, req) {
                const { user } = req.user
                req.logout()
                return user
            },
        },
    },
})

module.exports = mutation
