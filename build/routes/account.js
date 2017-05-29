'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _account = require('../models/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/*
    회원가입 / 로그인 / 현재세션체크 API 를 담당할 account 라우터 입니다
*/

router.post('/signup', function (req, res) {
    //CHECK USERNAME FORMAT
    var usernameRegex = /^[a-z0-9]+$/;

    if (!usernameRegex.test(req.body.username)) {
        return res.status(400).json({
            error: "BAD USERNAME",
            code: 1
        });
    }

    //CHECK PASS LENGTH
    if (req.body.password.length < 4 || typeof req.body.password !== "string") {
        return res.status(400).json({
            error: "BAD PASSWORD",
            code: 2
        });
    }

    //CHECK USER EXISTANCE
    _account2.default.findOne({ username: req.body.username }, function (err, exists) {
        if (error) throw err;
        if (exists) {
            return res.status(409).json({
                error: "USERNAME EXISTS",
                code: 3
            });
        }

        // CREATE ACCOUNT
        var account = new _account2.default({
            username: req.body.username,
            password: req.body.password
        });

        account.password = account.generateHash(account.password);
        account.save(function (err) {
            if (err) throw err;
            return res.json({ success: true });
        });
    });
});

router.post('/signin', function (req, res) {
    if (typeof req.body.password != "string") {
        return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
        });
    }

    // CHECK WHETHER THE PASSWORD IS VALID
    if (!account.validateHash(req.body.password)) {
        return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
        });
    }
    // ALTER SESSION
    var session = req.session;
    session.loginInfo = {
        _id: account._id,
        username: account.username
    };

    // RETURN SUCCESS
    return res.json({
        success: true
    });
});

/*
    세션확인이 필요한 이유는, 클라이언트에서 로그인 시, 로그인 데이터를 쿠키에 담고 사용을 하고 있다가,
    만약에 새로고침을 해서 어플리케이션을 처음부터 다시 렌더링 하게 될 때, 지금 갖고 있는 쿠키가 유효한건지 체크를 해야 하기 때문입니다.
*/
router.get('/getinfo', function (req, res) {
    if (typeof req.session.loginInfo === "undefined") {
        return res.status(401).json({
            error: 1
        });
    }
    res.json({ info: req.session.loginInfo });
});

router.post('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) throw err;
    });
    return res.json({ sucess: true });
});

exports.default = router;