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
  taxID: {
    type: String,
    default: '',
  },
  note: {
    type: String,
    default: '',
  },
  contactName: {
    type: String,
    default: '',
  },
  contactPhone: {
    type: String,
    default: '',
  },
  contactEmail: {
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
  bankNote: {
    type: String,
    default: '',
  }
},
{
    timestamps: true
})

module.exports = mongoose.model('Supplier', Supplier)