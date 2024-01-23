const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Slabs = new Schema(
{
  material: [{
    type: Schema.Types.ObjectId, ref: 'Material'
  }],
  color:[{
    type: Schema.Types.ObjectId, ref: 'Color'
  }],
  supplier:[{
    type: Schema.Types.ObjectId, ref: 'Supplier'
  }],
  location:[{
    type: Schema.Types.ObjectId, ref: 'Location'
  }],
  grade: {
    type: String,
    default: '',
  },
  finish: {
    type: String,
    default: '',
  },
  quantity: {
    type: String,
    default: '',
  }, 
  size_1: {
    type: String,
    default: '',
  },
  size_2: {
    type: String,
    default: '',
  },
  thickness: {
    type: String,
    default: '',
  },
  price_slab: {
    type: String,
    default: '',
  },
  price_sqft: {
    type: String,
    default: '',
  },
  block: {
    type: String,
    default: '',
  },
  ordered_status: {
    type: String,
    default: '',
  },
  received_status: {
    type: String,
    default: '',
  },
  delivered_status: {
    type: String,
    default: '',
  },
  lot_number: {
    type: String,
    default: '',
  },
  delivery_date: {
    type: String,
    default: '',
  },
  qr_code: {
    type: String,
    default: '',
  },
  images: {
    type: Array,
  }
},
{
    timestamps: true
})

module.exports = mongoose.model('Slabs', Slabs)