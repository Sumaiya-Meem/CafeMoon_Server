const express = require('express');
require('dotenv').config()
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());



app.get('/', (req, res) => {
     res.send('Cafemoon is running on server');
})

app.listen(port, ()=> {
    console.log(`cafemoon is running on port ${port}`);
})