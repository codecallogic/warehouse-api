const jwtMethod = require('jsonwebtoken')
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLError } = graphql;

//// TYPES
const UserType                = require('../types/userType');
const MaterialType            = require('../types/materialType')
const ColorType               = require('../types/colorType')
const SupplierType            = require('../types/supplierType')
const LocationType            = require('../types/locationType')
const SlabType                = require('../types/slabType')
const BrandType               = require('../types/brandType')
const CategoryType            = require('../types/brandType')
const ModelType               = require('../types/modelType')
const ProductType             = require('../types/productType')

//// DATA MODELS
const User                    = require('../models/user')
const Material                = require('../models/materials')
const Color                   = require('../models/colors')
const Supplier                = require('../models/suppliers')
const Location                = require('../models/locations')
const Slab                    = require('../models/slabs')
const Brand                   = require('../models/brand')
const Category                = require('../models/category')
const Model                   = require('../models/model')
const Product                 = require('../models/products')

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
    },
    allSlabs: {
      type: new GraphQLList(SlabType),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        token: { type: GraphQLString }
      },
      async resolve(parentValue, { id, token }, context ) {  
        
        return await Slab.find({}).populate(['material', 'color', 'supplier', 'location'])
        
      }
    },
    allBrands: {
      type: new GraphQLList(BrandType),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        token: { type: GraphQLString }
      },
      async resolve(parentValue, { id, token }, context ) {  
        
        return await Brand.find({})
        
      }
    },
    allCategories: {
      type: new GraphQLList(CategoryType),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        token: { type: GraphQLString }
      },
      async resolve(parentValue, { id, token }, context ) {  
        
        return await Category.find({})
        
      }
    },
    allModels: {
      type: new GraphQLList(ModelType),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        token: { type: GraphQLString }
      },
      async resolve(parentValue, { id, token }, context ) {  
        
        return await Model.find({})
        
      }
    },
    allProducts: {
      type: new GraphQLList(ProductType),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        token: { type: GraphQLString }
      },
      async resolve(parentValue, { id, token }, context ) {  
        
        return await Product.find({}).populate(['brand', 'model', 'category', 'color', 'location'])
        
      }
    }
  })
});

module.exports = RootQuery;
