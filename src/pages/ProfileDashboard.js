import React, { createContext, useContext, useReducer, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useNavigate, Outlet, NavLink } from "react-router-dom";
import UpdateModal from '../components/modals/UpdateModal';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';

export const ToDoContext = createContext();

export const taskReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return [...state, { id: Date.now(), task: action.payload.task, status: action.payload.status, assigned: action.payload.assignee }];
        case "UPDATE_TASK":
            return state.map((t) => t.task === action.payload.old ? { id: t.id, task: action.payload.old, status: action.payload.status, assigned: action.payload.assigned } : t);
        case "DELETE_TASK":
            return state.filter((t) => t.task !== action.payload);
        case "CLEAR_TASKS":
            return [];
        default:
            return state;
    }
}

export default function ProfileDashboard() {

    const { user, setUser, setPwd } = useContext(UserContext);
    console.log(
        JSON.parse(
            localStorage.getItem(
                "Users"
            )
        ).findIndex((u) => u.user ===  user)
    );

    // JSON.parse(localStorage.getItem("Users")).find((obj) => obj.user === user).Tasks:[];

    // const [tasks, setTasks] = useState([]);
    // const [loading, setLoading] = useState(false);

    // const getData = async (user) => {
    //     setLoading(true);
    //     const tasks = await getTasks(user);
    //     if (tasks) {
    //         setTasks(tasks.Tasks);
    //         setLoading(false);
    //     }
    // }

    const [currentTaskList, dispatch] = useReducer(taskReducer, JSON.parse(localStorage.getItem("Users")).find((obj) => obj.user === user).Tasks);
    console.log(currentTaskList);
    useEffect(() => {
        let users = JSON.parse(localStorage.getItem("Users"));
        let userIndex = users.findIndex((u) => u.user === user)
        users[userIndex].Tasks = currentTaskList;
        localStorage.setItem("Users", JSON.stringify(users));
        // getData();
    }, [currentTaskList, user]);

    const navigate = useNavigate();

    const handleSignOut = () => {
        setUser('');
        setPwd('');
        navigate('/');
    }

    return (
        <ToDoContext.Provider value={{ currentTaskList, dispatch }}>
            <div>
                <div className="d-flex">
                    <div className="profile-nav">
                        <CDBSidebar textColor="#fff" backgroundColor="#333">
                            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                                <a href="/profile/home" className="text-decoration-none" style={{ color: 'inherit' }}>
                                    Dashboard
                                </a>
                            </CDBSidebarHeader>
                            <CDBSidebarContent className="sidebar-content">
                                <CDBSidebarMenu>
                                    <NavLink exact to="/profile/home">
                                        <CDBSidebarMenuItem icon="clipboard-check">Task List</CDBSidebarMenuItem>
                                    </NavLink>
                                    <NavLink exact to="/profile/add">
                                        <CDBSidebarMenuItem icon="plus">Add Task</CDBSidebarMenuItem>
                                    </NavLink>
                                    <NavLink exact to="/profile/assignee">
                                        <CDBSidebarMenuItem icon="user">Assignee Status</CDBSidebarMenuItem>
                                    </NavLink>
                                    <NavLink exact to="/profile/completed">
                                        <CDBSidebarMenuItem icon="check">Completed Tasks</CDBSidebarMenuItem>
                                    </NavLink>
                                    <NavLink exact to="/profile/country">
                                        <CDBSidebarMenuItem icon="info">Data from API</CDBSidebarMenuItem>
                                    </NavLink>
                                    <CDBSidebarMenuItem icon="signout">
                                        <button className="btn btn-primary" onClick={(e) => handleSignOut()}>Log out</button>
                                    </CDBSidebarMenuItem>
                                </CDBSidebarMenu>
                            </CDBSidebarContent>
                        </CDBSidebar>
                    </div>
                    <UpdateModal></UpdateModal>

                    <Outlet />
                </div>
            </div>
        </ToDoContext.Provider>
    )
}