import express from "express";
import* as yup from "yup";
import validate from './../utils/validator.js';
import UserModel from "../models/users.js";
import { signup,login } from "../controlers/users.js";

const router = express.Router()


////// sign up schema
const signUpSchema = yup.object({
    Username: yup.string().required("Username is required"),
    Email: yup
      .string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email"
      ),
    Password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must include at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must include uppercase, lowercase, and symbols"
      ),
    Confirm: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("Password"), null], "Passwords must match"),

});

/////// login schema
const loginSchema = yup.object({
  Email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email"
    ),
  Password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must include at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include uppercase, lowercase, and symbols"
    ),

});

router.post("/signup",validate(signUpSchema),signup)
router.post("/login", validate(loginSchema), login);

export default router