import { useParams, Link } from 'react-router-dom';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { useData } from '../context/mockContext';
import { Coluna } from '../components/Coluna';
import './PainelProjectPage.css';
import { useState } from 'react';
import Modal from '../common/Modal';

export const PainelProjectPage = () => {
    const { projetoId } = useParams<{ projetoId: string }>();
    const { state, moverCartao, adicionarColuna } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [novaColunaTitulo, setNovaColunaTitulo] = useState('');
    const projetoAtual = state.projetos.find(p => p.id === Number(projetoId));
    const colunasDoProjeto = state.colunas.filter(c => c.projetoId === Number(projetoId));
    const idsDasColunas = colunasDoProjeto.map(c => c.id);
    const cartoesDoProjeto = state.cartoes.filter(cartao => idsDasColunas.includes(cartao.colunaId));

    const handleOnDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) return;

        const cartaoId = Number(draggableId);
        const novaColunaId = Number(destination.droppableId);

        moverCartao(cartaoId, novaColunaId);
    };

    const handleAddColumnSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (novaColunaTitulo.trim() === '' || !projetoId) return;
        adicionarColuna(novaColunaTitulo, Number(projetoId));
        setNovaColunaTitulo('');
        setIsModalOpen(false);
    };

    if (!projetoAtual) {
        return <div><h2>Projeto não encontrado!</h2><Link to="/">Voltar</Link></div>;
    }

    return (
        <>
            <div className="painel-container">
                <div className="painel-header">
                    <h2 className="painel-titulo">{projetoAtual.nome}</h2>
                    <button className="add-column-btn" onClick={() => setIsModalOpen(true)}>
                        + Adicionar Coluna
                    </button>
                </div>

                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <div className="painel-colunas-wrapper">
                        {colunasDoProjeto.map(coluna => {
                            const cartoesDaColuna = cartoesDoProjeto.filter(
                                cartao => cartao.colunaId === coluna.id
                            );
                            return <Coluna key={coluna.id} coluna={coluna} cartoes={cartoesDaColuna} />;
                        })}
                    </div>
                </DragDropContext>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Criar Nova Coluna"
            >
                <form onSubmit={handleAddColumnSubmit}>
                    <div className="form-group">
                        <label htmlFor="column-name">Nome da Coluna</label>
                        <input
                            id="column-name"
                            type="text"
                            value={novaColunaTitulo}
                            onChange={(e) => setNovaColunaTitulo(e.target.value)}
                            placeholder="Ex: Tarefas Urgentes"
                            autoFocus
                        />
                    </div>
                    <button type="submit" className="submit-btn">
                        Criar Coluna
                    </button>
                </form>
            </Modal>
        </>
    );
};

export default PainelProjectPage;