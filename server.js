const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const expressGraphQL = require('express-graphql').graphqlHTTP
const schema = require('./schema/schema')
const app = express();

require('dotenv').config()

const MONGO_URI = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@webapp.pfwpu.mongodb.net/webapp?retryWrites=true&w=majority`;
if (!MONGO_URI) { throw new Error('You must provide a Mongo Atlas URI') }

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
.once('open', () => console.log('Connected to Mongo Atlas instance.'))
.on('error', (error) =>
  console.log('Error connecting to Mongo Atlas:', error)
);

app.use(express.json())
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

app.use(
  '/graphql',
  (req, res, next) => 
  expressGraphQL( async () => {
    return {
      schema,
      graphiql: true,
      context: { req, res }
    }
  })(req, res, next)
);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
