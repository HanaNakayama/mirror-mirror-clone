import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero/Hero";
import OriginalDress from "./pages/OriginalDress/OriginalDress";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route
          path="/"
          element={<Hero />}
        />

        <Route
          path="/original-dress"
          element={<OriginalDress />}
        />
      </Routes>
    </BrowserRouter>

  );
}

export default App;