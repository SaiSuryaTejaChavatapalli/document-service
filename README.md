# document-service

### Description:

The Document Service REST API is a service that allows users to upload documents along with metadata. It leverages AWS services, such as S3 for document storage and MongoDB for metadata management.

### Techs Used:

NodeJS, ExpressJs, mongoDB, aws-sdk, multer and multer-s3

### Clone this Repository:

You need to write the following commands on the terminal so that you can run this project locally.

```
git clone https://github.com/SaiSuryaTejaChavatapalli/document-service.git
```

Go to the project directory:

```
cd document-service
```

Install dependencies:

```
npm install
```

Set your credentials as environment variables

```
AWS_ACCESS_KEY_ID = <YOUR_AWS_ACCESS_KEY_ID>
AWS_SECRET_ACCESS_KEY = <YOUR_AWS_SECRET_ACCESS_KEY>
AWS_BUCKET_NAME = <YOUR_AWS_BUCKET_NAME>
REGION = <YOUR_AWS_REGION>
DBURL = <MONGO_DB_URL>
PORT = <PORT_NUMBER>
```

Start the server:

```
npm start
```

This application should now be running on localhost.