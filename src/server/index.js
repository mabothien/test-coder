

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const graphql = require("graphql");
const {
  GraphQLSchema, 
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt, 
  GraphQLString} = graphql
const { faker } = require('@faker-js/faker');
const cors = require('cors')

// Dummy data
const likeUserData = [
  {
    id: 1,
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    picture: () => faker.image.avatar()    
  },
  {
    id: 2,
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    picture: () => faker.image.avatar()    
  },
  {
    id:  3,
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    picture: () => faker.image.avatar()    
  },
  {
    id:  4,
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    picture: () => faker.image.avatar()    
  },
  {
    id:  5,
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    picture: () => faker.image.avatar()    
  },
  {
    id:  6,
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    picture: () => faker.image.avatar()    
  }
]

const matchesUserData = [
  {
    id: 1,
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    picture: () => faker.image.avatar()    
  },
  {
    id: 2,
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    picture: () => faker.image.avatar()    
  },
  {
    id:  3,
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    picture: () => faker.image.avatar()    
  },
  {
    id:  4,
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    picture: () => faker.image.avatar()    
  },
  {
    id:  5,
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    picture: () => faker.image.avatar()    
  },
  {
    id:  6,
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    picture: () => faker.image.avatar()    
  }
]

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Single user',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt)},
    firstName: { type: GraphQLString},
    lastName: { type: GraphQLString},
    picture: { type: GraphQLString},
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  fields: () => ({
    user: {
      type: UserType,
      description: 'A Single User',
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve: (parent, args) => likeUserData.find(user => user.id === args.id)
    },
    likeUsers: {
      type: new GraphQLList(UserType),
      description: 'list of like user',
      resolve: () => likeUserData
    },
    matchesUser: {
      type: new GraphQLList(UserType),
      description: 'list of matches user',
      resolve: () => matchesUserData
    },
  })
})
const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root mutation',
  fields: () =>({
    likeUser: {
      type: UserType,
      description: 'Like user',
      args: {
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        picture: {type: GraphQLString},
      },
      resolve: (parent, args) => {
        const user = {
          id: likeUserData.length + 1, 
          firstName: args.firstName,
          lastName: args.lastName,
          picture: args.picture
        }
        likeUserData.push(user)
        return user
      }
    },
  })
})
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

const getUser = function(args) {
  const id = args.id;
  return likeUserData.filter(user => {
    return user.id === id
  })[0];
}

const getLikeUsers = function(args) {
  return likeUserData
}

const getMatchesUsers = function(args) {
  return likeUserData
}

const root = {
  user: getUser,
  likeUsers: getLikeUsers,
  matchesUsers: getMatchesUsers
};

const app = express()
app.use(cors())
app.use('/user', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));