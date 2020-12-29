let express = require('express');
let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;
let bodyParser = require('body-parser');
let db;


let url1 = '/';
let url2 = 'mongodb://localhost:27017'
let dbName = 'myProject';
let app = express();
let client = new MongoClient(url2);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extented: true}));

app.get(url1 + 'translators', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    db.collection('translators').find().toArray((err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
})
//получаем итем
app.get(url1 + ':id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    db.collection('translators').findOne({_id: ObjectId(req.params.id)}, (err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
})
//получаем итем
app.delete(url1 + 'delete/' + ':id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    db.collection('translators').deleteOne({_id: ObjectId(req.params.id)}, (err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
})


app.post(url1 + 'add', (req, res) => {
    let translator = {
        name: req.body.name,
        clients: [],
        cardNumber: ''
    }
    db.collection('translators').insertOne(translator, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else {
            console.log('added translator to database');
            res.send(translator);
        }
    })

})



client.connect(function (err) {
    console.log('Connected successfully to server...');

    db = client.db(dbName);
    app.listen(3333, () => {
        console.log('API started');
    });
})