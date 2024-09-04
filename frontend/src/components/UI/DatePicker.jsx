import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { tokens, useMode } from "../../Theme";

 function BasicDatePicker({onDateChangeHandler}) {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Pick a date"
          disableFuture
                  closeOnSelect
                  onChange={(e)=>onDateChangeHandler(e)}
          slotProps={{
            day: {
              sx: {
                ":active": { bgcolor: colors.blueAccent[500] },
                ":checked": {
                  bgcolor: colors.blueAccent[500],
                  border: "1px solid red",
                }, // Add white border to selected days
              },
            },
            desktopPaper: { sx: { borderRadius: "16px", marginTop: "10px" } },
          }}
          sx={{
            svg: { color: colors.greenAccent[500] }, // Customize icon color
            input: {
              color: colors.greenAccent[500],
              borderColor: colors.greenAccent[500],
            }, // Customize input text color
            "& .MuiInputLabel-outlined": { color: colors.greenAccent[500] },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: colors.greenAccent[500],
                color: colors.greenAccent[500],
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
      </DemoContainer>
    </LocalizationProvider>
  );
}


export default BasicDatePicker