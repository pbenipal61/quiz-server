const MQuestion = require('../../models/mongoose/question');
const MCategory = require('../../models/mongoose/category');
const User = require('../../models/mongoose/user');
const SocketsStore = require('../../utils/socketsStore');
const socketsStore = new SocketsStore().getInstance();
const MMatchType = require('../../models/mongoose/matchType');
const MatchType = require('../../models/sequelize/matchType');
const MOriginPlatform = require('../../models/mongoose/originPlatform');
const OriginPlatform = require('../../models/sequelize/originPlatform');

//Match models
const Match = require('../../models/mongoose/matches/match');

getMadMindId = (req, res, next) => {
	const originPlatformId = req.params.originPlatformId;
	User.findOne({ originPlatformID: originPlatformId })
		.then((result) => {
			res.status(200).send(result['_id']);
		})
		.catch((err) => {
			res.status(400).send({
				message: 'Failed to find MadMind id for ' + originPlatformId,
				error: err
			});
		});
};

getCategories = (req, res, next) => {
	const numberOfCategories = req.params.numberOfCategories;
	const numberOfQuestions = req.params.numberOfQuestions;
	const returnObj = {};
	const categoriesUsed = 0;
	const filter = { usePermission: 1 };
	

	MCategory.aggregate([ { $match: filter }, { $sample: { size: Number(numberOfCategories) } } ], (err, result) => {
		if (err) {
			res.status(400).send({
				message: 'Error in getting categories'
			});
		} else {
			res.status(200).send({
				result
			});
		}
	});
};
getQuestions = (req, res, next) => {
		const numberOfQuestions = req.params.numberOfQuestions;
		const returnObj = {};
		const categoriesUsed = 0;
		const filter = { usePermission: 1 };

		MQuestion.aggregate([ { $match: filter }, { $sample: { size: Number(numberOfQuestions) } } ], (err, result) => {
			if (err) {
				res.status(400).send({
					message: 'Error in getting questions'
				});
			} else {
				res.status(200).send({
					result
				});
			}
		});
};

createMatch = async (req, res, next) =>{
	const values = JSON.parse(Object.keys(req.body)[0]);
	const participants = values['participants'];
	const matchType = values['matchType'];
	const filter = { usePermission: 1 };
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

	const rounds = [];

	for (let i = 0; i < 3; i++) {
		const questions_ = questions;
		const round = {
			numberOfQuestions: 5,
			questions: questions_.slice(5 * i, 5 * (i + 1))
		};
		rounds.push(round);
		//  console.log(round.questions.length);
	}

	const roundsTaken = [];
	
	const roundTakenObj = {
		by: '',
		questions: [],
		checks: []
	};

	participants.forEach(participant => {

		const obj = {...roundTakenObj};
		obj.by = participant;
		roundsTaken.push(obj);
	});
	const match = await new Match({
		type: matchType,
		participants: participants,
		numberOfRounds: 3,
		bet: 10,
		currentRound: 0,
		currentTurn: participants[0],
		rounds: rounds,
		roundsTaken: roundsTaken
	});

	const matchSaveResult = await match.save();
	const matchId = matchSaveResult['_id'];
	// console.log(matchId);

	const miniMatchData = {
		matchId: matchId,
		createdAt: new Date(),
		running: true,
		participants: participants
	};

	participants.forEach(async (participant) => {
		
		console.log(participant);
		const updatedUser = await User.updateOne(
			{ originPlatformID: participant },
			{ $push: { matches: miniMatchData } }
		);

		if (updatedUser != null || typeof updatedUser != 'undefined') {
			
			const tunnelRes = await socketsStore.sendDataToSocket(participant,'new_match_started',matchSaveResult);
			//console.log("Open connections with ", wscs.getOpenConnections());
			console.log('Tunnel result is ', tunnelRes);
		} else {
			console.log('Updated user for ', participant, 'was not found');
		}

	});

	res.send({
		message: 'Match started'
	});
};

getMatchData = async (req, res, next) => {
	const { id } = req.params;
	const match = await Match.findById(id);
	res.status(200).send(match);
};

