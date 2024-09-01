import { TextField } from "@mui/material";

const Input = ({
  label,
  variant = "outlined",
  type = "text",
  labelColor,
  labelFont,
  hoverBorderColor,
  focusedBorderColor,
  textFont = "16px",
  textColor = "white",
  ...props
}) => {
  return (
    <TextField
      
      {...props}
      type={type}
      label={label}
      variant={variant}
      inputProps={{
        style: {
          fontSize: textFont, // Removed curly braces
          color: textColor, // Removed curly braces
        },
      }}
      InputLabelProps={{
        style: {
          fontSize: labelFont, // Removed curly braces
          color: labelColor,
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: focusedBorderColor, // Removed curly braces
          },
          "&:hover fieldset": {
            borderColor: hoverBorderColor, // Removed curly braces
          },
        },
      }}
    />
  );
};

export default Input;
