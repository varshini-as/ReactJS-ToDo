import React, { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate, Outlet, NavLink } from "react-router-dom";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';

export default function ProfileDashboard() {

    const { setUser, setPwd } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        setUser('');
        setPwd('');
        navigate('/');
    }

    return (
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
                                <NavLink exact to="/profile/home" activeClassName="activeClicked">
                                    <CDBSidebarMenuItem icon="clipboard-check">Task List</CDBSidebarMenuItem>
                                </NavLink>
                                <NavLink exact to="/profile/add" activeClassName="activeClicked">
                                    <CDBSidebarMenuItem icon="plus">Add Task</CDBSidebarMenuItem>
                                </NavLink>
                                <NavLink exact to="/profile/assignee" activeClassName="activeClicked">
                                    <CDBSidebarMenuItem icon="user">Assignee Status</CDBSidebarMenuItem>
                                </NavLink>
                                <NavLink exact to="/profile/completed" activeClassName="activeClicked">
                                    <CDBSidebarMenuItem icon="check">Completed Tasks</CDBSidebarMenuItem>
                                </NavLink>
                                <NavLink exact to="/profile/country" activeClassName="activeClicked">
                                    <CDBSidebarMenuItem icon="info">Data from API</CDBSidebarMenuItem>
                                </NavLink>
                                <CDBSidebarMenuItem icon="signout">
                                    <button className="btn btn-primary" onClick={(e) => handleSignOut()}>Log out</button>
                                </CDBSidebarMenuItem>
                            </CDBSidebarMenu>
                        </CDBSidebarContent>
                    </CDBSidebar>
                </div>

                <Outlet />
            </div>
        </div>
    )
}