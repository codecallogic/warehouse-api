const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
const UserType = require('../types/userType');

//// DATA MODELS
const User = require('../models/user')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: UserType,
      args: { 
        id: { type: new GraphQLNonNull(GraphQLID) },
        token: { type: GraphQLString } 
      },
      async resolve(parentValue, { id, token }, context ) {  
        return await User.findById(id)
      }
    },
    // users: {
    //   type: new GraphQLList(UserType),
    //   args: {
    //     id: { type: new GraphQLNonNull(GraphQLID) }
    //   },
    //   async resolve(parentValue, { id }, context ) {
    //     return await User.find({}).populate([{ path: 'years', populate: { path: 'teams', populate: { path: 'allocations', model: 'Allocation' } }}, { path: 'users' }]).then( item => item )
    //   }
    // }
  })
});

module.exports = RootQuery;
