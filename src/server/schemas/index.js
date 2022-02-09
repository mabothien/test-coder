const graphql = require('graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} = graphql
const UserType = require('../TypeDefs/UserType')
const Users = require('../model/users')
const Matches = require('../model/matches')
// Define query type
const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  fields: () => ({
    randomUser: {
      type: UserType,
      description: 'A Single User',
      resolve: async () => {
        return await Users.findOne({ isPass: false })
      }
    },
    likeUsers: {
      type: new GraphQLList(UserType),
      description: 'list of like user',
      resolve: async () => {
        return await Users.find({ isMatch: true })
      }
    },
    matchesUser: {
      type: new GraphQLList(UserType),
      description: 'list of matches user',
      resolve: async () => {
        return await Matches.find({})
      }
    }
  })
})

// Define Mutation type
const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root mutation',
  fields: () => ({
    likeUser: {
      type: UserType,
      description: 'Like user',
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args) => {
        return await Users.findOneAndUpdate({ id: args.id }, { isMatch: true, isPass: true }, {
          new: true, upsert: false
        })
      }
    },
    passUser: {
      type: UserType,
      description: 'pass user',
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args) => {
        return await Users.findOneAndUpdate({ id: args.id }, { isPass: true }, {
          new: true, upsert: false
        })
      }
    }
  })
})
module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})
