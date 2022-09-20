import React, { useContext } from "react";
import CustomTable from "../components/CustomTable";
import { ToDoContext } from "../pages/ProfileDashboard";

export default function Home() {

    const { currentTaskList } = useContext(ToDoContext);

    return (
        <div className="outlet">
            {currentTaskList !== []? 
            <div>
                <CustomTable classnames={["table", "shadow", "align-items-center", "w-60"]}
                    data={currentTaskList}
                    headers={["Task", "Status", "Assigned To"]}
                    columns={["task", "status", "assigned"]}>
                </CustomTable>
            </div>: <h3>No tasks yet!</h3>}
        </div>

    )
}