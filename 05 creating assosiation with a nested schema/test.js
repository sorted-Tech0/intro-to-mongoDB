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
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'school'
    }
}, {timestamps: true})

const school = new mongoose.Schema({
    name: String
})

const School = mongoose.model('school', school)
const Student = mongoose.model('student', student)

connect()
    .then(async connection => {
        
        console.log(student)
    })
    .catch(e => console.error(e))

