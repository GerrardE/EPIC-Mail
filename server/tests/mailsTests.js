import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import {
  correctMessage, undefinedMessage, emptyMessage, emptySubject, undefinedSubject
} from './mockData/mockMessages';

// chai middleware
chai.use(chaiHttp);

// Define the should and expect assertion
const { should, expect } = chai;
should();

// Tests for posting messages
describe('Tests for POST Messages', () => {
  it('should return 200 status for Sent Messages', (done) => {
    chai.request(app)
      .post('/api/v1/messages')
      .send(correctMessage)
      .end((err, res) => {
        expect(res).to.have.status(200);
        res.body.should.be.a('object');
        expect(res.body.data[0].message).to.equal('Success: Message sent successfully!');
        done();
      });
  });
  // Tests for Message Subject
  it('should return 400 status for Undefined Subject', (done) => {
    chai.request(app)
      .post('/api/v1/messages')
      .send(undefinedSubject)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data[0].message).to.equal('Error: subject cannot be undefined');
        done();
      });
  });
  it('should return 400 status for Empty Subject', (done) => {
    chai.request(app)
      .post('/api/v1/messages')
      .send(emptySubject)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data[0].message).to.equal('Error: subject field cannot be empty');
        done();
      });
  });

  // Tests for Message
  it('should return 400 status for Undefined Message', (done) => {
    chai.request(app)
      .post('/api/v1/messages')
      .send(undefinedMessage)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data[0].message).to.equal('Error: message cannot be undefined');
        done();
      });
  });
  it('should return 400 status for Empty Message', (done) => {
    chai.request(app)
      .post('/api/v1/messages')
      .send(emptyMessage)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data[0].message).to.equal('Error: message field cannot be empty');
        done();
      });
  });
});

// Tests for retrieving messages
describe('Tests for GET all messages', () => {
  it('Should return 200 for retrieved messages', (done) => {
    chai.request(app)
      .get('/api/v1/messages')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body.data[0].message).to.equal('Success: messages retrieved successfully!');
        done();
      });
  });
});

describe('Tests for GET all unread messages', () => {
  it('Should return 200 for retrieved unread messages', (done) => {
    chai.request(app)
      .get('/api/v1/messages/unread')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body.data[0].message).to.equal('Success: unread mails retrieved successfully!');
        done();
      });
  });
});

describe('Tests for GET all sent messages', () => {
  it('Should return 200 for retrieved sent messages', (done) => {
    chai.request(app)
      .get('/api/v1/messages/sent')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body.data[0].message).to.equal('Success: sent mails retrieved successfully!');
        done();
      });
  });
});

describe('Tests for GET a specific mail', () => {
  it('Should return 200 for retrieved specific mail', (done) => {
    const id = 1;
    chai.request(app)
      .get(`/api/v1/messages/${id}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body.data[0].message).to.equal('Success: mail retrieved successfully!');
        done();
      });
  });
});

describe('Tests for DELETE a specific mail', () => {
  it('Should return 200 for deleted specific mail', (done) => {
    const id = 1;
    chai.request(app)
      .delete(`/api/v1/messages/${id}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body.data[0].message).to.equal('Success: mail deleted successfully!');
        done();
      });
  });
  it('Should return 404 for mail not found', (done) => {
    const id = 7;
    chai.request(app)
      .delete(`/api/v1/messages/${id}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        expect(res.body.data[0].message).to.equal('Error: mail not found');
        done();
      });
  });
});
