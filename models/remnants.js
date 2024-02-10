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

const Remnant = new Schema(
{
  material: [{
    type: Schema.Types.ObjectId, ref: 'Material'
  }],
  color:[{
    type: Schema.Types.ObjectId, ref: 'Color'
  }],
  name: {
    type: String,
    default: '',
  },
  shape: {
    type: String, 
    default: '',
  },
  l1: {
    type: String,
    default: '',
  },
  w1: {
    type: String,
    default: '',
  },
  l2: {
    type: String,
    default: '',
  },
  w2: {
    type: String,
    default: '',
  },
  notes: {
    type: String,
    default: '',
  },
  lot: {
    type: String,
    default: '',
  },
  bundle: {
    type: String,
    default: '',
  },
  supplierRef: {
    type: String,
    default: '',
  },
  bin: {
    type: String,
    default: '',
  },
  qrCode: {
    type: String,
    default: '',
  },
  images: {
    type: Array
  }
},
{
    timestamps: true
})

Remnant.statics.createRemnant = async function( material, color, name, shape, l1, w1, l2, w2, notes, lot, bundle, supplierRef, bin, qrCode, images ){
  
  let object = new Object({
    material: material,
    color: color,
    name: name,
    shape: shape,
    l1: l1,
    w1: w1,
    l2: l2,
    w2: w2,
    notes: notes,
    lot: lot, 
    bundle: bundle,
    supplierRef: supplierRef,
    bin: bin,
    qrCode: qrCode,
    images: images
  })

  for(let key in object){ if(!object[key]) delete object[key]}

  try {

  const remnant = await new this(object).save()
  
  return { message: "Remnant was created"}
  
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Remnant.statics.updateRemnant = async function( id, material, color, name, shape, l1, w1, l2, w2, notes, lot, bundle, supplierRef, bin, qrCode, images ){
  
  let object = new Object({
    material: material,
    color: color,
    name: name,
    shape: shape,
    l1: l1,
    w1: w1,
    l2: l2,
    w2: w2,
    notes: notes,
    lot: lot, 
    bundle: bundle,
    supplierRef: supplierRef,
    bin: bin,
    qrCode: qrCode,
    images: images
  })

  try {

  const remnant = await this.findByIdAndUpdate(id, object, { new: true })
  
  return { message: "Remnant was updated"}
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

Remnant.statics.deleteRemnantImage = async function(id, images, itemToDelete){
  
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

    let updateRemnant      = await this.findByIdAndUpdate(id, { images: newArray }, { new: true })
    
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

Remnant.statics.deleteRemnant = async function( id ){

  try {
    
    const remnant = await this.findById(id)

    if(remnant.images.length > 0){
      const updatedPromises = await Promise.all(remnant.images.map(async (itemToDelete, idx) => {
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

    const deleteRemnant = await this.findByIdAndDelete(id)
    
    return { message: 'Remnant deleted'}
    
  } catch (error) {
    console.log(error)
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
  
}

module.exports = mongoose.model('Remnant', Remnant)