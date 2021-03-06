var express = require('express');
var bodyParser = require('body-parser');

const Leaderships = require('../models/leadership');

var leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get((req,res,next) => {
  Leaderships.find({})
  .then((leaderships) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(leaderships);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) => {
  Leaderships.create(req.body)
  .then((leadership) => {
      console.log('Dish Created ', leadership);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(leadership);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
  Leaderships.remove({})
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));    
});

leaderRouter.route('/:leaderId')
.get((req,res,next) => {
  Leaderships.findById(req.params.leaderId)
  .then((leadership) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(leadership);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.leaderId);
})
.put((req, res, next) => {
  Leaderships.findByIdAndUpdate(req.params.leaderId, {
      $set: req.body
  }, { new: true })
  .then((leadership) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(leadership);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.delete((req, res, next) => {
  Leaderships.findByIdAndRemove(req.params.leaderId)
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
});

module.exports = leaderRouter;