// src/pages/HomePage.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/mockContext';
import './HomePage.css';
import Modal from '../common/Modal';

const HomePage = () => {
    const { state, AdicionarProjeto, deletarProjeto } = useData();
    const { projetos } = state;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [novoProjetoNome, setNovoProjetoNome] = useState('');

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (novoProjetoNome.trim() === '') return;

        AdicionarProjeto({ nome: novoProjetoNome });

        setNovoProjetoNome('');
        setIsModalOpen(false);
    };

    const handleDeleteProject = (e: React.MouseEvent, projetoId: number, projetoNome: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (window.confirm(`Tem certeza que deseja excluir o projeto "${projetoNome}"? Todos os seus dados (colunas e cartões) serão perdidos.`)) {
            deletarProjeto(projetoId);
        }
    };

    return (
        <>
            <div className="homepage-container">
                <div className="homepage-header">
                    <h2>Meus Projetos</h2>
                    <button className="add-project-btn" onClick={() => setIsModalOpen(true)}>
                        + Novo Projeto
                    </button>
                </div>

                {projetos.length > 0 ? (
                    <ul className="project-list">
                        {projetos.map(projeto => (
                            <li key={projeto.id} className="project-item">
                                <Link to={`/projeto/${projeto.id}`} className="project-link">
                                    <button
                                        className="delete-project-btn"
                                        onClick={(e) => handleDeleteProject(e, projeto.id, projeto.nome)}
                                    >
                                        &times;
                                    </button>
                                    <h3>{projeto.nome}</h3>
                                    <p>Clique para ver o painel</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum projeto encontrado. Crie um novo para começar!</p>
                )}
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Criar Novo Projeto">
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="project-name">Nome do Projeto</label>
                        <input
                            id="project-name"
                            type="text"
                            value={novoProjetoNome}
                            onChange={(e) => setNovoProjetoNome(e.target.value)}
                            placeholder="Ex: Lançamento do novo App"
                            autoFocus />
                    </div>
                    <button type="submit" className="submit-btn">
                        Criar Projeto
                    </button>
                </form>
            </Modal>
        </>
    );
};

export default HomePage;