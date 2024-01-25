const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const LocationType = new GraphQLObjectType({
  name:  'LocationType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

module.exports = LocationType;
