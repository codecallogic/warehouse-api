const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Brand = new Schema(
{
  name: {
    type: String,
    required: true,
  }
},
{
    timestamps: true
})

Brand.statics.createBrand = async function( name ){

  let object = new Object({
    name: name
  })

  for(let key in object){ if(!object[key]) delete object[key]}

  try {

  const brand = await new this(object).save()
  
  return { message: "Brand was created" }
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Brand.statics.updateBrand = async function( id, name ){
  
  let object = new Object({
    name: name
  })

  try {

  const brand = await this.findByIdAndUpdate(id, object, { new: true })
  
  return { message: "Brand was updated"}
  
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Brand.statics.deleteBrand = async function( id ){

  try {

    const deleteBrand = await this.findByIdAndDelete(id)
    
    return { message: 'Brand deleted'}
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
  
}

module.exports = mongoose.model('Brand', Brand)