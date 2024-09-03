import { Box, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { tokens, useMode } from "../../Theme";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/OutlinedButton";
import * as yup from "yup";
import { Formik } from "formik";
import TypeEffect from "../../components/UI/TypeEffect";
import useAuthFetch from "../../hooks/useAuthFetch";
import { toast ,Toaster} from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducers/userInfo";

const formInputs = ["Username", "Email", "Password", "Confirm"];

const Login = () => {
  /////// hooks for theme

  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  //////// hook to storing login status into redux

  /////// dispacth hook for storing user data in redux
  const dispatch = useDispatch();

  //////// use navigate for redirecting logged in users to dashboard
  const navigate = useNavigate();

  const [inputReceived, setInputReceived] = useState(false);

  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    Password: "",
    Confirm: "",
  });

  const validationSchema = yup.object({
    Username: yup.string().required("Username is required"),
    Email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    Password: yup.string().required("Password is required"),
    Confirm: yup
      .string()
      .min(8, "Password must include at least 8 characters")
      .oneOf([yup.ref("Password"), null], "Passwords must match"),
  });

  const { onFetchHandler, data, error } = useAuthFetch({
    api: "http://localhost:5000/api/v1/auth/signup",
  });

  const handleFormSubmit = (values) => {
    onFetchHandler({
      Username: values.Username,
      Email: values.Email,
      Password: values.Password,
      Confirm: values.Confirm,
    });
    setInputReceived(true);
  };

  ////// use effect for updating data and error

  useEffect(() => {
    if (error) {
      toast.error(error); // Show error toast if there's an error
    } else if (data) {
      toast.success("User Signed Up successfully"); // Show success toast if data is received
      dispatch(login());

      setTimeout(() => {
        // a delay of 2 secs before navigation

        navigate("/dashboard");
      }, 2000);
      console.log(data);
    }
  }, [data, error]); // Runs whenever 'data' or 'error' changes

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
        isValid,
        dirty,
      }) => (
        <Box
          component="main"
          display="flex"
          flexDirection="column"
          gap={5}
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
              Sign up and start your
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
            gap={3}
          >
            {formInputs.map((input, index) => (
              <Box
                key={index}
                component="div"
                height="70px"
                display="flex"
                flexDirection="column"
                gap={1}
              >
                <Input
                  label={input}
                  labelColor={colors.greenAccent[600]}
                  labelFont="15px"
                  focusedBorderColor={colors.greenAccent[600]}
                  hoverBorderColor={colors.greenAccent[600]}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    console.log(errors);
                    !errors.Username &&
                    !errors.Email &&
                    !errors.Password &&
                    !errors.Confirm
                      ? setInputReceived(() => true)
                      : setInputReceived(() => false);
                  }}
                  value={values[input]} // Correct binding
                  name={input} // Set name attribute for Formik
                  error={!!touched[input] && !!errors[input]}
                />
                <Typography variant="body2" color="red">
                  {touched[input] && errors[input]}
                </Typography>
              </Box>
            ))}

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
              }}
              onClick={handleSubmit} // Trigger Formik's handleSubmit
              disabled={!isValid && !dirty}
            >
              Login
            </Button>
            <Link
              variant="body2"
              color={colors.greenAccent[500]}
              sx={{ cursor: "pointer" }}
              href="/auth/login"
              disabled={!isValid || !dirty} // Disable button if form is invalid or untouched
            >
              Already have an account? Log in
            </Link>
            <Toaster
              position="bottom-right"
              style={{ color: "ThreeDFace" }}
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
