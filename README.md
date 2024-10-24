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

## To implement OAuth2 with GitHub in Node.js project, follow these steps:

# 1. Install necessary packages:
- You need the passport, passport-github2, express-session, and dotenv packages. - - Install them using:
-  npm install passport passport-github2 express-session dotenv
# 2. Set up environment variables:
Create a .env file in the root of your project and add your GitHub credentials:- 
- GITHUB_CLIENT_ID=your_client_id
- GITHUB_CLIENT_SECRET=your_client_secret
- GITHUB_CALLBACK_URL=http://localhost:8080/auth/github/callback
- To create a SESSION_SECRET, i add a generatesecret.js file in the root of my folder, then run it in the terminal, it will generate the secret. Use the session secret in .env file.