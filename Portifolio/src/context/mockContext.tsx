import React, { createContext, useState, useContext, type PropsWithChildren } from 'react';
import { initialState } from '../data/mockData';
import type { AppState } from '../data/mockData';
import type { Cartao, Coluna, Projeto } from '../types'

interface DataContextType {
  state: AppState;

  adicionarCartao: (novoCartao: Omit<Cartao, 'id'>, colunaId: number) => void;
  moverCartao: (cartaoId: number, novaColunaId: number) => void;
  deletarCartao: (cartaoId: number) => void;

  AdicionarProjeto: (novoProjeto: Omit<Projeto, 'id'>) => void;
  deletarProjeto: (projetoId: number) => void;

  adicionarColuna: (titulo: string, projetoId: number) => void;
  deletarColuna: (colunaId: number) => void;
}

const DataContext = createContext<DataContextType>({} as DataContextType);

export const DataProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);

  const adicionarCartao = (novoCartao: Omit<Cartao, 'id'>, colunaId: number) => {
    const cartaoComId: Cartao = {
      ...novoCartao,
      id: new Date().getTime(),
      colunaId: colunaId
    };

    setState(estadoAtual => ({
      ...estadoAtual,
      cartoes: [...estadoAtual.cartoes, cartaoComId]
    }));
  };

  const moverCartao = (cartaoId: number, novaColunaId: number) => {
    setState(estadoAtual => ({
      ...estadoAtual,
      cartoes: estadoAtual.cartoes.map(cartao =>
        cartao.id === cartaoId
          ? { ...cartao, colunaId: novaColunaId }
          : cartao
      )
    }));
  };

  const deletarCartao = (cartaoId: number) => {
    setState(estadoAtual => ({
      ...estadoAtual,
      cartoes: estadoAtual.cartoes.filter(cartao => cartao.id !== cartaoId)
    }));
  };

  const AdicionarProjeto = (novoProjeto: Omit<Projeto, 'id'>) => {
    const projetoComId: Projeto = {
      ...novoProjeto,
      id: new Date().getTime()
    };
    setState(estadoAtual => ({
      ...estadoAtual,
      projetos: [...estadoAtual.projetos, projetoComId]
    }));
  }

  const deletarProjeto = (projetoId: number) => {
    setState(estadoAtual => ({
      ...estadoAtual,
      projetos: estadoAtual.projetos.filter(projeto => projeto.id !== projetoId)
    }));
  };

  const adicionarColuna = (titulo: string, projetoId: number) => {
    const novaColuna: Coluna = {
      id: new Date().getTime(),
      titulo,
      projetoId,
    };
    setState(estadoAtual => ({
      ...estadoAtual,
      colunas: [...estadoAtual.colunas, novaColuna],
    }));
  };

  const deletarColuna = (colunaId: number) => {
    setState(estadoAtual => {
      const novasColunas = estadoAtual.colunas.filter(
        coluna => coluna.id !== colunaId
      );
      const novosCartoes = estadoAtual.cartoes.filter(
        cartao => cartao.colunaId !== colunaId
      );

      return {
        ...estadoAtual,
        colunas: novasColunas,
        cartoes: novosCartoes,
      };
    });
  };

  return (
    <DataContext.Provider value={{
      state,
      adicionarCartao,
      moverCartao,
      deletarCartao,
      AdicionarProjeto,
      deletarProjeto,
      adicionarColuna,
      deletarColuna
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData deve ser usado dentro de um DataProvider');
  }
  return context;
};