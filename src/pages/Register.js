import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const usersInfo = JSON.parse(localStorage.getItem("Users")) ?
        JSON.parse(localStorage.getItem("Users")) : [];
    const users = usersInfo ? usersInfo.map(u => u.user) : [];

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirm, setConfirm] = useState('');

    const navigate = useNavigate();

    const onSubmit = () => {
        if (valid(user, pwd, confirm)) {
            localStorage.setItem("Users", JSON.stringify(
                [
                    ...usersInfo,
                    {
                        user: user,
                        password: pwd,
                        Tasks: []
                    }
                ]
            ));
            navigate("/");
        }

    }

    const valid = (user, pwd, confirm) => {
        if (user === '' ||
            users.find((u) => u === user) ||
            pwd.length < 6 ||
            confirm !== pwd) {
            return false
        }
        return true
    }

    return (<div>
        <Card className="sign-in-card shadow">
            <Card.Body className="m-2">
                <h4 className="text-center">Sign Up</h4>

                <Form>
                    <Form.Group className="mb-3 gap-2">
                        <Form.Label>Your username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            onChange={(e) => setUser(e.target.value)}
                            required />
                        {!user &&
                            <div className="text-danger text-center">
                                <p>*This field is empty.</p>
                            </div>}
                        {users.find((u) => u === user) &&
                            <div className="text-danger text-center">
                                <p>*This user already exists.</p>
                            </div>}
                    </Form.Group>

                    <Form.Group className="mb-3 gap-2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            onChange={(e) => setPwd(e.target.value)}
                            required />
                        {!pwd &&
                            <div className="text-danger text-center">
                                <p>*This field is empty.</p>
                            </div>}
                        {pwd.length >0 && pwd.length<6 &&
                            <div className="text-danger text-center">
                                <p>*Password must have at least 6 characters.</p>
                            </div>}
                    </Form.Group>

                    <Form.Group className="mb-2 gap-2">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Re-enter password"
                            onChange={(e) => setConfirm(e.target.value)}
                            required />
                        {!confirm &&
                            <div className="text-danger text-center">
                                <p>*This field is empty.</p>
                            </div>}
                        {(confirm && pwd !== confirm) &&
                            <div className="text-danger text-center">
                                <p>*Passwords do not match.</p>
                            </div>}
                    </Form.Group>

                    <Button type="button"
                        onClick={onSubmit}
                        className="btn btn-primary rounded w-100"
                        disabled={!valid(user, pwd, confirm) ? true : false}
                    >Register</Button>
                </Form>
            </Card.Body>

            <Card.Footer className="text-center">
                Already have an account? Login
                <a><Link to="/">here!</Link></a>
            </Card.Footer>
        </Card>
    </div>);
}