const Category = require('./category');


module.exports = class Question {
    constructor(categoryId, question, correctAnswer, options, hardness, status) {

        this.categoryId = categoryId;
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.options = options;
        this.hardness = hardness;
        this.status = status;


        var dateTime = new Date();
        var date = dateTime.getFullYear() + '-' + (dateTime.getMonth() + 1) + '-' + dateTime.getDate();
        var time = dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();
        var record = date + ' ' + time;
        this.dateOfAdding = record;

        this.correctGuesses = 0;
        this.incorrectGuesses = 0;



    }

    save() {

        var sql3 = `INSERT INTO "${this.categoryId}" (question,correctAnswer,options,hardness,status,correctGuesses,incorrectGuesses,dateOfAdding) VALUES (?,?,?,?,?,?,?,?)`;
        db.execute(sql3, [question.question, question.correctAnswer, question.options, question.hardness, question.status, 0, 0, question.dateOfAdding], (err3, result3, fields3) => {

            if (err3) {
                console.log("Error in adding to the category table " + `${this.categoryId}`);
                return;
            }



        });

    }
    save(category) {

        category.saveNewCategory(this);

    }

    static fetchAll(categoryId) {

    }
    static findById(categoryId, questionId) {

    }


}









