const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type:String
    },
    age:{
        type: Number
    },
    phone:{
        type: String
    },
    roleId:{

        type: String,
        default:"1020"
    },
},{timestamps: true})

const Employeedb = mongoose.model('Employee', employeeSchema)

module.exports = Employeedb;