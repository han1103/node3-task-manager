const express = require('express')
const Task = require('../models/tasks')
const auth = require('../middleware/auth')

const taskRouter = express.Router()

taskRouter.post('/tasks', auth, async (req, res) => {
    const task = new Task({ ...req.body, owner: req.user._id })
    //const task = { ...req.body, owner: req.user._id}
    console.log('task', task)
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

//GET /tasks?completed=true
//GET /tasks?skip=2&limit=2
//GET /tasks?sort=createdAt:asc
taskRouter.get("/tasks", auth, async (req, res) => {
    try {
        // const tasks = await Task.find({})
        // res.send(tasks)
        var match
        if (req.query.completed) {
            match = { completed: req.query.completed }
        }
        debugger
        const sort = {}
        if (req.query.sort) {
            const sortArr = req.query.sort.split(":")
            if (sortArr.length > 2) {
                return res.status(404).send('sort should be in the format of createdAt:asc')
            }
            sort[sortArr[0]] = 1
            if (sortArr.length == 2) {
                sort[sortArr[0]] = sortArr[1] === 'desc' ? -1 : 1
            }
        }
        console.log('sort', sort)
        await req.user.populate(
            {
                path: 'tasks',
                match,
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort: sort
                    //sort: {description: 1}
                    //sort: {sortedColumn: ascending}
                    //sort: {description: ascending}
                }
            }).execPopulate()
        res.send(req.user.tasks)
    } catch (error) {
        res.status(500).send(error)
    }
    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })
})

taskRouter.get("/tasks/:id", auth, async (req, res) => {
    const id = req.params.id
    try {
        debugger
        const task = await Task.findById(id)
        if (!task) {
            return res.status(404).send()
        }
        if (!task.owner.equals(req.user._id)) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

taskRouter.patch("/tasks/:id", auth, async (req, res) => {
    const allowedUpdateFields = ['completed', 'description']
    const updateKeys = Object.keys(req.body)
    const allowUpdate = updateKeys.every((field) => allowedUpdateFields.includes(field))
    if (!allowUpdate) {
        return res.status(404).send('There are field(s) not allowed to be updated')
    }

    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send('Not finding the task')
        }

        updateKeys.forEach((field) => task[field] = req.body[field])
        task.save()
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

taskRouter.delete("/tasks/:id", auth, async (req, res) => {

    const _id = req.params.id
    try {
        debugger
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send('Not finding the task')
        }

        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

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


module.exports = taskRouter