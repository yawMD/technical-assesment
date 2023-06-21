import React, {Component, Fragment} from 'react';
import Footer from "../../Footer/Footer";
import Task from "./Task";
class TaskPage extends  Component{
    render() {
        return (
           <Fragment>
               <Task />
               <Footer/>
           </Fragment>
        );
    }
}
export default TaskPage