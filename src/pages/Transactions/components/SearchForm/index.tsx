import React, { memo } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { MagnifyingGlass } from 'phosphor-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContextSelector } from 'use-context-selector';
import { TransactionsContext } from '../../../../contexts/TransactionsContext';

import { SearchFormContainer } from './styles';

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

interface SearchFormProps {
  hasQuery: (query: string) => void;
}

const SearchFormComponent: React.FC<SearchFormProps> = ({ hasQuery }) => {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions;
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }, //usado para quando o formulário ainda está sendo submetido
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  /* Funções que são disparadas por ações do usuário são precedidas pela palavra handle por convenção*/

  const handleSearchTransactions = async (data: SearchFormInputs) => {
    hasQuery(data.query);
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

// memo retorna um componente memorizado, só o renderiza se as suas dependências mudar. Evita que o componente seja recriado.

export const SearchForm = memo(SearchFormComponent);
