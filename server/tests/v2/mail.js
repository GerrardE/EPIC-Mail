import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import {
  correctMessage, undefinedMessage, emptyMessage, emptySubject, undefinedSubject, undefinedToEmail, emptyToEmail
} from '../mockDb/mockMessages';

// chai middleware
chai.use(chaiHttp);

// Define the should and expect assertion
const { should, expect } = chai;
should();

let makeToken;

// Create an account. Login, then access routes with auth
describe('V2 Test for Mail User Authentication', () => {
  it('should return 201 success status', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
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
      .post('/api/v2/auth/login')
      .send({
        email: 'terryperry@gmail.com',
        password: 'terryperry'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        res.body.should.be.a('object');
        expect(res.body.message).to.equal('Success: login successful!');
        expect(res.body).to.have.property('token');
        makeToken = res.body.token;
        done();
      });
  });
});

