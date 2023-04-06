import "./App.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./components/Navbar";
import ListReviews from "./pages/ListPosts";
import ReviewForm from "./pages/ReviewForm";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<ListReviews />} />
        <Route path="/postreview" element={<ReviewForm />} />
      </Routes>
    </div>
  );
}

export default App;
