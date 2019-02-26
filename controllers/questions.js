const Question = require('../models/question');
const Category = require('../models/category');


exports.addQuestion = (req, res, next) => {
    console.log("Rendering page");

    Category.findAll()
        .then(categories => {
            res.render('questions/addQuestion', {

                categories: categories,
                path: '/'


            });
        })
        .catch(err => { console.log("Error in fetching all categories list. " + err) });



};

exports.postAddQuestion = (req, res, next) => {

    console.log("Adding a new question");
    var categoryId = req.body.category;
    var newCategoryTitle = req.body.newCategory;
    var categoryStatus = req.body.categoryStatus;
    var question = req.body.question;
    var correctAnswer = req.body.correctAnswer;
    var options = req.body.otherOptions;
    var tags = req.body.tags;
    var hardness = req.body.hardness;
    var status = req.body.status;

    var dateTime = new Date();
    var date = dateTime.getFullYear() + '-' + (dateTime.getMonth() + 1) + '-' + dateTime.getDate();
    var time = dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();
    var record = date + ' ' + time;

    console.log(categoryId, question, correctAnswer);

    if (question != null && correctAnswer != null && options != null) {
        if (categoryId != -1 && categoryId != -2) {
            Question.create({
                question: question,
                categoryId: categoryId,
                correctAnswer: correctAnswer,
                options: options,
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
                            options: options,
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