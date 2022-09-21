import React from "react";
import { Modal } from "react-bootstrap";
import { X } from "react-bootstrap-icons";

export default function CustomStatusModal({message, show}){
    return (
        <Modal show={show}>
            <Modal.Body className="d-flex justify-content-evenly align-items-center">
                {message}
                <X onClick={() => show=false}/>
            </Modal.Body>
        </Modal>
    )
}