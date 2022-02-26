const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString
} = graphql

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Single user',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLInt },
    picture: { type: GraphQLString },
    isMatch: { type: GraphQLBoolean },
    isPass: { type: GraphQLBoolean }
  })
})

module.exports = UserType
