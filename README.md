
[![Build Status](https://travis-ci.com/jamesbeamie/LG-api.svg?branch=develop)](https://travis-ci.com/jamesbeamie/LG-api)
[![Maintainability](https://api.codeclimate.com/v1/badges/bafc52f1778a7280814b/maintainability)](https://codeclimate.com/github/jamesbeamie/LG-api/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/bafc52f1778a7280814b/test_coverage)](https://codeclimate.com/github/jamesbeamie/LG-api/test_coverage)
# LG-API (Learners Garage):
- It's an API for a blog application that allows mentors to post content
for learners and researchers to access, comment, share, subscribe to pro, pay for pro access, bookmark and like
# Stacks
- The API is developed using NodeJs, Express server and Connecting to a mongo Database.
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
- Social authentication: Google, facebook, twitter
### Articles
- Authenticated users can create, update and delete and publish content
- All user (both authenticated and unauthenticated) can view published content
- Authenticated users can: like, favorite and bookmark.
### Subscriptions
- Authenticated users can subscribe to certain mentors so that they get email notifications 
### Share
- Authenticate users can share contents through social media
