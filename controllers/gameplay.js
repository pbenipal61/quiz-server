const Question = require('../models/models').Question;
const Category = require('../models/models').Category;
const random = require('../utils/database').random;
const { graphql } = require('graphql');
const schema = require('../graphql/schema');
const { request } = require('graphql-request');
const fetch = require('node-fetch');
const axios = require('axios');
const db = require('../utils/database');

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
    Category.findAll({ order: random, limit: Number(numberOfCategories), distinct: true })
        .then(data => {
            console.log("fetched categories ", data.length);


            for (var i = 0; i < data.length; i++) {
                console.log("looping for " + data[i].id);
                var categoryId = data[i].id;
                var categoryTitle = data[i].title;
                console.log(categoryId, categoryTitle);

                Question.findAll({
                    where: {
                        categoryId: categoryId
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


}


class CategoryQuestionsJoint {
    constructor(questions, categoryId, categoryTitle) {

        this.questions = questions;
        this.categoryId = categoryId;
        this.categoryTitle = categoryTitle;
    }
}

class TempQuestion {
    constructor(id, question, option1, option2, option3, option4, option5, correctAnswer) {

        this.id = id;
        this.question = question;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.option5 = option5;
        this.correctAnswer = correctAnswer;
    }
}
