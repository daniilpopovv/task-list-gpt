import React from 'react';
import { Link } from 'react-router-dom';
import { Task } from '../types';

interface TaskCardProps {
    task: Task;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onDelete }) => {
    return (
        <div>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.text}
      </span>
            <Link to={`/edit/${task.id}`}>Edit</Link>
            <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
    );
};

export default TaskCard;