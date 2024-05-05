import express, { Router } from 'express'
// we'll use router instead of app so that we can maintain a folder structure
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route to POST a book to the database, to Create a Book
router.post('/', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: 'Send all required fields: title, author, publishYear', })
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    }
    const book = await Book.create(newBook)
    // this will create a book in the database ('Book' is the variable having the bookSchema)
    return res.status(201).send(book)
  }
  catch (error) {
    console.log(error.message)
    res.status(500).send({ message: error.message })
  }
})

// Route to GET ALL books from the database, landing page
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({})
    return res.status(200).json({
      count: books.length,
      data: books
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ message: error.message })
  }
})

// Route to GET one book from the database, the show function
router.get('/:id', async (req, res) => {
  // this /:id will get the id of the book user want to get and match it in database
  try {
    const { id } = req.params;

    const book = await Book.findById(id)
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ message: "book not found" })
  }
})


// TO UPDATE A BOOK
// for update we need -> req.params(we need it to pass the id of the book which we need to update) & req.body(to pass the data to update the book)  
// in fact, we need ID params to find the book in the database then we need req.body to update it

router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const { id } = request.params; // this is storing "id" from the URL

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


// TO DELETE A BOOK FROM THE DATABASE
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const result = await Book.findByIdAndDelete(id)

    if (!result) {
      return res.status(404).json({ message: 'Book not found' })
    }

    return res.status(200).send({ message: 'Book deleted successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message })
  }
})

export default router;