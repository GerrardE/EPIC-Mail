import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import {
  correctGroup, correctGroupTwo, takenName, editedName, groupNotFound, newMember, nonMember
} from '../mockDb/mockGroup';

// chai middleware
chai.use(chaiHttp);

// Define the should and expect assertion
const { should, expect } = chai;
should();

let authToken;
// Create an account. Login, then access routes with auth

describe('GROUP TESTS', () => {
  // Login and get a token
  describe('Test for Group User Login', () => {
    it('should return 200 success status', (done) => {
      chai.request(app)
        .post('/api/v2/auth/login')
        .send({
          email: 'jamesdoe@epic-mail.com',
          password: 'jamesdoe'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('object');
          expect(res.body.message).to.equal('Success: login successful!');
          expect(res.body).to.have.property('token');
          authToken = res.body.token;
          done();
        });
    });
  });

  describe('Tests for Failed Getting Groups', () => {
    it('Should return 500 for no retrieved groups', (done) => {
      chai.request(app)
        .get('/api/v2/groups')
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Error: no group found');
          done();
        });
    });
  });

  describe('Tests for Failed Edit Group Name', () => {
    it('Should return 500 for group not found', (done) => {
      const id = 1;
      chai.request(app)
        .patch(`/api/v2/groups/${id}/name`)
        .set('authorization', authToken)
        .send(groupNotFound)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Error: group not found');
          done();
        });
    });
  });

  // Tests for group creation
  describe('Tests for Creating A Group', () => {
    // Tests for group created
    it('should return 201 status for created group', (done) => {
      chai.request(app)
        .post('/api/v2/groups')
        .set('authorization', authToken)
        .send(correctGroup)
        .end((err, res) => {
          expect(res).to.have.status(201);
          res.body.should.be.a('object');
          expect(res.body.message).to.equal('Success: group created successfully!');
          done();
        });
    });
    it('should return 201 status for created group', (done) => {
      chai.request(app)
        .post('/api/v2/groups')
        .set('authorization', authToken)
        .send(correctGroupTwo)
        .end((err, res) => {
          expect(res).to.have.status(201);
          res.body.should.be.a('object');
          expect(res.body.message).to.equal('Success: group created successfully!');
          done();
        });
    });
    // Tests for group name taken
    it('should return 400 status for Group Name Taken', (done) => {
      chai.request(app)
        .post('/api/v2/groups')
        .set('authorization', authToken)
        .send(takenName)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Error: this name is taken. Please try again');
          done();
        });
    });
  });

  describe('Tests for Getting Groups', () => {
    it('Should return 200 for retrieved groups', (done) => {
      chai.request(app)
        .get('/api/v2/groups')
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Success: groups retrieved successfully!');
          done();
        });
    });
  });

  describe('Tests for Editing Group Name', () => {
    it('Should return 200 for edited group name', (done) => {
      const id = 1;
      chai.request(app)
        .patch(`/api/v2/groups/${id}/name`)
        .set('authorization', authToken)
        .send(editedName)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Success: group edited successfully!');
          done();
        });
    });
  });

  describe('Tests for Deleting a Group', () => {
    it('Should return 200 for deleted group', (done) => {
      const id = 1;
      chai.request(app)
        .delete(`/api/v2/groups/${id}`)
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Success: group deleted successfully!');
          done();
        });
    });
  });

  describe('Tests for Adding Group Member', () => {
    it('Should return 200 for added member', (done) => {
      const id = 2;
      chai.request(app)
        .post(`/api/v2/groups/${id}/users`)
        .set('authorization', authToken)
        .send(newMember)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Group member added successfully!');
          done();
        });
    });
  });

  describe('Tests for Getting Group Members', () => {
    it('Should return 200 for retrieved member', (done) => {
      const id = 2;
      chai.request(app)
        .get(`/api/v2/groups/${id}/users`)
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Success: group members retrieved.');
          done();
        });
    });
    it('Should return 400 for group not found', (done) => {
      const id = 3;
      chai.request(app)
        .get(`/api/v2/groups/${id}/users`)
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Error: group not found.');
          done();
        });
    });
  });

  describe('Tests for Failed Add Group Member', () => {
    it('Should return 400 for failed adding member', (done) => {
      const id = 3;
      chai.request(app)
        .post(`/api/v2/groups/${id}/users`)
        .set('authorization', authToken)
        .send(newMember)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Error: user not added. Try again');
          done();
        });
    });
    it('Should return 400 for non-existing user', (done) => {
      const id = 2;
      chai.request(app)
        .post(`/api/v2/groups/${id}/users`)
        .set('authorization', authToken)
        .send(nonMember)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Error: user does not exist. Try again.');
          done();
        });
    });
  });
});
