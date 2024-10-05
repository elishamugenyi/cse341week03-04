# cse341week03-04
Node.js project that operates CRUD on a mongodb
## After creating project directory
- run npm init --y to install package-json file
- npm install --save-dev dotenv to install dependencies, plus others.
-

## Documentation for the Routes/APIs.

- GET Route
// GET all items in personaldata collection
and written as route.get('getpersaonaldata object')

- POST Route
// POST/CREATE a new item to the personaldata collection written as
router.post('/', controllerlogic.functiontopostdata)

- PUT Route 
// PUT (update) an item by ID written as
router.put('/:id', Controllerlogic.functiontoupdateitem)

- DELETE Route
// DELETE an item by ID written as
router.delete('/:id', Controllerlogic.functiontodeleteitem)

All these routes are found in the routes file inside the routes folder. The controllerlogic is found in the controller file inside the controller folder. Ensure to export all functions and files into the files that has routes.