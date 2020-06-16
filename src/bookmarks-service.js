const BookmarksService = {
  getAllBookmarks(knex) {
    return knex.select('*').from('bookmark_table')
  },

  getById(knex, id) {
    return knex
      .from('bookmark_table')
      .select('*')
      .where('id', id)
      .first()
  },

  insertNewBookmark(knex, bookmark) {
    return knex
      .insert(bookmark)
      .into('bookmark_table')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  deleteBookmark(knex, id) {
    return knex('bookmark_table')
      .where({id})
      .delete()
  },

  updateBookmark(knex, idToUpdate, newBookmark) {
    return knex
      .where({idToUpdate})
      .update(newBookmark)
  }

}

module.exports = BookmarksService