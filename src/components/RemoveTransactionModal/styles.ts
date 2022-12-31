import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0; // é um abreviação para usar as 4 propriedades de reset(top=0, bottom=0, left=0, right=0)
  background: rgba(0, 0, 0, 0.75);
`;

export const Content = styled(Dialog.Content)`
  min-width: 25rem;
  border-radius: 6px;
  padding: 2.5rem 3rem 0.5rem 3rem;
  background: ${(props) => props.theme['gray-800']};

  // esses comandos abaixo é o que faz o conteúdo ser centralizado
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  p {
    font-size: 1.3rem;
    text-align: center;
    margin-top: 2rem;
  }
`;

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme['gray-500']};
`;

export const CancelButton = styled(Dialog.Close)`
  background: transparent;
  border: 0;
  cursor: pointer;
  color: ${(props) => props.theme['gray-500']};
`;

export const Button = styled.button<{ isDelete?: boolean }>`
  height: 50px;
  border: 2px solid ${(props) => props.theme['gray-700']};
  background: ${(props) =>
    props.isDelete ? props.theme['red-500'] : props.theme['gray-800']};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  margin-top: 1.25rem;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.isDelete && props.theme['red-700']};
    border-color: ${(props) => !props.isDelete && props.theme['gray-600']};
    transition: background-color 0.2s;
  }
`;

export const GroupButton = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 0.5rem;
`;
