export const createBook = (id, title, author, year, isRead = false) => ({
  id,
  title,
  author,
  year,
  isRead,
});