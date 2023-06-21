import React, {Fragment} from "react";
import Footer from "../../Footer/Footer";
import UncompletedTasks from "./UncompletedTask";

function UncompletedTaskPage() {
    return (
        <Fragment>
            <UncompletedTasks />
            <Footer/>
        </Fragment>
    )
}

export default UncompletedTaskPage