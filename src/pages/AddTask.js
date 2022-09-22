import React, { useRef, useContext, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { UserContext } from "../App";
import { ToDoContext } from "./ProfileDashboard";
import { MdAddTask } from "react-icons/md";

export default function AddTask() {

    let taskInput = useRef(""); // access DOM element using useRef()
    let assigneeInput = useRef("");
    const [isDisabled, setDisable] = useState(true);

    const { setShow, status, handleSelect } = useContext(UserContext);
    const { currentTaskList, dispatch } = useContext(ToDoContext);

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
        <div className="outlet">
            <Card>
                <Card.Body className="w-100">
                    <div className="d-flex gap-2 mb-2 mx-auto" style={{width: "fit-content"}}>
                        <MdAddTask className="align-middle fa-2x" height={30} />
                        <h4>Add a new task</h4>
                    </div>
                    <Form.Group className="m-3 gap-2">
                        <Form.Label>
                            Task Description:
                        </Form.Label>
                        <Form.Control type="text"
                            id="task"
                            ref={taskInput}
                            onChange={(e) => (taskInput.current.value.length === 0) ? setDisable(true) : setDisable(false)} />
                    </Form.Group>
                    <Form.Group className="m-3 gap-2">
                        <Form.Label>Assigned To:</Form.Label>
                        <Form.Control type="text"
                            id="assignee"
                            ref={assigneeInput}
                            onChange={(e) => (assigneeInput.current.value.length === 0) ? setDisable(true) : setDisable(false)} />
                    </Form.Group>
                    <Form.Group className="m-3 gap-2">
                        <Form.Label>Task status:</Form.Label>
                        <Form.Select defaultValue={"Pending"}
                            style={{ marginRight: "5px", width: "150px" }}
                            className="mb-3"
                            onChange={(e) => handleSelect(e.target.value)}>
                            <option disabled={true} value="">
                                --Select status--
                            </option>
                            <option value="Pending">Pending</option>
                            <option value="In-progress">In-progress</option>
                        </Form.Select>
                    </Form.Group>

                    <button className="btn btn-success pull-right w-100"
                        onClick={() => handleInput(
                            {
                                task: taskInput.current.value,
                                status: status,
                                assignee: assigneeInput.current.value
                            })}
                        disabled={isDisabled}
                    >Add</button>
                </Card.Body>
            </Card>
        </div>
    )
}