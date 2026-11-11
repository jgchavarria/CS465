# Travlr Getaways (CS 465)

Customer-facing Express + Handlebars (HBS) site, MVC style.

## Module Three
- `app_server/data/trips.json` – trip data (code, name, length, start, resort, perPerson, image, description)
- `app_server/controllers/travel.js` – reads the JSON and renders the `travel` view (errors go to the Express error handler)
- `app_server/views/travel.hbs` – loops over `trips` with `{{#each}}`; `formatDate` / `formatPrice` helpers live in `app.js`
- `app_server/views/layout.hbs` + `partials/` – shared header/footer, registered synchronously at startup

## Run
```
npm install
npm start        # http://localhost:3000
npm test         # route + JSON-rendering smoke tests
```
