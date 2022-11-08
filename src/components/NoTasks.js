import { ClockFill } from "react-bootstrap-icons";

export default function NoTasks() {
    return (
        <div className="position-relative empty">
            <div className="position-absolute mx-auto">
                <ClockFill className="fa-3x" />
                <p>No tasks yet...Create one in Add Task page.</p>
            </div>
        </div>
    )
}