import React, {Fragment} from "react";
import Footer from "../../Footer/Footer";
import CompletedTasks from "./CompletedTask";

function CompletedTaskPage() {
    return (
        <Fragment>
            <CompletedTasks />
            <Footer/>
        </Fragment>
    )
}

export default CompletedTaskPage