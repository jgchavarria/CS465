# Travlr Getaways (CS 465)

Customer-facing Express + Handlebars (HBS) site, MVC style.

## Module Three
- `app_server/data/trips.json` – trip data (code, name, length, start, resort, perPerson, image, description)
- `app_server/controllers/travel.js` – reads the JSON and renders the `travel` view (errors go to the Express error handler)
- `app_server/views/travel.hbs` – loops over `trips` with `{{#each}}`; `formatDate` / `formatPrice` helpers live in `app.js`
- `app_server/views/layout.hbs` + `partials/` – shared header/footer, registered synchronously at startup

## Module Four (MongoDB + Mongoose)
- `app_server/models/db.js` – database access module: Mongoose connection (`MONGODB_URI`, default `mongodb://127.0.0.1:27017/travlr`), connection events, clean shutdown; loaded from `app.js`
- `app_server/models/travlr.js` – Trip schema with validation (required fields, code format, price >= 0, at least one description paragraph); collection `trips`
- `app_server/data/trips.json` – 6 sample trips
- `npm run seed` – validates and loads trips.json into MongoDB (stores `start` as a real Date)
- `npm run trips` – retrieves the trips from MongoDB as JSON (`node scripts/show-trips.js CODE` for one trip)
- Verify with MongoDB Compass / `mongosh`: database `travlr`, collection `trips` should show 6 documents

## Run
```
npm install
npm start        # http://localhost:3000
npm test         # route + JSON-rendering smoke tests
```
