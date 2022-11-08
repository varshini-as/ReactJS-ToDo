import React, { useContext } from "react";
import { Table, Badge } from "react-bootstrap";
import { X } from 'react-bootstrap-icons';
import { UserContext } from "../App";
import { ToDoContext } from "../pages/ProfileDashboard";
import NoTasks from "./NoTasks";

export default function CustomTable({ classnames, headers, data, columns, apiCall }) {
    const { setUpdateModal, setOldVal, setCurrentTask } = useContext(UserContext);
    const { dispatch } = useContext(ToDoContext);

    const deleteCell = (task) => {
        return <button type="submit"
            id={task.id}
            className="btn del-btn"
            onClick={() => {
                setUpdateModal(true)
            }}
        >
            <X /></button>;
    }

    const updateCell = (task) => {
        return <button type="submit"
            className="btn btn-primary rounded"
            id={task.id}
            onClick={() => { 
                setUpdateModal(true); 
                setCurrentTask(task) }}
        >Edit</button>
    }

    return (
        <>
            {data.length !== 0 && <Table hover bordered className={classnames}>
                <thead style={{ "position": "sticky" }}>
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
                                                    <Badge
                                                        bg={row[col] === 'In-progress' ? 'warning' :
                                                            row[col] === 'Done' ? 'success' : 'danger'}>
                                                        {row[col]}
                                                    </Badge>
                                                    <option></option>
                                                </p> :
                                                <td className="align-items-center">
                                                    {row[col]}
                                                </td> // access property value
                                        })
                                    }
                                    {apiCall ?
                                        null :
                                        <td style={{ "width": "118px" }}>
                                            {updateCell(row)}
                                            {deleteCell(row.task)}
                                        </td>
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>}
            {
                data.length === 0 &&
                <NoTasks />
            }
        </>
    )

}