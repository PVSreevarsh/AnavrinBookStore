import express from "express";
import { Book } from "../models/books.model.js";
import { User } from "../models/user.model.js";
import { Purchase } from "../models/purchases.model.js";
import { JWT } from "node-jsonwebtoken";
const jwt = new JWT("numadic");

const router = express.Router();

// User APIs
router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email: email });
  // If user found, compare the password
  if (user && user.password === password) {
    const token = await jwt.sign({email:request.body.email}, {expiresIn: "1h"});
    let resp = {...user._doc, token}
    delete resp.password
    return response.status(200).json(resp);
  } else {
    return response
      .status(401)
      .json({
        status: 401,
        code: "Unauthorised",
        message: "Invalid username and password. Try again",
      });
  }
});
router.post("/register", async (request, response) => {
  try {
    if (
      !request.body.email ||
      !request.body.username ||
      !request.body.password
    ) {
      return response.status(400).send({
        message: "Send all required fields: email, username, password",
      });
    }
    const token = await jwt.sign({email:request.body.email}, {expiresIn: "1h"});
    const addToUsers = {
      email: request.body.email,
      username: request.body.username,
      password: request.body.password, // would use Hash functions like bcryptjs or crypto to generate a hash and then store the hash for comparing passwords.
      cart: {},
    };
    let user = await User.create(addToUsers);
    let resp = {...user._doc, token}
    return response.status(201).send(resp);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Cart APIs
router.post("/cart/add", async (request, response) => {
  try {
    const addToCart = {
      email: request.body.email,
      cart: request.body.cart,
    };

    const user = await User.findOneAndUpdate(
      {
        email: addToCart.email,
      },
      { $set: addToCart }
    );

    return response.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
router.get("/cart/:email", async (request, response) => {
  try {
    const addToCart = {
      email: request.params.email,
    };

    const user = await User.findOne(
      {
        email: addToCart.email,
      }
    );

    return response.status(201).send(user.cart);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
router.post("/cart/remove/:id", async (request, response) => {
  try {
    const email = request.user.email;
    const id = request.params.id;

    const user = await User.findOneAndUpdate(
      { email: email },
      {
        $unset: {
          [`cart.${id}`]: 1,
        },
      },
      { new: true }
    );

    return response.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.post("/checkout", async (request, response) => {
  try {
    const purchase = {
      email: request.body.email,
      username: request.body.username,
      purchased: request.body.cart,
    };

    const user = await Purchase.create(purchase);

    return response.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
