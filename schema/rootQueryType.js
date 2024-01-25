const jwtMethod = require('jsonwebtoken')
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLError } = graphql;

//// TYPES
const UserType      = require('../types/userType');
const MaterialType  = require('../types/materialType')
const ColorType     = require('../types/colorType')
const SupplierType  = require('../types/supplierType')
const LocationType  = require('../types/locationType')

//// DATA MODELS
const User          = require('../models/user')
const Material      = require('../models/materials')
const Color         = require('../models/colors');
const Supplier      = require('../models/suppliers');
const Location      = require('../models/locations')

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
        
        try {

          const response = jwtMethod.verify(token, process.env.JWT_SECRET_LOGIN)
          console.log(response)
          return await User.findById(id)
          
          
        } catch (error) {
          
          console.error(error);
          throw new GraphQLError(error.message, {
            extensions: {
              code: 'INTERNAL_SERVER_ERROR',
            },
          });
          
        }
        
      }
    },
    allMaterials: {
      type: new GraphQLList(MaterialType),
      args: { 
        id: { type: new GraphQLNonNull(GraphQLID) },
        token: { type: GraphQLString }
      },
      async resolve(parentValue, { id, token }, context ) {  
        
        return await Material.find({})
        
      }
    },
    allColors: {
      type: new GraphQLList(ColorType),
      args: { 
        id: { type: new GraphQLNonNull(GraphQLID) },
        token: { type: GraphQLString }
      },
      async resolve(parentValue, { id, token }, context ) {  
        
        return await Color.find({})
        
      }
    },
    allSuppliers: {
      type: new GraphQLList(SupplierType),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        token: { type: GraphQLString }
      },
      async resolve(parentValue, { id, token }, context ) {  
        
        return await Supplier.find({})
        
      }
    },
    allLocations: {
      type: new GraphQLList(LocationType),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        token: { type: GraphQLString }
      },
      async resolve(parentValue, { id, token }, context ) {  
        
        return await Location.find({})
        
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
