const mongoose = require('mongoose');
const validator = require('validator');

// connecting to MongoDB and creating a new db
mongoose.connect("mongodb://localhost:27017/nodeTest", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => { console.log("connection succesfull..")}).catch((err) => {console.log(err)});

// creating schema  (object)
const myDataSchema = new mongoose.Schema({
    name   : {
        type :String,
        required: true,
        // unique: true,
        trim: true,
        minlength: [3, "custom message goes here"]
    },
    course : {
        type: String,
        uppercase: true,
        enum: ["Python", "REACTJS"]
    },
    age    : {
        type: Number,
        validate(value){
            if (value < 0) {
                throw new Error("age should not be less than 0");
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error("email invalid");   
            }
        }
    },
    active : Boolean,
    date   : { 
        type: Date,
        default: Date.now
    }
});


// creating a collection (class)
const Doc = mongoose.model("Doc",myDataSchema);

// adding documents to collection
const createDoc = async () => {
    try {
        const doc1 = new Doc({
            name   : "koundinya",
            course : "reactjs",
            age    : 20,
            email  : "koundinyas@root.com",
            active : true
        })

        // const doc2 = new Doc({
        //     name   : "Anusha",
        //     course : "Python",
        //     age    : 21,
        //     active : true
        // })

        // const doc3 = new Doc({
        //     name   : "vedha",
        //     course : "Embeded",
        //     age    : 20,
        //     active : true
        // })
    
        // const res = await doc1.save();
        const res = await Doc.insertMany([doc1]);
        console.log(res)

    } catch (error) {
        console.log(error);
    }    
}

createDoc();

// reading documents
const readDoc = async () => {
    try {
        // const res = await Doc.find({course: "Python"}, {_id: 0});
       
        // const res = await Doc
        // .find({ age: {$lt : 21}, course: {$nin : ["Embeded", "Python"]} })
        // .select({_id: 0, name: 1, course: 1});

        // const res = await Doc
        // .find({ $or: [ { age: {$not : {$lte : 20}}} , {course: {$in : ["C", "Python"]}}] })
        // .select({_id: 0, date: 0, active: 0});

        const res = await Doc
        .find()
        .select({name: 1})
        .sort({age: -1})
        // .countDocuments();

        console.log(res);
    } catch (error) {
        console.log(error);
    }
    
};

// readDoc();

const updateDoc = async (_id) => {
     try {
            const res = await Doc
            // .updateMany({course: "20"}, {$set : {course: "ReactJS"}})
            .findByIdAndUpdate({_id}, {
                $set : {
                    course: "FullStack"
                }
            }, { 
                new : true,
                useFindAndModify: false
            });

            console.log(res);
     } catch (error) {
         console.log(error)
     }
}

// updateDoc("5fd45a92f5e7151278f1c70d");

const deleteDoc = async () => {
    try {
        const res = await Doc
        .findOneAndDelete({
            name: "masteroot"
        })
        console.log(res);

    } catch (error) {
        console.log(error);
    }
}

// deleteDoc();

