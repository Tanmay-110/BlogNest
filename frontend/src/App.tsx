import { BrowserRouter, Route, Routes } from "react-router-dom"
import {Signup} from './pages/Signup';
import {Signin} from './pages/Signin';
import { Blogs } from "./pages/Blogs";
import Article from "./pages/Article";
import { Publish } from "./pages/Publish";
import Navbar from "./components/Navbar";

function App() {
    return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
