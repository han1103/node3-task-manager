require('../src/db/mongoose')

const Task = require('../src/models/tasks')

Task.findByIdAndDelete('5d4f1fefba0796680818cb52').then((result) => {
    console.log('result1', result)
    return Task.count({completed: false})
}).then((result2) =>{
    console.log('There are ' + result2 + ' incomplete documents')
}).catch((error) => {
    console.log(error)
})