const Question = require('../models/models').Question;
const Category = require('../models/models').Category;
const random = require('../utils/database').random;
const { graphql } = require('graphql');
const schema = require('../graphql/schema');
const { request } = require('graphql-request');
const fetch = require('node-fetch');
const axios = require('axios');
const db = require('../utils/database');
const mongoose = require('mongoose');
//FIREBASE
const firebaseKey = require("firebase-key");
var admin = require("firebase-admin");
var serviceAccount = require('../firebase/quiz-bca26-firebase-adminsdk-ecsar-46fd2e84b0.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://quiz-bca26.firebaseio.com/'
});
var firebaseDb = admin.database();

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

    // console.log(`fetching ${numberOfQuestions} from category ${categoryId}`);

    var categoryQuestionJoints = [];
    Category.findAll({ where: { usePermission: Number(1) }, order: random, limit: Number(numberOfCategories), distinct: true })
        .then(data => {
            console.log("fetched categories ", data.length);


            for (var i = 0; i < data.length; i++) {
                console.log("looping for " + data[i].id);
                var categoryId = data[i].id;
                var categoryTitle = data[i].title;
                console.log(categoryId, categoryTitle);

                Question.findAll({
                    where: {
                        categoryId: categoryId,
                        usePermission: Number(1)
                    },

                    order: random,
                    limit: Number(numberOfQuestions),
                    distinct: true

                })
                    .then(data2 => {


                        var categoryQuestionJoint = new CategoryQuestionsJoint(data2, categoryId, categoryTitle);
                        categoryQuestionJoints.push(categoryQuestionJoint);
                        console.log(categoryQuestionJoint);

                        if (categoryQuestionJoints.length >= numberOfCategories) {
                            res.status(200).send(categoryQuestionJoints);
                        }




                    })
                    .catch(err2 => console.log("Error in fetching questions for category ", categoryId));


            }



            // console.log(categoryIds)
        })
        .catch(err => { console.log("error in fetching categories ", err) });


    // db.getConnection((err0, db_) => {

    //     if (err0) {
    //         throw err0;
    //     }
    //     var sql1 = `SELECT * FROM categories ORDER BY rand() LIMIT ${numberOfCategories}`;
    //     console.log("sql1 is ", sql1);

    //     db_.execute(sql1, function (err1, result1, fields1) {
    //         db_.release();
    //         if (err1) {
    //             throw err1;
    //         }

    //         console.log("Categories fetched", result1);
    //         res.status(201).send("Query worked");

    //     });
    // });


    // Category.findAndCountAll({ limit: Number(numberOfCategories) })
    //     .then(result => {
    //         console.log("fetched categories are ", result);
    //     })
    //     .catch(err => console.log("error in fetching categories ", err));


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


