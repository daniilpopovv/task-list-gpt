import React from 'react';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({show, onClose, onConfirm}) => {
    if (!show) {
        return null;
    }

    return (
        <div
            className="py-10 min-h-screen w-screen antialiased font-medium text-gray-800 bg-black bg-opacity-40 fixed top-0 right-0 bottom-0 left-0 z-50">
            <div
                className="max-w-sm p-2 mx-auto bg-white border-[1px] border-gray-200 shadow rounded-xl hover:shadow-lg transition-all duration-150 ease-linear"
            >
                <div className="relative p-6">
                    <a href="#" className="absolute top-1.5 right-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor"
                             className="w-4 h-4 cursor-pointer fill-current text-slate-500 hover:text-slate-900">
                            <path d="M6 18L18 6M6 6l12 12"/>
                        </svg>

                    </a>
                    <h1 className="text-3xl font-bold">Удаление задачи</h1>
                    <div className="flex flex-row mt-6 space-x-2 justify-evenly">
                        <button
                            className="w-full py-3 text-sm font-medium text-center text-white transition duration-150 ease-linear bg-red-600 border border-red-600 rounded-lg hover:bg-red-500"
                            onClick={onConfirm}
                        >
                            Удалить
                        </button>
                        <button
                            className="w-full py-3 text-sm text-center text-gray-500 transition duration-150 ease-linear bg-white border border-gray-200 rounded-lg hover:bg-gray-100"
                            onClick={onClose}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;