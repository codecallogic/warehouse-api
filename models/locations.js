const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Location = new Schema(
{
  name: {
    type: String,
    required: true,
  }
},
{
    timestamps: true
})

Location.statics.createLocation = async function( name ){

  let object = new Object({
    name: name
  })

  for(let key in object){ if(!object[key]) delete object[key]}

  try {

  const location = await new this(object).save()
  
  return { message: "Location was created"}
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Location.statics.updateLocation = async function( id, name ){
  
  let object = new Object({
    name: name
  })

  try {

  const location = await this.findByIdAndUpdate(id, object, { new: true })
  
  return { message: "Location was updated"}
  
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Location.statics.deleteLocation = async function( id ){

  try {

    const deleteLocation = await this.findByIdAndDelete(id)
    
    return { message: 'Location deleted'}
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
  
}

module.exports = mongoose.model('Location', Location)