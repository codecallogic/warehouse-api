const graphql = require('graphql');
const { GraphQLInputObjectType, GraphQLString } = graphql;

const ImageInputType = new GraphQLInputObjectType({
  name:  'ImageInputType',
  fields: () => ({
    url: { type: GraphQLString }
  })
});

module.exports = ImageInputType
