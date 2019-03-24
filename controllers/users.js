const Question = require('../models/models').Question;
const Category = require('../models/models').Category;
const User = require('../models/user');
const random = require('../utils/database').random;
const { graphql } = require('graphql');
const schema = require('../graphql/schema');
const { request } = require('graphql-request');
const fetch = require('node-fetch');

const mongoose = require('mongoose');

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

    // name, originPlatform, originPlatformId, userType, initialPoints

    var vals = JSON.parse(Object.keys(req.body)[0]);
    console.log(vals);

    console.log("Adding a new user");
    var originPlatform = vals["originPlatform"];
    var originPlatformId = vals["originPlatformId"];

    var userType = vals["userType"];
    var name = vals["name"];
    var initialPoints = vals["initialPoints"];

    var user = new User({
        originPlatform: originPlatform,
        originPlatformID: originPlatformId,
        name: name,
        privilege: userType,

        firstLogin: new Date(),
        points: initialPoints
    });
    user.save().then(result => {
        res.send({
            message: "User created",
            result: result

        });
    }).catch(err => {
        res.status(400).send({
            message: "Error in creating the user",
            error: err

        });
    });

    //  console.log(sm, smId, profilePhoto, privilege, name);

    // User.create({
    //     sm: sm,
    //     smId: smId,
    //     name: name,
    //     privilege: privilege,
    //     profilePhoto: profilePhoto,
    //     points: points

    // }).then(result => {

    //     res.status(201).send({
    //         message: "User created successfully",
    //         status: 201
    //     });
    // })
    //     .catch(err => {
    //         console.log("Error in creating user. " + err);
    //         res.status(400).send({
    //             message: "Failed to create user",
    //             error: err,
    //             status: 400
    //         });
    //     });




};

exports.postAddUser = (req, res, next) => {

    console.log("Adding a new user");
    var originPlatform = req.body.sm;
    var originPlatformID = req.body.smId;
    var name = req.body.name;
    var privilege = req.body.privilege;
    var email = req.body.email;


    var user = new User({
        originPlatform: originPlatform,
        originPlatformID: originPlatformID,
        name: name,
        privilege: privilege,
        email: email,
        firstLogin: new Date(),
    });
    user.save().then(result => {
        res.send({
            message: "User created",
            result: result

        });
    }).catch(err => {
        res.status(400).send({
            message: "Error in creating the user",
            error: err

        });
    });

    // User.create({
    //     sm: sm,
    //     smId: smId,
    //     name: name,
    //     privilege: privilege,
    //     email: email

    // }).then(result => {

    //     res.status(201).send({
    //         message: "User added successfully",
    //         status: 201
    //     });
    // })
    //     .catch(err => {
    //         console.log("Error in adding user. " + err);
    //         res.status(400).send({
    //             message: "Failed to add user",
    //             error: err,
    //             status: 400
    //         });
    //     });




}