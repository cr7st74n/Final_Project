const { User, Expenses } = require('../models');
const {signToken} = require('../auth');
const { ApolloError } = require('apollo-server-express');

const resolvers = {
    Query: {

    },

    Mutation: {
        async addUser(_, { email, password }, context) {
        try {
            const user = await User.create({email, password})
    
            const token = signToken(user);
            return {user, token}
        } catch (err) {
            throw new ApolloError(err)
        }
        },
        async addExpense(_, { }, context) {
            console.log('test');
        },
        async loginUser(_, { email, password }, context) {
            const user = await User.findOne({email})

            if (!user) throw new ApolloError('No user found with that email')

            if (!user.validatePass(password)) throw new ApolloError('Password is invalid')

            const token = signToken(user)
            return { user, token }
        }
    }}