// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient

const { MongoClient, ObjectID } = require('mongodb')

// const id = new ObjectID()
// console.log(id)
// console.log(id.id)
// console.log(id.toHexString())
// console.log(id.getTimestamp())

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    db.collection('tasks').deleteOne({
        description: "udemy AWS"
    }).then((result) => {
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
    // db.collection('users').deleteMany({
    //     name: 'Lei'
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
    // db.collection('tasks').updateMany({
    //     completed: true
    // },
    //     {
    //         $set: {
    //             completed: false
    //         }
    //     }).then((result) => {
    //         console.log(result)
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // db.collection('users').updateOne({
    //     _id: ObjectID("5d406ab5057c13658cea3709")
    // }, {
    //         $inc: {
    //             age:1
    //         }
    //     }).then((result) => {
    //         console.log(result)
    //     }).catch((error) => {
    //         console.log(error)
    //     })

    // db.collection('tasks').findOne({ _id: ObjectID("5d407b68e103bb09f8665c95") },
    //     (error, result) => {
    //         console.log(result)
    //     })

    // db.collection('tasks').find(
    //     { completed: false }
    // ).toArray((error, result) => {
    //     console.log(result)
    // })


    // db.collection('users').find({age: 48}).toArray((error, result) => {
    //     console.log(result)
    // })
    // db.collection('users').find({age: 48}).count((error, count) => {
    //     console.log(count)
    // })
    // db.collection('users').findOne(
    //     {
    //         _id : ObjectID("5d3f73baa13cdf23f470962a")
    //     }, (error, result) => {
    //         if (error) {
    //             console.log('Unable to fetch')
    //         }

    //         console.log(result)
    //     }
    // )
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'John',
    //     age: 55
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Liwen',
    //         age: 47
    //     },
    //     {
    //         name: 'Jerry',
    //         age: 18
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert users')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'udemy AWS',
    //         completed: true
    //     },
    //     {
    //         description: 'Udemy node.js',
    //         completed: false
    //     },
    //     {
    //         description: 'Chaos test investigation',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert tasks')
    //     }

    //     console.log(result.ops)
    // })
})