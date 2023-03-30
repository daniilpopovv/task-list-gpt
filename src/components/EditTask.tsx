import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Task } from '../types';

const EditTask = () => {
    const { id } = useParams<{ id?: string }>(); // указываем, что id может быть неопределенным
    const [taskText, setTaskText] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (id && storedTasks) { // добавляем проверку на наличие id
            const tasks: Task[] = JSON.parse(storedTasks);
            const task = tasks.find(task => task.id === parseInt(id));
            if (task) {
                setTaskText(task.text);
            }
        }
    }, [id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!taskText) {
            setError('Заполните задачу');
            return;
        }

        setLoading(true);
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            const tasks: Task[] = JSON.parse(storedTasks);
            const updatedTasks = tasks.map(task =>
                task.id === parseInt(id!) ? { ...task, text: taskText } : task // добавляем восклицательный знак, чтобы указать TS, что id определенно не является undefined
            );
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        }
        setLoading(false);
        navigate('/');
    };

    return (
        <div>
            <h1>Редактировать задачу</h1>
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

export default EditTask;