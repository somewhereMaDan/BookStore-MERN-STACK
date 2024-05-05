import express from 'express'
import { PORT, mongoDBURL } from './config.js'
import mongoose from 'mongoose';
import { error } from 'console';
import { Book } from './models/bookModel.js';
import { request } from 'http';
import bookRoute from './routes/bookRoute.js'
import cors from 'cors'

const app = express()
// Middleware for parsing request body
app.use(express.json())


// Middleware for handling CORS policy
// Option 1: Allow All Origins with default of cors(*), means it'll allow all type of requests
app.use(cors());


// Option 2: Allow Custome Origins
// app.use(
//   cors({
//     origin: ['https://localhost:3000'], // you can use regex here if needed
//     methods: ['GET','POST','PUT','DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// )

app.get('/', (req, res) => {
  return res.send("Welcome")
});

// here we're using a middleware for /books
// this will say express that for each req with prefix of books, handle them with this middleware
app.use('/books',bookRoute)
// it'll use /books for all routing inside bookRoute

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database")
    // express port will listen only when the database is connected
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })