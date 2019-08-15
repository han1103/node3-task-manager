const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/tasks')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// app.post('/users', (req, res) => {
//     const user = new User(req.body)
//     user.save().then(() => {
//         res.status(201).send(user)
//     }).catch((error) => {
//         //console.log('error', error)
//         res.status(400).send(error)
//     })
// })

app.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        //console.log('error', error)
        res.status(400).send(error)
    }
})

// app.get('/users', (req, res) => {
//     User.find({}).then((users) => {
//         res.send(users)
//     }).catch((error) => {
//         res.status(500).send(error)
//     })
// })

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

// app.get('/users/:id', (req, res) => {
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

app.get('/users/:id', async (req, res) => {
    const _id = req.params["id"]

    try {
        const user = await User.findById(_id);
        if (!user) {
            res.status(404).send()
        }
        else {
            res.send(user)
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
})

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })
})

app.get("/tasks/:id", async (req, res) => {
    const id = req.params.id
    try {
        const task = await Task.findById(id)
        if (!task) {
            res.status(404).send()
        }
        else {
            res.send(task)
        }
    } catch (error) {
        res.status(500).send(error)
    }

    // Task.findById(id).then((task) => {
    //     if (!task) {
    //         res.status(404).send()
    //     }
    //     else {
    //         res.send(task)
    //     }
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})