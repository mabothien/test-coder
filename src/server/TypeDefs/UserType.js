const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString } = graphql
  
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Single user',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString)},
    title: { type: GraphQLString},
    firstName: { type: GraphQLString},
    lastName: { type: GraphQLString},
    picture: { type: GraphQLString},
  })
})

module.exports = UserType