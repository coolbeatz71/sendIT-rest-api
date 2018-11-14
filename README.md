[![Build Status](https://travis-ci.org/coolbeatz71/sendIT-rest-api.svg?branch=master)](https://travis-ci.org/coolbeatz71/sendIT-rest-api)         [![Coverage Status](https://coveralls.io/repos/github/coolbeatz71/sendIT-rest-api/badge.svg?branch=master)](https://coveralls.io/github/coolbeatz71/sendIT-rest-api?branch=master) [![Maintainability](https://api.codeclimate.com/v1/badges/00cb45ccabfd125bbb79/maintainability)](https://codeclimate.com/github/coolbeatz71/sendIT-rest-api/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/00cb45ccabfd125bbb79/test_coverage)](https://codeclimate.com/github/coolbeatz71/sendIT-rest-api/test_coverage)

# sendIT-rest-api
**Simple NodeJS REST-API**: SendIT is a courier service that helps users deliver parcels to different destinations. SendIT provides courier quotes based on weight categories.

### How to Use?

The app can be accessed on heroku via this [http://sendit-rest-api.herokuapp.com/api/v1/](http://sendit-rest-api.herokuapp.com/api/v1/)
---
#### Routes about the user
| Routes                       | Functionality                                          | Authorization header  | 
| -----------------------------|:------------------------------------------------------ |:--------------------- |
| **POST** /user/signIn        | Login the user to his account                          | No                    |
| **POST** /user/signUp        | Register a new user                                    | No                    |
| **GET** /user/:userId/parcels| Fetch all parcels order of one user                    | Yes (user token)      |
| **GET** /user/parcels/count  | Get the number of parcels order of one user by category| Yes (user token)      |
---
#### Routes about the admin

| Routes                               | Functionality                                           | Authorization header  | 
| -------------------------------------|:------------------------------------------------------- | --------------------- |
| **POST** /admin/signIn               | Login the admin to his account                          | No                    |
| **PUT** /admin/parcels/:parcelId/edit| Edit presentLocation/status of a parcel order for a user| Yes (admin token)     |
| **GET** /admin/parcels/count         | Get the number of parcels order of all users by category| Yes (admin token)     |
---
#### Common routes about parcels delivery order
| Routes                                  | Functionality                                           | Authorization header  | 
| ----------------------------------------|:------------------------------------------------------- | --------------------- |
| **GET** /parcels                        | Fetch all parcel delivery orders for all users          | Yes (user token)      |
| **POST** /parcels                       | Create a parcel delivery order by a user                | Yes (user token)      |
| **GET** /parcels/:orderId               | Get one parcel delivery order by its id                 | Yes (user token)      |
| **PUT** /parcels/:parcelId/destination  | Edit the destination of a parcel delivery order         | Yes (user token)      |
| **PUT** /parcels/:parcelId/cancel       | Cancel a parcel delivery order                          | Yes (user token)      |
---
### Body params for POST and PUT requests (JSON)

1. **POST** /user/signIn     `email, password` 
2. **POST** /user/signUp    `firstName, lastName, email, password`
3. **POST** /admin/signIn   `email, password`
4. **PUT** /admin/parcels/:parcelId/edit   `presentLocation, status`
5. **POST** /parcels   `parcelName, description, pickupLocation, destination, weight`
6. **PUT** /parcels/:parcelId/destination   `destination`
7. **PUT** /parcels/:parcelId/cancel    : `doesnt have body params`

### Protected route

Some routes for both the user and admin are protected and require respective **Authorization** Header to be set in the request.
The Authorization is of type `Bearer ${ token }`. And the token can be found in the folder named `files` that save user and admin informations.

#### Examples
 - admin: `Bearer a47aa345465ef64919f8a268803f9f389bdb5986ecf8eaf61b3004e18644c9ca`
 - user: `Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe`
