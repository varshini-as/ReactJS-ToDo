import { Fragment, useContext } from "react";
import { UserContext } from "../../App";
import { ToDoContext } from "../../pages/ProfileDashboard";
import { Button } from "react-bootstrap";
import CustomModal from "../CustomModal";

export default function DeleteModal({task}){

    const {setUpdateModal} = useContext(UserContext);
    const {dispatch} = useContext(ToDoContext);

    const handleDelete = (task) => {
        dispatch({ type: 'DELETE_TASK', payload: task });
        setUpdateModal(false);
    }

    return (
        <CustomModal>
            <Fragment key='header'>
                Warning
            </Fragment>
            <Fragment key='body'>
                Are you sure you want to delete this task?
                <br></br>
                <p className="text-danger">*This action is irreversible and the task will be deleted permanently.</p>
            </Fragment>
            <Fragment key='footer'>
            <Button variant="primary"
                    onClick={() => handleDelete(task)}>Yes</Button>
            </Fragment>
        </CustomModal>
    )
}