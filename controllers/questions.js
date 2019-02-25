const Question = require('../models/question');
const Category = require('../models/category');


exports.addQuestion = (req, res, next) => {
    console.log("Rendering page");
    Category.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('questions/addQuestion', {

                categories: rows,
                path: '/'


            });
        })
        .catch(err => console.log(err));





}