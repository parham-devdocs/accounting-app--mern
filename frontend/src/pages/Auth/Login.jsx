import { Box, Link, Typography } from "@mui/material";
import { useEffect } from "react";
import { tokens, useMode } from "../../Theme";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/OutlinedButton";
import * as yup from "yup";
import { Formik } from "formik";
import TypeEffect from "../../components/UI/TypeEffect";
import { toast, Toaster } from "sonner";
import useAuthFetch from "../../hooks/useAuthFetch";
import { useNavigate } from "react-router-dom";
import {useDispatch  } from "react-redux";
import {  addUserInfo, login } from "../../redux/reducers/userInfo";
const Login = () => {
  /////// hooks for theme
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);

  /////// dispacth hook for storing user data in redux
 
  const dispatch=useDispatch()

  //////// use navigate for redirecting logged in users to dashboard
  const navigate = useNavigate();

  //////// custom hook for posting auth data
  const { onFetchHandler, data, error } = useAuthFetch({
    api: "http://localhost:5000/api/v1/auth/login",
  });

  /////// yup validation schema
  const validationSchema = yup.object({
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email"
      )
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  ////// handle from submission button
  const handleFormSubmit = async (values) => {
    onFetchHandler({
      Email: values.email,
      Password: values.password,
    });

  };

  ////// use effect for updating data and error

  useEffect(() => {
    if (error) {
      toast.error(error); // Show error toast if there's an error
    } else if (data) {
      toast.success("User logged in successfully"); // Show success toast if data is received
      dispatch(addUserInfo(data))
dispatch(login())
      setTimeout(() => { // a delay of 2 secs before navigation

        navigate("/dashboard");
      }, 2000);
      console.log(data);
    }
  }, [data, error]); // Runs whenever 'data' or 'error' changes

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
              loading
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
              position="top-left"
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
