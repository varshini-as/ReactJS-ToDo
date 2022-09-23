import React, { useContext, useEffect } from "react";
import CustomTable from "../components/CustomTable";
import { ToDoContext } from "./ProfileDashboard";

export default function Home() {

    // const { loading, tasks } = useContext(ToDoContext);
    const {currentTaskList} = useContext(ToDoContext);
    console.log(currentTaskList);

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