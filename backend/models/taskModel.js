const mongoose = require('mongoose')


const TaskSchema  = new mongoose.Schema({
    task_name: {
        type: String,
        required: true
    },
    task_description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// Update the updated_at field prior to saving
TaskSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.model('Task', TaskSchema);
