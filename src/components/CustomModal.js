import React, { useContext, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { UserContext } from "../App";

export default function CustomModal(props) {

    const {updateModal, setUpdateModal} = useContext(UserContext);

    const findByKey = (name) =>
        props.children.map(child => {
            if (child.key === name) return child
        })

    const closeModal = (e) => {
        setUpdateModal(false);
    }

    return (
        <Modal show={updateModal}>
            <Modal.Header>
                {findByKey('header')}
            </Modal.Header>
            <Modal.Body className="align-items-center gap-2">
                {findByKey('body')}
            </Modal.Body>
            <Modal.Footer>
                {findByKey('footer')}
                <Button variant="primary"
                    onClick={() => closeModal()}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}