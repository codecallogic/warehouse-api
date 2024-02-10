const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Color = new Schema(
{
  name: {
    type: String,
    required: true,
  }
},
{
    timestamps: true
})

Color.statics.createColor = async function( name ){

  let object = new Object({
    name: name
  })

  for(let key in object){ if(!object[key]) delete object[key]}

  try {

  const color = await new this(object).save()
  
  return { message: "Color was created"}
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}


Color.statics.updateColor = async function( id, name ){
  
  let object = new Object({
    name: name
  })

  try {

  const color = await this.findByIdAndUpdate(id, object, { new: true })
  
  return { message: "Color was updated"}
  
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Color.statics.deleteColor = async function( id ){

  try {

    const deleteColor = await this.findByIdAndDelete(id)
    
    return { message: 'Color deleted'}
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
  
}

module.exports = mongoose.model('Color', Color)