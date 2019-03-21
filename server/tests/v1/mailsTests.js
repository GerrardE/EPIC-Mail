import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import {
  correctMessage, undefinedMessage, emptyMessage, emptySubject, undefinedSubject, undefinedToEmail, emptyToEmail
} from '../mockData/mockMessages';

// chai middleware
chai.use(chaiHttp);

// Define the should and expect assertion
const { should, expect } = chai;
should();

let authToken;

// Create an account. Login, then access routes with auth
describe('Test for User SignUp/Login', () => {
  it('should return 201 success status', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Terry',
        lastName: 'Perry',
        email: 'terryperry@gmail.com',
        password: 'terryperry'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        res.body.should.be.a('object');
        expect(res.body.message).to.equal('Success: User created successfully!');
        expect(res.body).to.have.property('token');
        done();
      });
  });
  it('should return 200 success status', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'terryperry@gmail.com',
        password: 'terryperry'
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

// Tests for posting messages
describe('Tests for POST Messages', () => {
  it('should return 200 status for Sent Messages', (done) => {
    chai.request(app)
      .post('/api/v1/messages')
      .set('authorization', authToken)
      .send(correctMessage)
      .end((err, res) => {
        expect(res).to.have.status(200);
        res.body.should.be.a('object');
        expect(res.body.message).to.equal('Success: Message sent successfully!');
        done();
      });
  });
  // Tests for Message Subject
  it('should return 400 status for Undefined Subject', (done) => {
    chai.request(app)
      .post('/api/v1/messages')
      .set('authorization', authToken)
      .send(undefinedSubject)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Error: subject cannot be undefined');
        done();
      });
  });
  it('should return 400 status for Empty Subject', (done) => {
    chai.request(app)
      .post('/api/v1/messages')
      .set('authorization', authToken)
      .send(emptySubject)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Error: subject field cannot be empty');
        done();
      });
  });

  // Tests for Message
  it('should return 400 status for Undefined Message', (done) => {
    chai.request(app)
      .post('/api/v1/messages')
      .set('authorization', authToken)
      .send(undefinedMessage)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Error: message cannot be undefined');
        done();
      });
  });
  it('should return 400 status for Empty Message', (done) => {
    chai.request(app)
      .post('/api/v1/messages')
      .set('authorization', authToken)
      .send(emptyMessage)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Error: message field cannot be empty');
        done();
      });
  });

  // Tests for Email
  it('should return 400 status for Undefined ToEmail', (done) => {
    chai.request(app)
      .post('/api/v1/messages')
      .set('authorization', authToken)
      .send(undefinedToEmail)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Error: email field cannot be empty');
        done();
      });
  });
  it('should return 400 status for Empty ToEmail', (done) => {
    chai.request(app)
      .post('/api/v1/messages')
      .set('authorization', authToken)
      .send(emptyToEmail)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Error: email field cannot be empty.');
        done();
      });
  });
});

// Tests for retrieving messages
describe('Tests for GET all messages', () => {
  it('Should return 200 for retrieved messages', (done) => {
    chai.request(app)
    .get('/api/v1/messages')
    .set('authorization', authToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.equal('Success: messages retrieved successfully!');
        done();
      });
  });
});

describe('Tests for GET all unread messages', () => {
  it('Should return 200 for retrieved unread messages', (done) => {
    chai.request(app)
    .get('/api/v1/messages/unread')
    .set('authorization', authToken)
    .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.equal('Success: unread mails retrieved successfully!');
        done();
      });
  });
});

describe('Tests for GET all sent messages', () => {
  it('Should return 200 for retrieved sent messages', (done) => {
    chai.request(app)
    .get('/api/v1/messages/sent')
    .set('authorization', authToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.equal('Success: sent mails retrieved successfully!');
        done();
      });
  });
});

describe('Tests for GET a specific mail', () => {
  it('Should return 200 for retrieved specific mail', (done) => {
    const id = 1;
    chai.request(app)
    .get(`/api/v1/messages/${id}`)
    .set('authorization', authToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.equal('Success: mail retrieved successfully!');
        done();
      });
  });
});

