const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const SupplierType = new GraphQLObjectType({
  name:  'SupplierType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
    address: { type: GraphQLString },
    tax_id: { type: GraphQLString },
    notes: { type: GraphQLString },
    contact_name: { type: GraphQLString },
    contact_phone: { type: GraphQLString },
    contact_email: { type: GraphQLString },
    bank: { type: GraphQLString },
    account: { type: GraphQLString },
    agency: { type: GraphQLString },
    bank_note: { type: GraphQLString }
  })
});

module.exports = SupplierType;
