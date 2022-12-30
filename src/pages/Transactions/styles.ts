import styled from 'styled-components';

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`;

export const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate; // para separar as linhas da tabela
  border-spacing: 0 0.5rem; //  define o espaçamento das linhas da tabela
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme['gray-700']};

    svg + svg {
      margin-left: 0.1rem;
    }

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      min-width: 7rem;

      > svg:hover {
        color: ${(props) => props.theme['red-300']};
        transition: color 0.2s;
        cursor: pointer;
      }

      svg + svg:hover {
        color: ${(props) => props.theme['green-300']};
        transition: color 0.2s;
        cursor: pointer;
      }
    }
  }
`;

interface PriceHighlightProps {
  variant: 'income' | 'outcome';
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};
`;
