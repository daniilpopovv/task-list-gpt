import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from './TaskCard';
import { Task } from '../types';

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
        setLoading(false);
    }, []);

    const toggleTask = (id: number) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const deleteTask = (id: number) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const completedTasks = tasks.filter(task => task.completed);
    const pendingTasks = tasks.filter(task => !task.completed);

    return (
        <div>
            <h1>Task List</h1>
            <Link to="/add">Add Task</Link>
            {loading ? (
                <div>Loading...</div>
            ) : tasks.length === 0 ? (
                <div>No tasks</div>
            ) : (
                <div>
                    <h2>Pending tasks</h2>
                    {pendingTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                        />
                    ))}
                    <h2>Completed tasks</h2>
                    {completedTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;