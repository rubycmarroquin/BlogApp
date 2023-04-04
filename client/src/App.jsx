import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/Navbar'
import ListReviews from './components/ListPosts';


function App() {

  return (
    <div className="App">
      <MyNavBar />
      <ListReviews />

    </div>
  )
}

export default App
