import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Trash, NotePencil } from 'phosphor-react';
import { useContextSelector } from 'use-context-selector';
import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { SearchForm } from './components/SearchForm';
import { dateFormatter, priceFormatter } from '../../utils/formatter';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { NewTransactionModal } from '../../components/NewTransactionModal';

import {
  PriceHighlight,
  TransactionsTable,
  TransactionsContainer,
  Div,
} from './styles';
import Pagination from '../../components/Pagination';
import { api } from '../../lib/axios';

export const Transactions: React.FC = () => {
  const [page, setPage] = useState(1);
  const [totalTransaction, setTotalTransaction] = useState(0);
  const ITEMS_PER_PAGE = 3;

  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions;
    }
  );

  useEffect(() => {
    const loadingTransactions = async () => {
      const response = await api.get('transactions');
      setTotalTransaction(response.data.length);

      await fetchTransactions('', page, ITEMS_PER_PAGE);
    };

    loadingTransactions();
  }, [page, totalTransaction]);

  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  const deleteTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.deleteTransaction;
    }
  );

  const handleDeleteTransaction = async (id: number) => {
    deleteTransaction(id);
  };

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="45%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                  <td>
                    <Trash
                      size={19}
                      onClick={() => handleDeleteTransaction(transaction.id)}
                    />
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <NotePencil size={19} />
                      </Dialog.Trigger>

                      <NewTransactionModal transaction={transaction} />
                    </Dialog.Root>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
        <Div>
          <Pagination
            pageSize={ITEMS_PER_PAGE}
            currentPage={page}
            totalCount={totalTransaction}
            onPageChange={(page) => setPage(page)}
          />
        </Div>
      </TransactionsContainer>
    </div>
  );
};
