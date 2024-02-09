const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

//// TYPES
const BrandType             = require('./brandType')
const ModelType             = require('./modelType')
const CategoryType          = require('./categoryType')
const ColorType             = require('./colorType') 
const LocationType          = require('./locationType')
const ImageType             = require('./imageType')

const ProductType = new GraphQLObjectType({
  name:  'ProductType',
  fields: () => ({
    id: { type: GraphQLID },
    brand: { type: new GraphQLList(BrandType)},
    model: { type: new GraphQLList(ModelType)},
    category: { type: new GraphQLList(CategoryType)},
    color: { type: new GraphQLList(ColorType) },
    location: { type: new GraphQLList(LocationType) },
    quantity: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLString },
    qrCode: { type: GraphQLString },
    images: { type: new GraphQLList(ImageType)}
  })
});

module.exports = ProductType;
