const graphql = require('graphql');
const { GraphQLInputObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList  } = graphql;

const FinishInputType = new GraphQLInputObjectType({
  name:  'FinishInputType',
  fields: () => ({
    name: { type: GraphQLString }
  })
});

module.exports = FinishInputType
