const mongoose = require('mongoose')

async function connect(next) {
    // try {
    //     await mongoose.connect('mongodb://127.0.0.1:27017/education');
    //     console.log('Connect successfully');
    // } catch (error) {
    //     console.log('Connect failure');
    // }
    mongoose.connect('mongodb://127.0.0.1:27017/education')
        .then(() => console.log('Connect successfully'))
        .catch(next)
}

module.exports = { connect };