const express = require('express');
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const schemas = require('./schemas')

const app = express()
app.use(cors())
const uri = "mongodb+srv://long:Mywork4455@tinder-data.zolam.mongodb.net/users?retryWrites=true&w=majority";

mongoose
  .connect(
    uri,
    {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    }
  )
  .then()
  .catch(err => console.log(err));

app.use('/user', bodyParser.json(), graphqlHTTP({
  schema: schemas,
  graphiql: true
}))
app.listen(4000)