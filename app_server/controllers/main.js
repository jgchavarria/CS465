/* Controllers for the static-content pages. Each one renders a view and tells
   the shared header/footer which nav item to highlight via `page`. */
const view = (name, title) => (req, res) =>
  res.render(name, { title: `${title} - Travlr Getaways`, page: name });

module.exports = {
  index: (req, res) => res.render('index', { title: 'Travlr Getaways', page: 'index' }),
  rooms: view('rooms', 'Rooms'),
  meals: view('meals', 'Meals'),
  news: view('news', 'News'),
  about: view('about', 'About'),
  contact: view('contact', 'Contact')
};
