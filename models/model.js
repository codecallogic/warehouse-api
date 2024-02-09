const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Models = new Schema(
{
  name: {
    type: String,
    required: true,
  }
},
{
    timestamps: true
})

module.exports = mongoose.model('Model', Models)