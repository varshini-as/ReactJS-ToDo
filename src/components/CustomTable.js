import React, { useContext } from "react";
import { Table, Badge } from "react-bootstrap";
import { X, ClockFill } from 'react-bootstrap-icons';
import { UserContext } from "../App";
import { ToDoContext } from "../pages/ProfileDashboard";

export default function CustomTable({ classnames, headers, data, columns, apiCall }) {
    const { setUpdateModal, setOldVal, setCurrentTask, currentTask } = useContext(UserContext);
    const { dispatch } = useContext(ToDoContext);

    const deleteCell = (task) => {
        return <button type="submit"
            id={task.id}
            className="btn del-btn"
            onClick={() => {
                // if(alert('Are you sure you want to delete this?'))
                console.log(task);
                setCurrentTask(task);
                dispatch({ type: 'DELETE_TASK', payload: task.task })
            }}
        >
            <X /></button>;
    }

    const updateCell = (task) => {
        return <button type="submit"
            className="btn btn-primary rounded"
            id={task.id}
            onClick={() => { setUpdateModal(true); setOldVal(task.task); setCurrentTask(task) }}
        >Edit</button>
    }


    return (
        <>
            <Table hover bordered className={classnames}>
                <thead>
                    <tr>
                        {
                            headers.map((h) => {
                                return <td key={h}><b>{h}</b></td>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(row => {  // data - array of objects, row - single object
                            return (
                                <tr key={row.id}>
                                    {
                                        columns.map((col, i) => { // col - property of object
                                            return col === 'status' ?
                                                <p className="m-0">
                                                    <Badge bg={row[col] === 'In-progress' ? 'warning' : row[col] === 'Done' ? 'success' : 'danger'}>
                                                        {row[col]}
                                                    </Badge>
                                                    <option></option>
                                                </p> :
                                                <td className="align-items-center">{row[col]}</td> // access property value
                                        })
                                    }
                                    {apiCall ? null : <td style={{ "width": "118px" }}>{updateCell(row)}{deleteCell(row)}</td>}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )

}