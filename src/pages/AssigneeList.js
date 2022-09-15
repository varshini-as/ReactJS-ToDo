import React from "react";
import {  Badge, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../App";

export default function AssigneeList() {
    const { currentTaskList } = useContext(UserContext);

    let assignList = currentTaskList.map((t) => t.assigned);
    assignList = [...new Set(assignList)]; //remove duplicates

    return (
        <Card className="d-flex mx-auto layout shadow assignee-list w-50">
            <Card.Body>
                <Card.Title>Assignees</Card.Title>
                <Card.Body>
                    <ListGroup>
                        {
                            assignList.map((name) => {
                                console.log(name);
                                let pending_count = currentTaskList.filter((t) => t.status === 'Pending' && t.assigned === name).length;
                                let progress_count = currentTaskList.filter((t) => t.status === 'In-progress' && t.assigned === name).length;
                                let completed_count = currentTaskList.filter((t) => t.status === 'Done' && t.assigned === name).length;
                                return <ListGroupItem
                                    className="d-flex justify-content-between align-items-center w-85">
                                    {name}
                                    <div>
                                        <Badge bg="danger" className="m-1">
                                            Pending <Badge bg="secondary">{pending_count}</Badge>
                                        </Badge>
                                        <Badge bg="warning" className="m-1">
                                            In-progress <Badge bg="secondary">{progress_count}</Badge>
                                        </Badge>
                                        <Badge bg="success" className="m-1">
                                            Completed <Badge bg="secondary">{completed_count}</Badge>
                                        </Badge>

                                    </div>
                                </ListGroupItem>
                            })
                        }
                    </ListGroup>
                </Card.Body>
            </Card.Body>
        </Card>
    )
}