const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Supplier = new Schema(
{
  name: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  tax_id: {
    type: String,
    default: '',
  },
  note: {
    type: String,
    default: '',
  },
  contact_name: {
    type: String,
    default: '',
  },
  contact_phone: {
    type: String,
    default: '',
  },
  contact_email: {
    type: String,
    default: '',
  },
  bank: {
    type: String,
    default: '',
  },
  account: {
    type: String,
    default: '',
  },
  agency: {
    type: String,
    default: '',
  },
  bank_note: {
    type: String,
    default: '',
  }
},
{
    timestamps: true
})

module.exports = mongoose.model('Supplier', Supplier)