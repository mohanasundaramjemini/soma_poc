const express = require('express');
// const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const app = express();
app.use(express.json());

const uri = "mongodb+srv://mohan:shineai@123@cluster0.lilwp.mongodb.net/shineai?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

app.get('/api/users/:mobile?', (req, res) => {
    try {
        client.connect(err => {
            const collection = client.db("shineai").collection("users");
            const mobileNumber = req.params.mobile;
            if (mobileNumber) {
                collection.find({ 'mobile': mobileNumber }).toArray(function (err, docs) {
                    assert.equal(err, null);
                    res.status(200).json({ docs });
                });
            } else {
                collection.find({}).toArray(function (err, docs) {
                    assert.equal(err, null);
                    res.status(200).json({ docs });
                });
            }
            // client.close();
        });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
});

app.post('/api/register', (req, res) => {
    try {
        client.connect(err => {
            // Get the documents collection
            const collection = client.db("shineai").collection('users');
            // Insert some documents
            collection.insert([
                { mobile: req.body.mobile }
            ], function (err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                assert.equal(1, result.ops.length);
                res.status(200).json(result.ops);
            });
        });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on ${port}...`))