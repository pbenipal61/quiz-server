const db = require('../utils/database');


module.exports = class Category {
    constructor(title, numberOfQuestions, uses, status) {

        this.id = id;
        this.title = title;
        this.numberOfQuestions = numberOfQuestions;
        this.uses = uses;
        this.status = status;

        var dateTime = new Date();
        var date = dateTime.getFullYear() + '-' + (dateTime.getMonth() + 1) + '-' + dateTime.getDate();
        var time = dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();
        var record = date + ' ' + time;
        this.dateOfAdding = record;


    }
    static fetchAll() {

        return db.execute('SELECT * FROM categories');

    }
    static findById(id) {

    }

    saveNewCategory(question) {

        var categoryId = -1;
        var sql1 = `INSERT INTO categories (title,numberOfQuestions,uses,status,dateOfAdding) VALUES (?,?,?,?)`;
        db.execute(sql1,
            [this.title, 0, 0, this.status, this.dateOfAdding]
            , (err, result, fields) => {

                if (err) {
                    console.log("Error in adding new category to categories table");
                    return;
                }
                categoryId = result.insertId;

                var sql2 = `create table "${categoryId}"(

                id int auto_increment,
                question varchar(128),
                correctAnswer varchar(64),
                options varchar(256),
                hardness int,
                status int,
                correctGuesses int,
                incorrectGuesses int,
                dateOfAdding varchar(22),
                PRIMARY KEY(id)        
        
        
                );`
                db.execute(sql2, (err2, result2, fields2) => {

                    if (err2) {
                        console.log("Error in creating new category table");
                        return;
                    }
                    var sql3 = `INSERT INTO "${categoryId}" (question,correctAnswer,options,hardness,status,correctGuesses,incorrectGuesses,dateOfAdding) VALUES (?,?,?,?,?,?,?,?)`;
                    db.execute(sql3, [question.question, question.correctAnswer, question.options, question.hardness, question.status, 0, 0, question.dateOfAdding], (err3, result3, fields3) => {

                        if (err3) {
                            console.log("Error in adding to new category table");
                            return;
                        }



                    });

                });

            });
    }

}









