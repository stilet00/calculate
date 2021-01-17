let express = require('express');
let MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://testApp:72107210@cluster0.vmv4s.mongodb.net/myProject?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });
let ObjectId = require('mongodb').ObjectID;
let bodyParser = require('body-parser');
let rootURL = '/';
let collection;
const PORT = process.env.PORT || 80;

let app = express();

let fs = require('fs').promises;
app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extented: true}));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
})


//API для MainPageHTML

app.get(rootURL + 'translators', (req, res) => { //working api
    collection.find().toArray((err, docs) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.send(docs);
        }

    })
})
app.get(rootURL + 'translators/' + ':id' , (req, res) => {
    collection.findOne({_id: req.params.id}, (err, docs) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.send(docs);
        }

    })
})
app.post(rootURL + 'add', (req, res) => { //working api
    let translator = {
        name: req.body.name,
        clients: [],
        cardNumber: ''
    }
    collection.insertOne(translator, (err, result) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    })

})

app.delete(rootURL +':id', (req, res) => {
    collection.deleteOne({_id: ObjectId(req.params.id)}, (err) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }

    })
})

app.put(rootURL + ':id', (req, res) => {
    collection.updateOne({_id: req.params.id}, {$set: {
            name: req.body.name,
            clients: req.body.clientList,
            cardNumber: req.body.cardNumber
        }}, (err) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }


    })
})

//получаем итем
app.get(rootURL + ':id', (req, res) => {
    collection.findOne({_id: req.params.id}, (err, docs) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.send(docs);
        }
    })
})
//получаем итем

client.connect(function (err) {

    collection = client.db("translatorsDB").collection("translators");
    console.log('Connected successfully to server...');
    app.listen(PORT, () => {
        console.log('API started at port', PORT);
    });

})

