import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Article from "./Pages/Article";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<Article />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
