const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;

//// TYPES
const UserType = require('../types/userType');
const MaterialListType = require('../types/materialListType')
const MaterialType = require('../types/materialType')

//// DATA MODELS
const User = require('../models/user')
const Material = require('../models/materials')

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
    allSlabs: {
      type: new GraphQLList(MaterialType),
      args: { 
        id: { type: new GraphQLNonNull(GraphQLID) },
        token: { type: GraphQLString }
      },
      async resolve(parentValue, { id, token }, context ) {  
        
        return await Material.find({})
        
      }
    }
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
