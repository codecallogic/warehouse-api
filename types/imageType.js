const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const ImageType = new GraphQLObjectType({
  name:  'ImageType',
  fields: () => ({
    url: { type: GraphQLString }
  })
});

module.exports = ImageType
