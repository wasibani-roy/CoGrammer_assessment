const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const db = require("../app/models");
var app = require('../server');
chai.use(chaiHttp);
chai.should();

describe("Posts", () => {
    describe("GET /", () => {
        // Test to get all students record
        it("should get all posts ", (done) => {
             chai.request(app)
                 .get('/api/blogs/')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('array');
                     done();
                  });
         });        // Test to get single student record
         
        // Test to get single student record
        it("should not get a single student record", (done) => {
             const id = 15;
             chai.request(app)
                 .get(`/api/blogs/${id}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     done();
                  });
         });
    });
});

describe('Test Authentication', function() {

    before('Sync and create data', done => {
        db.sequelize
            .query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true})
            .then(() => {
                db.sync({force: true});
            })
            done();
    });

    it('should Register user, login user, check token and create a Post', function(done) {
        chai.request(app)

            // register request
            .post('/api/auth/signup')

            // send user registration details
            .send({
                    'username': 'tester',
                    'email': 'tester@gmail.com',
                    'password': 'tester'
                }

            ) // this is like sending $http.post or this.http.post in Angular
            .end((err, res) => { // when we get a resonse from the endpoint

                // in other words,
                // the res object should have a status of 201
                res.should.have.status(201);

                // follow up with login
                chai.request(app)
                    .post('/api/auth/signin')
                    // send user login details
                    .send({
                        'username': 'tester',
                        'password': 'tester'
                    })
                    .end((err, res) => {
                        console.log('this runs the login part');
                        res.body.should.have.property('accessToken');
                        var token = res.body.accessToken;

                        // follow up with requesting user protected page
                        chai.request(app)
                            .post('/api/blogs')
                            .send({
                                'title': 'title from testing',
                                'description': 'another test article'
                            })
                            .set('Authorization', 'Bearer ' + token)
                            .end(function(err, res) {
                                res.should.have.status(201);
                                done();
                            });
                    })
            })
    });
    it('login user, check token and update a Post', function(done) {
                // follow up with login
                chai.request(app)
                    .post('/api/auth/signin')
                    // send user login details
                    .send({
                        'username': 'tester',
                        'password': 'tester'
                    })
                    .end((err, res) => {
                        res.body.should.have.property('accessToken');
                        var token = res.body.accessToken;
                        // follow up with requesting user protected page
                        chai.request(app)
                            .post('/api/blogs')
                            .send({
                                'title': 'title from testing',
                                'description': 'another test article'
                            })
                            .set('Authorization', 'Bearer ' + token)
                            .end(function(err, res) {
                                res.should.have.status(201);
                                chai.request(app)
                                    .get('/api/blogs')
                                    .end(function(err, response) {
                                        console.log('this runs the get part');
                                        response.body[0].should.have.property('id');
                                        var blogId = response.body[0].id
                                        chai.request(app)
                                            .put('/api/blogs/'+blogId)
                                            .send({
                                                'title': 'title from testing edit',
                                                'description': 'another test article edit'
                                            })
                                            .set('Authorization', 'Bearer ' + token)
                                            .end(function(err, resp){
                                                resp.should.have.status(200);
                                                done();
                                            });
                                    });
                            });
                    })
            
    });

    it('login user, check token and get a Post', function(done) {
        // follow up with login
        chai.request(app)
            .post('/api/auth/signin')
            // send user login details
            .send({
                'username': 'tester',
                'password': 'tester'
            })
            .end((err, res) => {
                res.body.should.have.property('accessToken');
                var token = res.body.accessToken;
                // follow up with requesting user protected page
                chai.request(app)
                    .post('/api/blogs')
                    .send({
                        'title': 'title from testing',
                        'description': 'another test article'
                    })
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        res.should.have.status(201);
                        chai.request(app)
                            .get('/api/blogs')
                            .end(function(err, response) {
                                response.body[0].should.have.property('id');
                                var blogId = response.body[0].id
                                chai.request(app)
                                    .get('/api/blogs/'+blogId)
                                    .set('Authorization', 'Bearer ' + token)
                                    .end(function(err, resp){
                                        resp.should.have.status(200);
                                        done();
                                    });
                            });
                    });
            })
    
    });

    it('login user, check token and delete a Post', function(done) {
        // follow up with login
        chai.request(app)
            .post('/api/auth/signin')
            // send user login details
            .send({
                'username': 'tester',
                'password': 'tester'
            })
            .end((err, res) => {
                res.body.should.have.property('accessToken');
                var token = res.body.accessToken;
                // follow up with requesting user protected page
                chai.request(app)
                    .post('/api/blogs')
                    .send({
                        'title': 'title from testing',
                        'description': 'another test article'
                    })
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        res.should.have.status(201);
                        chai.request(app)
                            .get('/api/blogs')
                            .end(function(err, response) {
                                response.body[0].should.have.property('id');
                                var blogId = response.body[0].id
                                chai.request(app)
                                    .delete('/api/blogs/'+blogId)
                                    .set('Authorization', 'Bearer ' + token)
                                    .end(function(err, resp){
                                        resp.should.have.status(200);
                                        done();
                                    });
                            });
                    });
            })
    
    });
})