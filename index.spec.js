const app = require('./index');
const request = require('supertest');

describe('GET /users 는', () => {
    it('...', (done) => {
        request(app)
        .get('/users')
        .end((err, res) => {
            console.log(res.body);
            done();
        })
    })
})
