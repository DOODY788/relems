const express = require('express');
const path =require('path');
const {MongoClient} = require('mongodb');
const multer = require('multer');
const port =  8000;
const app = express();
const URI = 'mongodb+srv://relem:relem@relem.3g2yzaw.mongodb.net/?retryWrites=true&w=majority'

app.use(express.static(path.join(__dirname , './relem')));
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './relem'));
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.get('/',(req,res)=>{
    res.send('pakapak');
    res.status(404)
})

app.get('/about',(req,res)=>{
    res.send('about page');
})
app.get('/posts',(req,res)=>{
    res.render('./pages/post/post.pug');
    res.statusCode(200);
})

app.get('/admin-board',async(req,res)=>{
    res.render('./admin/admin.pug');

})

app.get('/update-author-info',async(req,res)=>{
    const client = new MongoClient(URI); await client.connect();
    const db = client.db('RELEM');
    const collection = db.collection('author_info');

    const updateschema = {
        social:{
            facebook:req.body.fb,
            twitter:req.body.twit,
            instagram:req.body.insta,
            linkedin:req.body.link,
            pintrest: req.body.pin
        },
        author : {
            name : req.body.at_name,
            role : req.body_at_role,
            img : req.body.image,
        },
        about : req.body.about
    }

    await collection.insertOne(updateschema)
    res.send('done');
    client.close();
})

app.post('/up-social',async(req,res)=>{
    const client = new MongoClient(URI,{ useUnifiedTopology: true }); await client.connect();
    const db = client.db('RELEM');
    const collection = db.collection('author_info');
    console.log(req.body.fb)
    const updateschema = {
        social:{
            facebook:req.body.fb,
            twitter:req.body.twit,
            instagram:req.body.insta,
            linkedin:req.body.link,
            pintrest: req.body.pin
        },
        author : {
            name : req.body.at_name,
            role : req.body_at_role,
            img : req.body.image,
        },
        about : req.body.about
    }
    await collection.findOneAndUpdate({
        _id:'64ea0c8f2fb6a6bec2ecb40b'},{$set:{
            'social.facebook':`fekopkefopkofpkepokpeofkp`
        }})
    // await collection.insertOne(updateschema)
    res.send('done');
})

app.post('/push_a_post',upload.single('img') ,async(req,res)=>{
    const Title = req.body.title;
    const Subtitle = req.body.subtitle;
    const Blogcont = req.body.blogcont;
    const img = req.file.buffer;

    const client = new MongoClient(URI);
    await client.connect().then(console.log('connected to data base'));
    const db = client.db('RELEM');
    const collection = db.collection('posts');
    const cont_schema = {
        Title : Title,
        Subtitle : Subtitle,
        Blogcont : Blogcont,
        Coverpage : img
    }
    try {
        await collection.insertOne(cont_schema);
        res.send('Your content is being uploaded');
    } catch (error) {
        res.send(error);
    }
    finally{
        client.close();
    }

})

app.get('/article',async(req,res)=>{
    const client = new MongoClient(URI);
    await client.connect().then(console.log('connected to data base'));
    const db = client.db('RELEM');
    const collection = db.collection('posts');

    try {
        const result = await collection.findOne({Title : "Fast Take: Is Coffee Really Going to Extend your Life?"});
        console.log(result.Title);
        res.render('./pages/article/article.pug',{title:result.Title,blog_content:result.Blogcont,subtitle:result.Subtitle});

        console.log(result);
    } catch (error) {
        res.send(error);
    }finally{
        client.close();
    }
})
app.get('/showimage',async(req,res)=>{
    const client = new MongoClient(URI);
    await client.connect().then(console.log('connected to data base'));
    const db = client.db('RELEM');
    const collection = db.collection('posts');

    try {
        const result = await collection.findOne({Title : "how to make coco"});
        const imageData = result.Coverpage;
        const base64 = imageData.toString('base64');
        const imageUrl = 'data:image/jpeg;base64,'+base64;
        res.render('./pages/pugs/image.pug',{image:imageUrl});
    } catch (error) {
        res.send(error);
    }finally{
        client.close();
    }
})

app.post('/loadposts',async(req,res)=>{
    const mongo =new MongoClient(URI);
    await mongo.connect();
    const collection = mongo.db('RELEM').collection('posts');

    const response = await collection.find({}).toArray();

    res.json(response);
})

app.get('*',(req,res)=>{
    res.send('ERROR PAGE IS NOT DEFINED');
})
app.listen(port,()=>{
    console.log('web is hosted at ',port)
})