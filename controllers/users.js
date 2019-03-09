const Question = require('../models/models').Question;
const Category = require('../models/models').Category;
const User = require('../models/models').User;
const random = require('../utils/database').random;
const { graphql } = require('graphql');
const schema = require('../graphql/schema');
const { request } = require('graphql-request');
const fetch = require('node-fetch');
const axios = require('axios');


exports.users = (req, res, next) => {


    User.findAll()
        .then(users => {
            res.render('users/users', {

                users: users,
                path: '/'


            });
        })
        .catch(err => { console.log("Error in fetching all users list. " + err) });

}

exports.addUser = (req, res, next) => {



    res.render('users/addUser', {


        path: '/'


    });



};

exports.createUser = (req, res, next) => {



    var vals = JSON.parse(Object.keys(req.body)[0]);
    console.log(vals);

    console.log("Adding a new user");
    var sm = vals["sm"];
    var smId = vals["smId"];
    var profilePhoto = vals["profilePhoto"];
    var privilege = vals["privilege"];
    var name = vals["name"];
    var points = vals["points"];

    //  console.log(sm, smId, profilePhoto, privilege, name);

    User.create({
        sm: sm,
        smId: smId,
        name: name,
        privilege: privilege,
        profilePhoto: profilePhoto,
        points: points

    }).then(result => {

        res.status(201).send({
            message: "User created successfully",
            status: 201
        });
    })
        .catch(err => {
            console.log("Error in creating user. " + err);
            res.status(400).send({
                message: "Failed to create user",
                error: err,
                status: 400
            });
        });




};

exports.postAddUser = (req, res, next) => {

    console.log("Adding a new user");
    var sm = req.body.sm;
    var smId = req.body.smId;
    var name = req.body.name;
    var privilege = req.body.privilege;
    var email = req.body.email;


    User.create({
        sm: sm,
        smId: smId,
        name: name,
        privilege: privilege,
        email: email

    }).then(result => {

        res.status(201).send({
            message: "User added successfully",
            status: 201
        });
    })
        .catch(err => {
            console.log("Error in adding user. " + err);
            res.status(400).send({
                message: "Failed to add user",
                error: err,
                status: 400
            });
        });




}