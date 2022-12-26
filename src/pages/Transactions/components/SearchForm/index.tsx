import React, { useContext } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { MagnifyingGlass } from 'phosphor-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchFormContainer } from './styles';
import { TransactionsContext } from '../../../../contexts/TransactionsContext';

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export const SearchForm: React.FC = () => {
  const { fetchTransactions } = useContext(TransactionsContext);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }, //usado para quando o formulário ainda está sendo submetido
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  /* Funções que são disparadas por ações do usuário são precedidas pela palavra handle por convenção*/

  const handleSearchTransactions = async (data: SearchFormInputs) => {
    await fetchTransactions(data.query);
  };

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
};
