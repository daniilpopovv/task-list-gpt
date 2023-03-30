import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '../types';

const AddTask = () => {
    const [taskText, setTaskText] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!taskText) {
            setError('Заполните задачу');
            return;
        }

        setLoading(true);
        const newTask: Task = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };

        const storedTasks = localStorage.getItem('tasks');
        const tasks = storedTasks ? JSON.parse(storedTasks) : [];
        tasks.push(newTask);

        localStorage.setItem('tasks', JSON.stringify(tasks));
        setLoading(false);
        navigate('/');
    };

    return (
        <div>
            <h1>Добавить задачу</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Задача:
                    <input
                        type="text"
                        value={taskText}
                        onChange={(e) => setTaskText(e.target.value)}
                        disabled={loading}
                    />
                </label>
                {error && <div>{error}</div>}
                <button type="submit" disabled={loading}>
                    Сохранить
                </button>
                <button type="button" onClick={() => navigate('/')}>
                    Отмена
                </button>
            </form>
        </div>
    );
};

export default AddTask;