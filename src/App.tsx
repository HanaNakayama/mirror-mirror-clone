import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import Reservation from "./pages/Reservation/Reservation";
import { CustomerInfo } from "./pages/Reservation/CustomerInfo/CustomerInfo";
import OriginalDress from "./pages/OriginalDress/OriginalDress";
import { InputForm } from "./pages/Reservation/CustomerInfo/InputForm";
import { NoPartnership } from "./pages/Reservation/CustomerInfo/NoPartnership";
import { Appoint } from "./pages/Reservation/Appoint";
import QA from "./pages/QA/QA";
import Shop from "./pages/Shop/Shop";
import News from "./pages/News/News";
import Tuxedo from "./pages/OriginalDress/Tuxedo";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route
          path="/"
          element={<Hero />}
        />

        <Route
          path="/Reservation"
          element={<Reservation />}
        />

        <Route
          path="/Reservation/Appoint"
          element={<Appoint />}
        />

        <Route
          path="/Reservation/CustomerInfo/CustomerInfo"
          element={<CustomerInfo />}
        />

        <Route
          path="/Reservation/CustomerInfo/NoPartnership"
          element={<NoPartnership />}
        />

        <Route
          path="/Reservation/CustomerInfo/InputForm"
          element={<InputForm />}
        />

        <Route
          path="/original-dress"
          element={<OriginalDress />}
        />

        <Route
          path="/OriginalDress/Tuxedo"
          element={<Tuxedo />}
        />

        <Route
          path="/QA"
          element={<QA />}
        />

        <Route
          path="/Shop"
          element={<Shop />}
        />

        <Route
          path="/News"
          element={<News />}
        />
      </Routes>
    </BrowserRouter >

  );
}

export default App;