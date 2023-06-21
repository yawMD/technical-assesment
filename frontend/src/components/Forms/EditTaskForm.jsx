import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as UserIcon } from '../../assets/user.svg';
import { ReactComponent as DashboardIcon } from '../../assets/dashboard.svg';
import axios from "axios";
import ApiRoute from "../../Api/ApiRoute";
import { toast, ToastContainer } from "react-toastify";
import "./NewTaskForm.css";

const EditTaskForm = () => {
    const [task, setTask] = useState({ task_name: "", task_description: "" });
    const [message, setMessage] = useState({ color: "green", text: "" });
    const [isUpdating, setIsUpdating] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();


    const showUpdatedMessage = () => toast.success('Task Updated Successfully', {
        theme: 'dark',
        closeOnClick: true,
        autoClose: 500,
    });

    const fetchTask = async () => {
        try {
            const response = await fetch(ApiRoute.GET_TASK_URL(id));
            const data = await response.json();
            setTask({
                task_name: data.task_name,
                task_description: data.task_description
            });
        } catch (error) {
            console.error('An error occurred while fetching tasks:', error);
        }
    };

    const updateTask = async (e) => {
        e.preventDefault();
        setIsUpdating(true);

        try {
            await axios.patch(ApiRoute.UPDATE_TASK_URL(id), task);
            setMessage({ color: "green", text: "Task Updated successfully" });
            showUpdatedMessage();
        } catch (error) {
            setMessage({ color: "red", text: "Error adding task" });
        } finally {
            setIsUpdating(false);
        }

        setTimeout(() => setMessage({ color: "green", text: "" }), 5000);
    };

    useEffect(() => {
        fetchTask();
    }, []);

    return (
        <div className='my__task'>
            <div className="container">
                <div className="content">
                    <div className="tab_container">
                        <div className="tab inactive">
                            <DashboardIcon className='icon' fill='#bbb' /> <p>Dashboard</p>
                        </div>
                        <div className="tab inactive">
                            <UserIcon className='icon' fill='#bbb'/> <p>my__task</p>
                        </div>
                    </div>

                    <div className="my__task-information">
                        <div>
                            <h1 style={{"cursor": "pointer"}} onClick={()=>{
                                navigate("/");}}>Task Manager</h1>
                            <h4>View </h4>
                            <p>All Tasks</p>
                            <h4>View </h4>
                            <p style={{"cursor": "pointer", "color":"grey"}} onClick={()=>{
                                navigate("/uncompleted-task");}}>Uncompleted Tasks </p>
                            <p style={{"cursor": "pointer" }} onClick={()=>{
                                navigate("/completed-task");}}>Completed Tasks </p>
                        </div>
                        <div className="log">
                            <button className={'darkbtn'}  onClick={()=>{
                                navigate("/");}}>Go Back</button>
                        </div>
                    </div>

                    <div className="history">
            <div className="taskform">
                <div className="container">
                    <div className="conten">
                        <h1>Edit Task</h1>
                        <br/><hr/><br></br><br/>
                        <form onSubmit={updateTask}>
                            <p style={{ color: message.color, fontWeight: 'bold' }}>{message.text}</p>
                            <div className="input_field">
                                <input
                                    type="text"
                                    placeholder='Task Name'
                                    value={task.task_name}
                                    onChange={(e) => setTask({ ...task, task_name: e.target.value })}
                                />
                            </div> <br/>

                            <div className="input_field">
                                <textarea
                                    rows="6"
                                    placeholder="Enter Task description"
                                    value={task.task_description}
                                    onChange={(e) => setTask({ ...task, task_description: e.target.value })}
                                />
                            </div>
                            <br/><br/>
                            <div className="button">
                                <button type="submit"> {isUpdating ? "Updating Task..." : "Update Task"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
          </div>
        </div>
    </div>

    );
}

export default EditTaskForm;
