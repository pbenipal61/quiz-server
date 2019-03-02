const Question = require('../models/models').Question;
const Category = require('../models/models').Category;
const { graphql } = require('graphql');
const schema = require('../graphql/schema');
const fetch = require('node-fetch');
const axios = require('axios');

exports.addQuestion = (req, res, next) => {


    Category.findAll()
        .then(categories => {
            res.render('questions/addQuestion', {

                categories: categories,
                path: '/'


            });
        })
        .catch(err => { console.log("Error in fetching all categories list. " + err) });



};
exports.questions = (req, res, next) => {


    Question.findAll()
        .then(questions => {
            res.render('questions/questions', {

                questions: questions,
                path: '/'


            });
        })
        .catch(err => { console.log("Error in fetching all questions list. " + err) });

}
exports.postAddQuestion = (req, res, next) => {

    console.log("Adding a new question");
    var categoryId = req.body.category;
    var newCategoryTitle = req.body.newCategory;
    var categoryStatus = req.body.categoryStatus;
    var question = req.body.question;
    var correctAnswer = req.body.correctAnswer;
    var option1 = req.body.option1;
    var option2 = req.body.option2;
    var option3 = req.body.option3;
    var option4 = req.body.option4;
    var option5 = req.body.option5;
    var tags = req.body.tags;
    var hardness = req.body.hardness;
    var status = req.body.status;

    var dateTime = new Date();
    var date = dateTime.getFullYear() + '-' + (dateTime.getMonth() + 1) + '-' + dateTime.getDate();
    var time = dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();
    var record = date + ' ' + time;

    console.log(categoryId, question, correctAnswer, tags, hardness, status, record);

    if (question != null && correctAnswer != null && option1 != null && option2 != null && option3 != null) {
        if (categoryId != -1 && categoryId != -2) {
            Question.create({
                question: question,
                categoryId: categoryId,
                correctAnswer: correctAnswer,
                option1: option1,
                option2: option2,
                option3: option3,
                option4: option4,
                option5: option5,
                option1Guesses: 0,
                option2Guesses: 0,
                option3Guesses: 0,
                option4Guesses: 0,
                option5Guesses: 0,
                tags: tags,
                status: status,
                hardness: hardness,
                correctGuesses: 0,
                incorrectGuesses: 0,
                dateOfAdding: record

            }).then(result => {
                console.log("Question added");
                res.status(201).send({
                    message: "Question added successfully",
                    status: 201
                });
            })
                .catch(err => {
                    console.log("Error in adding question. " + err);
                    res.status(400).send({
                        message: "Failed to add question",
                        error: err,
                        status: 400
                    });
                });



            var graphqlQuery = {
                query: `mutation {
                    addQuestion(
                            question: "${question}",
                            categoryId: "${categoryId}",
                            correctAnswer: "${correctAnswer}",
                            options: "${options}",
                            tags: "${tags}",
                            status: "${status}",
                            hardness: "${hardness}",
                            correctGuesses: "0",
                            incorrectGuesses: "0",
                            dateOfAdding: "${record}" 
                        
                        ){
                            id
                        }
                  }`
            };
            var testQuery = {
                query: `{
                    categories{
                      "${categoryId}"
                    }
                  }`

            };
            // fetch('http://159.89.13.37:3000/graphql', {
            //     method: 'POST',
            //     url: 'http://localhost:3000/graphql',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Accept': 'application/json',

            //     },
            //     data: JSON.stringify(graphql)

            // }).then(result => {
            //     console.log(result);
            //     if (result.status == 200 || result.status == 201) {
            //         console.log("New question added");
            //         console.log(result.json());
            //         next();
            //     }

            // }).then(data => {
            //     console.log("data returned: ", data);
            //     res.send({ message: "New question added " });

            // })
            //     .catch(err => {

            //         console.log("Error in adding question "
            //             + err);
            //         res.status(400).send({ message: "Error in adding the question", error: err.message });
            //     });


        } else {


            if (categoryId == -1) {

                console.log("Failed to realise a category for the question");
                res.status(400).send({
                    message: "Failed to realise a category for the question",
                    status: 400
                });

            } else {

                Category.create({
                    title: newCategoryTitle,
                    numberOfQuestions: 1,
                    uses: 0,
                    status: categoryStatus,
                    dateOfAdding: record
                })
                    .then(result => {
                        categoryId = result["dataValues"].id;
                        Question.create({
                            question: question,
                            categoryId: categoryId,
                            correctAnswer: correctAnswer,
                            option1: option1,
                            option2: option2,
                            option3: option3,
                            option4: option4,
                            option5: option5,
                            option1Guesses: 0,
                            option2Guesses: 0,
                            option3Guesses: 0,
                            option4Guesses: 0,
                            option5Guesses: 0,
                            tags: tags,
                            status: status,
                            hardness: hardness,
                            correctGuesses: 0,
                            incorrectGuesses: 0,
                            dateOfAdding: record

                        }).then(result2 => {
                            console.log("Question added to the new category successfully");
                            res.status(201).send({
                                message: "Question added to the new category successfully",
                                status: 201
                            });
                        }).catch(err => {
                            console.log("Error in adding question. " + err);
                            res.status(400).send({
                                message: "Failed to add question to the new category",
                                error: err,
                                status: 400
                            });
                        });
                    })
                    .catch(err => {
                        console.log("Error in adding new category. " + err);

                        res.status(400).send({
                            message: "Failed to add new category",
                            error: err,
                            status: 400
                        });
                    });

            }



        }
    }




};

function queryGraphQL(str) {
    return graphql(schema, str);
}