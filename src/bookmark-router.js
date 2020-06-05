const express = require('express')
const { v4: uuid } = require('uuid')

const bookmarksRouter = express.Router()
const { bookmarks } = require('./store')
const bodyParser = express.json()

bookmarksRouter
  .route('/')
  .get((req, res) => {})
  .post(bodyParser, (req, res) => {})

bookmarksRouter
  .route('/:id')
  .delete((req, res) => {})