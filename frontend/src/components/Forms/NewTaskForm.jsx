import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import { ReactComponent as UserIcon } from '../../assets/user.svg';
import { ReactComponent as DashboardIcon } from '../../assets/dashboard.svg';
import ApiRoute from '../../Api/ApiRoute';
import './NewTaskForm.css';

const Tab = ({ Icon, text }) => (
    <div className="tab inactive">
        <Icon className='icon' fill='#bbb' />
        <p>{text}</p>
    </div>
);

Tab.propTypes = {
    Icon: PropTypes.elementType.isRequired,
    text: PropTypes.string.isRequired,
};

const NewTaskForm = () => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [msg, setMsg] = useState('');
    const [color, setColor] = useState('green');
    const [isAdding, setIsAdding] = useState(false);
    const navigate = useNavigate();

    const resetForm = () => {
        setTaskName('');
        setTaskDescription('');
        setColor('green');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsAdding(true);

        const task = {
            task_name: taskName,
            task_description: taskDescription,
            completed: false,
        };

        try {
            await axios.post(ApiRoute.ADD_TASK_URL, task);
            setColor('green');
            setMsg('Task added successfully');
            toast.success('Task Added Successfully', {
                theme: 'dark',
                closeOnClick: true,
                autoClose: 500,
            });
            resetForm();
            setTimeout(() => {
                setMsg('');
            }, 3000); // The message will be cleared after 5 seconds
        } catch (error) {
            console.error(error);
            setColor('red');
            setMsg('Error adding task');
        } finally {
            setIsAdding(false);
        }
    };

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
                                <h1>Task Manager</h1>
                                <h4>View </h4>
                                <p>All Tasks</p>
                                <h4>View</h4>
                                <p>Completed Tasks</p>
                                <h4>View</h4>
                                <p>Uncompleted Tasks</p>
                        </div>
                        <div className="log">
                            <button className='darkbtn' onClick={() => navigate('/')}>Go Back</button>
                        </div>
                    </div>
                    <div className="history">
                        <div className="taskform">
                            <div className="container">
                                <div className="conten">
                                    <h1>Create New Task</h1>
                                    <br/><hr/><br></br><br/>
                                    <form onSubmit={handleSubmit}>
                                        <p style={{ color, fontWeight: 'bold' }}>{msg}</p>
                                        <div className="input_field">
                                            <input type="text" placeholder='Task Name' value={taskName} required onChange={e => setTaskName(e.target.value)} />
                                        </div>
                                        <br/>
                                        <div className="input_field">
                                            <textarea rows="6" placeholder="Enter Task description" required value={taskDescription} onChange={e => setTaskDescription(e.target.value)}></textarea>
                                        </div><br/><br/>
                                        <div className="button">
                                            <button type="submit" disabled={isAdding}>
                                                {isAdding ? 'Adding Task...' : 'Add Task'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default NewTaskForm;
