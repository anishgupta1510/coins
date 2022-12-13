import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Header from "./components/Header";
import Home from "./components/Home.jsx";
import Coins from "./components/Coins.jsx";
import Exchanges from "./components/Exchanges.jsx";
import CointDetails from "./components/CoinDetails.jsx"
import Footer from "./components/Footer";


function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/coins" element={<Coins/>}/>
          <Route path="/exchanges" element={<Exchanges/>}/>
          <Route path="/coin/:id" element={<CointDetails/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
