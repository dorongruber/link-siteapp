const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path= require('path');
const cors = require('cors');


const userRouter = require('./back/routers/users');
const siteRouter = require('./back/routers/sites');
mongoose.connect(
  process.env.BD_CONNECTION ,
   { useNewUrlParser: true , useUnifiedTopology: true ,  useFindAndModify: false , returnOriginal: false})
  .then(() => {
    console.log('connected to database');
  })
  .catch((err) => {
    console.log('connection failed -> ', err);
});

const app = express();
app.use(cors());
// app.use(express.static(path.join(__dirname, 'dist/link-building')));
app.use(bodyParser.json());
app.use('/api/user', userRouter);
app.use('/api/sites', siteRouter);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization, Content-Length"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// app.get('*', (req,res) => {
//   res.sendFile(path.join(__dirname, 'dist/link-building/index.html'))
// })

const port  = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`))
