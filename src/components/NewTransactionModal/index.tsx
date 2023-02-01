import * as z from 'zod';
import { useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContextSelector } from 'use-context-selector';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';

import { TransactionsContext } from '../../contexts/TransactionsContext';

import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
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

interface NewTransactionModalProps {
  transaction?: Transaction;
}

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export const NewTransactionModal = ({
  transaction,
}: NewTransactionModalProps) => {
  /*
  useContextSelector recebe dois parâmetros:
  1. O contexto
  2. uma função callback que fica observando se as informações do return (createTransaction) mudaram para evitar renderizações desnecessárias
  */
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction;
    }
  );

  const updateTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.updateTransaction;
    }
  );

  const {
    reset,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: transaction?.type || 'income',
    },
  });

  useEffect(() => {
    if (transaction) {
      setValue('description', transaction.description);
      setValue('price', transaction.price);
      setValue('category', transaction.category);
    }
  }, []);

  const handleCreateNewTransaction = async (data: NewTransactionFormInputs) => {
    const { description, price, category, type } = data;

    const newTransaction = {
      description,
      price,
      category,
      type,
    };

    createTransaction(newTransaction);

    reset();
  };

  const handleUpdateTransaction = async (data: NewTransactionFormInputs) => {
    const { description, price, category, type } = data;

    const editTransaction = {
      id: transaction?.id || 1,
      description,
      type,
      price,
      category,
      createdAt: transaction?.createdAt || 'lorem ipsom',
      updatedAt: transaction?.createdAt || 'lorem ipsom',
    };

    updateTransaction(editTransaction);

    reset();
  };

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>{transaction ? 'Editar' : 'Nova'} transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form
          onSubmit={handleSubmit(
            transaction ? handleUpdateTransaction : handleCreateNewTransaction
          )}
        >
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>

                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            {transaction ? 'Atualizar' : 'Cadastrar'}
          </button>
        </form>
        <Dialog.Close />
      </Content>
    </Dialog.Portal>
  );
};
