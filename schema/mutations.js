const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } = graphql;

//// TYPES
const UserType                = require('../types/userType')
const SlabType                = require('../types/slabType')
const MaterialInputType       = require('../types/materiaInputType')
const ColorInputType          = require('../types/colorInputType')
const SupplierInputType       = require('../types/supplierInputType')
const GradeInputType          = require('../types/gradeInputType')
const FinishInputType         = require('../types/finishInputType')
const LocationInputType       = require('../types/locationInputType')
const ImageInputType          = require('../types/imageInputType')
const MessageType             = require('../types/messageType')
const BrandInputType          = require('../types/brandInputType')
const ModelInputType          = require('../types/modelInputType')
const CategoryInputType       = require('../types/categoryInputType')

//// DATA MODELS
const User = require('../models/user')
const Slab = require('../models/slabs')
const Product = require('../models/products')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    login: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLString }
      },
      resolve(parentValue, { username, password, role }) {

        return User.login( username, password, role )

      }
    },
    newSlab: {
      type: MessageType,
      args: {
        material: { type: new GraphQLList(MaterialInputType) },
        color: { type: new GraphQLList(ColorInputType) },
        supplier: { type: new GraphQLList(SupplierInputType) },
        grade: { type: new GraphQLList(GradeInputType)},
        finish: { type: new GraphQLList(FinishInputType)},
        location: { type: new GraphQLList(LocationInputType)},
        quantity: { type: GraphQLString },
        sizeOne: { type: GraphQLString },
        sizeTwo: { type: GraphQLString },
        thickness: { type: GraphQLString },
        priceSlab: { type: GraphQLString },
        priceSqft: { type: GraphQLString },
        block: { type: GraphQLString },
        orderedStatus: { type: GraphQLString },
        receivedStatus: { type: GraphQLString },
        deliveredStatus: { type: GraphQLString },
        lotNumber: { type: GraphQLString },
        qrCode: { type: GraphQLString },
        images: { type: new GraphQLList(ImageInputType)}
      },
      resolve(parentValue, { material, color, supplier, grade, finish, location, quantity, sizeOne, sizeTwo, thickness, priceSlab, priceSqft, block, orderedStatus, receivedStatus, deliveredStatus, lotNumber, qrCode, images }){
        
        return Slab.createSlab( material[0] ? material[0].id : '', color[0] ? color[0].id : '', supplier[0] ? supplier[0].id : '', grade[0] ? grade[0].name : '', finish[0] ? finish[0].name : '', location[0] ? location[0].id : '', quantity, sizeOne, sizeTwo, thickness, priceSlab, priceSqft, block, orderedStatus, receivedStatus, deliveredStatus, lotNumber, qrCode, images)
        
      }
    },
    updateSlab: {
      type: MessageType,
      args: {
        id: { type: GraphQLID },
        material: { type: new GraphQLList(MaterialInputType) },
        color: { type: new GraphQLList(ColorInputType) },
        supplier: { type: new GraphQLList(SupplierInputType) },
        grade: { type: new GraphQLList(GradeInputType)},
        finish: { type: new GraphQLList(FinishInputType)},
        location: { type: new GraphQLList(LocationInputType)},
        quantity: { type: GraphQLString },
        sizeOne: { type: GraphQLString },
        sizeTwo: { type: GraphQLString },
        thickness: { type: GraphQLString },
        priceSlab: { type: GraphQLString },
        priceSqft: { type: GraphQLString },
        block: { type: GraphQLString },
        orderedStatus: { type: GraphQLString },
        receivedStatus: { type: GraphQLString },
        deliveredStatus: { type: GraphQLString },
        lotNumber: { type: GraphQLString },
        qrCode: { type: GraphQLString },
        images: { type: new GraphQLList(ImageInputType)}
      },
      resolve(parentValue, { id, material, color, supplier, grade, finish, location, quantity, sizeOne, sizeTwo, thickness, priceSlab, priceSqft, block, orderedStatus, receivedStatus, deliveredStatus, lotNumber, qrCode, images }){
        
        return Slab.updateSlab(id, material[0] ? material[0].id : [], color[0] ? color[0].id : [], supplier[0] ? supplier[0].id : [], grade[0] ? grade[0].name : '', finish[0] ? finish[0].name : '', location[0] ? location[0].id : [], quantity, sizeOne, sizeTwo, thickness, priceSlab, priceSqft, block, orderedStatus, receivedStatus, deliveredStatus, lotNumber, qrCode, images)
        
      }
    },
    deleteSlabImage: {
      type: MessageType,
      args: {
        id: { type: GraphQLID },
        images: { type: new GraphQLList(ImageInputType)},
        url: { type: GraphQLString }
      },
      resolve(parentValue, { id, images, url }){

        return Slab.deleteSlabImage( id, images, url )
        
      }
    },
    deleteSlab: {
      type: MessageType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parentValue, { id }){

        return Slab.deleteSlab( id )
        
      }
    },
    newProduct: {
      type: MessageType,
      args: {
        brand: { type: new GraphQLList(BrandInputType) },
        model: { type: new GraphQLList(ModelInputType)},
        category: { type: new GraphQLList(CategoryInputType)},
        color: { type: new GraphQLList(ColorInputType) },
        location: { type: new GraphQLList(LocationInputType)},
        quantity: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLString },
        qrCode: { type: GraphQLString },
        images: { type: new GraphQLList(ImageInputType)}
      },
      resolve(parentValue, { brand, model, category, color, location, quantity, description, price, qrCode, images }){
        
        return Product.createProduct( brand[0] ? brand[0].id : '', model[0] ? model[0].id : '', category[0] ? category[0].id : '', color[0] ? color[0].id : '', location[0] ? location[0].id : '', quantity, description, price, qrCode, images)
        
      }
    },
    updateProduct: {
      type: MessageType,
      args: {
        id: { type: GraphQLID },
        brand: { type: new GraphQLList(BrandInputType) },
        model: { type: new GraphQLList(ModelInputType)},
        category: { type: new GraphQLList(CategoryInputType)},
        color: { type: new GraphQLList(ColorInputType) },
        location: { type: new GraphQLList(LocationInputType)},
        quantity: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLString },
        qrCode: { type: GraphQLString },
        images: { type: new GraphQLList(ImageInputType)}
      },
      resolve(parentValue, { id, brand, model, category, color, location, quantity, description, price, qrCode, images }){
        
        return Product.updateProduct( id, brand[0] ? brand[0].id : '', model[0] ? model[0].id : '', category[0] ? category[0].id : '', color[0] ? color[0].id : '', location[0] ? location[0].id : '', quantity, description, price, qrCode, images)
        
      }
    },
    deleteProductImage: {
      type: MessageType,
      args: {
        id: { type: GraphQLID },
        images: { type: new GraphQLList(ImageInputType)},
        url: { type: GraphQLString }
      },
      resolve(parentValue, { id, images, url }){

        return Product.deleteProductImage( id, images, url )
        
      }
    },
    deleteProduct: {
      type: MessageType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parentValue, { id }){

        return Product.deleteProduct( id )
        
      }
    },
  }
});

module.exports = mutation;
