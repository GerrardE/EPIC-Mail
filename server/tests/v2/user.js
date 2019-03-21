import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import {
  correctUser, undefinedFirstName, unstringedFirstName,
  emptyFirstName, invalidFirstNameLength, invalidFirstNameCharacter,
  undefinedLastName, unstringedLastName, emptyLastName, invalidLastNameLength,
  invalidLastNameCharacter, undefinedEmail, unstringedEmail, emptyEmail, invalidEmailLength,
  invalidEmailCharacter, existingEmail, undefinedPassword, unstringedPassword, emptyPassword,
  invalidPasswordLength, whitespacePassword, correctLogin, undefinedEmailLogin, emptyEmailField,
  unstringedEmailLogin, nonExistingEmail, undefinedPasswordLogin, emptyPasswordField,
  unstringedPasswordLogin, correctEmailIncorrectPassword
} from '../mockDb/mockUser';

// chai middleware
chai.use(chaiHttp);
// Define the should and expect assertion
const { should, expect } = chai;
should();

describe('V2 Tests for User Sign Up', () => {
  it('should return 201 success status', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(correctUser)
      .end((err, res) => {
        expect(res).to.have.status(201);
        res.body.should.be.a('object');
        expect(res.body.message).to.equal('Success: User created successfully!');
        expect(res.body).to.have.property('token');
        done();
      });
  });
  // firstName Tests
  it('should return 400 status for undefined First Name', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(undefinedFirstName)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('First name field cannot be empty');
        done();
      });
  });
  it('should return 400 status for unstringed First Name', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(unstringedFirstName)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('First name must be a string');
        done();
      });
  });
  it('should return 400 status for empty First Name', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(emptyFirstName)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('First name field cannot be empty');
        done();
      });
  });
  it('should return 400 status for invalid First Name length', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(invalidFirstNameLength)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('First name should be 4 to 50 aplhabets long');
        done();
      });
  });
  it('should return 400 status for invalid First Name character', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(invalidFirstNameCharacter)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('First name accepts only alphabets');
        done();
      });
  });
  // LastName Tests
  it('should return 400 status for undefined Last Name', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(undefinedLastName)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Last name field is required');
        done();
      });
  });
  it('should return 400 status for unstringed Last Name', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(unstringedLastName)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Last name must be a string');
        done();
      });
  });
  it('should return 400 status for empty Last Name', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(emptyLastName)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Last name field cannot be empty');
        done();
      });
  });
  it('should return 400 status for invalid Last Name length', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(invalidLastNameLength)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Last name should be 4 to 50 aplhabets long');
        done();
      });
  });
  it('should return 400 status for invalid Last Name character', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(invalidLastNameCharacter)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Last name accepts only alphabets');
        done();
      });
  });
  // Email Tests
  it('should return 400 status for an undefined Email', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(undefinedEmail)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Error: email field is required');
        done();
      });
  });
  it('should return 400 status for an unstringed Email', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(unstringedEmail)
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('Error: email should be a string');
        done();
      });
  });
  it('should return 400 status for empty Email Field', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(emptyEmail)
      .end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('object');
        expect(res.body.message).to.equal('Error: email cannot be empty.');
        done();
      });
  });
  // Password Tests
  it('should return 400 status for undefined Password', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(undefinedPassword)
      .end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('object');
        expect(res.body.message).to.equal('Error: password field cannot be empty');
        done();
      });
  });
  it('should return 400 status for empty Password Field', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(emptyPassword)
      .end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('object');
        expect(res.body.message).to.equal('Error: password field cannot be empty');
        done();
      });
  });
  it('should return 400 status for an unstringed Password', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(unstringedPassword)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Error: password should be a string');
        done();
      });
  });
  it('should return 400 status for White space Password', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(whitespacePassword)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Error: password cannot contain spaces');
        done();
      });
  });
});
describe('V2 Tests for User Login', () => {
  it('should return 200 success status', (done) => {
    chai.request(app)
      .post('/api/v2/auth/login')
      .send(correctLogin)
      .end((err, res) => {
        expect(res).to.have.status(200);
        res.body.should.be.a('object');
        expect(res.body.message).to.equal('Success: login successful!');
        expect(res.body).to.have.property('token');
        done();
      });
  });
  // Email Tests
  it('should return 400 status for an undefined Email', (done) => {
    chai.request(app)
      .post('/api/v2/auth/login')
      .send(undefinedEmailLogin)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Error: email field cannot be empty');
        done();
      });
  });
  it('should return 400 status for an unstringed Email', (done) => {
    chai.request(app)
      .post('/api/v2/auth/login')
      .send(unstringedEmailLogin)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Error: email should be a string');
        done();
      });
  });
  it('should return 400 status for empty Email Field', (done) => {
    chai.request(app)
      .post('/api/v2/auth/login')
      .send(emptyEmailField)
      .end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('object');
        expect(res.body.message).to.equal('Error: email field cannot be empty.');
        done();
      });
  });
  it('should return 404 status for Invalid credentials', (done) => {
    chai.request(app)
      .post('/api/v2/auth/login')
      .send(nonExistingEmail)
      .end((err, res) => {
        expect(res).to.have.status(404);
        res.body.should.be.a('object');
        expect(res.body.message).to.equal('Error: Invalid credentials');
        done();
      });
  });
  // Password Tests
  it('should return 400 status for Undefined Password Login', (done) => {
    chai.request(app)
      .post('/api/v2/auth/login')
      .send(undefinedPasswordLogin)
      .end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('object');
        expect(res.body.message).to.equal('Error: password field cannot be empty');
        done();
      });
  });
  it('should return 400 status for empty Password Field', (done) => {
    chai.request(app)
      .post('/api/v2/auth/login')
      .send(emptyPasswordField)
      .end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('object');
        expect(res.body.message).to.equal('Error: password field cannot be empty');
        done();
      });
  });
  it('should return 400 status for an unstringed Password', (done) => {
    chai.request(app)
      .post('/api/v2/auth/login')
      .send(unstringedPasswordLogin)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Error: password should be a string');
        done();
      });
  });
});
