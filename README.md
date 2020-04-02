
[![Build Status](https://travis-ci.com/jamesbeamie/LG-api.svg?branch=develop)](https://travis-ci.com/jamesbeamie/LG-api)
[![Maintainability](https://api.codeclimate.com/v1/badges/bafc52f1778a7280814b/maintainability)](https://codeclimate.com/github/jamesbeamie/LG-api/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/bafc52f1778a7280814b/test_coverage)](https://codeclimate.com/github/jamesbeamie/LG-api/test_coverage)
# LG-API (Learners Garage):
- It's an API for a blog application that allows mentors to post content
for learners and researchers to access, comment, share, subscribe to pro, pay for pro access, bookmark and like
# Stacks
- The API is developed using NodeJs, Express server and Connecting to a mongo Database.
## Project setup
- clone the repository
- create a `.env` file in your project and add the variables as shown in the `sample .env` 
- Sample .env variables:`
LOCAL_DB=mongodb://localhost/yourlocalDB,
PORT=5000
JWT_SECRETE_KEY=averysecretekeyforauthentication `
- run `npm install` on your terminal to install dependencies.
- run `npm start` to run the server.
- run `npm test` to run tests.
## Application flow
- Authentication
- Articles
- Comments
- Subscription
- Share
### Authentication
- Regiter on application:
    {
      "username":"new user",
      "email":"user@email.com",
      "password":"Mustbe@val1dpswd"
    }
    - `Post` to `http://localhost:5000/authentication/signup`
- Login: {
      "email":"user@email.com",
      "password":"Mustbe@val1dpswd"
    }
   - `Post` to `http://localhost:5000/authentication/login`
- Social authentication: Google, facebook, twitter
### Articles
- Authenticated users can create, update and delete and publish content
- All user (both authenticated and unauthenticated) can view published content
- Authenticated users can: like, favorite and bookmark.
- Creating an article:
  - post form-data with: `title, description, body, articleImage` with a `bearer token` in the `headers` 
   - `Post` to `http://localhost:5000/articles`
- Get all articles:
   - `Get` to `http://localhost:5000/articles`
- Get Specific article
   - `Get` to `http://localhost:5000/articles/<articleID>`
- Delete an article
   - `Delete` to `http://localhost:5000/articles/<articleID>`
- Updating an article:
  - Send form-data with: `title, description, body, articleImage` with a `bearer token` in the `headers` 
   - `Patch` to `http://localhost:5000/articles/<articleID>`
### Subscriptions
- Authenticated users can subscribe to certain mentors so that they get email notifications 
### Share
- Authenticate users can share contents through social media
