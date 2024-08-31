import { createContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { tokens, useMode } from "./Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Expenses from "./pages/Expenses";
import Incomes from "./pages/Incomes";
import Login from "./pages/Auth/Login";

const ColorModeContext = createContext();

function App() {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/Expenses" element={<Expenses />} />
              <Route path="/Incomes" element={<Incomes />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
