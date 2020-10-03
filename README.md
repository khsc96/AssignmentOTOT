# CS3219 Assignment B

Student Name: Kenny Ho Si Chong

Matriculation Number: A0185727R

[Github Repo](https://github.com/khsc96/AssignmentOTOT)

## 1. How to run B1 API locally

### Requirements:
- [NodeJS](https://nodejs.org/en/download/)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- Express - `$npm install express --save`
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Postman](https://www.postman.com/downloads/)

If missing any, download it before proceeding.

Steps to follow:

1. Clone and download code from github repo.

2. In root directory of project run in cmd line `$npm install`

3. Open another terminal, run `$mongod`. Make sure terminal is able to detect mongoDB, check by doing `$mongo --version`

4. In the project root directory run `$nodemon index`

5. Open browser go to http://localhost:8080/api/contacts. If set-up was successful, page will display `status: "success" message:" Contacts retrieved successfully data: []`

6. To `GET`, `POST`, `UPDATE` and `DELETE` use Postman to do so.

In Postman:

`POST` & `GET`
1. Enter request URL as `http://localhost:8080/api/contact`
    * For `GET` just press send 
    * For `POST`, click onto `Body` tab and tick the `x-www-form-urlencoded` option. Available key-value pairs are `name`, `email`, `phone`, `gender`, and `create_date`. After filling click send button.

`UPDATE` & `DELETE` - only able to run when atleast have a contact entry in DB

1. Enter request URL as `http://localhost:8080/api/contact/{contact_id}`, where `{contact_id}` is the id of any contact object created. Find the available `{contact_id}` by using `GET` method.
    * For `DELETE` just press send
    * For `UPDATE`, select `Patch`/`Put` on the dropdown bar, fill up `Body` tab with key-value pair, then press send.

## Acknowledgement - For B1
Followed through this [tutorial](https://medium.com/@dinyangetoh/how-to-build-simple-restful-api-with-nodejs-expressjs-and-mongodb-99348012925d
) provided in assignment pdf.

## 2. Running tests locally and via Travis

### Requirements:
- mocha 
- chai
- fork repo & download locally this whole code-based

### Steps to run test locally:

1. Make sure B1 steps 1-3 are done.
1. Run `$npm run tests` on project root directory.
    
    i. Test should be all passing upon completion.

### Steps to run on Travis:

1. Go to [Travis](https://travis-ci.com/) website

    i. Follow through this [tutorial](https://docs.travis-ci.com/user/tutorial/#to-get-started-with-travis-ci-using-github) step 1-3. Ignore step 4 and use the existing `.travis.yml` file.
1. Update something, commit and push up to your local repo, travis should be running.

    i. Build should be passing.

## Acknowledgement - For B2
Writing test files for node.js projects:
1. Referenced general concept of mocha and chai [link](https://dev.to/bushraalam/introduction-to-testing-with-mocha-and-chai-57po) given and this [tutorial](https://medium.com/@asciidev/testing-a-node-express-application-with-mocha-chai-9592d41c0083).

Travis tutorial and set-up:
1. [Setting-up Travis](https://docs.travis-ci.com/user/tutorial/#to-get-started-with-travis-ci-using-github)
1. [Travis job lifecycle](https://docs.travis-ci.com/user/job-lifecycle)
1. [Travis customising build](https://docs.travis-ci.com/user/customizing-the-build/)
1. [Possible node_js version in yml file](https://medium.com/@nodejs/choosing-the-node-js-versions-for-your-ci-tests-hint-use-lts-89b67f68d7ca)
1. [Building a JavaScript and Node.js project with travis](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/)
