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
    name: String,
    openSince: Number,
    students: Number,
    isGreat: Boolean
})

const School = mongoose.model('school', school)
const Student = mongoose.model('student', student)

connect()
    .then(async connection => {

        // const schoolConfig = {
        //     name: 'mlk elementry',
        //     openSince: 2009,
        //     students: 1000,
        //     isGreat: true
        // }

        const schoolConfig = {
            name: 'mlks elementry',
            openSince: 2009,
            students: 1000,
            isGreat: true,
            staff: ['a', 'b', 'c']
        }

        const schoolConfig2 = {
            name: 'Larrys Middle Schol',
            openSince: 1996,
            students: 600,
            isGreat: false,
            staff: ['v', 'b', 's']
        }

        // const schoolConfig2 = {
        //     name: 'Larry Middle Schol',
        //     openSince: 1996,
        //     students: 600,
        //     isGreat: false
        // }

        const schools = await School.create([schoolConfig, schoolConfig2]);
        const match = await School.find(
            {staff: "b" }
        ).exec()
        console.log(match)

        // const school = await School.findOneAndUpdate({name: 'mlk elementry'}, {name: 'mlk elementry'}, {upsert: true, new: true})
        // const student = await Student.create({firstName: 'Tim', school: school._id})
        // const student2 = await Student.create({firstName: 'Trisha', school: school._id})
        
        // const match = await Student.findOne({firstName: 'Trisha'})
        //     .populate('school')
        //     .exec()
        // console.log(match);
    })
    .catch(e => console.error(e))

