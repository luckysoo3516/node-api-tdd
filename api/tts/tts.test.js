const request = require('supertest');
const should = require('should');
const app = require('../../'); // 자동으로 index.js 를 가져옴
const models = require('../../models');

describe.only('GET /tts', () => {
    it('성공시 200과 파일 응답', done => {
        request(app)
        .get('/tts')
        .expect(200).end(done);
    })
})