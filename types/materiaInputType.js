const graphql = require('graphql');
const { GraphQLInputObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList  } = graphql;

const MaterialInputType = new GraphQLInputObjectType({
  name:  'MaterialInputType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});

module.exports = MaterialInputType
