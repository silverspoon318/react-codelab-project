import express from 'express';
import Account from '../models/account';

const router = express.Router();

/*
    회원가입 / 로그인 / 현재세션체크 API 를 담당할 account 라우터 입니다
*/

router.post('/signup', (req, res) => {
    //CHECK USERNAME FORMAT
    let usernameRegex = /^[a-z0-9]+$/;

    if(!usernameRegex.test(req.body.username)) {
        return res.status(400).json({
            error: "BAD USERNAME",
            code: 1
        });
    }

    //CHECK PASS LENGTH
    if(req.body.password.length < 4 || typeof req.body.password !== "string") {
        return res.status(400).json({
            error: "BAD PASSWORD",
            code: 2
        });
    }

    //CHECK USER EXISTANCE
    Account.findOne({ username: req.body.username}, (err, exists) => {
        if(error) throw err;
        if(exists) {
            return res.status(409).json({
                error: "USERNAME EXISTS",
                code: 3
            });
        }

        // CREATE ACCOUNT
        let account = new Account({
            username: req.body.username,
            password: req.body.password
        });

        account.password = account.generateHash(account.password);
        account.save( err => {
            if(err) throw err;
            return res.json({ success: true });
        });
    });


});

router.post('/signin', (req, res) => {
    if(typeof req.body.password != "string") {
        return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
        });
    }

    // CHECK WHETHER THE PASSWORD IS VALID
    if(!account.validateHash(req.body.password)) {
        return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
        });
    }
    // ALTER SESSION
    let session = req.session;
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
router.get('/getinfo', (req, res) => {
    if(typeof req.session.loginInfo === "undefined") {
        return res.status(401).json({
            error: 1
        });
    }
    res.json({ info: req.session.loginInfo });
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => { if(err) throw err; });
    return res.json({ sucess: true });
});

export default router;
