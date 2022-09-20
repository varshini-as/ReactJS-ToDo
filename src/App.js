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
import UpdateModal from './components/modals/UpdateModal';

export const UserContext = createContext();

// export const taskReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_TASK":
//       return [...state, { id: Date.now(), task: action.payload.task, status: action.payload.status, assigned: action.payload.assignee }];
//     case "UPDATE_TASK":
//       return state.map((t) => t.task === action.payload.old ? { id: t.id, task: action.payload.old, status: action.payload.status, assigned: action.payload.assigned} : t);
//     case "DELETE_TASK":
//       return state.filter((t) => t.task !== action.payload);
//     case "CLEAR_TASKS":
//       return [];
//     default:
//       return state;
//   }
// }

function App() {

  const [user, setUser] = useState();
  const [pwd, setPwd] = useState();

  localStorage.setItem("Users", JSON.stringify(
    [{
      "user": "admin", "password": "123456", "Tasks": [
        {
          "task": "admin t1",
          "status": "Pending",
          "assigned": "ABC"
        }
      ]
    }]
  ))

  // const currentTaskList = JSON.parse(localStorage.getItem("Tasks"));

  // const [currentTaskList, dispatch] = useReducer(taskReducer,
  //   JSON.parse(localStorage.getItem('Tasks'))
  // );

  // useEffect(() => {
  //   localStorage.setItem("Tasks", JSON.stringify(currentTaskList));
  // }, [currentTaskList]);

  const [show, setShow] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [oldValue, setOldVal] = useState();
  const [currentTask, setCurrentTask] = useState();
  const [status, setStatus] = useState("Pending");
  const [search, setSearch] = useState();


  const handleSelect = (selected) => {
    setStatus(selected);
  }

  // const filtered = !search ? currentTaskList.map(t => t.assigned): currentTaskList.map(t => t.assigned.startsWith(search) && t.assigned);

  return (
    <UserContext.Provider value={{ user, setUser, pwd, setPwd, updateModal, setUpdateModal, oldValue, setOldVal, handleSelect, status, setShow, currentTask, setCurrentTask, search, setSearch }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/profile' element={<ProfileDashboard />} >
              <Route index path='home' element={<Home />} />
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
