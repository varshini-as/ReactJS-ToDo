import React, { useContext } from "react";
import { UserContext } from "../App";
import CustomTable from "../components/CustomTable";

export default function Completed() {

    const { currentTaskList } = useContext(UserContext);
    console.log(currentTaskList);

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