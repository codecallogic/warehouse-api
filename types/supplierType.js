const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const SupplierType = new GraphQLObjectType({
  name:  'SupplierType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
    address: { type: GraphQLString },
    taxID: { type: GraphQLString },
    notes: { type: GraphQLString },
    contactName: { type: GraphQLString },
    contactPhone: { type: GraphQLString },
    contactEmail: { type: GraphQLString },
    bank: { type: GraphQLString },
    account: { type: GraphQLString },
    agency: { type: GraphQLString },
    bankNote: { type: GraphQLString }
  })
});

module.exports = SupplierType;
