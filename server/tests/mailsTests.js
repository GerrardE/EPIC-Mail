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
