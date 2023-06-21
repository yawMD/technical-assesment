import React, {Fragment} from "react";
import Footer from "../../Footer/Footer";
import EditTaskForm from "../../Forms/EditTaskForm";

function EditTaskPage() {
    return (
        <Fragment>
            <EditTaskForm />
            <Footer/>
        </Fragment>
    )
}

export default EditTaskPage