const express = require('express');
const router = new express.Router();
const redis = require('redis');
const util = require('util');
const MQuestion = require('../../models/mongoose/question');

router.get('/importQuestionsToRedis', async (req, res, next) => {
  const redisUrl = 'redis://127.0.0.1:6379';
  const client = redis.createClient(redisUrl);
  client.hset = util.promisify(client.hset);

  try{
    const questions = await MQuestion.find();
    questions.forEach((question, index)=>{

        client.hset('questions', String(index), JSON.stringify(question));

    });
    client.hset('questions', 'total', questions.length);
    res.status(200).send(client.hgetall('questions'));

  }
  catch(e){
      res.status(400).json({
          'message': 'Failed',
          'error': e
      });
  }
});

router.post('/originPlatforms', addToOriginPlatforms);
module.exports = router;
