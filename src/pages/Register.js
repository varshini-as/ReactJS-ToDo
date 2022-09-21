import React, { useState, useRef } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CustomStatusModal from "../components/modals/CustomStatusModal";

export default function Register() {
    const usersInfo = JSON.parse(localStorage.getItem("Users"));
    const users = usersInfo.map(u => u.user);
    console.log(users);

    const [error, setError] = useState(false);

    const userRef = useRef('');
    const passwordRef = useRef();
    const confRef = useRef();

    const navigate = useNavigate();

    const errors = [
        "*This username already exists.",
        "*Password must contain at least 6 characters.",
        "*Passwords don't match.",
        "This field should not be empty."
    ]

    const onSubmit = () => {
        if (valid) {
            localStorage.setItem("Users", JSON.stringify(
                [
                    ...usersInfo,
                    {
                        user: userRef.current.value,
                        password: passwordRef.current.value,
                        Tasks: []
                    }
                ]
            ));
            navigate("/");
        }
    }

    const valid = (user, pwd, confirm_pwd) => {
        if ((user in users) || (pwd.length < 6) || (pwd !== confirm_pwd)) {
            return false
        }
        return true
    }

    return (<div>
        {/* {!valid()? <CustomStatusModal message={"You have registered successfuly!"} show={true}/>: null} */}
        <Card className="sign-in-card shadow">
            <Card.Body className="m-2">
                <h4 className="text-center">Sign Up</h4>
                <Form>
                    <Form.Group>
                        <Form.Label className="mb-1">Your username</Form.Label>
                        <Form.Control className="mb-3"
                            type="text"
                            placeholder="Enter username"
                            ref={userRef}
                            onChange={(e) => e.target.value === ''? setError(errors[3]): e.target.value in users? setError(errors[0]):setError('') }
                            required />
                    </Form.Group>
                    <div className="text-danger text-center"
                        style={{ visibility: error ? 'visible' : 'hidden' }}>
                        <p>{error}</p>
                    </div>
                    <Form.Group>
                        <Form.Label className="mb-1">Password</Form.Label>
                        <Form.Control className="mb-3"
                            type="password"
                            placeholder="Enter password"
                            ref={passwordRef}
                            required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mb-1">Confirm Password</Form.Label>
                        <Form.Control className="mb-3"
                            type="password"
                            placeholder="Re-enter password"
                            ref={confRef}
                            required />
                    </Form.Group>
                    <Button type="button"
                        onClick={onSubmit}
                        className="btn btn-primary rounded"
                        style={{ marginLeft: "40%" }}>Register</Button>
                </Form>
            </Card.Body>
        </Card>
    </div>);
}