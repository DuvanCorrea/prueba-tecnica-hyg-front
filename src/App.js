import './App.css';
import Navbar from './componenets/Navbar';
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home"
import Proyect from './pages/Proyect';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container mt-3">

        <BrowserRouter>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/proyectos" component={Proyect} />
        </BrowserRouter>


      </div>
    </div>
  );
}

export default App;
