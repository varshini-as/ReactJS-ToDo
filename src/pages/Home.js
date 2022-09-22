import React, { useContext } from "react";
import CustomTable from "../components/CustomTable";
import { ToDoContext } from "../pages/ProfileDashboard";

export default function Home() {

    const { currentTaskList } = useContext(ToDoContext);

    console.log(currentTaskList);

    return (
        <div className="outlet">
            {currentTaskList !== []? 
            <div className="scroll-table">
                <CustomTable classnames={["table", "shadow", "align-items-center", "w-60", "text-center"]}
                    data={currentTaskList}
                    headers={["Task", "Status", "Assigned To"]}
                    columns={["task", "status", "assigned"]}>
                </CustomTable>
            </div>: <h3>No tasks yet!</h3>}
        </div>
    )
}