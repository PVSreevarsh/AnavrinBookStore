import express from "express";
import { PORT, mongoDBURI } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import { JWT } from "node-jsonwebtoken";
const jwt = new JWT("numadic");

// const jwt = require("jsonwebtoken");

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(cors());

// Middleware to decrpty JWT
// app.use(async (req, res, next) => {
//   // Get the token from the Authorization header
//   const token = req.headers['authorization']?.split(" ")[1];
//   try {
//     // If no token is provided, skip verification
//     if (!token) {
//       throw new Error("No Token");
//     }
    
//     // Verify the token
//     const decoded = await jwt.verify(token);
//     // Attach the decoded payload to the request object
//     req.user = decoded;
//     next();
//   } catch (error) {
//     // Handle token verification errors
//     return res.status(401).json({ error: "Unauthorized" });
//   }
// });

import booksRoute from "./routes/books.router.js";
import userRoute from "./routes/user.router.js";

app.use("/books", booksRoute);
app.use("/users", userRoute);

mongoose
  .connect(mongoDBURI)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
