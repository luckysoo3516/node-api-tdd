// 익스프레스 설정, 서버 돌리는 부분
const express = require('express');
const app = express();
const morgan = require('morgan');
const user = require('./api/user/index');

// script에서 설정한 NODE_ENV라는 환경변수는 process라는 객체에 들어가게됨.
if(process.env.NODE_ENV !== 'test'){
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/users', user); // /users로 들어오는 모든 요청은 user가 담당한다.
app.use('/photos', photo); // api 확장
module.exports = app;