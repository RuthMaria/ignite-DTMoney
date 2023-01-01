import styled from 'styled-components';

export const Content = styled.div`
  background: ${(props) => props.theme['gray-700']};
  color: ${(props) => props.theme.white};
  text-align: center;
  cursor: pointer;
`;

export const Box = styled.div`
  position: absolute;
  top: calc(110%);
  left: -35px;
  visibility: hidden;
  color: transparent;
  background-color: transparent;
  padding: 2px 2px;
  border-radius: 3px;
  text-align: center;

  &:before {
    content: '';
    width: 0;
    height: 0;
    left: 40px;
    top: -4px;
    position: absolute;
    border: 4px solid transparent;
    transform: rotate(135deg);
  }
`;

export const Card = styled.div`
  position: relative;

  & ${Content}:hover + ${Box} {
    visibility: visible;
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme['gray-900']};
    width: 90px;
    padding: 4px 4px;

    &:before {
      border-color: transparent transparent
        ${(props) => props.theme['gray-900']}${(props) => props.theme['gray-900']};
    }
  }
`;
