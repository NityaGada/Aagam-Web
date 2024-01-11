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
<<<<<<< HEAD
          <Route path="/customize/:title/:pattern" element={<pages.Customize />}></Route>
          <Route path="/admin" element={<pages.Admin />}></Route>
=======
          <Route path="/customize/:title/:subtype" element={<pages.Customize />}></Route>
          <Route path="/customize/:title/:subtype/:pattern" element={<pages.Customize />}></Route>
          <Route path="/adminpattern" element={<pages.AdminPattern />}></Route>
          <Route path="/login" element={<pages.Login />}></Route>
>>>>>>> b77052197326612a766a12b36b9939c4c5f0f630
        </Routes>
        <components.Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;