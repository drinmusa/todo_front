import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Navigation from "./components/Navigation/Navigation";
import Lists from "./components/List/Lists";
import Tasks from "./components/Task/Tasks";
import NewTask from "./components/Task/NewTask";
import NewList from "./components/List/NewList";
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/newtask" element={<NewTask />} />
          <Route path="/newlist" element={<NewList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
