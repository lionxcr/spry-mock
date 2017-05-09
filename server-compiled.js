'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secret = "SOMECOOLSECRET"; /**
                                * Created by pablos on 5/3/17.
                                */


var accessToken = "jK06rHVB3o0KJMerdolD8eSi570MVyMCdefSNip4";

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, function () {
    console.log('listening on 3000');
});

app.post("/auth", function (req, res) {
    var email = "email@email.com";
    var pass = "pass";
    var body = _jsonwebtoken2.default.verify(req.body.data, secret);
    console.log(body);
    if (body.username === email) {
        if (body.password === pass) {
            _jsonwebtoken2.default.sign({
                "access_token": accessToken,
                "token_type": "Bearer",
                "expires_in": 86400,
                "refresh_token": "GRq3UVgZh9wSENzTTlZ92eHeTzWMOAJL3HKKn6q4",
                "user_id": "82"
            }, secret, function (err, token) {
                res.json(token);
            });
        } else {
            res.status(500);
            _jsonwebtoken2.default.sign({ "message": "wrong password" }, secret, function (err, token) {
                res.json(token);
            });
        }
    } else {
        res.status(500);
        _jsonwebtoken2.default.sign({ "message": "wrong username" }, secret, function (err, token) {
            res.json(token);
        });
    }
});

var products = [{ "name": "Press Release" }, { "name": "By Lined Article" }, { "name": "Blog Post" }, { "name": "Company Fact Sheet" }, { "name": "Influence & Media List" }];

app.get('/products', function (req, res) {
    if (req.headers.access_token === accessToken) {
        _jsonwebtoken2.default.sign({
            "products": products
        }, secret, function (err, token) {
            res.json(token);
        });
    } else {
        res.status(401);
        _jsonwebtoken2.default.sign({ "message": "unauthorized request" }, secret, function (err, token) {
            res.json(token);
        });
    }
});

app.post('/price', function (req, res) {
    if (req.headers.access_token === accessToken) {
        var body = _jsonwebtoken2.default.verify(req.body.data, secret);
        var dealine = new Date(body.date);
        var diference = days_between(dealine, new Date());
        var price = diference * 125.00;
        var tax = price * .28;
        var finalPrice = Math.round(price + tax);
        if (body.revision === false) {
            finalPrice -= 300;
        }
        _jsonwebtoken2.default.sign({
            "price": finalPrice
        }, secret, function (err, token) {
            res.json(token);
        });
    } else {
        res.status(401);
        _jsonwebtoken2.default.sign({ "message": "unauthorized request" }, secret, function (err, token) {
            res.json(token);
        });
    }
});

function days_between(date1, date2) {

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms);

    // Convert back to days and return
    return Math.round(difference_ms / ONE_DAY + 1);
}

//# sourceMappingURL=server-compiled.js.map