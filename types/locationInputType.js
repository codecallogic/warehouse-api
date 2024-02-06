const graphql = require('graphql');
const { GraphQLInputObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList  } = graphql;

const LocationInputType = new GraphQLInputObjectType({
  name:  'LocationInputType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

module.exports = LocationInputType
