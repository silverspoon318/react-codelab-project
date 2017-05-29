'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

app.use('/api', _routes2.default);
/*
    이렇게 서버 메인 파일에서 api 라우터를 불러오게 되면,
    http://URL/api/account/signup 이런식으로 api 를 사용 할 수 있게 됩니다
*/

/* mongodb connection */


// setup routers & static directory
var db = _mongoose2.default.connection;
db.on('error', console.error);
db.once('open', function () {
    console.log('Connected to mongodb server');
});
// mongoose.connect('mongodb://username:password@host:port/database=');
_mongoose2.default.connect('mongodb://localhost:27017');
app.use((0, _expressSession2.default)({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true
}));

/* handle error */
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

/*
    mongoose: mongodb 데이터 모델링 툴; MongoDB 에 있는 데이터를 여러분의 Application에서 JavaScript 객체로 사용 할 수 있도록 해줍니다.
    참고: https://velopert.com/594
    express-session: express 에서 세션을 다룰 때 사용되는 미들웨어
    참고: https://velopert.com/406
*/

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
//morgan: HTTP 요청을 로그하는 미들웨어
//body-parser: 요청에서 JSON을 파싱할때 사용되는 미들웨어

var app = (0, _express2.default)();
var port = 3000;

app.use('/', _express2.default.static(_path2.default.join(__dirname, './../public')));

app.get('/hello', function (req, res) {
    return res.send('Hello World');
});

app.listen(port, function () {
    console.log('Express is listening on port', port);
});

var devPort = 4000;

if (process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    var config = require('../webpack.dev.config');
    var compiler = webpack(config);
    var devServer = new _webpackDevServer2.default(compiler, config.devServer);
    devServer.listen(devPort, function () {
        console.log('webpack-dev-server is listening on port', devPort);
    });
}