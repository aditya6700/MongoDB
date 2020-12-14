const express = require('express');
const router = new express.Router();
const Student = require('../models/students.js');

// creating a new student 
router.post('/api/students', async(req,res) => {
    // console.log(req.body);
    // const user = new Student(req.body);
    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((err) => {
    //     res.status(404).send(err);
    // });

    try {
        const studIns = await Student.insertMany(req.body);
        res.status(201).send(studIns);
    } catch (err) {
        res.status(404).send(err);
    }

});

// getting students data
router.get('/api/students', async (req,res) => {
        try {
            const studata = await Student.find();
            res.status(201).send(studata)
        } catch (err) {
            res.status(404).send(err);
        }
});

// finding student data using id

router.get("/api/students/:id", async (req,res) => {
    try {
        const _id = req.params.id;
        const studId = await Student.findById(_id);
        if(!studId){
            return res.status(404).send();
        }else{
            res.status(201).send(studId);
        }
    } catch (error) {
        res.status(500).send(error);  // 500 internal server error
    }
});

// find student by name
router.get("/api/students/name/:name", async (req,res) => {
    try {
        const name = req.params.name;
        const studname = await Student.findOne({name},{_id:0,__v:0});
        if(!studname){
            return res.status(404).send();
        }else{
            res.status(201).send(studname);
        }
    } catch (error) {
        res.status(500).send(error);  // 500 internal server error
    }
});

// update students by id
router.patch('/api/students/:id', async (req,res) => {
    try {
        const _id = req.params.id;
        const studUpdate = await Student.findByIdAndUpdate(_id, req.body,{
            new: true
        });
        res.status(201).send(studUpdate);
    } catch (err) {
        res.status(500).send(err);  // 500 internal server error
    }
})

// delete students bu ID
router.delete('/api/students/:id', async (req,res) => {
    try {
        const _id = req.params.id;
        const studDel = await Student.findByIdAndDelete(_id);
        res.status(201).send(studDel);
    } catch (err) {
        res.status(500).send(err);  // 500 internal server error
    }
})

    // You DO NOT NEED express.json() and express.urlencoded()
    // for GET Requests or DELETE Requests. We only need it for
    // post and put req.
    
    // express.json() is a method inbuilt in express to recognize the incoming
    // Request Object as a JSON Object. This method is called as a middleware
    // in your application using the code: app.use(express.json());

module.exports = router;