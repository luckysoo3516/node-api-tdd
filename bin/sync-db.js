const models = require('../models');

// models.sequaliz.sync는 내부적으로 비동기. 알아서 처리해줌.
// force : true이면 기존 테이블을 다 삭제하고 동기화된다.
module.exports = () => {
    const options = {
        force : process.env.NODE_ENV === 'test' ? true : false
    }
    
    return models.sequelize.sync(options);
}