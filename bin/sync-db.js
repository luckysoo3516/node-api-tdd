const models = require('../models');

// models.sequaliz.sync는 내부적으로 비동기. 알아서 처리해줌.
module.exports = () => {
    return models.sequelize.sync({force : true});

}