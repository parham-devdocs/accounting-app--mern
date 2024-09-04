import { createContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { tokens, useMode } from "./Theme";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./Layouts/DashboardLayout";
import Expenses from "./pages/Expenses";
import Incomes from "./pages/Incomes";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AuthLayout from "./Layouts/AuthLayout";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor,store }  from "./redux/store";
import MainLayout from "./Layouts/MainLayout";
import Contact from "./pages/Main/Contact";
import Contribute from "./pages/Main/Contribute";
import Home from "./pages/Main/Home";

const ColorModeContext = createContext();
function Main() {
  const isLoggedin = useSelector((state) => state.isLoggedin);
  console.log(isLoggedin);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            isLoggedin ? <DashboardLayout /> : <Navigate to="/auth/login" />
          }
        >
          <Route path="Expenses" element={<Expenses />} />
          <Route path="Incomes" element={<Incomes />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />}/>
        <Route path="/Contact" element={<Contact />}/>
          <Route path="/Contribute" element={<Contribute />}/>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
 
  const [theme, colorMode] = useMode();

  return (
    
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
            <Main/>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </Provider>
      </PersistGate>
  
  );
}

export default App;
