import User from "../models/user";
import products from "../models/product";
import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";
import Cart from "../models/cart";
import { toNamespacedPath } from "path/posix";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) return res.status(400).send("Name is required");
    if (!password || password.length < 6) {
      return res
        .status(405)
        .send("password is required and should be min 6 characters long");
    }
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("Email is taken");

    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    console.log("saved user", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error. Try again.");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(400).send("No user found");
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).send("Wrong password!");
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Signout success" });
  } catch (err) {
    console.log(err);
  }
};

export const shop = async (req, res) => {
  try {
    const allProducts = await products.find({});
    res.json(allProducts);
  } catch (err) {
    console.log(err);
  }
};

export const cart = async (req, res) => {
  try {
    const { user, cart, sum } = req.body;

    if (cart.length == 0) {
      return res
        .status(405)
        .send("You need to have at least one product in your cart");
    }

    const newCart = new Cart({
      user,
      cart,
      sum,
    });
    console.log(newCart);
    await newCart.save();
    console.log("saved order", newCart);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error. Try again.");
  }
};
