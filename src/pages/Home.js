import React, { useContext } from "react";
import CustomTable from "../components/CustomTable";
import { ToDoContext } from "./ProfileDashboard";

export default function Home() {

    const { currentTaskList } = useContext(ToDoContext);

    return (
        <div className="outlet">
            <div className="scroll-table">
                <CustomTable classnames={["table", "shadow", "align-items-center", "w-60", "text-center"]}
                    data={currentTaskList}
                    headers={["Task", "Status", "Assigned To"]}
                    columns={["task", "status", "assigned"]}>
                </CustomTable>
            </div>
        </div>
    )
}