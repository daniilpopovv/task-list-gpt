import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Task} from '../types';

const EditTask = () => {
    const {id} = useParams<{ id?: string }>(); // указываем, что id может быть неопределенным
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
                task.id === parseInt(id!) ? {...task, text: taskText} : task // добавляем восклицательный знак, чтобы указать TS, что id определенно не является undefined
            );
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        }
        setLoading(false);
        navigate('/');
    };

    return (
        <div>
            <h1 className="m-5 mb-1 text-4xl font-bold">Редактировать задачу</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email" className="m-5 text-sm text-navy-700 dark:text-white font-bold">Задача:</label>
                <input type="text"
                       value={taskText}
                       onChange={(e) => setTaskText(e.target.value)}
                       disabled={loading}
                       placeholder="Постирать кота"
                       className="m-5 mt-2 mb-1 flex h-12 w-1/6 items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200"/>
                {error && <div>{error}</div>}
                <div className="flex flex-row">
                    <button
                        type="submit" disabled={loading}
                        className='m-5 flex break-inside bg-black rounded-3xl px-4 py-2 mb-4 w-fit dark:bg-slate-800 dark:text-white'
                    >
                        <div className='flex items-center justify-between flex-1'>
                            <span className='text-md font-medium text-white whitespace-nowrap pr-6'>Сохранить</span>
                            <svg width='17' height='17' viewBox='0 0 17 17' fill='none'
                                 xmlns='http://www.w3.org/2000/svg'>
                                <path fillRule='evenodd' clipRule='evenodd'
                                      d='M0 8.71423C0 8.47852 0.094421 8.25246 0.262491 8.08578C0.430562 7.91911 0.658514 7.82547 0.896201 7.82547H13.9388L8.29808 2.23337C8.12979 2.06648 8.03525 1.84013 8.03525 1.60412C8.03525 1.36811 8.12979 1.14176 8.29808 0.974875C8.46636 0.807989 8.6946 0.714233 8.93259 0.714233C9.17057 0.714233 9.39882 0.807989 9.5671 0.974875L16.7367 8.08499C16.8202 8.16755 16.8864 8.26562 16.9316 8.3736C16.9767 8.48158 17 8.59733 17 8.71423C17 8.83114 16.9767 8.94689 16.9316 9.05487C16.8864 9.16284 16.8202 9.26092 16.7367 9.34348L9.5671 16.4536C9.39882 16.6205 9.17057 16.7142 8.93259 16.7142C8.6946 16.7142 8.46636 16.6205 8.29808 16.4536C8.12979 16.2867 8.03525 16.0604 8.03525 15.8243C8.03525 15.5883 8.12979 15.362 8.29808 15.1951L13.9388 9.603H0.896201C0.658514 9.603 0.430562 9.50936 0.262491 9.34268C0.094421 9.17601 0 8.94995 0 8.71423Z'
                                      fill='white'/>
                            </svg>
                        </div>
                    </button>
                    <button
                        type="button" onClick={() => navigate('/')}
                        className='m-5 ml-0 mr-1 flex break-inside bg-black rounded-3xl px-4 py-2 mb-4 w-fit dark:bg-slate-300 dark:text-white'
                    >
                        <div className='flex items-center justify-between flex-1'>
                            <span className='text-md font-medium text-gray-500 whitespace-nowrap'>Отмена</span>
                        </div>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTask;