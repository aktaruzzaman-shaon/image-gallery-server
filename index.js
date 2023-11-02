const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const cors = require('cors')
const port = 5000;


app.use(cors());
app.use(express.json())

// Mongodb connection

const uri = "mongodb+srv://gallery:FIjIKASFa6H448Uy@cluster0.icnhbae.mongodb.net/?retryWrites=true&w=majority";

// mongodb client
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// client connection function
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const imageUrlConnection = client.db("image-gallery").collection("imageUrl")

        //Add image in gallery
        app.post('/addImageUrl', async (req, res) => {
            const imgeUrl = req.body;
            const result = await imageUrlConnection.insertOne(imgeUrl);
            console.log(result)
            res.send(result)
        })

        //Get image
        app.get('/images',async(req,res)=>{
            const cursor = imageUrlConnection.find({});
            const allGalleryImage = await cursor.toArray();
            res.send(allGalleryImage);
        })


    } finally {

        // await client.close();
    }
}
run();





// server listening
app.listen(port, () => {
    console.log("Server is running")
})