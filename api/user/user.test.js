// 테스트 코드
const request = require('supertest');
const should = require('should');
const app = require('../../'); // 자동으로 index.js 를 가져옴
const models = require('../../models');


//done은 
describe('GET /users 는', () => {
    const users = [{name : 'alice'}, {name : 'bel'}, {name : 'chris'}]
    // db 싱크는 비동기라 done 필요하다. 모카에서는 done을 하지 않고 return만 해줘도
    // Promise객체로 반환되는 db sync를 비동기가 끝날때까지 기다렸다 반환해준다.
    before(() => models.sequelize.sync({force:true}));
    before(() => models.User.bulkCreate(users)); // 샘플데이터 집어넣기
    describe('성공시', () => {
        it('유저 객체를 담은 배열로 응답한다', (done) => {
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.an.Array();
                    done();
                })
        })
        it('최대 limit 갯수만큼 응답한다', (done) => {
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    res.body.should.have.length(2);
                    done();
                })
        });
    });
    describe('실패시', () => {
        it('limit이 숫자형이 아니면 400을 응답한다', (done) => {
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done);
        })
    })
})
describe('GET /users/:id', () => {
    const users = [{name : 'alice'}, {name : 'bel'}, {name : 'chris'}]
    before(() => models.sequelize.sync({force:true}));
    before(() => models.User.bulkCreate(users));
    describe('성공시', () => {
        it('id가 1인 유저 객체를 반환한다', (done) => {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1)
                    done();
                });
        });

    })

    describe('실패시', () => {
        it('id가 숫자가 아닐경우 400으로 응답한다', (done) => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done);
        });
        it('id로 유저를 찾을 수 없을 경우 404로 응답한다.', (done) => {
            request(app)
                .get('/users/999')
                .expect(404)
                .end(done);
        });
    })
})

describe('DELETE /users/:id', () => {
    const users = [{name : 'alice'}, {name : 'bel'}, {name : 'chris'}]
    before(() => models.sequelize.sync({force:true}));
    before(() => models.User.bulkCreate(users));
    describe('성공시', () => {
        it('204를 응답한다', (done) => {
            request(app)
                .delete('/users/1')
                .expect(204).end(done);
        })
    })
    describe('실패시', () => {
        it('id가 숫자가 아닐 경우 400을 응답한다', (done) => {
            request(app)
                .delete('/users/one')
                .expect(400).end(done);
        })
    })
})
describe('POST /users/:id', () => {
    const users = [{name : 'alice'}, {name : 'bel'}, {name : 'chris'}]
    before(() => models.sequelize.sync({force:true}));
    before(() => models.User.bulkCreate(users));
    describe('성공시', () => {
        let body;
        let name = 'daniel';
        before(done => {
            request(app)
                .post('/users')
                .send({
                    name
                }).expect(201).end((err, res) => {
                    body = res.body;
                    done();
                });
        });
        it('생성된 유저 객체를 반환한다', () => {
            body.should.have.property('id');
        })
        it('입력한 name을 반환한다', () => {
            body.should.have.property('name', name)
        })
    })
    describe('실패시', () => {
        it('name 파라미터 누락시 400을 반환한다', (done) => {
            request(app)
            .post('/users')
            .send({})
            .expect(400)
            .end(done);
        })
        it('name이 중복일 경우 409를 반환한다', (done) => {
            request(app)
            .post('/users')
            .send({name : 'bel'})
            .expect(409)
            .end(done);
        })
    })
});
describe('PUT /users/:id', () => {
    const users = [{name : 'alice'}, {name : 'bel'}, {name : 'chris'}]
    before(() => models.sequelize.sync({force:true}));
    before(() => models.User.bulkCreate(users));
    describe('성공시', () => {
        it('변경된 name을 응답한다', done => {
            const name = 'charley';
            request(app)
            .put('/users/3')
            .send({name})
            .end((err, res) => {
                // 응답이 오는 부분
                res.body.should.have.property('name', name);
                done();
            });
        })
    })
    describe('실패시', () => {
        it('정수가 아닌 id일 경우 400을 응답한다', done => {
            request(app)
            .put('/users/one')
            .expect(400)
            .end(done);
        });
        it('name이 없을 경우 400을 응답한다', done => {
            request(app)
            .put('/users/1')
            .send({})
            .expect(400)
            .end(done);
        });
        it('없는 유저일 경우 404를 응답한다', done => {
            request(app)
            .put('/users/999')
            .send({name: 'foo'})
            .expect(404)
            .end(done);
        });
        it('이름이 중복일 경우 409를 응답한다', done => {
            request(app)
            .put('/users/3')
            .send({name : 'bel'})
            .expect(409)
            .end(done);
        })

    })
})