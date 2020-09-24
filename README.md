# CS3219 Assignment B

Student Name: Kenny Ho Si Chong

Matriculation Number: A0185727R

[Github Repo](https://github.com/khsc96/AssignmentOTOT)

## How to run B1 API locally

### Requirements
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

## Acknowledgement
Followed through this [tutorial](https://medium.com/@dinyangetoh/how-to-build-simple-restful-api-with-nodejs-expressjs-and-mongodb-99348012925d
) provided in assignment pdf.
