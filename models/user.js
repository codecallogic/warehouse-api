const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 6

//// METHODS
const { GraphQLError } = require('graphql')
const jwtMethod = require('jsonwebtoken')

const UserSchema = new Schema(
{
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  urlID: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'admin'
  }
},
{
    timestamps: true
})

UserSchema.pre('save', function(next){
  const user = this;
  if(!user.isModified('password')) return next()
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash){
      if(err) return next(err)
      user.password = hash
      next()
  })
})

UserSchema.methods.comparePassword = function(tryPassword, cb){
  bcrypt.compare(tryPassword, this.password, cb)
}

UserSchema.statics.login = async function( username, password ){

  try {
    const user = await this.findOne({ username: username });

    if (!user) {
      throw new GraphQLError('You are not authorized. Unknown user', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    const isMatch = await new Promise((resolve, reject) => {
      user.comparePassword(password, (err, match) => {
        if (err) {
          reject(err);
        } else {
          resolve(match);
        }
      });
    });

    if (isMatch) {
    
      const token = jwtMethod.sign({ username: user.username, id: user._id, role: user.role }, process.env.JWT_SECRET_LOGIN, {expiresIn: '2hr', algorithm: 'HS256'})
      const { _id, username, role } = user

      let userLoggedIn = new Object()
      userLoggedIn.id                = _id
      userLoggedIn.username          = username
      userLoggedIn.role              = role
      userLoggedIn.token             = token

      return userLoggedIn;
  
    } else {
      throw new GraphQLError('Invalid password', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }
  } catch (error) {
    console.error(error);
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }

}

module.exports = mongoose.model('User', UserSchema)