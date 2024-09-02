import { Box, Link, Typography } from "@mui/material";
import { useState } from "react";
import { tokens, useMode } from "../../Theme";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/OutlinedButton";
import * as yup from "yup";
import { Formik } from "formik";
import TypeEffect from "../../components/UI/TypeEffect";
import axios from "axios";
import { toast, Toaster } from "sonner";

const Login = () => {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const handleFormSubmit = async (values) => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
        Email: values.email,
        Password: values.password,
      });
      toast.success("Login successful!");
    } catch (err) {
      if (err.response) {
        if (err.response.status === 422) {
          toast.error("User not found");
          console.log("User not found");
        } else if (err.response.status === 401) {
          toast.error("Unauthorized access");
        } else {
          toast.error("Server not responding, please try again!");
        }
      } else {
        toast.error("Network error, please check your connection.");
      }
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isValid,
        dirty,
      }) => (
        <Box
          component="main"
          display="flex"
          flexDirection="column"
          gap={13}
          alignItems="center"
          paddingTop={-4}
     
        
        >
          <Box
            component="section"
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <Typography variant="h1" color="wheat" marginRight={1}>
              Login and start your
            </Typography>
            <TypeEffect
              minWidth="130px"
              list={["journey", "career", "business"]}
              textFontColor={colors.greenAccent[500]}
              cursorFontColor="whitesmoke"
              fontSize="34px"
            />
          </Box>

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
            <Box height="70px" display="flex" flexDirection="column" gap={1}>
              <Input
                label="Email"
                labelColor={colors.greenAccent[600]}
                labelFont="15px"
                focusedBorderColor={colors.greenAccent[600]}
                hoverBorderColor={colors.greenAccent[600]}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
              />
              <Typography variant="body2" color="red">
                {touched.email && errors.email}
              </Typography>
            </Box>

            <Box height="70px" display="flex" flexDirection="column" gap={1}>
              <Input
                label="Password"
                type="password"
                labelColor={colors.greenAccent[600]}
                labelFont="15px"
                focusedBorderColor={colors.greenAccent[600]}
                hoverBorderColor={colors.greenAccent[600]}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
              />
              <Typography variant="body2" color="red">
                {touched.password && errors.password}
              </Typography>
            </Box>

            <Button
              sx={{
                color:
                  isValid && dirty ? colors.greenAccent[500] : colors.grey[500],
                borderColor:
                  isValid && dirty ? colors.greenAccent[500] : colors.grey[500],
                "&:hover": {
                  backgroundColor: "transparent",
                  color:
                    isValid && dirty
                      ? colors.greenAccent[500]
                      : colors.grey[500],
                  borderColor:
                    isValid && dirty
                      ? colors.greenAccent[500]
                      : colors.grey[500],
                },
                p: "10px",
                marginTop: -3,
              }}
              onClick={handleSubmit}
              disabled={!isValid || !dirty} // Disable button if form is invalid or untouched
            >
              Login
            </Button>

            <Link
              variant="p"
              color={colors.greenAccent[500]}
              marginTop={-3}
              sx={{ cursor: "pointer" }}
              href="/auth/register"
            >
              Don't have an account? Sign up
            </Link>

            <Toaster
              position="bottom-right"
              style={{  color:"ThreeDFace" }}
              expand
              richColors
            />
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default Login;
