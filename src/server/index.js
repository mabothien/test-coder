

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
const discoverList = [
{
    id: Math.floor(Math.random()*Math.random()*100),
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    picture: () => faker.image.avatar()    
  },
  {
    id: Math.floor(Math.random()*Math.random()*100),
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    picture: () => faker.image.avatar()    
  },
  {
    id: Math.floor(Math.random()*Math.random()*100),
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    picture: () => faker.image.avatar()    
  },
  {
    id: Math.floor(Math.random()*Math.random()*100),
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    picture: () => faker.image.avatar()    
  },
  {
    id: Math.floor(Math.random()*Math.random()*100),
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    picture: () => faker.image.avatar()    
  },
  {
    id: Math.floor(Math.random()*Math.random()*100),
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    picture: () => faker.image.avatar()    
  }
]

const likeUserData = [
  {
    id: 1,
    firstName: 'Junior 1',
    lastName: 'test 1',
    picture: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/138.jpg'
  },
  {
    id: 2,
    firstName: 'Junior 2',
    lastName: 'test 2',
    picture: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/828.jpg"
  },
  {
    id:  3,
    firstName: 'Junior 3',
    lastName: 'test 3',
    picture: "https://randomuser.me/api/portraits/women/58.jpg"
  },
  {
    id:  4,
    firstName: 'Junior 4',
    lastName: 'test 4',
    picture: "https://randomuser.me/api/portraits/med/women/28.jpg"
  },
  {
    id:  5,
    firstName: 'Junior 5',
    lastName: 'test 5',
    picture: "https://randomuser.me/api/portraits/med/women/27.jpg"
  },
  {
    id:  6,
    firstName: 'Junior 6',
    lastName: 'test 6',
    picture: "https://randomuser.me/api/portraits/med/women/26.jpg"
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
      resolve(obj) {
        const getUser = discoverList[Math.floor(Math.random()*discoverList.length)];
        return getUser
      }
    },
    discoverList: {
      type: new GraphQLList(UserType),
      description: 'list of discover',
      resolve: () => discoverList
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
        id: { type: new GraphQLNonNull(GraphQLInt)},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        picture: {type: GraphQLString},
      },
      resolve: (parent, args) => {
        const user = {
          id: args.id,
          firstName: args.firstName,
          lastName: args.lastName,
          picture: args.picture 
        }
        const item = discoverList.find(el => el.id === args.id);
        const indexItem = discoverList.indexOf(item)
        discoverList.splice(indexItem, 1)
        likeUserData.push(user)
        return user
      }
    },
    passUser: {
      type: UserType,
      description: 'pass user',
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt)},
      },
      resolve: (parent, args) => {
        const user = {
          id: args.id, 
        }
        const item = discoverList.find(el => el.id === args.id);
        const indexItem = discoverList.indexOf(item)
        discoverList.splice(indexItem, 1)
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