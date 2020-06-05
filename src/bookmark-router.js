const express = require('express')
const { v4: uuid } = require('uuid')

const bookmarksRouter = express.Router()
const { bookmarks } = require('./store')