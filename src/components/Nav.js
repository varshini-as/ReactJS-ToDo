import React from "react";
import { Navbar, Container } from "react-bootstrap";
import logo from '../assets/list.png';

export default function Nav() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home" className="d-flex align-items-center gap-1">
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-flex align-top m-1"
                    />{' '}
                    <h4>Tasklist App</h4>
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}