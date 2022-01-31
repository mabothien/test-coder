const graphql = require("graphql");
const {
  GraphQLSchema, 
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString} = graphql
const UserType = require("../TypeDefs/UserType");

const discoverList = require('../dummyData/discoverUser.json');
const likeUserData = require('../dummyData/mock.json');
const matchesUserData = require('../dummyData/matches.json');

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  fields: () => ({
    user: {
      type: UserType,
      description: 'A Single User',
      resolve(obj) {
        // get random user in list
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
        id: { type: new GraphQLNonNull(GraphQLString)},
        title: {type: GraphQLString},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        picture: {type: GraphQLString},
      },
      resolve: (parent, args) => {
        const user = {
          id: args.id,
          title: args.title,
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
        id: { type: new GraphQLNonNull(GraphQLString)},
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
module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})