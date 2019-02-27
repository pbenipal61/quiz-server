// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');
// const Question = require('./question');
// // constructor(title, numberOfQuestions, uses, status) {

// //     this.id = id;
// //     this.title = title;
// //     this.numberOfQuestions = numberOfQuestions;
// //     this.uses = uses;
// //     this.status = status;

// //     var dateTime = new Date();
// //     var date = dateTime.getFullYear() + '-' + (dateTime.getMonth() + 1) + '-' + dateTime.getDate();
// //     var time = dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();
// //     var record = date + ' ' + time;
// //     this.dateOfAdding = record;


// // }
// const Category = sequelize.define('category', {

//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     title: Sequelize.STRING,
//     numberOfQuestions: Sequelize.INTEGER,
//     uses: Sequelize.INTEGER,
//     status: Sequelize.INTEGER,
//     dateOfAdding: Sequelize.STRING

// });

// //Relationship
// //Category.hasMany(Question);

// module.exports = Category;