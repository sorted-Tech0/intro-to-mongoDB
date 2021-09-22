const mongoose = require('mongoose')

const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/whatever', {
        useNewUrlParser: true
    })
}

const student = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        unique: true
    },
    favFoods: [{type: String}],
    info: {
        school: {
            type: String
        },
        shoeSize: {
            type: Number
        }
    }
}, {timestamps: true})

const Student = mongoose.model('student', student)

connect()
    .then(async connection => {
        const student = await Student.create({firstName : "Tim"})
        const found = await Student.find({})
        const found = await Student.find({firstName: "thi"})
        const foundById = await Student.findById('asdfg')
        const updated = await Student.findByIdAndUpdate('asdf', {})
        console.log(student)
    })
    .catch(e => console.error(e))


// note: find({}) -> just give me everything
//       find({firstName: 'Kunu'}) -> return only records having specified field
//       findById('asdf) -> Only give the specified id's record
//       findByIdAndUpdate('asdf', {}) -> find specified id's record and update with provided object
//       MongoDB doesn't have timestamp but mongoose give us this ability for timestamp
//       this is given to Schema's second paramter as {timestamps: true}