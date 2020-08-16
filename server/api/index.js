const express = require('express')
const router = express.Router()
const { Friend } = require('../models');
const { runInNewContext } = require('vm');

router.get('/', async (req, res, next) => {
  const friends = await Friend.findAll({
    order: [['score', 'DESC']]
  });
  res.json(friends)
})

router.get('/', async (req, res, next) => {
  const friends = await Friend.findAll({
    order: [['score', 'DESC']]
  });
  res.json(friends)
})

router.post('/', async (req, res, next) => {
  await Friend.create({
    name: req.body.friendName,
    score: 5}
  )
  res.status(200).json('success')
})

router.put('/', async (req, res, next) => {
  await Friend.update({
    score: req.body.score
  }, {
    where: {id: req.body.friendId}
  })
  res.status(200).json('success')
})

router.delete('/', async (req, res, next) => {
  await Friend.destroy({
    where: {id: req.body.friendId}
  })
  res.status(200).json('success')
})

module.exports = router
