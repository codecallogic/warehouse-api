const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const MATERIAL_TYPE = require('./materialType')

const MaterialListType = new GraphQLObjectType({
  name:  'MaterialListType',
  fields: () => ({
    materials: { type: new GraphQLList(MATERIAL_TYPE) }
  })
});

module.exports = MaterialListType;
