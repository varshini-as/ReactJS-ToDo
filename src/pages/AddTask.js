import React, { useRef, useContext, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { UserContext } from "../App";

export default function AddTask() {

    let taskInput = useRef(""); // access DOM element using useRef()
    let assigneeInput = useRef("");
    const [isDisabled, setDisable] = useState(true);

    const { setShow, currentTaskList, dispatch, status, handleSelect } = useContext(UserContext);

    const handleInput = (obj) => {
        // check for existing entry
        if (currentTaskList.find(task => task.task === obj.task)) {
            setShow(true);
        }
        // dispatch action if non-empty field and doesn't exist in array
        if (obj.task !== '' && obj.assigned !== '' &&
            currentTaskList.find(task => task.task === obj.task) === undefined) {
            dispatch({ payload: obj, type: 'ADD_TASK' });
        }
        document.getElementById("task").value = '';
        document.getElementById("assignee").value = '';
        setDisable(true);
    }

    return (
        <div className="m-auto" style={{ marginTop: "20%", height: "300px", width: "400px" }}>
            <Card>
                <Card.Body className="w-100">
                    <Form.Group>
                        <label className="m-1">Task Description:</label>
                        <input type="text"
                            className="mb-3 center-block"
                            id="task"
                            ref={taskInput}
                            onChange={(e) => (taskInput.current.value.length === 0) ? setDisable(true) : setDisable(false)} />
                    </Form.Group>
                    <Form.Group>
                        <label className="m-1">Assigned To:</label>
                        <input type="text"
                            className="mb-3 center-block"
                            id="assignee"
                            ref={assigneeInput}
                            onChange={(e) => (assigneeInput.current.value.length === 0) ? setDisable(true) : setDisable(false)} />
                    </Form.Group>
                    <Form.Group className="d-flex">
                        <label>Status &nbsp;</label>
                        <Form.Select defaultValue={"Pending"}
                            style={{ "marginLeft": "5px", marginRight: "5px", width: "150px" }}
                            className="mb-3"
                            onChange={(e) => handleSelect(e.target.value)}>
                            <option disabled={true} value="">
                                --Select status--
                            </option>
                            <option value="Pending">Pending</option>
                            <option value="In-progress">In-progress</option>
                        </Form.Select>
                    </Form.Group>

                    <button className="btn btn-success pull-right"
                        onClick={() => handleInput({ task: taskInput.current.value, status: status, assignee: assigneeInput.current.value })}
                        disabled={isDisabled}
                    >Add</button>
                </Card.Body>
            </Card>
        </div>
    )
}