import React from 'react';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, onConfirm }) => {
    if (!show) {
        return null;
    }

    return (
        <div>
            <div>
                <h2>Подтвердите удаление</h2>
                <button onClick={onConfirm}>Удалить</button>
                <button onClick={onClose}>Отмена</button>
            </div>
        </div>
    );
};

export default Modal;