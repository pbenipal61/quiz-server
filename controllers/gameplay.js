const Question = require('../models/models').Question;
const Category = require('../models/models').Category;
const random = require('../utils/database').random;
const { graphql } = require('graphql');
const schema = require('../graphql/schema');
const { request } = require('graphql-request');
const fetch = require('node-fetch');
const axios = require('axios');

exports.allQuestions = (req, res, next) => {


    Question.findAll()
        .then(questions => {
            res.status(200).send(questions);
        })
        .catch(err => { console.log("Error in fetching all questions list. " + err) });

}