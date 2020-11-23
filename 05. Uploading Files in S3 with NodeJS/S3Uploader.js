const AWS = require('aws-sdk');
const fs = require('fs');

class S3Uploader {
    constructor(config){
        // set the version
        this.version = config.version;
        
        // set the bucket name
        this.bucket = config.bucket;

        // initialize AWS config
        AWS.config.update({
            region: config.region, // region of your AWS S3
            accessKeyId: config.accessKeyId, // access key id we got in creating IAM user
            secretAccessKey: config.secretAccessKey // secret key we got in creating IAM user
        });
    }

    // upload function
    upload(name, path){
        let objectParams = {
            Bucket: this.bucket, // name of the bucket to upload
            Key: name,          // file name in bucket when uploaded
            Body: fs.readFileSync(path) // the file itself, read it to get the file buffer
        };
        
        // start the upload then return a promise that 
        // we will resolve in S3StorageEngine handleFile
        return new AWS.S3({ apiVersion: this.version })
        .upload(objectParams).promise();
    }
}

module.exports = S3Uploader;