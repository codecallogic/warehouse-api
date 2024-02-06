const graphql = require('graphql');
const { GraphQLInputObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList  } = graphql;

const GradeInputType = new GraphQLInputObjectType({
  name:  'GradeInputType',
  fields: () => ({
    name: { type: GraphQLString }
  })
});

module.exports = GradeInputType
