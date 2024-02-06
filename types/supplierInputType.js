const graphql = require('graphql');
const { GraphQLInputObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList  } = graphql;

const SupplierInputType = new GraphQLInputObjectType({
  name:  'SupplierInputType',
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

module.exports = SupplierInputType
