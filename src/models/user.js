const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('Users', {
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw Error('Email is invalid!')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value<0) {
                throw Error('age can not be negative!')
            }
        }         
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw Error('password can\'t contain "password" case insensitively')
            }
        }

    }
})

module.exports = User