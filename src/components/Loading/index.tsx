import React from 'react';
import { useTheme } from 'styled-components';
import { ActivityIndicator } from 'react-native';
import { LoadContainer } from './styles';

const Loading: React.FC = () => {
  const theme = useTheme();

  return (
    <LoadContainer>
      <ActivityIndicator color={theme.colors.primary} size="large" />
    </LoadContainer >
  );
}

export default Loading;