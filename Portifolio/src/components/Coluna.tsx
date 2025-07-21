import { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import type { Coluna as ColunaType, Cartao as CartaoType } from '../types';
import { useData } from '../context/mockContext';
import { Cartao } from './Cartao';
import Modal from '../common/Modal';
import './Coluna.css';

interface ColunaProps {
    coluna: ColunaType;
    cartoes: CartaoType[];
}

export const Coluna = ({ coluna, cartoes }: ColunaProps) => {
    const { adicionarCartao, deletarColuna } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [novoCartaoTitulo, setNovoCartaoTitulo] = useState('');

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (novoCartaoTitulo.trim() === '') return;
        adicionarCartao({ titulo: novoCartaoTitulo, colunaId: coluna.id }, coluna.id);
        setNovoCartaoTitulo('');
        setIsModalOpen(false);
    };

    const handleDeleteColumn = () => {
        if (window.confirm(`Tem certeza que deseja excluir a coluna "${coluna.titulo}"? Todos os cartões nela serão perdidos.`)) {
            deletarColuna(coluna.id);
        }
    };

    return (
        <>
            <div className="coluna-container">
                <div className="coluna-header">
                    <h3 className="coluna-titulo">{coluna.titulo}</h3>
                    <button onClick={handleDeleteColumn} className="delete-column-btn">&times;</button>
                </div>
                <Droppable droppableId={coluna.id.toString()}>
                    {(provided) => (
                        <div
                            className="coluna-cartoes-lista"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {cartoes.map((cartao, index) => (
                                <Cartao key={cartao.id} cartao={cartao} index={index} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <button className="add-card-btn" onClick={() => setIsModalOpen(true)}>
                    + Adicionar um cartão
                </button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Adicionar cartão em "${coluna.titulo}"`}
            >
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="card-title">Título do Cartão</label>
                        <input
                            id="card-title"
                            type="text"
                            value={novoCartaoTitulo}
                            onChange={(e) => setNovoCartaoTitulo(e.target.value)}
                            placeholder="Insira um título para este cartão..."
                            autoFocus
                        />
                    </div>
                    <button type="submit" className="submit-btn">Adicionar Cartão</button>
                </form>
            </Modal>
        </>
    );
};