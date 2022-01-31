

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schemas = require('./schemas')
const cors = require('cors')

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
  schema: schemas,
  rootValue: root,
  graphiql: true
}))
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));