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