const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLInt } = graphql;

//// TYPES
const USER_TYPE = require('../types/userType')

//// DATA MODELS
const User = require('../models/user');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    login: {
      type: USER_TYPE,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLString }
      },
      resolve(parentValue, { username, password, role }) {
        
        return User.login( username, password, role )

      }
    }
  }
});

module.exports = mutation;
