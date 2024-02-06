const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

//// TYPES
const MaterialType          = require('./materialType')
const ColorType             = require('./colorType') 
const SupplierType          = require('./supplierType')
const LocationType          = require('./locationType')
const ImageType             = require('./imageType')

const SlabType = new GraphQLObjectType({
  name:  'SlabType',
  fields: () => ({
    id: { type: GraphQLID },
    material: { type: new GraphQLList(MaterialType)},
    color: { type: new GraphQLList(ColorType) },
    supplier: { type: new GraphQLList(SupplierType) },
    location: { type: new GraphQLList(LocationType) },
    grade: { type: GraphQLString },
    finish: { type: GraphQLString },
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
    deliveryDate: { type: GraphQLString },
    qrCode: { type: GraphQLString },
    images: { type: new GraphQLList(ImageType)}
  })
});

module.exports = SlabType;
