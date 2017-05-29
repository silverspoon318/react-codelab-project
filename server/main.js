import express from 'express';
import path from 'path';

import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

import morgan from 'morgan';
import bodyParser from 'body-parser';

import mongoose from 'mongoose';
import session from 'express-session';

// setup routers & static directory
import api from './routes';

const app = express();
const port = 3000;
const devPort = 4000;

/* mongodb connection */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); })
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://localhost:27017');
app.use(session({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true
}));

/* handle error */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

/*
    mongoose: mongodb 데이터 모델링 툴; MongoDB 에 있는 데이터를 여러분의 Application에서 JavaScript 객체로 사용 할 수 있도록 해줍니다.
    참고: https://velopert.com/594
    express-session: express 에서 세션을 다룰 때 사용되는 미들웨어
    참고: https://velopert.com/406
*/

app.use(morgan('dev'));
app.use(bodyParser.json());
//morgan: HTTP 요청을 로그하는 미들웨어
//body-parser: 요청에서 JSON을 파싱할때 사용되는 미들웨어



app.use('/', express.static(path.join(__dirname, './../public')));

app.use('/api', api);
/*
    이렇게 서버 메인 파일에서 api 라우터를 불러오게 되면,
    http://URL/api/account/signup 이런식으로 api 를 사용 할 수 있게 됩니다
*/

app.get('/hello', (req,res) => {
    return res.send('Hello World');
});

app.listen(port, () => {
    console.log('Express is listening on port', port);
});



if((process.env.NODE_ENV) == 'development') {
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    )
}
