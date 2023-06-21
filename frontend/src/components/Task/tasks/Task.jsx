import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import ApiRoute from "../../../Api/ApiRoute";
import '../shared/TaskStyle.css'
import { ReactComponent as EditTask} from '../../../assets/edit.svg';
import { ReactComponent as DeleteTask} from '../../../assets/trash.svg';
import { ReactComponent as DoneTask} from '../../../assets/check-mark.svg';
import { ReactComponent as TaskI} from '../../../assets/task.svg';
import { ReactComponent as PendingIcon} from '../../../assets/pending-icon.svg';
import { ReactComponent as LoginIcon} from '../../../assets/login.svg';
import { ReactComponent as UserIcon} from '../../../assets/user.svg';
import { ReactComponent as DashboardIcon} from '../../../assets/dashboard.svg';
import Loading from "../../loading/Loading";

const TaskCard = ({ task, handleDelete, handleComplete }) => (
    <div className="task_card"  key={task._id}>
        <div className="detail">
            <LoginIcon fill='#777' className='icon'/>
            <div className="text">
                <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                    {task.completed ? '✔' : ''} {task.task_name}
                </h3>
                <p>{task.task_description}</p>
            </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Link to={'/edit-task/' + task._id} >
                <EditTask style={{ height: '20px', marginRight: '1px' }}/>
            </Link>
            <DoneTask onClick={() => handleComplete(task._id)} style={{ height: '20px', marginRight: '1px' }} />
            <DeleteTask onClick={() => handleDelete(task._id)} style={{ height: '20px', marginRight: '1px' }}/>
        </div>
    </div>
);


const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(ApiRoute.TASK_URL);
            setTasks(response.data.tasks);
            setIsLoading(false)
        } catch (error) {
            console.error('An error occurred while fetching tasks:', error);
        }
    };

    const handleMarkAsCompleted = async (id) => {
        try {
            await axios.patch(ApiRoute.UPDATE_TASK_URL(id), { completed: true });
            toast.success('Task marked as completed successfully', { theme:'dark', closeOnClick: true, autoClose: 500 });
            setTasks(tasks.map(task => task._id === id ? { ...task, completed: true } : task));

        } catch (error) {
            toast.error('Error marking task as completed', { theme:'dark', closeOnClick: true, autoClose: 500 });
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await axios.delete(ApiRoute.DELETE_TASK_URL(id));
            toast.success('Task deleted successfully', { theme:'dark', closeOnClick: true, autoClose: 500 });
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            toast.error('Error deleting task', { theme:'dark', closeOnClick: true, autoClose: 500 });
        }
    };
    const navigate = useNavigate();

    return(
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
                            <p>All Tasks ({tasks.length})</p>
                            <h4>View </h4>
                            <p style={{"cursor": "pointer"}} onClick={()=>{
                                navigate("/uncompleted-task");}}>Uncompleted Tasks ({tasks.filter(task => !task.completed === true).length})</p>
                            <p style={{"cursor": "pointer"}} onClick={()=>{
                                navigate("/completed-task");}}>Completed Tasks ({tasks.filter(task => task.completed === true).length})</p>
                        </div>
                        <div className="log">
                            <button className={'darkbtn'} onClick={()=>{
                                navigate("/add-task");}}>Add New Task</button>
                        </div>
                    </div>

                    <div className="history">
                        <div className="card_category">
                            <div className="card_box">
                                <div className="text">
                                    <h2>{tasks.filter(task => task.completed === true).length}</h2>
                                    <p>Tasks Completed</p>
                                </div>
                                <div className="icon">
                                    <TaskI fill='white' className='micon'/>
                                </div>
                            </div>
                            <div className="card_box">
                                <div className="text">
                                    <h2>{tasks.filter(task => !task.completed).length}</h2>
                                    <p>Tasks Pending</p>
                                </div>
                                <div className="icon">
                                    <PendingIcon fill='white' color='white' className='micon'/>
                                </div>
                            </div>
                        </div>
                        <div className="notif">
                            <h1>Recent</h1>
                            {isLoading?<Loading/>:<div className="task_list">
                                {tasks.map((task) => (
                                    <TaskCard
                                        task={task}
                                        handleDelete={handleDeleteTask}
                                        handleComplete={handleMarkAsCompleted}
                                    />
                                ))}
                            </div>}
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>

    );
};

export default Task;







