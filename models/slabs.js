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
  sizeOne: {
    type: String,
    default: '',
  },
  sizeTwo: {
    type: String,
    default: '',
  },
  thickness: {
    type: String,
    default: '',
  },
  priceSlab: {
    type: String,
    default: '',
  },
  priceSqft: {
    type: String,
    default: '',
  },
  block: {
    type: String,
    default: '',
  },
  orderedStatus: {
    type: String,
    default: '',
  },
  receivedStatus: {
    type: String,
    default: '',
  },
  deliveredStatus: {
    type: String,
    default: '',
  },
  lotNumber: {
    type: String,
    default: '',
  },
  deliveryDate: {
    type: String,
    default: '',
  },
  qrCode: {
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

Slabs.statics.createSlab = async function(material, color, supplier, grade, finish, location, quantity, sizeOne, sizeTwo, thickness, priceSlab, priceSqft, block, orderedStatus, receivedStatus, deliveredStatus, lotNumber, qrCode, images){
  
  let object = new Object({
    material: material,
    color: color,
    supplier: supplier,
    grade: grade,
    finish: finish,
    location: location,
    quantity: quantity,
    sizeOne: sizeOne,
    sizeTwo: sizeTwo,
    thickness: thickness,
    priceSlab: priceSlab,
    priceSqft: priceSqft,
    block: block,
    orderedStatus: orderedStatus,
    receivedStatus: receivedStatus,
    deliveredStatus: deliveredStatus,
    lotNumber: lotNumber,
    qrCode: qrCode,
    images: images
  })

  for(let key in object){ if(!object[key]) delete object[key]}

  try {

  const slab = await new this(object).save()
  
  return { message: "Slab was created"}
  
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Slabs.statics.updateSlab = async function(id, material, color, supplier, grade, finish, location, quantity, sizeOne, sizeTwo, thickness, priceSlab, priceSqft, block, orderedStatus, receivedStatus, deliveredStatus, lotNumber, qrCode, images){
  
  let object = new Object({
    material: material,
    color: color,
    supplier: supplier,
    grade: grade,
    finish: finish,
    location: location,
    quantity: quantity,
    sizeOne: sizeOne,
    sizeTwo: sizeTwo,
    thickness: thickness,
    priceSlab: priceSlab,
    priceSqft: priceSqft,
    block: block,
    orderedStatus: orderedStatus,
    receivedStatus: receivedStatus,
    deliveredStatus: deliveredStatus,
    lotNumber: lotNumber,
    qrCode: qrCode,
    images: images
  })

  try {

  const slab = await this.findByIdAndUpdate(id, object, { new: true })
  
  return { message: "Slab was updated"}
  
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Slabs.statics.deleteSlabImage = async function(id, images, itemToDelete){
  
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

    let newArray        = images.filter((item) => item.url !== itemToDelete)

    let updateSlab      = await this.findByIdAndUpdate(id, { images: newArray }, { new: true })
    
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

Slabs.statics.deleteSlab = async function( id ){

  try {
    
    const slab = await this.findById(id)

    if(slab.images.length > 0){
      const updatedPromises = await Promise.all(slab.images.map(async (itemToDelete, idx) => {
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

    const deleteSlab = await this.findByIdAndDelete(id)
    
    return { message: 'Slab deleted'}
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
  
}

module.exports = mongoose.model('Slabs', Slabs)