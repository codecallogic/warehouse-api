///// AWS STORAGE
require('dotenv').config()
const aws = require('aws-sdk')
aws.config.update({
  accessKeyId: process.env.IAM_ACCCESS_KEY,
  secretAccessKey: process.env.IAM_SECRET_KEY,
  region: process.env.REGION  
});

const S3 = new aws.S3();

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { GraphQLError } = require('graphql')

const Product = new Schema(
{
  brand: [{
    type: Schema.Types.ObjectId, ref: 'Brand'
  }],
  model: [{
    type: Schema.Types.ObjectId, ref: 'Model'
  }],
  category: [{
    type: Schema.Types.ObjectId, ref: 'Category'
  }],
  color: [{
    type: Schema.Types.ObjectId, ref: 'Color'
  }],
  location: [{
    type: Schema.Types.ObjectId, ref: 'Location'
  }],
  quantity: {
    type: String,
    default: '',
  },
  qrCode: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  price: {
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

Product.statics.createProduct = async function( brand, model, category, color, location, quantity, description, price, qrCode, images ){
  
  let object = new Object({
    brand: brand,
    model: model,
    category: category,
    color: color,
    location: location,
    quantity: quantity,
    description: description,
    price: price,
    qrCode: qrCode,
    images: images
  })

  for(let key in object){ if(!object[key]) delete object[key]}

  try {

  const product = await new this(object).save()
  
  return { message: "Product was created"}
  
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Product.statics.updateProduct = async function( id, brand, model, category, color, location, quantity, description, price, qrCode, images ){
  
  let object = new Object({
    brand: brand,
    model: model,
    category: category,
    color: color,
    location: location,
    quantity: quantity,
    description: description,
    price: price,
    qrCode: qrCode,
    images: images
  })

  try {

  const product = await this.findByIdAndUpdate(id, object, { new: true })
  
  return { message: "Product was updated"}
  
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Product.statics.deleteProductImage = async function(id, images, itemToDelete){
  
  try {

    let location = itemToDelete.split("/next-s3-uploads")[1];
    location = 'next-s3-uploads' + location;

    let params = {
      Bucket: 'fabworkflow-inventory', 
      Key: location
    }
    
    S3.deleteObject(params, (err, data) => {
      console.log(err)
      if (err) return { message: err }
    });

    let newArray           = images.filter((item) => item.url !== itemToDelete)

    let updateProduct      = await this.findByIdAndUpdate(id, { images: newArray }, { new: true })
    
    return { message: 'Image deleted'}
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
  
}

Product.statics.deleteProduct = async function( id ){

  try {
    
    const product = await this.findById(id)

    if(product.images.length > 0){
      const updatedPromises = await Promise.all(product.images.map(async (itemToDelete, idx) => {
        let location = itemToDelete.url.split("/next-s3-uploads")[1];
        location = 'next-s3-uploads' + location;

        let params = {
          Bucket: 'fabworkflow-inventory', 
          Key: location
        }
        
        S3.deleteObject(params, (err, data) => {
          console.log(err)
          if (err) return { message: err }
        });
      }))   
    }

    const deleteProduct = await this.findByIdAndDelete(id)
    
    return { message: 'Product deleted'}
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
  
}

module.exports = mongoose.model('Product', Product)