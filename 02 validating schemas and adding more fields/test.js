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
})

const Student = mongoose.model('student', student)

connect()
    .then(async connection => {
        const student = await Student.create({firstName : "Tim"})
        console.log(student)
    })
    .catch(e => console.error(e))


// note: require:true cannot be ignored as a empty field
//       unique:true  No two field can be there in document having unique field
//       Much you do nesting, You can access them by using dot(.) notation