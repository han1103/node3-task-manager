require('../src/db/mongoose')

const User = require('../src/models/user')

// User.findByIdAndUpdate('5d5097b5a38cc52e14f0e26b', {age: 2}).then((user) => {
//     console.log('result1', user)
//     return User.find({age:2})
// }).then((result) => {
//     console.log('result2', result)
// }).catch((error) => {
//     console.log('Error!', error)
// })
// console.log('hahah1111111111111111111111111111111111111111')
// User.countDocuments({age:0}).then((result) => {
//     console.log('There are ' + result + ' users with age 0')
// })

const updateAgeAndCount = async (id, age) => {
//const updateAgeAndCount = async function(){    
    const user = await User.findByIdAndUpdate(id, {age})
    console.log('after updating the age', user)
    const numOfUsers = await User.countDocuments({age})
    return numOfUsers
}

updateAgeAndCount('5d5097b5a38cc52e14f0e26b', 2).then((numOfUsers) => {
    console.log('numOfUsers with age of 2 : ', numOfUsers)
}).catch((error) => {
    console.log('Error!', error)
})