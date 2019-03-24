const mongoose = require('mongoose');
const Category = require('../models/category');
const Question = require('../models/question');


exports.moveDataToMongo = (req, res, next) => {

    res.status(200).send({

        message: "Function disabled"
    });

    // Question.find().exec().then(questions => {
    //     // var count = questions.length;
    //     var questionsDone = [];
    //     for (var i = 0; i < questions.length; i++) {
    //         try {
    //             console.log(i);
    //             var question = questions[i];
    //             Category.findByIdAndUpdate({ _id: question.categoryId }, { $push: { questions: question } })
    //                 .then(data => {
    //                     questionsDone.push(data);
    //                     if (questionsDone.length > questions.length) {
    //                         res.status(200).send({ message: "done" });
    //                     }
    //                 })
    //                 .catch(err => {
    //                     console.log(err, i);
    //                 })
    //         }
    //         catch (e) {
    //             res.status(400).send({
    //                 e
    //             })
    //         }
    //     }
    // })
    //     .catch(err => {
    //         res.status(400).send({
    //             message: "Failed to fetch questions",
    //             err: err
    //         });
    //     })



}


exports.removeQuestions = (req, res, next) => {

    res.status(200).send({

        message: "Function disabled"
    });

    // Category.find({}, function (err, categories) {
    //     categories.forEach(category => {
    //         try {
    //             // console.log(category._id);
    //             Category.findByIdAndUpdate(category._id, { $unset: { questions: [] } }).then(data => console.log(data._id)).catch(err2 => console.log(err2));
    //         } catch (e) {
    //             res.send(e);
    //         }
    //     });

    // });


}