updateMatch = async (req, res, next) => {
	console.log('updating match...');
	// console.log(req.body);
	const values = JSON.parse(Object.keys(req.body)[0]);
	const matchId = values.id;
	const roundsTaken = values.roundsTaken;
	const currentRound = values.currentRound;
	const currentTurn = values.currentTurn;
	console.log('Next turn ', currentTurn, currentRound);

	const query = { _id: matchId };
	const update = {
		$set: {
			roundsTaken: roundsTaken,
			currentRound: currentRound,
			currentTurn: currentTurn
		}
	};
	const options = { new: true };
	const updatedMatchData = await Match.findOneAndUpdate(query, update, options);

	console.log(updatedMatchData.currentTurn, updatedMatchData.currentRound);
	const participants = values.participants;
	const obj = {};
	obj['currentTurn'] = updatedMatchData.currentTurn;
	obj['currentRound'] = updatedMatchData.currentRound;
	obj['roundsTaken'] = updatedMatchData.roundsTaken;
	obj['matchId'] = matchId;
	for (var i = 0; i < participants.length; i++) {
		await socketsStore.sendDataToSocket(participants[i],'match_update',{
			id: matchId,
			updatedData: obj
		}, true );
	}

	res.send({message:'match updated request accepted'});
};

addToQuestions = (req, res, next) => {
	
}

addToUsers = (req, res, next) =>{

}

addToLanguages = (req, res, next) =>{

}

addToUserTypes = (req, res, next) =>{

}

addToMatches = (req, res, next) =>{

}
addToMatchTypes = async (req, res, next) =>{

	try{
		const matchTypeResult = await MatchType.create({
			numberOfRounds: req.body.numberOfRounds,
  			numberOfQuestions: req.body.numberOfQuestions,
  			minBet: req.body.minBet,
			maxBet: req.body.maxBet,
		});
		const mMatchType = new MMatchType({
			title: req.body.title,
			id: matchTypeResult.id,
			numberOfRounds: req.body.numberOfRounds,
  			numberOfQuestions: req.body.numberOfQuestions,
  			minBet: req.body.minBet,
			maxBet: req.body.maxBet,
			description: req.body.description,
  		});
	
		const mMatchTypeSaveResult = await mMatchType.save();
		const values = {docId: String(mMatchTypeSaveResult._id)};
		const conditions = { where :{id: matchTypeResult.id} }; 
		const options = {};

		const updatedMatchTypeResult = await MatchType.update(
			values,conditions, options
		);

		res.status(200).json({
			'message': 'MatchType saved',
			'data': {
				mysql: updatedMatchTypeResult,
				mongodb: mMatchTypeSaveResult
			}
		});
	

}
catch(err){
	res.status(400).json({
		'message': 'Failed to save match type',
		'data': '',
		'err': err
	})
}

}
addToOriginPlatforms = async (req, res, next) =>{

	try{
		
		const originPlatformResult = await OriginPlatform.create({
			platform: req.body.platform,
		});
		const mOriginPlatform = new MOriginPlatform({
			description: req.body.description,
			platform: req.body.platform,
			id: originPlatformResult.id,
  		});
	
		const mOriginPlatformSaveResult = await mOriginPlatform.save();
		const values = {docId: String(mOriginPlatformSaveResult._id)};
		const conditions = { where :{id: originPlatformResult.id} }; 
		const options = {};

		const updatedOriginPlatformResult = await OriginPlatform.update(
			values,conditions, options
		);

		res.status(200).json({
			'message': 'MatchType saved',
			'data': {
				mysql: updatedOriginPlatformResult,
				mongodb: originPlatformResult
			}
		});
	

}
catch(err){
	res.status(400).json({
		'message': 'Failed to save origin platform',
		'data': '',
		'err': err
	})
}
}



module.exports = {getMadMindId, getCategories, getQuestions, createMatch,
	getMatchData, updateMatch,
	addToUsers, addToUserTypes,addToMatches, addToOriginPlatforms,
	addToQuestions, addToLanguages, addToMatchTypes};

