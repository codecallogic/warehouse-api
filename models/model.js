const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Model = new Schema(
{
  name: {
    type: String,
    required: true,
  }
},
{
    timestamps: true
})

Model.statics.createModel = async function( name ){

  let object = new Object({
    name: name
  })

  for(let key in object){ if(!object[key]) delete object[key]}

  try {

  const model = await new this(object).save()
  
  return { message: "Model was created" }
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Model.statics.updateModel = async function( id, name ){
  
  let object = new Object({
    name: name
  })

  try {

  const model = await this.findByIdAndUpdate(id, object, { new: true })
  
  return { message: "Model was updated"}
  
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Model.statics.deleteModel = async function( id ){
  
  try {

    const deleteModel = await this.findByIdAndDelete(id)
    
    return { message: 'Model deleted'}
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
  
}

module.exports = mongoose.model('Model', Model)