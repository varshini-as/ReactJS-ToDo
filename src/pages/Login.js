import React, { useContext, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { UserContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import userLogo from '.././user.png'
import { getUser } from "../service/crud";

export default function Login() {

    // localStorage.setItem("Users", JSON.stringify([{ "user": "admin", "password": "123456", "Tasks": [{ "task": "admin t1", "status": "In-progress", "assigned": "Pooja" }] }]));
    // ;

    const navigate = useNavigate();
    const { user, setUser, pwd, setPwd } = useContext(UserContext);
    const [err, setErr] = useState(false);


    const userList = JSON.parse(localStorage.getItem("Users"));

    const onSubmit = async () => {
        const u = userList.find(u => u.user === user);
        if (u && u.password === pwd) {  // user object found and password match
            // console.log(api.get(u.user));
            const res = await getUser(user);
            console.log(res);
            setErr(false);
            setUser(u.user);
            navigate('/profile/home');
        } else {
            setErr(true);
        }
        // const userInfo = await getUser(user);
        // console.log(userInfo);
        // if(userInfo && userInfo[0].password === pwd){
        //     setUser(userInfo[0].user);
        //     navigate('/profile/home');
        // }
        // setErr(true);
    }

    return (
        <div>
            <Card className="sign-in-card shadow">
                <Card.Body className="m-2">
                    <img src={userLogo} className="logo mb-1" alt='person-icon' />
                    <h4 className="text-center">Sign In</h4>
                    <Form>
                        <Form.Group>
                            <Form.Label className="mb-1">Username</Form.Label>
                            <Form.Control className="mb-3"
                                type="text"
                                placeholder="Enter username"
                                required
                                onChange={(e) => setUser(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="mb-1">Password</Form.Label>
                            <Form.Control className="mb-3"
                                type="password"
                                placeholder="Enter password"
                                required
                                onChange={(e) => setPwd(e.target.value)} />
                        </Form.Group>
                        <div className="text-danger text-center"
                            style={{ visibility: err ? 'visible' : 'hidden' }}>
                            <p>*Incorrect credentials</p>
                        </div>
                        <Button type="button"
                            onClick={onSubmit}
                            className="btn btn-primary rounded"
                            style={{ marginLeft: "40%" }}>Log in</Button>
                    </Form>
                </Card.Body>
                <Card.Footer>Don't have an account? Sign up <a><Link to="/register">here!</Link></a></Card.Footer>
            </Card>
        </div>
    )
}