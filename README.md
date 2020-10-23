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

## 2. Running tests locally and via Travis (B2)

### Requirements:
- mocha 
- chai
- fork repo & download locally this whole code
- Make sure DB is empty.

### Steps to run test locally:

1. Make sure B1 steps 1-3 are done.
1. Make sure DB is empty, delete all existing contacts.
1. Run `$npm run test` on project root directory.
    
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


## 3. B3 Use CD tool for automated deployment to a serverless service.

### How to access/use webpage deployed to a serverless service (AWS lambda):
1. Access it by using:

    i. https://ly2xlzpho6.execute-api.ap-southeast-1.amazonaws.com/dev OR

    ii. https://ly2xlzpho6.execute-api.ap-southeast-1.amazonaws.com/dev/api/contacts

2. To add any contacts or perform POST/GET/UPDATE/DELETE API you should use PostMan and:

    i. Follow through B1 steps but replace all link of `http://localhost:8080/api/contact` to `https://ly2xlzpho6.execute-api.ap-southeast-1.amazonaws.com/dev/api/contacts`

Note: 

 * Remove all contacts after adding to allow test to pass.

## Acknowledgement - For B3

Serverless set-up:
1. https://www.serverless.com/framework/docs/providers/aws/guide/credentials/
1. https://www.serverless.com/blog/serverless-express-rest-api
1. https://www.serverless.com/framework/docs/providers/aws/guide/quick-start/

Travis encryption/set-ups:
1. https://docs.travis-ci.com/user/encryption-keys#usage
1. https://blog.travis-ci.com/2019-05-30-setting-up-a-ci-cd-process-on-github

MongoDB set-up:
1. https://dev.to/adnanrahic/a-crash-course-on-serverless-apis-with-express-and-mongodb-193k
1. https://medium.com/@sergio13prez/connecting-to-mongodb-atlas-d1381f184369


## 4. How to run B4

### Requirements:
1. Download code onto your local machine.
2. Npm and Nodejs
3. Express
4. MongoDB
5. BootstrapVue.
6. Axios.
7. Basically everything needed from B1 - B3 in readme of github repo (except PostMan).

### Steps to run B4 frontend code:

#### Set-up for backend:
1. At project root directory, run $npm install
1. Check for mongoDB successfully installed by using $mongo --version
1. Run $nodemon index at root project directory.

#### Set-up for frontend:
1. Open another terminal, cd to contactapp-frontend folder.
1. Run npm run serve

### General workflow for contact app:
**To add:**
1. Add contact button should be displayed on Home page, click it.
1. Type in the required field: name, email, phone number and select gender.
    - Name should be a minimum of length 3 and alphabets only
    - Email should be a valid email.
    - Phone number must be at least length of 7, max length of 15 according to international phone number length.
    - Click dropdown to select Gender.
1. Press ‘Submit’, alert will pop-up notifying post success, press ‘Ok’.
1. Contact should be added.

**NOTE: ‘Submit’ button is disabled until the fields are in valid format.**

**To Update:**
1. Click onto the card view of the contact you wish to update.
1. An update form should show up.
    - Update field accordingly
    - Press ‘Submit’ once done, a pop-up should appear. Press ‘Ok’
    - Contact should be updated.

**NOTE: Form validation rules apply when updating as well.**

**To delete:**
1. Click on the ‘X’ button.
    - Pop-up modal should appear asking for confirmation. Click accordingly.
    - Upon clicking ‘Yes!’, an alert should appear. Press ‘Ok’ and contact should be deleted.

### Acknowledgements for B4

A quick fix to CORS issue faced when using axios.

- https://medium.com/js-dojo/how-to-deal-with-cors-error-on-vue-cli-3-d78c024ce8d3

Documents regarding Vue and Vuex, how to use it:
- https://vuejs.org/v2/guide/instance.html
- https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html

A brief introduction to developing Vue apps with BootstrapVue.
- https://www.youtube.com/watch?v=-DyKeMa5tYY

BootstrapVue & validating form:
- https://bootstrap-vue.org/docs/reference/validation
- https://vee-validate.logaretm.com/v2/guide/rules.html#excluded-params

