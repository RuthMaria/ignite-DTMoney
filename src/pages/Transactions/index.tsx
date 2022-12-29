import React from 'react';
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
} from './styles';

export const Transactions: React.FC = () => {
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
                  <td width="50%">{transaction.description}</td>
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
                      onClick={() => handleDeleteTransaction(transaction.id)}
                    />
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <NotePencil />
                      </Dialog.Trigger>

                      <NewTransactionModal transaction={transaction} />
                    </Dialog.Root>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
};
