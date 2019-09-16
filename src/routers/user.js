const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const userRouter = express.Router()

userRouter.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (error) {
        //console.log('error', error)
        res.status(400).send(error)
    }
})

// userRouter.get('/users', (req, res) => {
//     User.find({}).then((users) => {
//         res.send(users)
//     }).catch((error) => {
//         res.status(500).send(error)
//     })
// })

userRouter.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken() 

        res.send({user, token})
    }
    catch (error) {
        console.log('Error2', error)
        res.status(400).send(error)
    }

})

userRouter.get('/users/me', auth, async (req, res) => {    
    res.send(req.user)
})

// userRouter.get('/users/:id', (req, res) => {
//     const _id = req.params["id"]

//     User.findById(_id).then((user) => {
//         if (!user) {
//             res.status(404).send()
//         }
//         else {
//             res.send(user)
//         }
//     }).catch((error) => {
//         res.status(500).send(error)
//     })
// })

userRouter.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((elem) => {
            return elem.token != req.token
        })
        await req.user.save()
        res.send(req.user)
    } catch(e) {
        res.status(500).send()
    }
})

userRouter.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        
        res.send(req.user)
    } catch(e) {
        res.status(500).send()
    }
})

// userRouter.get('/users/:id', auth, async (req, res) => {
//     const _id = req.params["id"]

//     try {
//         const user = await User.findById(_id);
//         if (!user) {
//             res.status(404).send()
//         }
//         else {
//             res.send(user)
//         }
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

userRouter.patch('/users/me', auth, async (req, res) => {
    const allowedUpdateFields = ['age', 'name', 'email', 'password']

    const allowUpdate = Object.keys(req.body).every((key) => allowedUpdateFields.includes(key))
    if (!allowUpdate) {
        return res.status(400).send('Error! containing field not allowed to be updated')
    }

    try {
        //const user = await User.findByIdAndUpdate(req.params.id, req.body,  {new:true, runValidators: true})
        // const user = await User.findById(req.params.id)
        // if (!user) {
        //     return res.send(404).send()
        // }

        Object.keys(req.body).forEach((field) => req.user[field] = req.body[field])
        await req.user.save()
        res.status(201).send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

userRouter.delete('/users/me', auth, async (req, res) => {
    try {
        debugger
        await req.user.remove()

        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = userRouter