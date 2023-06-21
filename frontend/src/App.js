
import {Routes, Route, HashRouter} from 'react-router-dom'
import {Component} from "react";
import TaskPage from "./components/Task/tasks/TaskPage";
import NewTaskPage from "./components/Task/tasks/NewTaskPage";
import EditTaskPage from "./components/Task/tasks/EditTaskPage";
import UncompletedTaskPage from "./components/Task/uncompleted_tasks/UncompletedTaskPage";
import CompletedTaskPage from "./components/Task/completed_tasks/CompletedTaskPage";

class App extends Component{

  render() {
    return (
        <HashRouter>
          <Routes>
            <Route path="/" element={<TaskPage/>}/>
            <Route path="/add-task" element={<NewTaskPage/>}/>
            <Route path="/edit-task/:id" element={<EditTaskPage/>}/>
            <Route path="/uncompleted-task" element={<UncompletedTaskPage/>}/>
            <Route path="/completed-task" element={<CompletedTaskPage/>}/>
          </Routes>
        </HashRouter>

    );
  }
}

export default App;
