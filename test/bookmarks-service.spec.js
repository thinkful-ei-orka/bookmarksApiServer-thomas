require('dotenv').config()
const BookmarksService = require('../src/bookmarks-service')
const knex = require('knex')
const { TEST_DB_URL, API_TOKEN } = require('../src/config')
const app = require('../src/app')

describe('Bookmarks Service Object', function () {
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

      it(`should delete a bookmark by id`, () => {

      })


    })


  })

  context('when bookmarks has no data', () => {
    describe(`POST /bookmark`, () => {
      it(`creates a bookmark, responding with 201 and the new bookmark`, () => {
        const newBookmark = {
          title: 'bookmark',
          url: 'http://www.google.com',
          description: 'google is a bookmark',
          rating: '4'
        }
        return supertest(app)
          .post('/bookmarks')
          .set('Authorization', `Bearer ${API_TOKEN}`)
          .send(newBookmark)
          .expect(201)
          .expect(res => {
            expect(res.body.title).to.eql(newBookmark.title)
            expect(res.body.url).to.eql(newBookmark.url)
            expect(res.body.description).to.eql(newBookmark.description)
            expect(res.body).to.have.property('id')
          })
      })

      it(`responds with a 400 and an error message the 'title' is not inputted`, () => {
        const newBookmark = {
          url: 'http://www.google.com',
          description: 'google is a bookmark',
          rating: '4'
        }
        return supertest(app)
          .post('/bookmarks')
          .set('Authorization', `Bearer ${API_TOKEN}`)
          .send(newBookmark)
          .expect(400, {
            error: { message: 'Title is required' }
          })
      })
    })
  })
})