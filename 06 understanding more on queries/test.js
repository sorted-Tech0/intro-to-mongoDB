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
        const school = await School.findOneAndUpdate({name: 'mlk elementry'}, {name: 'mlk elementry'}, {upsert: true, new: true})
        const student = await Student.create({firstName: 'Tim', school: school._id})
        const student2 = await Student.create({firstName: 'Trisha', school: school._id})
        
        const match = await Student.findOne({firstName: 'Trisha'})
            .populate('school')
            .exec()
        console.log(match);
    })
    .catch(e => console.error(e))



// findOneAndUpdate() -> it find the given data, if find then update it, if not found then it will create it from scratch  > {new: true} for returning new updated document and {upsert:true} for changing in document for updation

// populate: basically means it return the data populate with the given referenced schema