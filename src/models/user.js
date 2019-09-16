const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            unique: true,
            require: true,
            lowercase: true,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw Error('Email is invalid!')
                }
            }
        },
        age: {
            type: Number,
            default: 0,
            validate(value) {
                if (value < 0) {
                    throw Error('age can not be negative!')
                }
            }
        },
        tokens: [
            {
                token: {
                    type: String,
                    require: true
                }
            }
        ],
        password: {
            type: String,
            required: true,
            minlength: 7,
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw Error('password can\'t contain "password" case insensitively')
                }
            }
        }
    },
    { timestamps: true }
)

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const userObject = this.toObject()
    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id }, 'thisismynewcourse')
    user.tokens = user.tokens.concat({ token })

    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    try {
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error('Can not login as not finding the user')
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new Error("Can not login as wrong password")
        }
        return user
    }
    catch (error) {
        console.log('Error1', error)
        throw error
    }
}

userSchema.pre('remove', async function (next) {
    const user = this

    await user.populate('tasks').execPopulate()
    user.tasks.forEach(async (task) => {
        await task.remove()
    })

    next()
})

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
        //console.log('password', user.password)
    }

    next()
})

// userSchema.pre('update', async function(next) {
//     const user = this
//     console.log('Before updaing', user)

//     next()
// })

const User = mongoose.model('User', userSchema)


module.exports = User