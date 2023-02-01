import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { NewTransactionModal } from '../NewTransactionModal';

import logoImg from '../../assets/logo.svg';
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles';

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img
          src={logoImg}
          alt="Dois triângulos verdes, um pequeno e outro grande, o menor está sobre o maior. Ao lado a frase dt money"
        />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
};
