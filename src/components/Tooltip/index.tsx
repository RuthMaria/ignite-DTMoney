import React from 'react';

import { Box, Card, Content } from './styles';

interface TooltipProps {
  text?: string;
  children?: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <Card>
      <Content>{children}</Content>
      <Box>
        <p>{text}</p>
      </Box>
    </Card>
  );
};

export default Tooltip;
