import React from 'react';

import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles';
import logoImg from '../../assets/logo.svg';

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <NewTransactionButton>Nova transação</NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  );
};
