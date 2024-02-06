const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const MessageType = new GraphQLObjectType({
  name:  'MessageType',
  fields: () => ({
    message: { type: GraphQLString }
  })
});

module.exports = MessageType
