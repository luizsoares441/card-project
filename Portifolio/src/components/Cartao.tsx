import { Draggable } from '@hello-pangea/dnd';
import type { Cartao as CartaoType } from '../types';
import './Cartao.css';
import { useData } from '../context/mockContext';

interface CartaoProps {
    cartao: CartaoType;
    index: number;
}

export const Cartao = ({ cartao, index }: CartaoProps) => {
    const { deletarCartao } = useData();

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (window.confirm(`Tem certeza que deseja excluir o cartão "${cartao.titulo}"?`)) {
            deletarCartao(cartao.id);
        }
    };
    return (
        <Draggable draggableId={cartao.id.toString()} index={index}>
            {(provided) => (
                <div
                    className="cartao-container"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                        
                    <p>{cartao.titulo}</p>
                    <button onClick={handleDeleteClick} className="delete-card-btn">
                        &times;
                    </button>
                </div>
            )}
        </Draggable>
    );
};

export default Cartao;
