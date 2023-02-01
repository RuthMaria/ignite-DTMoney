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
import { RemoveTransactionModal } from '../../components/RemoveTransactionModal';
import Tooltip from '../../components/Tooltip';

export const Transactions: React.FC = () => {
  const [page, setPage] = useState(1);
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [query, setQuery] = useState('');
  const ITEMS_PER_PAGE = 3;

  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions;
    }
  );

  const hasQuery = (query: string) => {
    setQuery(query);
  };

  useEffect(() => {
    const loadingTransactions = async () => {
      const response = await api.get('transactions', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          q: query,
        },
      });
      setTotalTransaction(response.data.length);

      await fetchTransactions(query, page, ITEMS_PER_PAGE);
    };

    loadingTransactions();
  }, [page, totalTransaction, query, fetchTransactions]);

  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm hasQuery={hasQuery} />
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
                    <Dialog.Root>
                      <Dialog.Trigger>
                        <Tooltip text="Remover">
                          <Trash size={19} />
                        </Tooltip>
                      </Dialog.Trigger>

                      <RemoveTransactionModal transaction={transaction} />
                    </Dialog.Root>

                    <Dialog.Root>
                      <Dialog.Trigger>
                        <Tooltip text="Editar">
                          <NotePencil size={19} />
                        </Tooltip>
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
