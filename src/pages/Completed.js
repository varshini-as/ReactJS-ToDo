import React, { useContext } from "react";
import CustomTable from "../components/CustomTable";
import { ToDoContext } from "./ProfileDashboard";

export default function Completed() {

    const { currentTaskList } = useContext(ToDoContext);

    return (
        <div className="outlet">
            <CustomTable classnames={["table", "shadow", "align-items-center", "w-60"]}
                data={currentTaskList.filter((obj) => obj.status === 'Done')}
                headers={["Task", "Status", "Assigned To"]}
                columns={["task", "status", "assigned"]}>
            </CustomTable>
        </div>
    )
}