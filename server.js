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
    {"name": "Press release"},
    {"name": "Bylined article"},
    {"name": "Blog post"},
    {"name": "Company fact sheet"},
    {"name": "Influence list"},
    {"name": "Media list"}
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
        var price = 0;
        if(diference <= 6){
            price = 10 * 500.00;
        }else if(diference <= 12){
            price = 8 * 500.00;
        }else if(diference <= 18){
            price =  6 * 500.00;
        }else if(diference <= 20){
            price = 5 * 500.00;
        }else{
            price = 3 * 500.00;
        }
        let tax = price * .28;
        var finalPrice = Math.round(price + tax);
        if(body.revision === false){
            finalPrice -= 250
        }
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

const newProductAnouncement = {
    required: [
        {id:1, order: 0, title: "Order Title", description: "This is not a title of the draft", sample: ""},
        {id:2, order: 1, title: "What’s the news?", description: "What are we announcing?", sample: "CL Elec. launches the new CL ColorBook laptop series"},
        {id:3, order: 2, title: "Differentiators/USPs", description: "What sets this apart from the rest (differentiators, unique selling points)? You can simply include links or attach documents.", sample: "It comes with seven customizable covers so users can change the covers based on their mood and TPO"},
        {id:4, order: 3, title: "Key Features", description: "What are the important features? You can simply include links or attach documents.", sample: ""},
        {id:5, order: 4, title: "Target Customers", description: "Who should buy this?", sample: "Millennial, female, style-conscious users"},
        {id:6, order: 5, title: "Customer Benefits", description: "Why will it benefit them?", sample: "It’s fun and stylish to carry, they can match the cover with OOTD"},
        {id:7, order: 6, title: "Related Industries", description: "What industries are related to this?", sample: ""}
    ],
    type: "press_release_new_product",
    optional: [
        {id:1, order: 0, title: "Three Key Messages", description: "What are the three key messages you’d like to highlight?", sample: ""},
        {id:2, order: 1, title: "Relevant Trends", description: "What trends are relevant for this?", sample: "Gadget-as-a-fashion accessory trend"},
        {id:3, order: 2, title: "Availability", description: "Availability (Time / Pricing)", sample: "Jan 2017/ starting at USD 380"},
        {id:4, order: 3, title: "Customer Cases", description: "Can we cite any real customers or at least use cases?", sample: ""},
        {id:5, order: 4, title: "Spokesperson", description: "Who should be quoted? (Name/Title)", sample: ""},
        {id:6, order: 5, title: "Media Contact", description: "Media contact (name, phone number, email address)", sample: ""},
        {id:7, order: 6, title: "Company Boilerplate", description: "", sample: ""},
        {id:8, order: 7, title: "Distribution Date/City", description: "", sample: ""},
        {id:9, order: 8, title: "Writing Style", description: "", sample: ""},
        {id:10, order:9, title: "Previous Releases", description: "Any previous releases that will help us?", sample: ""},
        {id:11, order:10, title: "Supporting Materials", description: "What about other materials and sources?", sample: ""},
        {id:12, order:11, title: "Additional Note", description: "What else should we know?", sample: "We want to focus more on the design and affordability, and less on product performance which is still competitive among the entry level laptops but not outstanding. \nWe want to position ColorBook as a fashion & lifestyle product, targeting fashion-conscious millennial users who use a laptop for content consumption, entertainment, social networking – not necessarily for heavy content creation"}
    ]
};

app.get('/brief', (req, res) => {
    if(req.headers.access_token === accessToken){
        jwt.sign({
            "brief": newProductAnouncement
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

class orderStatus{
    constructor(name, status, action, description, addTime){
        this.title = name;
        this.state = status;
        this.action = action;
        this.description = description;
        this.start = getUTCTimeStamp(addTime);
        this.delivery = getUTCTimeStamp(addTime+5);
    }
}

const getUTCTimeStamp = (minutes) => {
    let now = new Date();
    now.setHours(now.getHours()+1);
    now.setMinutes(minutes);
    const date = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() ,
        now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
    return new Date(date).toISOString();
};

const orderHistory = [
    new orderStatus("Working in Order", "in_progress", false, "Currently we are working on your request, we carefully review the brief, do research and then start writing.",2),
    new orderStatus("Provide Feedback", "pending", true, "Review the work",5),
    new orderStatus("Working on Feedback", "pending", false, "We are making some changes",10),
    new orderStatus("Deliver Order","pending", false, "",12)
];

app.get('/order/status', (req, res) => {
    if(req.headers.access_token === accessToken){
        jwt.sign({
            "history": orderHistory
        }, secret, (err, token) =>{
            res.json(token);
        });
    }else{
        res.status(401);
        jwt.sign({"message": "unauthorized request"}, secret, (err, token) =>{
            res.json(token)
        });
    }
});