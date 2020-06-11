require('dotenv').config()
const BookmarksService = require('../src/bookmarks-service')
const knex = require('knex')
const { TEST_DB_URL, API_TOKEN } = require('../src/config')
const app = require('../src/app')

describe('Bookmarks Service Object', function() {
  let db

  before('setup db', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db)
  })

  const cleanBookmarks = () => db('bookmark_table').truncate();
  before('clean bookmarks', cleanBookmarks);
  afterEach('clean bookmarks', cleanBookmarks);
  after('drop connection', () => db.destroy())

  describe('GET bookmarks', () => {
    const bookmarksTest = [
      {
        "id": 1,
        "title": "Best Bookmark",
        "url": "http://www.thebestest.com",
        "description": "The Best Site Ever",
        "rating": 5
      }, 
      {
        "id": 2,
        "title": "NOT Best Bookmark",
        "url": "http://www.notthebestest.com",
        "description": "NOT The Best Site Ever",
        "rating": 1
      }
    ]
    context('when bookmarks has data', () => {
      
      beforeEach('instert bookmarks', () => {
        return db('bookmark_table').insert(bookmarksTest)
      })

      it('should return 200 with all bookmarks', () => {
        return supertest(app)
          .get('/bookmarks')
          .set('Authorization', 'Bearer ' + API_TOKEN)
          .expect(200, bookmarksTest);
      })

      it('should return bookmark by id', () => {
        const bookmarkId = 2
        const expectedBookmark = bookmarksTest[bookmarkId - 1]
        return supertest(app)
          .get(`/bookmarks/${bookmarkId}`)
          .set('Authorization', `Bearer ${API_TOKEN}`)
          .expect(200, expectedBookmark)
      })

    })

    context('when bookmarks has no data', () => {

    })
  })
})