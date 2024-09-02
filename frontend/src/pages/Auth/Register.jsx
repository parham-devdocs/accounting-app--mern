import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { tokens, useMode } from "../../Theme";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/OutlinedButton";
import * as yup from "yup";
import { Formik } from "formik";

const Login = () => {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const [inputReceived, setInputReceived] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  console.log("render");
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const handleFormSubmit = (values) => {
    console.log(values);
    // You can set inputReceived to true or handle your login logic here
    setInputReceived(true);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={formData}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <Box
          component="div"
          className="animate-fadeIn"
          display="flex"
          flexDirection="column"
          p={5}
          width="500px"
          minHeight="100px"
          border={`2px solid ${colors.greenAccent[600]}`}
          borderRadius="10px"
          gap={5}
        >
          <Box
            component="div"
            height="70px"
            display="flex"
            flexDirection="column"
            gap={1}
          >
            <Input
              label="Email"
              labelColor={colors.greenAccent[600]}
              labelFont="15px"
              focusedBorderColor={colors.greenAccent[600]}
              hoverBorderColor={colors.greenAccent[600]}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email} // Use key for value binding
              name="email" // Set name attribute for Formik
              error={!!touched.email && !!errors.email}
            />
            <Typography variant="body2" color="red">
              {touched.email && errors.email}
            </Typography>
          </Box>

          <Box
            component="div"
            height="70px"
            display="flex"
            flexDirection="column"
            gap={1}
          >
            <Input
              label="Password"
              type="password"
              labelColor={colors.greenAccent[600]}
              labelFont="15px"
              focusedBorderColor={colors.greenAccent[600]}
              hoverBorderColor={colors.greenAccent[600]}
              onBlur={handleBlur}
              onChange={(e) => {
                handleChange(e);
                !errors.email && !errors.password
                  ? setInputReceived(true)
                  : setInputReceived(false);
              }}
              value={values.password} // Ensure value is bound to Formik
              name="password" // Set name attribute for Formik
              error={!!touched.password && !!errors.password}
            />
            <Typography variant="body2" color="red">
              {touched.password && errors.password}
            </Typography>
          </Box>

          <Button
            sx={{
              color: inputReceived ? colors.greenAccent[500] : colors.grey[500],
              borderColor: inputReceived
                ? colors.greenAccent[500]
                : colors.grey[500],
              "&:hover": {
                backgroundColor: "transparent",
                color: inputReceived
                  ? colors.greenAccent[500]
                  : colors.grey[500],
                borderColor: inputReceived
                  ? colors.greenAccent[500]
                  : colors.grey[500],
              },
              p: "10px",
            }}
            onClick={handleSubmit} // Trigger Formik's handleSubmit
          >
            Login
          </Button>
        </Box>
      )}
    </Formik>
  );
};

export default Login;
