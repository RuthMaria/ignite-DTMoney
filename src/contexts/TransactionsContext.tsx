import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';
import { api } from '../lib/axios';

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
  updateTransaction: (data: Transaction) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // useCallback retorna uma função memorizada, só a recalcula se o seu array de dependências mudar

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    });

    setTransactions(response.data);
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data;

      const newTransaction = {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const response = await api.post('transactions', newTransaction);

      setTransactions((state) => [response.data, ...state]); // quando for atualizar um estado que dependa dos estados anteriores, usar um callback
    },
    []
  );

  const updateTransaction = useCallback(async (data: Transaction) => {
    const { description, price, category, type, id, createdAt } = data;

    const transaction = {
      description,
      price,
      category,
      type,
      createdAt,
      updatedAt: new Date(),
    };

    await api.put(`transactions/${id}`, transaction);

    fetchTransactions();
  }, []);

  const deleteTransaction = async (id: number) => {
    await api.delete(`transactions/${id}`);
    fetchTransactions();
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
        fetchTransactions,
        deleteTransaction,
        updateTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
