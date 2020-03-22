// 유저 api 에 대한 라우팅 설정 로직
// 라우팅과 컨트롤러 함수를 바인딩 해주는 역할
const express = require('express');
const router = express.Router();
const ctrl = require('./user.ctrl');



router.get('/',ctrl.index);
router.get('/:id', ctrl.show);

router.delete('/:id', ctrl.destroy);

router.post('/', ctrl.create)

router.put('/:id', ctrl.update)

module.exports = router;