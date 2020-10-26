#### Libraries and Packages Used for Server Backend
- Express: main application and framework for backend
- express-validator: field validator
- bcryptjs: password encryption
- config: global variables
- gravatar: 
- jsonwebtoken: for validation and authorization
- mongoose: object relational modeling for the database using node.js
- request: module to make http for api

**Dev Dependencies**
- nodemon: live editing and reload
- concurrently: runs our client and server simulatneously

#### Server Routes and Endpoints (routes/api)
- users.js: handling user account creation
- auth.js: handling getting jwt
- profile.js: fetching, adding, editing
- posts.js: handling creation of community posts

1. Setup Routes
2. Setup DB Models and Schema