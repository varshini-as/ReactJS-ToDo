import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ProfileDashboard from './pages/ProfileDashboard';
import Completed from './pages/Completed';
import AddTask from './pages/AddTask';
import AssigneeList from './pages/AssigneeList'
import Country from './pages/Country';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createContext, useState, useReducer, useEffect } from 'react';
import Nav from './components/Nav';
import Register from './pages/Register';

export const UserContext = createContext();

function App() {

  const [user, setUser] = useState();
  const [pwd, setPwd] = useState();

  const [show, setShow] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [oldValue, setOldVal] = useState();
  const [currentTask, setCurrentTask] = useState();
  const [status, setStatus] = useState("Pending");


  const handleSelect = (selected) => {
    setStatus(selected);
  }

  return (
    <UserContext.Provider value={{ user, setUser, pwd, setPwd, updateModal, setUpdateModal, oldValue, setOldVal, handleSelect, status, setShow, currentTask, setCurrentTask }}>
      <div className="App">
        <Nav></Nav>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<ProfileDashboard />} >
              <Route path='home' element={<Home />} />
              <Route path='add' element={<AddTask />} />
              <Route path='completed' element={<Completed />} />
              <Route path='assignee' element={<AssigneeList />} />
              <Route path='country' element={<Country />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
