/**
 * Created by pablos on 5/3/17.
 */
import express from 'express';
import bodyParser   from 'body-parser';
import jwt from 'jsonwebtoken';

let secret = "SOMECOOLSECRET";

let accessToken = "jK06rHVB3o0KJMerdolD8eSi570MVyMCdefSNip4";

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000');
});

app.post("/auth", (req, res) =>{
    const email = "email@email.com";
    const pass = "pass";
    const body = jwt.verify(req.body.data, secret);
    console.log(body);
    if(body.username === email){
        if(body.password === pass){
            jwt.sign({
                "access_token": accessToken,
                "token_type": "Bearer",
                "expires_in": 86400,
                "refresh_token": "GRq3UVgZh9wSENzTTlZ92eHeTzWMOAJL3HKKn6q4",
                "user_id": "82"
            }, secret, (err, token) =>{
                res.json(token)
            });
        }else{
            res.status(500);
            jwt.sign({"message": "wrong password"}, secret, (err, token) =>{
                res.json(token)
            });
        }
    }else{
       res.status(500);
        jwt.sign({"message": "wrong username"}, secret, (err, token) =>{
            res.json(token)
        });
    }
});

let products = [
    {"name": "Press Release"},
    {"name": "By Lined Article"},
    {"name": "Blog Post"},
    {"name": "Company Fact Sheet"},
    {"name": "Influence & Media List"}
];

app.get('/products', (req, res) => {
    if(req.headers.access_token === accessToken){
        jwt.sign({
            "products": products
        }, secret, (err, token) =>{
            res.json(token)
        });
    }else{
        res.status(401);
        jwt.sign({"message": "unauthorized request"}, secret, (err, token) =>{
            res.json(token)
        });
    }

});

app.post('/price', (req, res) =>{
    if(req.headers.access_token === accessToken){
        const body = jwt.verify(req.body.data, secret);
        let dealine = new Date(body.date);
        let diference = days_between(dealine, new Date());
        var price = diference * 125.00;
        let tax = price * .28;
        let finalPrice = Math.round(price + tax);
        console.log(finalPrice);
        jwt.sign({
            "price": finalPrice
        }, secret, (err, token) =>{
            res.json(token)
        });
    }else{
        res.status(401);
        jwt.sign({"message": "unauthorized request"}, secret, (err, token) =>{
            res.json(token)
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
    return Math.round(difference_ms/ONE_DAY+1);

}