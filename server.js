import express from 'express';
import mongoose from 'mongoose';
import card from './DbCards.js';
import 'dotenv/config';

//App Config
const app = express();
const port = process.env.PORT || 8001

//MiddleWare
app.use(express.json())

//Db Config
const connection_url = process.env.DB_CONNECTION;

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,   
})


//Api Endpoints
app.get('/', (req, res) => res.status(200).send("Hello Worlds"));

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;

    card.create(dbCard, (err, res) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})

app.get('/tinder/cards', (req, res) => {
    card.find((err, data) => {
        if (err) {
            res.status(500).send(err); 
        } else {
            res.status(200).send(data);
        }
    })
})


//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
