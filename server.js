import express from 'express';
import mongoose from 'mongoose';
import card from './DbCards.js';
import cors from 'cors';
import 'dotenv/config';

//App Config
const app = express();
const port = process.env.PORT || 8001

//MiddleWare
app.use(cors());
app.use(express.json());

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

    card.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

app.get('/tinder/cards', async (req, res) => {
    try {
        const allCard = await card.find();
        res.json(allCard);
    } catch(err) {
        res.json(err);
    }
});


//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
