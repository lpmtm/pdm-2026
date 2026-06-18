import { createContext, useCallback, useEffect, useState } from "react";
import { api } from "../gestao-financeira/services/api.js";

export const MoneyContext = createContext();

export default function GlobalState({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true); 
    setError(null);
    try {
      const [cats, txs] = await Promise.all([
        api.listCategories(),
        api.listTransactions(),
      ]);
      setCategories(cats);
      setTransactions(txs);
    } catch (e) {
      setError(e.message ?? "Falha ao carregar dados do servidor");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const addTransaction = useCallback(async (data) => {
    try {
      const newTx = await api.createTransaction(data);
      setTransactions((prev) => [newTx, ...prev]);
    } catch (e) {
      console.log("Erro ao adicionar transação no GlobalState:", e.message);
      throw e;
    }
  }, []);

  const updateTransaction = useCallback(async (id, data) => {
    try {
      const updatedTx = await api.updateTransaction(id, data);
      setTransactions((prev) =>
        prev.map((tx) => (tx.id === id ? updatedTx : tx))
      );
    } catch (e) {
      console.log("Erro ao atualizar transação no GlobalState:", e.message);
      throw e;
    }
  }, []);

  const deleteTransaction = useCallback(async (id) => {
    try {
      await api.deleteTransaction(id);
      setTransactions((prev) => prev.filter((tx) => tx.id !== id));
    } catch (e) {
      console.log("Erro ao deletar transação no GlobalState:", e.message);
      throw e;
    }
  }, []);

  const removeTransaction = deleteTransaction;

  const addCategory = useCallback(async (data) => {
    try {
      const newCat = await api.createCategory(data);
      setCategories((prev) => [...prev, newCat]);
    } catch (e) {
      console.log("Erro ao adicionar categoria no GlobalState:", e.message);
      throw e;
    }
  }, []);

  const removeCategory = useCallback(async (id) => {
    try {
      await api.deleteCategory(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (e) {
      console.log("Erro ao remover categoria no GlobalState:", e.message);
      throw e;
    }
  }, []);

  return (
    <MoneyContext.Provider value={{
      transactions, categories, loading, error, refresh,
      addTransaction, updateTransaction, deleteTransaction, removeTransaction, addCategory, removeCategory,
    }}>
      {children}
    </MoneyContext.Provider>
  );
}