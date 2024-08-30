import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens, useMode } from "../Theme";
import { useEffect, useState } from "react";
import { dateFormatter } from "../../utils";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Button from "./UI/Button";

export default function DataGridDemo({ deleteFn, getFn, data, updateFn }) {
  const [loading, setLoading] = useState(true);
  const [editingCell, setEditingCell] = useState(null); // Track the editing cell
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", width: 40 },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        console.log(params)
        const date = new Date(params); // Access the createdAt field
        return dateFormatter.format(date); // Format the date using your dateFormatter
      },
    },
    {
      field: "title",
      headerName: "Title",
      width: 250,
      headerAlign: "center",
      editable: true,
      align: "center",
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      type: "string",
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 100,
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Actions",
      width: 250,
      type: "number",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box
          display="flex"
          gap=".5rem"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Button
            color="#2e7c67"
            borderColor="#2e7c67"
            borderRadius="8px"
            disabled={params.disabled} // Disable when the cell is being edited
            onClick={() => updateFn(params.row)}
          >
            <ModeEditOutlineOutlinedIcon />
          </Button>
          <Button
            color="#2e7c67"
            borderColor="#2e7c67"
            borderRadius="8px"
            onClick={() => {
              deleteFn(params.row._id);
            }}
          >
            <DeleteOutlineOutlinedIcon />
          </Button>
        </Box>
      ),
    },
  ];
  useEffect(() => {
    setLoading(true);
    getFn();
    setLoading(false);
  }, []);

  return (
    <Box
      bgcolor={colors.blueAccent[900]}
      borderRadius="5px"
      height="auto"
      m="40px 0 0 0 "
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-container--top": {
          color: colors.greenAccent[600],
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .Mui-disabled": {
          color: "red",
        },
        "& .MuiDataGrid-toolbarContainer button": {
          color: colors.greenAccent[600],
        },
      }}
    >
      <DataGrid
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        style={{ color: colors.blueAccent[400] }}
        rows={data}
        columns={columns}
        loading={loading}
        slots={{ toolbar: GridToolbar }}
        onCellEditStart={(params) => setEditingCell(params.field)} // Set editing cell
        onCellEditStop={() => setEditingCell(null)} // Clear editing cell
      />
    </Box>
  );
}
