import "./App.css";
import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route index element={<Dashboard/>} />
    </Routes>
  );
}

export default App;
