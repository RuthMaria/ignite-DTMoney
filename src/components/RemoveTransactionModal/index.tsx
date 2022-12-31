import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { useContextSelector } from 'use-context-selector';
import { TransactionsContext } from '../../contexts/TransactionsContext';

import {
  CloseButton,
  Content,
  Overlay,
  Button,
  GroupButton,
  CancelButton,
} from './styles';

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface RemoveTransactionModalProps {
  transaction: Transaction;
}

export const RemoveTransactionModal = ({
  transaction,
}: RemoveTransactionModalProps) => {
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
    <Dialog.Portal>
      <Overlay />

      <Content>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <p>Deseja excluir a transação {transaction.description} ?</p>

        <GroupButton>
          <CancelButton>
            <Button>Cancelar</Button>
          </CancelButton>
          <Button
            isDelete
            onClick={() => handleDeleteTransaction(transaction.id)}
          >
            Excluir
          </Button>
        </GroupButton>

        <Dialog.Close />
      </Content>
    </Dialog.Portal>
  );
};
