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
        var price = 0;
        if (diference < 3) {
            price = diference * 250.00;
        } else if (diference < 6) {
            price = diference * 200.00;
        } else if (diference < 12) {
            price = diference * 175.00;
        } else if (diference < 24) {
            price = diference * 150.00;
        } else {
            price = diference * 125.00;
        }
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

var newProductAnouncement = {
    required: [{ id: 1, order: 0, title: "Order Title", description: "This is not a title of the draft" }, { id: 2, order: 1, title: "What’s the news?", description: "What are we announcing?" }, { id: 3, order: 2, title: "Differentiators/USPs", description: "What sets this apart from the rest(differentiators, unique selling points)?You can simply include links or attach documents." }, { id: 4, order: 3, title: "Key Features", description: "What are the important features? You can simply include links or attach documents." }, { id: 5, order: 4, title: "Target Customers", description: "Who should buy this?" }, { id: 6, order: 5, title: "Customer Benefits", description: "Why will it benefit them?" }, { id: 7, order: 6, title: "Related Industries", description: "What industries are related to this?" }],
    type: "press_release_new_product",
    optional: [{ id: 1, order: 0, title: "Three Key Messages", description: "What are the three key messages you’d like to highlight?" }, { id: 2, order: 1, title: "Relevant Trends", description: "What trends are relevant for this?" }, { id: 3, order: 2, title: "Availability", description: "Availability (Time / Pricing)" }, { id: 4, order: 3, title: "Customer Cases", description: "Can we cite any real customers or at least use cases?" }, { id: 5, order: 4, title: "Spokesperson", description: "Who should be quoted? (Name/Title)" }, { id: 6, order: 5, title: "Media Contact", description: "Media contact (name, phone number, email address)" }, { id: 7, order: 6, title: "Company Boilerplate", description: "" }, { id: 8, order: 7, title: "Distribution Date/City", description: "" }, { id: 9, order: 8, title: "Writing Style", description: "" }, { id: 10, order: 9, title: "Previous Releases", description: "Any previous releases that will help us?" }, { id: 11, order: 10, title: "Supporting Materials", description: "What about other materials and sources?" }, { id: 12, order: 11, title: "Additional Note", description: "What else should we know?" }]
};

app.get('/brief', function (req, res) {
    if (req.headers.access_token === accessToken) {
        _jsonwebtoken2.default.sign({
            "brief": newProductAnouncement
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

//# sourceMappingURL=server-compiled.js.map