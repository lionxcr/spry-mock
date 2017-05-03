/**
 * Created by pablos on 5/3/17.
 */
import express from 'express';
import bodyParser   from 'body-parser';
import jwt from 'jsonwebtoken';

let secret = "SOMECOOLSECRET";

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
                "access_token": "jK06rHVB3o0KJMerdolD8eSi570MVyMCdefSNip4",
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