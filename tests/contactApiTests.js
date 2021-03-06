let app = require('../index');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

let contactModel = require('../contactModel');
const { update } = require('../contactModel');
const { before } = require('mocha');

// Configure chai
chai.use(chaiHttp);

// Default contact
let testContact = {
    name: "Test1",
    email: "Test1@gmail.com",
    gender: "Male",
    phone: "88855532"
}

// Extend timeout time for travis

// TODO test cases here
describe("Testing of API", function() {
    let contactsPosted = {};
    this.timeout(10000);
    before((done) => {
        // Before test, empty database
        contactModel.remove({}, (err) => {
            done();
        });
    });

    describe("POST API", () => {
        it("it should POST a contact", (done) => {
            chai.request(app)
                .post('/api/contacts')
                .send(testContact)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('New contact created!')
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('name').eql("Test1");
                    res.body.data.should.have.property('email').eql("Test1@gmail.com");
                    res.body.data.should.have.property('gender').eql("Male");
                    res.body.data.should.have.property('phone').eql("88855532");
                    contactsPosted = res.body.data;
                    done();
                });
        }).timeout(5000);
    });

    describe("GET API", () => {
        it("it should GET no contacts db", (done) => {
            chai.request(app)
                .get('/api/contacts')
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.length.should.be.eql(1);
                    done();
                })
        });
        it('it GET contacts by /GET/:id route', (done) => {
            const contactID = contactsPosted._id;
            chai.request(app)
                .get('/api/contacts/' + contactID)
                .end((err, res) => {
                    res.should.have.a.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.a.property('data');
                    res.body.data.should.have.property('_id').eql(contactID);
                    res.body.data.should.have.property('name').eql('Test1');
                    res.body.data.should.have.property('email').eql('Test1@gmail.com');
                    res.body.data.should.have.property('gender').eql('Male');
                    res.body.data.should.have.property('phone').eql('88855532');
                    done();
                })
        })
    });
    describe("UPDATE API", () => {
        it('it should PUT and update contact with given id', (done) => {
            const contactID = contactsPosted._id;
            const updateData = {
                name : "Changed",
                email : "Changed@gmail.com",
                gender : "Female",
                phone : "999",
            }
            chai.request(app)
                .put('/api/contacts/' + contactID)
                .send(updateData)
                .end((err, res) => {
                    res.should.have.a.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.a.property('data');
                    res.body.data.should.have.property('_id').eql(contactID);
                    res.body.data.should.have.property('name').eql('Changed');
                    res.body.data.should.have.property('email').eql('Changed@gmail.com');
                    res.body.data.should.have.property('gender').eql('Female');
                    res.body.data.should.have.property('phone').eql('999');
                    done();
                })
        })

    }).timeout(5000);
    describe("DELTE API", () => {
        it('it should delete existing contact with id', (done) => {
            const contactID = contactsPosted._id;
            chai.request(app)
                .delete('/api/contacts/' + contactID)
                .end((err, res) => {
                    res.should.have.a.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    res.body.should.have.property('message').eql('Contact deleted');
                    done();
                })
        })

    });
});