const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { getTask, updateTask, deleteTask, getAllTasks, createTask } = require('../controllers/taskController');
const { catchErrors } = require('../errors/errorHandler');

const validateTaskId = [
    param('id')
        .isMongoId()
        .withMessage('Invalid task ID')
];

const validateCreateTask = [
    body('title')
        .notEmpty()
        .withMessage('Title is required'),
];

router.route('/task')
    .get(catchErrors(getAllTasks))
    .post(validateCreateTask, catchErrors(createTask));

router.route('/task/:id')
    .get(validateTaskId, catchErrors(getTask))
    .patch(validateTaskId, catchErrors(updateTask))
    .delete(validateTaskId, catchErrors(deleteTask));

module.exports = router;

