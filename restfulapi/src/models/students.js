const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "minmum length should be 3"]
    },
    email: {
        type: String,
        required: true,
        unique: [true, "email already present"],
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("email is invalid");
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        min: 10,
    },
    address: {
        type: String,
        required: true,
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;