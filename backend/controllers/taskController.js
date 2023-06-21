const Task = require('../models/taskModel');

const getAllTasks = async (req, res) => {
    try {
        // Paginating to avoid frontend overload
        let { page = 1, size = 10 } = req.query;

        page = Number(page);
        size = Number(size);
        const skip = (page - 1) * size;

        const tasks = await Task.find({})
            .skip(skip)
            .limit(size);

        // Get total number of tasks
        const total = await Task.countDocuments();

        // Calculate total number of pages
        const pages = Math.ceil(total / size);

        res.status(200).json({
            page,
            size,
            total,
            pages,
            tasks
        });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching tasks.' });
    }
};


const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ error: 'Task not found.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching the task.' });
    }
}

const createTask = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: 'Task details are missing.' });
    }
    try {
        const newTask = new Task(req.body);

        if (!newTask) {
            return res.status(500).json({ error: 'Failed to create a new task.' });
        }

        const savedTask = await newTask.save();

        if (!savedTask) {
            return res.status(500).json({ error: 'Failed to save the new task.' });
        }

        res.status(201).json(savedTask);
    } catch (err) {
        console.error(err); // To debug in the console
        res.status(500).json({ error: `An error occurred while creating the task: ${err.message}` });
    }
}


const updateTask = async (req, res) => {
    // Check if the request body is empty
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'You must provide data to update the task.' });
    }

    try {
        const task = await Task.findById(req.params.id);
        // Check if task exists
        if (!task) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        // Check if the user is trying to change an immutable field
        const immutableFields = ['_id', '__v'];
        const updates = Object.keys(req.body);
        const isUpdatingImmutableField = updates.some(update => immutableFields.includes(update));
        if (isUpdatingImmutableField) {
            return res.status(400).json({ error: 'Cannot update immutable fields.' });
        }

        // Proceed with the updates
        updates.forEach(update => task[update] = req.body[update]);
        await task.save();

        return res.status(200).json(task);

    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while updating the task.' });
    }
}


const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (deletedTask) {
            res.status(200).json({ message: 'Task deleted successfully.' });
        } else {
            res.status(404).json({ error: 'Task not found.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while deleting the task.' });
    }
}

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask };

