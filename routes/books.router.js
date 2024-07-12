import express from "express";
import { Book } from "../models/books.model.js";

const router = express.Router();

// Book APIs
// Route for Get All Books from database
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
// Route for Get One Book from database by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Save a new Book
router.post("/", async (request, response) => {
  try {
    // if (
    //   !request.body.title ||
    //   !request.body.author ||
    //   !request.body.publishYear ||
    //   !request.body.price
    // ) {
    //   return response.status(400).send({
    //     message: 'Send all required fields: title, author, publishYear',
    //   });
    // }
    const books = request.body.books;
    let price = () => {
      const prices = [299, 599, 699, 499, 899, 1299, 799, 999, 99];
      const randomIndex = Math.floor(Math.random() * prices.length);
      return prices[randomIndex];
    };
    await books.forEach(async (book) => {
      if (book.subject) {
        const newBook = {
          title: book.title,
          author: book.author_name[0],
          price: price(),
          image: `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`,
          description: book?.first_sentence[0] || "Description Unavailable",
          genre: [book.subject[0]],
        };

        await Book.create(newBook);
      }
    });
    return response.status(201).send({ books_saved: true });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// // Route for Update a Book
// router.put('/:id', async (request, response) => {
//   try {
//     if (
//       !request.body.title ||
//       !request.body.author ||
//       !request.body.publishYear
//     ) {
//       return response.status(400).send({
//         message: 'Send all required fields: title, author, publishYear',
//       });
//     }

//     const { id } = request.params;

//     const result = await Book.findByIdAndUpdate(id, request.body);

//     if (!result) {
//       return response.status(404).json({ message: 'Book not found' });
//     }

//     return response.status(200).send({ message: 'Book updated successfully' });
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// // Route for Delete a book
// router.delete('/:id', async (request, response) => {
//   try {
//     const { id } = request.params;

//     const result = await Book.findByIdAndDelete(id);

//     if (!result) {
//       return response.status(404).json({ message: 'Book not found' });
//     }

//     return response.status(200).send({ message: 'Book deleted successfully' });
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

export default router;
