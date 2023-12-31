const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cors = require('cors')
require('dotenv').config();
const port = process.env.PORT || 5000;

// Middleware ---------------------------------------
app.use(cors());
app.use(express.json())

// Mongodb connection--------------------------------
const uri = "mongodb+srv://gallery:FIjIKASFa6H448Uy@cluster0.icnhbae.mongodb.net/?retryWrites=true&w=majority";

// mongodb client ------------------------------------
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// client connection function -----------------------
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7) ----------------------------
        client.connect();
        const imageUrlConnection = client.db("image-gallery").collection("imageUrl")

        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");

        //Add image in gallery -----------------------
        app.post('/addImageUrl', async (req, res) => {
            const imgeUrl = req.body;
            const result = await imageUrlConnection.insertOne(imgeUrl);
            console.log(result)
            res.send(result)
        })

        //Get image----------------------------------
        // app.get('/images', async (req, res) => {
        //     const cursor = imageUrlConnection.find({});
        //     const allGalleryImage = await cursor.toArray();
        //     console.log(allGalleryImage)
        //     res.send(allGalleryImage);
        // })

        app.get('/allImage',async(req,res)=>{
            const cursor = imageUrlConnection.find({});
            const allImages = await cursor.toArray();
            console.log(allImages)
            res.send(allImages)
        })

        // Delete images ------------------------------
        app.delete('/deleteImages', async (req, res) => {
            const data = req.body;
            console.log(data)
            let result;
            for (const x of data) {
                console.log(x)
                const filter = { _id: new ObjectId(x) }
                result = await imageUrlConnection.deleteMany(filter)
            }
            res.send(result)
        })


    } finally {

        // await client.close();
    }
}
run().catch(console.dir)

app.get("/test", (req, res) => {
    res.send("hello test")
})

app.use('/', (req, res) => {
    res.json({ message: "hello world" })
})

// server listening -------------------------------
app.listen(port, () => {
    console.log("Server is running")
})