const express = require('express');
const app = express();

const multer = require('multer');
const Storage = require('./S3StorageEngine');
const uploader = multer({
    storage: new Storage()
});

app.get('/', (req,res)=>{
    res.send(`
        <form action="/fileupload" method="post" enctype="multipart/form-data">
            <input type="file" name="file">
            <button>Upload</button>
        </form>
    `)
});

app.post('/fileupload', uploader.single('file'), (req, res)=>{
    console.log(req.file);
    res.json(req.file);
});

app.listen(3000, ()=>{
    console.log('Listening on http://localhost:3000');
});