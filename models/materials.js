const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Material = new Schema(
{
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  }
},
{
    timestamps: true
})

Material.statics.createMaterial = async function( name, description ){

  let object = new Object({
    name: name,
    description: description
  })

  for(let key in object){ if(!object[key]) delete object[key]}

  try {

  const material = await new this(object).save()
  
  return { message: "Material was created"}
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Material.statics.updateMaterial = async function( id, name, description ){
  
  let object = new Object({
    name: name,
    description: description
  })

  try {

  const material = await this.findByIdAndUpdate(id, object, { new: true })
  
  return { message: "Material was updated"}
  
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Material.statics.deleteMaterial = async function( id ){

  try {

    const deleteMaterial = await this.findByIdAndDelete(id)
    
    return { message: 'Material deleted'}
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
  
}

module.exports = mongoose.model('Material', Material)