import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import * as components from "./components/index.js";
import * as pages from "./pages/index.js";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <components.Navbar />
        <Routes>
          <Route path="/" element={<pages.Home />}></Route>
          <Route path="/customize/:title" element={<pages.Customize />}></Route>
          <Route path="/customize/:title/:subtype" element={<pages.Customize />}></Route>
        </Routes>
        <components.Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;