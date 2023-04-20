import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import TaskCard from './TaskCard';
import {Task} from '../types';
import Modal from "./Modal";

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false); // 2. Добавьте состояние для отображения модального окна
    const [taskToDelete, setTaskToDelete] = useState<number | null>(null); // 2. Добавьте состояние для хранения id задачи для удаления


    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
        setLoading(false);
    }, []);

    const openModal = (id: number) => { // 3. Создайте функцию для открытия модального окна
        setTaskToDelete(id);
        setShowModal(true);
    };

    const closeModal = () => { // 3. Создайте функцию для закрытия модального окна
        setShowModal(false);
    };

    const toggleTask = (id: number) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? {...task, completed: !task.completed} : task
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
            <h1 className="m-5 text-4xl font-bold">Менеджер задач</h1>
            <Link
                to="/add"
                className='m-5 flex break-inside bg-black rounded-3xl px-4 py-2 mb-4 w-fit dark:bg-slate-800 dark:text-white'
            >
                <div className='flex items-center justify-between flex-1'>
                    <span className='text-md font-medium text-white whitespace-nowrap pr-6'>Добавить задачу</span>
                    <svg width='17' height='17' viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path fillRule='evenodd' clipRule='evenodd'
                              d='M0 8.71423C0 8.47852 0.094421 8.25246 0.262491 8.08578C0.430562 7.91911 0.658514 7.82547 0.896201 7.82547H13.9388L8.29808 2.23337C8.12979 2.06648 8.03525 1.84013 8.03525 1.60412C8.03525 1.36811 8.12979 1.14176 8.29808 0.974875C8.46636 0.807989 8.6946 0.714233 8.93259 0.714233C9.17057 0.714233 9.39882 0.807989 9.5671 0.974875L16.7367 8.08499C16.8202 8.16755 16.8864 8.26562 16.9316 8.3736C16.9767 8.48158 17 8.59733 17 8.71423C17 8.83114 16.9767 8.94689 16.9316 9.05487C16.8864 9.16284 16.8202 9.26092 16.7367 9.34348L9.5671 16.4536C9.39882 16.6205 9.17057 16.7142 8.93259 16.7142C8.6946 16.7142 8.46636 16.6205 8.29808 16.4536C8.12979 16.2867 8.03525 16.0604 8.03525 15.8243C8.03525 15.5883 8.12979 15.362 8.29808 15.1951L13.9388 9.603H0.896201C0.658514 9.603 0.430562 9.50936 0.262491 9.34268C0.094421 9.17601 0 8.94995 0 8.71423Z'
                              fill='white'/>
                    </svg>
                </div>
            </Link>
            {loading ? (
                <div className="m-5 text-2xl font-semibold">Загрузка...</div>
            ) : tasks.length === 0 ? (
                <div className="m-5 text-2xl font-semibold">Задач нет</div>
            ) : (
                <div>
                    <h2 className="m-5 text-2xl font-semibold">К выполнению</h2>
                    <div className="w-1/2 overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
                        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Статус</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Название</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                            {pendingTasks.map(task => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onToggle={toggleTask}
                                    onDelete={() => openModal(task.id)} // 4. Передайте функцию openModal вместо onDelete
                                />
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <h2 className="m-5 text-2xl font-semibold">Выполненные задачи</h2>
                    <div className="w-1/2 overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
                        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Статус</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Название</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                            {completedTasks.map(task => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onToggle={toggleTask}
                                    onDelete={deleteTask}
                                />
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            <Modal // 5. Отобразите компонент Modal
                show={showModal}
                onClose={closeModal}
                onConfirm={() => {
                    if (taskToDelete !== null) {
                        deleteTask(taskToDelete);
                    }
                    closeModal();
                }}
            />
        </div>
    );
};

export default TaskList;