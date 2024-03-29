const express = require('express');
require('dotenv').config()
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ojnnavp.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const menuCollection = client.db('CafeMoonDB').collection('menu');
    const reviewsCollection = client.db('CafeMoonDB').collection('reviews');
    const userCollection = client.db('CafeMoonDB').collection('user');
    
    app.post('/user', async(req, res) => {
        const userInfo = req.body;
        const query = {email: userInfo.email};
        const existingUser = await userCollection.findOne(query);
        if(existingUser){
           return res.send({message: 'user already existing'})
        };
        const result = await usersCollection.insertOne(userInfo);
        res.send(result);
    })

    app.get('/menu', async(req, res) => {
        const result = await menuCollection.find().toArray();
        res.send(result);
   })
  
   app.get('/reviews', async(req, res) => {
    const result = await reviewsCollection.find().toArray();
    res.send(result);
})

// GET > User
app.get('/user',async(req,res)=>{
    const result =await userCollection.find().toArray();
    res.send(result);
})

    
//    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
     res.send('Cafemoon is running on server');
})

app.listen(port, ()=> {
    console.log(`cafemoon is running on port ${port}`);
})