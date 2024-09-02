import express from "express";
import* as yup from "yup";
import validate from './../utils/validator.js';
const router = express.Router()
const schema = yup.object({
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


router.post("/add-user",validate(schema), (req, res) => {
    res.send("user created")
})

export default router