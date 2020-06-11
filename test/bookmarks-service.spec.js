require('dotenv').config()
const BookmarksService = require('../src/bookmarks-service')
const knex = require('knex')
const { TEST_DB_URL } = require('../src/config')

describe('Bookmarks Service Object', function() {
  let db

  before('setup db', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  })

  const cleanBookmarks = () => db('bookmark_table').truncate();
  before('clean bookmarks', cleanBookmarks);
  afterEach('clean bookmarks', cleanBookmarks);
  after('drop connection', () => db.destroy())

  describe('GET bookmarks')
})