export interface Membro {
    id: number;
    nome: string;
}

export interface Cartao {
    id: number;
    membroId?: number;
    colunaId: number;
    titulo: string;
    descricao?: string;
}

export interface Coluna {
    id: number;
    titulo: string;
    projetoId: number;
}

export interface Projeto {
    id: number;
    nome: string;
}