const express = require('express')
const { v4: uuid } = require('uuid')

const bookmarksRouter = express.Router()
const { bookmarks } = require('./store')
const bodyParser = express.json()

bookmarksRouter
  .route('/')
  .get((req, res) => {
    return res
      .json(bookmarks)
  })
  .post(bodyParser, (req, res) => {
    const { title, url, desc, rating } = req.body
    if (!title) {
      return res
        .status(400)
        .send('Title is required');
    }
    if (!url) {
      return res
        .status(400)
        .send('URL is required');
    }
    if (!desc) {
      return res
        .status(400)
        .send('A description is required');
    }
    if (!rating) {
      return res
        .status(400)
        .send('A rating is required');
    }
    if (url.length < 5 && !url.startsWith('http')) {
      return res
        .status(400)
        .send('URL must be in proper format');
    }
    if (Number(rating) === 'NaN' || Number(rating) > 5 || Number(rating) < 1) {
      return res
        .status(400)
        .send('Rating must be a number');
    }

    bookmarks.push({id: uuid(), title, url, desc, rating: String(rating) })

    res
      .status(201)
      .send('POST request processed')
  })

bookmarksRouter
  .route('/:id')
  .delete((req, res) => {
    const { id } = req.params;
    const index = bookmarks.indexOf(bookmark => bookmark.id == id);
    if (!id) {
      return res
        .status(400)
        .send('Please provide a valid id');
    }
    if (!index) {
      return res
        .status(400)
        .send('ID does match any entries');
    }
    bookmarks.splice(index, 1);
    res
      .send('Deleted');
  })