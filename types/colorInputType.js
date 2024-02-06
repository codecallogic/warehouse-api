const graphql = require('graphql');
const { GraphQLInputObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList  } = graphql;

const ColorInputType = new GraphQLInputObjectType({
  name:  'ColorInputType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

module.exports = ColorInputType
