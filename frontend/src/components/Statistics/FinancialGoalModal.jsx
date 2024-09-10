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
import OutlinedButton from "../UI/OutlinedButton";
import { Formik } from "formik";

const FinancialGoal = ({
  showModal,
  onCloseModalHandler,

  handleFormSubmit,
}) => {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const [formData, setFormData] = useState({
    target: "",
    budget:""
  });
  console.log(showModal)

  const validationSchema = yup.object({
    budget: yup.number().required("budget is required"),
    target: yup.number().required("target is required"),
  });


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
            minHeight={120}
            bgcolor={colors.blueAccent[900]}
            p={5}
            borderRadius={10}
            display="flex"
            onSubmit={handleSubmit}
            flexDirection="column"
          >
            <Box component="div" className=" h-20">
              <TextField
                className=" w-full"
                type="number"
                placeholder="Set your goal"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values["target"]} // Use key for value binding
                name="target" // Set name attribute for Formik
                error={!!touched["target"] && !!errors["target"]}
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
                }}
              />
              <Typography variant="p" color="red" fontSize={12}>
                {touched["target"] && errors["target"]}
              </Typography>
            </Box>

                        <Box component="div" className=" h-20">

            
            <TextField
              className=" w-full"
              type="number"
              placeholder="Set your budget"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values["budget"]} // Use key for value binding
              name="budget" // Set name attribute for Formik
              error={!!touched["budget"] && !!errors["budget"]}
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
              }}
            />
            <Typography variant="p" color="red" fontSize={12}>
              {touched["budget"] && errors["budget"]}
            </Typography>
</Box>
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
            ></FormControl>

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

export default FinancialGoal;
