
[![Build Status](https://travis-ci.org/rovilay/Book-A-Meal.svg?branch=develop)](https://travis-ci.org/rovilay/Book-A-Meal)
[![Coverage Status](https://coveralls.io/repos/github/rovilay/Book-A-Meal/badge.svg?branch=develop)](https://coveralls.io/github/rovilay/Book-A-Meal?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/636939475b3c8d1d52c7/maintainability)](https://codeclimate.com/github/rovilay/Book-A-Meal/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/636939475b3c8d1d52c7/test_coverage)](https://codeclimate.com/github/rovilay/Book-A-Meal/test_coverage)
[![codecov](https://codecov.io/gh/rovilay/Book-A-Meal/branch/develop/graph/badge.svg)](https://codecov.io/gh/rovilay/Book-A-Meal)

# Book-A-Meal
Book-A-Meal is an app designed to let you order meals from your favourite resturant at your convience. To use you can check a day's menu and place orders.

# Table of Content
* [Features](features)
* [Technologies & Tools](#technologies-&-tools)
* [API](#api-documentation)
* [Installation](#installation)
* [Testing](#testing)

# Features
1. User can view menu for the day without an account
2. User is able to signin and signup as a caterer or customer
3. Customer is able to see menu for the day
4. Customer is able to place orders
5. Customer is able to cancel order after 15 mins of placing the order
6. Customer is able to view their order history
7. Caterer is able to set menu for a specific day or 2 days ahead
8. Caterer can edit or modify menu on or before the "post on" date
9. Caterer is able to create meal
10. Caterer (Admin) is able to edit or remove meal
11. Caterer (Admin) is able to see their order history
12. Caterer (Admin) is able to see their total sale for a day

# App Link
View app at [Book-A-Meal](https://book-me-a-meal.herokuapp.com/)

# API Documentation
View on [SWAGGER](https://book-me-a-meal.herokuapp.com/api/v1/api-docs)


# Technologies & Tools
* HTML - For UI templating
* SCSS - For styling UI templates
* [Font Awesome](https://fontawesome.com/) for icons
* [Node js](https://nodejs.org/en/) - Run time environment
* [NPM](https://www.npmjs.com/) - Dependency Manager
* [Express](https://expressjs.com/) - Web application framework
* [React js](https://reactjs.org/) - For interactive, responsive and dynamic UI
* [Webpack](https://webpack.js.org/) - Module bundler
* [Eslint](https://eslint.org/) - code linter
* [Babel](http://babeljs.io/) - compiler
* [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2165680) for tracking project tasks
* [Mocha](https://mochajs.org/) - testing framework
* [Chai](http://www.chaijs.com/) - assertion library for node
* [Istabul nyc](https://istanbul.js.org/) - test coverage generator

# Installation
* Install [Node js](https://nodejs.org/en/) and [PostgreSQL](https://www.postgresql.org/)
* Git clone this [repo](https://github.com/rovilay/Book-A-Meal.git)
* Install ```sequelize-cli``` globally on your local machine
* Navigate to the directory
* Run ```npm install``` to install dependencies
* Run ```sequelize db:migrate``` to migrate database to ```postgres```

#### Development
* Run ```npm start:dev``` in development
* * Navigate to ```localhost:9000``` in your browser to view app

#### Production
* Run ```npm build```
* Run ```start```
* Navigate to ```localhost:9000``` in your browser to view app

#### Testing
* Run ```npm run test```


# Release
* Version 1.0.0
  * Still in developement

# Contributing
This app is open to suggestions and contribution. To contribute follow the steps below:
* Fork this project and clone locally
* Work on the project and create a branch for each separate work
* Ensure to test your contribution
* Ensure to write good commit messages
* When done push to your origin repo
* Create a Pull request

# Authors
* **Ogooluwa Akinola**

# Acknowledgments
* [Andela](https://andela.com/)

# License
  [MIT License](https://opensource.org/licenses/MIT)
