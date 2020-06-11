const BookmarksService = {
  getAllBookmarks(knex) {
    return knex.select('*').from('bookmark_table')
  },

}

module.exports = BookmarksService