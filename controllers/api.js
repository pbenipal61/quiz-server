const Question = require("../models/models").Question;
const MQuestion = require("../models/question");
const Category = require("../models/models").Category;
const MCategory = require("../models/category");
const User = require("../models/user");

const { graphql } = require("graphql");
const schema = require("../graphql/schema");
const { request } = require("graphql-request");
const fetch = require("node-fetch");

const db = require("../utils/database");
const mongoose = require("mongoose");

var WebsocketClientsStore = require("../utils/websocketClientsStore");
var wscs = new WebsocketClientsStore().getInstance();
//.then(data => {
//     var firebaseDb = admin.database();
// })
//     .catch(err => {
//         console.log("Error in initalising firebase", err);
//     });

//Match models
const Match = require("../models/matches/match");

exports.allQuestions = (req, res, next) => {
  Question.findAll()
    .then(questions => {
      res.status(200).send(questions);
    })
    .catch(err => {
      console.log("Error in fetching all questions list. " + err);
    });
};

exports.getMadMindId = (req, res, next) => {
  var originPlatformId = req.params.originPlatformId;
  User.findOne({ originPlatformID: originPlatformId })
    .then(result => {
      res.status(200).send(result["_id"]);
    })
    .catch(err => {
      res.status(400).send({
        message: "Failed to find MadMind id for " + originPlatformId,
        error: err
      });
    });
};

(exports.getCategories = (req, res, next) => {
  var numberOfCategories = req.params.numberOfCategories;
  var numberOfQuestions = req.params.numberOfQuestions;
  var returnObj = {};
  var categoriesUsed = 0;
  var filter = { usePermission: 1 };
  // var fields = { name: 1, description: 0 };
  // var options = { skip: 10, limit: 10, populate: 'mySubDoc' };
  // MCategory.findRandom(filter, {}, { limit: Number(numberOfCategories) }, function (err, categories) {
  //     if (!err) {

  //         res.status(200).send({
  //             categories
  //         });

  //     } else {
  //         res.status(400).send({
  //             message: "Error in fetching categories",
  //             err: err
  //         });
  //     }
  // });

  // MCategory.countDocuments().then(result => {
  //     res.status(200).send({
  //         result
  //     })
  // }).catch(err => {
  //     res.status(400).send({
  //         message: "Error in counting categories"
  //     })
  // })

  MCategory.aggregate(
    [{ $match: filter }, { $sample: { size: Number(numberOfCategories) } }],
    (err, result) => {
      if (err) {
        res.status(400).send({
          message: "Error in getting categories"
        });
      } else {
        res.status(200).send({
          result
        });
      }
    }
  );
}),
  (exports.getQuestions = (req, res, next) => {
    var numberOfQuestions = req.params.numberOfQuestions;
    var returnObj = {};
    var categoriesUsed = 0;
    var filter = { usePermission: 1 };

    MQuestion.aggregate(
      [{ $match: filter }, { $sample: { size: Number(numberOfQuestions) } }],
      (err, result) => {
        if (err) {
          res.status(400).send({
            message: "Error in getting questions"
          });
        } else {
          res.status(200).send({
            result
          });
        }
      }
    );
  });

exports.createMatch = (req, res, next) => {
  // console.log(req.body);
  var vals = JSON.parse(Object.keys(req.body)[0]);
  console.log(vals);

  var participants = vals["participants"];
  var matchType = vals["matchType"];
  createMatchAsync(res, participants, matchType);
  // var match_id = new mongoose.Types.ObjectId();

  // var match = new Match({
  //     id: match_id,
  //     type: "D"
  // });
  // match.save().then(result => {
  //     res.send({
  //         message: "Match created",
  //         result: result

  //     });
  // }).catch(err => {
  //     res.status(400).send({
  //         message: "Error in creating the match",
  //         error: err

  //     });
  // });
};

const createMatchAsync = async (res, participants, matchType) => {
  var filter = { usePermission: 1 };
  const questions = await MQuestion.aggregate([
    { $match: filter },
    { $sample: { size: 15 } },
    {
      $project: {
        correctGuesses: 0,
        option1Guesses: 0,
        option2Guesses: 0,
        option3Guesses: 0,
        option4Guesses: 0,
        option5Guesses: 0,
        usePermission: 0,
        tags: 0,
        hardness: 0,
        _v: 0,
        createdAt: 0,
        status: 0
      }
    }
  ]);
  console.log(questions.length);

  var rounds = [];

  for (var i = 0; i < 3; i++) {
    var questions_ = questions;
    const round = {
      numberOfQuestions: 5,
      questions: questions_.slice(5 * i, 5 * (i + 1))
    };
    rounds.push(round);
    //  console.log(round.questions.length);
  }

  var match = await new Match({
    type: matchType,
    participants: participants,
    numberOfRounds: 3,
    bet: 10,
    currentRound: 0,
    currentTurn: participants[0],
    rounds: rounds
  });

  var matchSaveResult = await match.save();
  var matchId = matchSaveResult["_id"];
  // console.log(matchId);

  const miniMatchData = {
    matchId: matchId,
    createdAt: new Date(),
    running: true
  };

  participants.forEach(async participant => {
    // var user = await User.findById(participant);
    // console.log(user["name"])
    console.log(participant);
    var updatedUser = await User.updateOne(
      { originPlatformID: participant },
      { $push: { matches: miniMatchData } }
    );

    if (updatedUser != null || typeof updatedUser != "undefined") {
      var wscs = new WebsocketClientsStore().getInstance();
      var tunnelRes = await wscs.sendDataToClient(participant, true, {
        type: "new_match_created",
        matchData: matchSaveResult
      });
      //console.log("Open connections with ", wscs.getOpenConnections());
      console.log("Tunnel result is ", tunnelRes);
    } else {
      console.log("Updated user for ", participant, "was not found");
    }

    // var updatedUser = await User.findByIdAndUpdate(participant, { "bruh": "bitch" });
    // var updatedUser = await User.findByIdAndUpdate(participant, { $set: { day: 'example' } }, { new: true });
    //  console.log(participant);

    //  console.log(updatedUser);
  });

  res.send({
    message: "Match started"
  });
};
