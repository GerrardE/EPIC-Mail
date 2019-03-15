# EPIC-Mail
[![Build Status](https://travis-ci.org/GerrardE/EPIC-Mail.svg?branch=develop)](https://travis-ci.org/GerrardE/EPIC-Mail)
[![Maintainability](https://api.codeclimate.com/v1/badges/f14bbea59c2f8aeab9b6/maintainability)](https://codeclimate.com/github/GerrardE/EPIC-Mail/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/GerrardE/EPIC-Mail/badge.svg?branch=ch-api-setup-continuous-integration-%23164500990)](https://coveralls.io/github/GerrardE/EPIC-Mail?branch=ch-api-setup-continuous-integration-%23164500990)
## Description

A simple web application where users can be able to exchange emails.

<br/><b>Project Plan with PIVOTAL TRACKER:</b> https://www.pivotaltracker.com/n/projects/2314408
<br/><b>UI-pages:</b> https://gerrarde.github.io/EPIC-Mail/UI/login.html
<br/><b> Hosted API on Heroku: </b> https://epic-m.herokuapp.com
<br/><b> API documentation: </b> https://epic-m.herokuapp.com/swagger-api/swagger.yaml

## Features

Below are the basic features of EPIC-Mail Application at this point

###

- Users can signup <br>
- Users can login <br>
- Users can send a message to individuals<br>
- Users can view their inbox and read messages<br>
- Users can retract sent messages<br>
- Users can save an email as draft and send it later or delete it<br>
  <br/>

## API Endpoints

<table>

<tr><th>HTTP VERB</th><th>API ENDPOINT</th><th>FUNCTION</th><th>INPUT</th><th>OUTPUT</th></tr>

<tr>
<td>POST</td> <td>api/v1/auth/signup</td>  <td>User Sign Up</td>
<td>
{<br> firstName: "string",<br>lastName: "string",<br>email: "string",<br> password: "string"<br>}
</td>
<td>
{<br> message: "string",<br>token: "string"<br>}
</td>
</tr>

<tr>
<td>POST</td> <td>api/v1/auth/login</td>  <td>User Login</td>
<td>
{<br> email: "string",<br>password: "string"<br>}
</td>
<td>
{<br> message: "string",<br>token: "string"<br>}
</td>
</tr>
</table>

## Installation

1. Clone this repository below:

```
https://github.com/GerrardE/EPIC-Mail.git
```

2. cd into the repository:

```
cd EPIC-Mail
```

3. Open the repository in terminal and Install dependencies by running:

```
npm install
```

4. Create a database for the project

5. Create a .env file in the root directory and setup your database credentials and token key

6. Run "npm start" to start the app

7. Use Postman to test all endpoints

8. Run "npm test" to test all endpoints

## Technologies

ES6: See [here](https://en.wikipedia.org/wiki/ECMAScript) for details.

NodeJS: An open-source, cross-platform JavaScript run-time environment which allows you enjoy the features of Javascript off the web browsers and implement server-side web development. Visit [here](https://nodejs.org/en/) for details.

ExpressJS: This is the web application framework for Node.js Visit [here](https://expressjs.com) for details.

Postgresql Database: PostgreSQL is a powerful, open source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads. Visit [here](https://www.postgresql.org/docs) for details.

Airbnb JavaScript style guide was adopted as a coding convention, see [here](https://github.com/airbnb/javascript) for details.

**_This project is still under development phase. PLS CHECK BACK FOR UPDATES_**
