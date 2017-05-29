'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var Account = new Schema({
    username: String,
    password: String,
    created: {
        type: Date,
        default: Date.now
    }
});

//generates hash
Account.methods.generateHash = function (password) {
    return _bcryptjs2.default.hashSync(password, 8);
};

//compares the password
Account.methods.validateHash = function (password) {
    return _bcryptjs2.default.compareSync(password, this.password);
};

exports.default = _mongoose2.default.model('account', Account);

/*
    account Schema 를 만들고 model 로 만들어서 export 합니다
    Schema 와 Model 의 차이는, Schema 는 그냥 데이터의 ‘틀’ 일 뿐이구요, Model 은, 실제 데이터베이스에 접근 할 수 있게 해주는 클래스입니다
    참고: http://mongoosejs.com/docs/guide.html
    모델화르 할때 .model() 의 첫번째 인수로 들어가는 account 는 collection 이름이에요.
    근데, 이게 복수형으로 설정이됩니다.
    예를들어 account의 복수형은 accounts 이니 accounts 라는 컬렉션이 만들어지고 거기에 저장이 되는거죠.
    컬렉션 이름을 직접 정하고싶다면 .model(‘my_account’, Account, ‘my_account’) 이런식으로 세번째 인수를 추가하여 전달해주면 됩니다.
*/