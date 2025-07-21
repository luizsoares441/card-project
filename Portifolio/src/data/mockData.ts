import type { Projeto, Coluna, Cartao, Membro } from "../types";

export interface AppState {
  projetos: Projeto[];
  colunas: Coluna[];
  cartoes: Cartao[];
  membros: Membro[];
}

export const initialState: AppState = {
  membros: [
  ],
  projetos: [
    { id: 1, nome: "Projeto de Teste" },
    { id: 2, nome: "Planejamento de Teste" }
  ],
  colunas: [
    { id: 101, titulo: "Backlog", projetoId: 1 },
    { id: 102, titulo: "Em Progresso", projetoId: 1 },
    { id: 103, titulo: "Revisão", projetoId: 1 },
    { id: 104, titulo: "Concluído", projetoId: 1 },
    { id: 201, titulo: "Teste 1", projetoId: 2 },
    { id: 202, titulo: "Teste 2", projetoId: 2 },
  ],
  cartoes: [
    { id: 1001, titulo: "Configurar autenticação de usuário", colunaId: 101, membroId: 1 },
    { id: 1002, titulo: "Criar componente de Tabela de Dados", descricao: "Reutilizável para produtos e clientes", colunaId: 102, membroId: 2 },
    { id: 1003, titulo: "Implementar endpoint de produtos", colunaId: 102 },
    { id: 1004, titulo: "Testar fluxo de login", colunaId: 103, membroId: 1 },
    { id: 2001, titulo: "Testar algo depois", colunaId: 201 },
    { id: 2002, titulo: "Testar agora", colunaId: 201, membroId: 3 },
  ]
};