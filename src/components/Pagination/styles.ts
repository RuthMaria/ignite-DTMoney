import styled from 'styled-components';

type Props = {
  isSelected?: boolean;
};

export const Button = styled.button<Props>`
  display: flex;
  align-items: center;
  border: none;
  justify-content: center;
  background-color: ${(props) =>
    props.isSelected ? props.theme['green-700'] : props.theme['gray-700']};
  color: ${(props) => props.theme.white};
  border-radius: 0.25rem;
  padding: 0.5rem 0.75rem;
  width: 2.3rem;
  font-size: 1rem;
  transition: filter 0.2s;
  cursor: pointer;

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const ButtonCaret = styled(Button)`
  background-color: ${(props) => props.theme['gray-800']};
  border: none;
  margin: 0;

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['gray-800']};
    filter: none;
  }

  &:disabled {
    color: ${(props) => props.theme['gray-600']};
  }

  &:not(:disabled) {
    color: ${(props) => props.theme['green-700']};
  }
`;

export const Span = styled.span`
  padding: 0.5rem;
`;

export const GroupButton = styled.div`
  border: none;
  display: flex;
  margin-top: 1.5rem;
  gap: 0.25rem;
`;
