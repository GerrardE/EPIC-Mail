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

