const Question = require('../models/models').Question;
const MQuestion = require('../models/question');
const Category = require('../models/models').Category;
const MCategory = require('../models/category');

const { graphql } = require('graphql');
const schema = require('../graphql/schema');
const { request } = require('graphql-request');
const fetch = require('node-fetch');

const db = require('../utils/database');
const mongoose = require('mongoose');


//.then(data => {
//     var firebaseDb = admin.database();
// })
//     .catch(err => {
//         console.log("Error in initalising firebase", err);
//     });


//Match models
const Match = require('../models/matches/match');


exports.allQuestions = (req, res, next) => {


    Question.findAll()
        .then(questions => {
            res.status(200).send(questions);
        })
        .catch(err => { console.log("Error in fetching all questions list. " + err) });

}
exports.getCategoriesAndQuestions = (req, res, next) => {


    var numberOfCategories = req.params.numberOfCategories;
    var numberOfQuestions = req.params.numberOfQuestions;
    var returnObj = {};
    var categoriesUsed = 0;
    var filter = { usePermission: 1 };
    // var fields = { name: 1, description: 0 };
    // var options = { skip: 10, limit: 10, populate: 'mySubDoc' };
    // MCategory.findRandom(filter, {}, { limit: Number(numberOfCategories) }, function (err, categories) {
    //     if (!err) {

    //         res.status(200).send({
    //             categories
    //         });

    //     } else {
    //         res.status(400).send({
    //             message: "Error in fetching categories",
    //             err: err
    //         });
    //     }
    // });



    // MCategory.countDocuments().then(result => {
    //     res.status(200).send({
    //         result
    //     })
    // }).catch(err => {
    //     res.status(400).send({
    //         message: "Error in counting categories"
    //     })
    // })


    MCategory.aggregate([{ $match: {} }, { $sample: { size: Number(numberOfCategories) } }], (err, result) => {
        if (err) {
            res.status(400).send({
                message: "Error in getting categories"
            })
        } else {
            res.status(200).send({
                result
            })
        }
    });


},



    exports.createMatch = (req, res, next) => {

        var user_id = req.params.id;
        var match_id = new mongoose.Types.ObjectId();
        // var ref = firebaseDb.ref(`matches/${user_id}/`);
        //var key = firebaseKey.key();
        // console.log("key is ", key);
        var match = new Match({
            id: match_id,
            type: "D"
        });
        match.save().then(result => {
            res.send({
                message: "Match created",
                result: result

            });
        }).catch(err => {
            res.status(400).send({
                message: "Error in creating the match",
                error: err

            });
        });
        // ref.set(match).then(() => {

        //     console.log("Match added");
        //     res.send();
        // })
        //     .catch(err => {

        //         console.log("error in adding match to firebase");
        //     });

        // ref.on("value", function (snapshot) {
        //     console.log(snapshot.val());
        // }, function (errorObject) {
        //     console.log("The read failed: " + errorObject.code);
        // });


    }


exports.newMatchAddedToFirebase = (req, res, next) => {
    console.log("Got request from firebase");
    console.log(req.body);
}


class CategoryQuestionsJoint {
    constructor(questions, categoryId, categoryTitle) {

        this.questions = questions;
        this.categoryId = categoryId;
        this.categoryTitle = categoryTitle;
    }
}


