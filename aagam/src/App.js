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
          <Route path="/customize/:type_name" element={<pages.Customize />}></Route>
          {/* <Route path="/customize/:type_name/:pattern?" element={<pages.Customize />}></Route> */}
          <Route path="/admin" element={<pages.Admin />}></Route>
          <Route path="/adminpattern" element={<pages.AdminPattern />}></Route>
          <Route path="/login" element={<pages.Login />}></Route>
        </Routes>
        <components.Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;