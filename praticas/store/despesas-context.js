import { createContext, useReducer } from 'react';

const DESPESAS_DUMMY = [];

export const DespesasContext = createContext({
  despesas: [],
  addDespesa: ({ descricao, valor, data }) => {},
  deleteDespesa: (id) => {},
  updateDespesa: (id, { descricao, valor, data }) => {},
});

function despesasReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case 'UPDATE':
      const indexParaAtualizar = state.findIndex((despesa) => despesa.id === action.payload.id);
      const despesaParaAtualizar = state[indexParaAtualizar];
      const itemAtualizado = { ...despesaParaAtualizar, ...action.payload.data };
      const despesasAtualizadas = [...state];
      despesasAtualizadas[indexParaAtualizar] = itemAtualizado;
      return despesasAtualizadas;
    case 'DELETE':
      return state.filter((despesa) => despesa.id !== action.payload);
    default:
      return state;
  }
}

function DespesasContextProvider({ children }) {
  const [despesasState, dispatch] = useReducer(despesasReducer, DESPESAS_DUMMY);

  function addDespesa(dadosDespesa) {
    dispatch({ type: 'ADD', payload: dadosDespesa });
  }

  function deleteDespesa(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateDespesa(id, dadosDespesa) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: dadosDespesa } });
  }

  const value = {
    despesas: despesasState,
    addDespesa: addDespesa,
    deleteDespesa: deleteDespesa,
    updateDespesa: updateDespesa,
  };

  return (
    <DespesasContext.Provider value={value}>
      {children}
    </DespesasContext.Provider>
  );
}

export default DespesasContextProvider;