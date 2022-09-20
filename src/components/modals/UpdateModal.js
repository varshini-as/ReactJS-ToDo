import React, { useContext, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { UserContext } from "../../App";
import { ToDoContext } from "../../pages/ProfileDashboard";

export default function UpdateModal() {
    const { updateModal, setUpdateModal, status, handleSelect, currentTask } = useContext(UserContext);
    const {dispatch} = useContext(ToDoContext);
    const inputRef = useRef("");

    const handleUpdate = () => {
        console.log(inputRef.current.value);
        if (status !== '') { dispatch({ type: "UPDATE_TASK", payload: { old: currentTask.task, status:status, assigned: inputRef.current.value } }) };
        setUpdateModal(false);
    }

    return (
        <Modal show={updateModal}>
            <Modal.Header><b>Update Task</b></Modal.Header>
            <Modal.Body className="update-modal align-items-center">
                <label>Change task:</label>
                <Form.Select defaultValue={""}
                    style={{ "margin-left": "5px", "width": "33%" }}
                    onChange={(e) => handleSelect(e.target.value)}>
                    <option disabled={true} value="">
                        --Select status--
                    </option>
                    <option value="In-progress">In-progress</option>
                    <option value="Done">Done</option>
                </Form.Select>
                <Form.Group>
                    <label>Assigned to: </label>
                    <input type="text" ref={inputRef} className="m-1" 
                    onChange={(e) =>console.log(inputRef.current.value)}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success"
                    onClick={() => handleUpdate()}>Save</Button>
                <Button variant="primary"
                    onClick={() => setUpdateModal(false)}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}