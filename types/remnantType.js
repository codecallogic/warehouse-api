const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

//// TYPES

const MaterialType          = require('./materialType')
const ColorType             = require('./colorType') 
const ImageType             = require('./imageType')

const RemnantType = new GraphQLObjectType({
  name:  'RemnantType',
  fields: () => ({
    id: { type: GraphQLID },
    material: { type: new GraphQLList(MaterialType)},
    color: { type: new GraphQLList(ColorType) },
    name: { type: GraphQLString },
    shape: { type: GraphQLString },
    l1: { type: GraphQLString },
    w1: { type: GraphQLString },
    l2: { type: GraphQLString },
    w2: { type: GraphQLString },
    notes: { type: GraphQLString },
    lot: { type: GraphQLString },
    bundle: { type: GraphQLString },
    supplierRef: { type: GraphQLString },
    bin: { type: GraphQLString },
    qrCode: { type: GraphQLString },
    images: { type: new GraphQLList(ImageType)}
  })
});

module.exports = RemnantType;
