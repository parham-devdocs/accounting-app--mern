import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Modal,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useState } from "react";
import { tokens, useMode } from "../../Theme";
import OutlinedButton from "./OutlinedButton";
import { Formik } from "formik";
import { apiRequest } from "../../axios";
import axios from "axios";

const ModalBox = ({ categories, showModal, onCloseModalHandler,api,handleFormSubmit }) => {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const [formData, setFormData] = useState({
    category: "Housing",
    title: "",
    date: "",
    description: "",
    amount: "",
  });

  const validationSchema = yup.object({
    category: yup.string().required("Category is required"),
    title: yup.string().required("Title is required"),
    date: yup.string().required("Date is required"),
    description: yup.string().required("Description is required"),
    amount: yup.number().required("Amount is required"),
  });

 

  // Define an array of input fields including the date field
  const inputFields = [
    { type: "text", placeholder: "Title", key: "title" },
    { type: "number", placeholder: "Amount", key: "amount" },
    { type: "text", placeholder: "Description", key: "description" },
    { type: "date", placeholder: "Date", key: "date" },
  ];

  return (
    <Modal
      open={showModal}
      onClose={onCloseModalHandler} // Close modal on backdrop click
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
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
            component="form"
            width={500}
            minHeight={480}
            bgcolor={colors.blueAccent[900]}
            p={5}
            borderRadius={10}
            display="grid"
            onSubmit={handleSubmit}
          >
            {inputFields.map(({ type, placeholder, key }) => (
              <Box key={key} component="div" className=" h-20">
                <TextField
            
                  className=" w-full"
                  type={type}
                  placeholder={placeholder}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values[key]} // Use key for value binding
                  name={key} // Set name attribute for Formik
                  error={!!touched[key] && !!errors[key]}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: colors.greenAccent[500],
                      },
                      "&:hover fieldset": {
                        borderColor: colors.greenAccent[600],
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: colors.greenAccent[500],
                      },
                    },
                    ...(type === "date" && {
                      "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                        color: colors.greenAccent[500], // Change icon color for date input
                      },
                    }),
                  }}
                />
                <Typography variant="p" color="red" fontSize={12}>
                  {touched[key] && errors[key]}
                </Typography>
              </Box>
            ))}

            <FormControl
              variant="filled"
              sx={{
                bgcolor: "transparent",
                "& .MuiInputBase-root": {
                  bgcolor: "transparent",
                  "&:focus": {
                    bgcolor: "transparent", // Keep background transparent when focused
                  },
                },
                "& .MuiSelect-root": {
                  bgcolor: "transparent",
                },
                "& fieldset": {
                  borderColor: "transparent", // Make fieldset border transparent
                },
                "&:hover fieldset": {
                  borderColor: "transparent", // Keep fieldset border transparent on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: colors.greenAccent[500], // Change border color when focused
                },
              }}
            >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.category}
                name="category" // Set name attribute for Formik
                displayEmpty
                sx={{
                  bgcolor: "transparent",
                }}
              >
                {categories.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box display="flex" gap={2} justifyContent="end" marginTop={2}>
              <OutlinedButton
                color={colors.greenAccent[500]}
                hovercolor={colors.greenAccent[600]}
                type="submit" // Ensure this button submits the form
              >
                Add
              </OutlinedButton>
              <OutlinedButton
                color={colors.greenAccent[500]}
                hovercolor={colors.greenAccent[600]}
                onClick={onCloseModalHandler} // Close modal on click
              >
                Cancel
              </OutlinedButton>
            </Box>
          </Box>
        )}
      </Formik>
    </Modal>
  );
};

export default ModalBox;
