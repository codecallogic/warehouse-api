const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Category = new Schema(
{
  name: {
    type: String,
    required: true,
  }
},
{
    timestamps: true
})

Category.statics.createCategory = async function( name ){

  let object = new Object({
    name: name
  })

  for(let key in object){ if(!object[key]) delete object[key]}

  try {

  const category = await new this(object).save()
  
  return { message: "Category was created" }
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Category.statics.updateCategory = async function( id, name ){
  
  let object = new Object({
    name: name
  })

  try {

  const category = await this.findByIdAndUpdate(id, object, { new: true })
  
  return { message: "Category was updated"}
  
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Category.statics.deleteCategory = async function( id ){

  try {

    const deleteCategory = await this.findByIdAndDelete(id)
    
    return { message: 'Category deleted'}
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
  
}

module.exports = mongoose.model('Category', Category)