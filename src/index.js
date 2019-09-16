const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// app.use((req, res, next) => {
//     res.status(503).send('The server is in maintenance')
// })

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

//const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const myFunction = async() => {
    // const password = '1234&%$!'
    // const encryptedPassword = await bcrypt.hash(password, 8)

    // console.log('password', password)
    // console.log('encryptedPassword', encryptedPassword)

    // const isMatch = await bcrypt.compare('2234&%$!', encryptedPassword)
    // console.log('isMatch', isMatch)
    const token = jwt.sign({_id: 'abc123'}, 'thisismynewcourse', {expiresIn: '1s'})
    console.log(token)

    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data)
}

//myFunction()

const bcrypt = require('bcryptjs')

const myFunction1 = async() => {
    const password = '1234&%$!'
    var encryptedPassword = await bcrypt.hash(password, 8)

    console.log('password', password)
    console.log('encryptedPassword', encryptedPassword)

    encryptedPassword = await bcrypt.hash(password, 8)
    console.log('encryptedPassword1', encryptedPassword)
    // const isMatch = await bcrypt.compare('2234&%$!', encryptedPassword)
    // console.log('isMatch', isMatch)

}

myFunction1()

// const password = '1234&%$!'
// var encryptedPassword
// bcrypt.hash(password, 8).then((result) => {
//     encryptedPassword = result
//     console.log('password', password)
//     console.log('encryptedPassword : 111', encryptedPassword)
// }).catch((e) => { console.log('Error', e) })

const pet = {
    "name": "Pig"
}

pet.toJSON = function() {
    console.log('this', this)
    return this
}

//console.log(JSON.stringify(pet))
console.log(JSON.stringify(pet))

const Task = require('./models/tasks')
const User = require('./models/user')

// const aFunction = async() => {
//     // const task = await Task.findById('5d6be8ead848cf6d1859b52e')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('5d6be7b837bde85e887ba90f')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
//     console.log(user)
// }

//aFunction()