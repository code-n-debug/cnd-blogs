const fs = require('fs');
const path = require('path');

// import our s3 uploader
const S3Uploader = require('./S3Uploader');

// configure s3 configs
const AwsS3 = new S3Uploader({
    region: 'ap-southeast-1',
    bucket: 'codendebug-uploads',
    version: '2006-03-01',
    accessKeyId: '***',
    secretAccessKey: '***'
});

// create a class
class S3StorageEngine{

    // add a constructor to that can override the destination
    constructor(opts = null){
        // if there is no options passed in our constructor
        // don't replace the getDestination function
        if(opts && opts.dest){
            this.getDestination = opts.dest;
        }
    }

    getDestination(req, file, cb){
        // NOTE: make sure /uploads folder exist, if not create it first
        // Use the original name when we save uploaded file in /uploads
        cb(null, path.join(__dirname, `uploads/${file.originalname}`));
    }

    // function that is called if file was uploaded
    _handleFile(req, file, cb){
        this.getDestination(req, file, function (err, path) {
            if (err) return cb(err);
        
            // we open a stream to write the file in disk
            const outStream = fs.createWriteStream(path)
    
            // stream the file then pipe (save it)
            // in the path from getDestination function
            file.stream.pipe(outStream)
            outStream.on('error', cb)
            outStream.on('finish', function () {
                // instead of just saving the file
                // call the S3Uploader to upload the file in S3
                
                // use the original name as Key
                // pass the file path to get it in S3Uploader
                AwsS3.upload(file.originalname, path)
                // if s3 upload was successful
                .then(data=>{
                    // unlink the file since it was already uploaded in AWS S3
                    fs.unlink(path, cb);
                    // call callback that it was done
                    cb(null, {
                        s3url: data.Location, // add AWS S3 file location in response
                        path: path, // this is not needed anymore since file is in S3
                        size: outStream.bytesWritten // file size
                    });
                
                // if there is problem with the s3 upload
                }).catch(error=>{
                    // return callback error if there is problem with upload
                    // it will trigger removeFile function
                    cb(error);
                })
            });
        });
    }

    _removeFile(req, file, cb){
        // if there is problem with the file upload
        // we can remove the created stream in /uploads folder
        fs.unlink(file.path, cb);
    }

}

module.exports = S3StorageEngine;