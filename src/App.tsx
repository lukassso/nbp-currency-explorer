import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CurrencyDetails from "@/pages/CurrencyDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/currency/:code" element={<CurrencyDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
