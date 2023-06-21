import React, {Fragment} from "react";
import Footer from "../../Footer/Footer";
import NewTaskForm from "../../Forms/NewTaskForm";

function NewTaskPage() {
    return (
        <Fragment>
            <NewTaskForm />
            <Footer/>
        </Fragment>
    )
}

export default NewTaskPage